exports.handler = async function(event, context) {
  // CORS 허용 (모든 도메인 또는 특정 도메인)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ error: 'Server configuration error: API key missing' }) 
    };
  }

  try {
    const { messages } = JSON.parse(event.body);

    // 현재 사용 가능한 최신 모델 순서로 시도
    const modelsToTry = [
      'gemini-2.5-flash-preview-05-20',
      'gemini-2.5-flash',
      'gemini-2.5-pro',
      'gemini-1.5-flash-latest',
      'gemini-1.5-flash',
    ];

    let lastError = null;
    let botText = null;

    for (const model of modelsToTry) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: messages })
          }
        );

        const data = await res.json();

        if (data.error) {
          const code = data.error.code;
          const status = data.error.status;
          if (
            code === 404 ||
            status === 'NOT_FOUND' ||
            status === 'RESOURCE_EXHAUSTED' ||
            (data.error.message && data.error.message.includes('quota'))
          ) {
            lastError = new Error(data.error.message);
            continue;
          }
          throw new Error(data.error.message);
        }

        botText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (botText) break;

      } catch (err) {
        if (
          err.message.includes('not found') ||
          err.message.includes('NOT_FOUND') ||
          err.message.includes('quota') ||
          err.message.includes('RESOURCE_EXHAUSTED')
        ) {
          lastError = err;
          continue;
        }
        throw err;
      }
    }

    if (!botText) {
      throw lastError || new Error('현재 사용 가능한 모델이 없습니다. 잠시 후 다시 시도해 주세요.');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: botText })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
