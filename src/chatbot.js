import { tourInfo, scheduleData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const chatbotBtn = document.getElementById('chatbotToggleBtn');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const closeChatbot = document.getElementById('closeChatbot');
  const sendBtn = document.getElementById('chatSendBtn');
  const chatInput = document.getElementById('chatInput');
  const messagesContainer = document.getElementById('chatbotMessages');
  const sugBtns = document.querySelectorAll('.sug-btn');
  const sugBtns = document.querySelectorAll('.sug-btn');
  // API Key 관련 버튼 요소 및 설정 삭제 (서버 API 이용)

  // Toggle Window
  chatbotBtn.addEventListener('click', () => {
    chatbotWindow.classList.remove('hidden');
    chatInput.focus();
  });

  closeChatbot.addEventListener('click', () => {
    chatbotWindow.classList.add('hidden');
  });

  // Suggestion buttons
  sugBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      handleUserMessage(btn.textContent.trim());
    });
  });

  // Send message
  sendBtn.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (text) handleUserMessage(text);
  });

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const text = chatInput.value.trim();
      if (text) handleUserMessage(text);
    }
  });

  // 대화 기록 (AI 문맥 유지용)
  let chatHistory = [];

  async function handleUserMessage(text) {
    appendUserMessage(text);
    chatInput.value = '';

    const loadingId = 'loading-' + Date.now();
    appendLoadingMessage(loadingId);

    try {
      const answer = await callGeminiAPI(text);
      removeMessage(loadingId);
      appendBotMessage(answer);
    } catch (error) {
      removeMessage(loadingId);
      console.error('Server API Error:', error);
      appendBotMessage(`<i class="ph ph-warning"></i> 오류: ${error.message}`);
    }
  }

  // ── 메시지 렌더 헬퍼들 ──────────────────────────────────
  function appendUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'msg user-msg';
    div.textContent = text;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function appendBotMessage(html) {
    const div = document.createElement('div');
    div.className = 'msg bot-msg';
    // 마크다운 기호 제거 후 줄바꿈 처리
    let clean = html
      .replace(/\*\*(.*?)\*\*/g, '$1')   // **bold** → 일반 텍스트
      .replace(/\*(.*?)\*/g, '$1')        // *italic* → 일반 텍스트
      .replace(/`(.*?)`/g, '$1')          // `code` → 일반 텍스트
      .replace(/\n/g, '<br>');            // 줄바꿈
    div.innerHTML = clean;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function appendLoadingMessage(id) {
    const div = document.createElement('div');
    div.className = 'msg bot-msg loading-msg';
    div.id = id;
    div.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function removeMessage(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  // ── Google Gemini API 호출 ────────────────────────────────
  async function callGeminiAPI(userMessage) {
    const scheduleContext = JSON.stringify({ tourInfo, scheduleData }, null, 2);

    const systemPrompt = `당신은 '노랑풍선 태항산 5일 패키지 여행'의 전담 AI 여행 가이드입니다.
아래 [여행일정데이터]를 완벽히 숙지하고, 여행자의 질문에 친절하고 정확하게 한국어로 답변하세요.
일정·시간·식사·호텔에 관한 답변은 반드시 제공된 데이터만 사용하세요.
데이터에 없는 일반 상식(날씨·환전 등)은 유연하게 답변해도 됩니다.
답변은 간결하되 필요한 정보는 빠짐없이 포함하세요.

[중요] 답변 형식 규칙:
- ** 또는 * 같은 마크다운 기호를 절대 사용하지 마세요.
- 강조가 필요하면 그냥 문장으로 표현하세요.
- 목록은 '-' 또는 숫자+점(1.)으로만 표현하세요.

[여행일정데이터]:
${scheduleContext}`;

    // 처음 한 번만 시스템 컨텍스트 삽입
    if (chatHistory.length === 0) {
      chatHistory.push({
        role: 'user',
        parts: [{ text: systemPrompt + '\n\n위 내용을 숙지했으면 "네, 이해했습니다."라고만 답해주세요.' }]
      });
      chatHistory.push({
        role: 'model',
        parts: [{ text: '네, 이해했습니다.' }]
      });
    }

    chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });

    // Netlify Functions 엔드포인트 호출 (/api/chat)
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory })
    });

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('서버 API를 찾을 수 없습니다. (로컬 환경에서는 netlify dev로 실행해야 합니다)');
      }
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || '서버 API 호출 중 오류가 발생했습니다.');
    }

    const data = await res.json();
    
    if (data.error) throw new Error(data.error);
    if (!data.text) throw new Error('응답을 받지 못했습니다.');

    chatHistory.push({ role: 'model', parts: [{ text: data.text }] });
    return data.text;
  }
});
