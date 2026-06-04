export const tourInfo = {
  title: "[신세계쇼핑] 프리미엄 태항산/보천대협곡/천계산/팔리구 5일",
  dDay: "2026-06-10T11:45:00",
  flightIn: "SC8002 (06/10 11:45 인천출발)",
  flightOut: "SC8001 (06/14 08:10 제남출발)",
  guideContact: "김지혜 가이드 (02-2022-7287)",
  hotel: "휘현(1박), 임주(2박), 제남(1박) 예정 (출발 2일 전 확정)",
  heroImages: [
    "https://dimgcdn.ybtour.co.kr/TN/2d/2dfa9b8e1bb41fd127bf712870d6fad6.tn.630x410.jpg",
    "https://dimgcdn.ybtour.co.kr/TN/b4/b44b4da7755fe55d08304704a39d0a04.tn.630x410.jpg",
    "https://dimgcdn.ybtour.co.kr/TN/91/9149b0d6c2b224186043d53f8e9fc9e5.tn.630x410.jpg"
  ],
  // 시차 안내: 한국(KST, UTC+9) vs 중국(CST, UTC+8) → 한국이 1시간 빠름
  timezone: {
    note: "중국은 한국보다 1시간 느립니다 (KST = CST + 1시간)",
    departure: "인천 11:45(KST) 출발 → 제남 12:30(CST) 도착 · 실제 비행시간 1시간 45분\n※ 현지 도착 시각이 한국 시각보다 45분밖에 차이 안 나는 것처럼 보이지만, 시차 1시간을 더하면 정확히 1h45m입니다.",
    arrival: "제남 08:10(CST) 출발 → 인천 10:45(KST) 도착 · 실제 비행시간 1시간 35분\n※ 귀국 시 중국 시각 + 1시간 = 한국 시각"
  }
};

export const scheduleData = [
  {
    day: 1,
    date: "2026.06.10 (수)",
    summary: "인천/제남/휘현",
    items: [
      { time: "09:00", type: "flight", title: "인천국제공항 미팅", desc: "제1터미널 3층 A카운터 11, 12번" },
      { time: "11:45", type: "flight", title: "SC8002 인천 출발", desc: "총 1시간 45분 소요" },
      { time: "12:30", type: "bus", title: "제남 국제공항 도착", desc: "가이드 미팅 후 휘현으로 이동 (약 4시간 30분 소요)" },
      { time: "18:00", type: "meal", title: "식사 안내", desc: "중식: 기내식(간단식), 석식: 하남요리" },
      { time: "20:00", type: "hotel", title: "휘현 도착 및 호텔 투숙", desc: "화룽리두풍상호텔 또는 동급" }
    ]
  },
  {
    day: 2,
    date: "2026.06.11 (목)",
    summary: "휘현/임주",
    items: [
      { time: "07:30", type: "meal", title: "호텔 조식 후 보천대협곡 이동", desc: "약 1시간 소요" },
      { time: "09:00", type: "sightseeing", title: "보천대협곡 관광", desc: "동굴엘리베이터→전동카→유리전망대→모노레일 등 탑승", image: "https://dimgcdn.ybtour.co.kr/TN/b4/b44b4da7755fe55d08304704a39d0a04.tn.630x410.jpg" },
      { time: "12:30", type: "meal", title: "중식 (산동요리)", desc: "" },
      { time: "14:00", type: "bus", title: "임주로 이동", desc: "약 2시간 소요" },
      { time: "16:00", type: "sightseeing", title: "전신마사지", desc: "여행의 피로를 풀어주는 60분 전신마사지 (팁 별도)" },
      { time: "18:00", type: "meal", title: "석식 (샤브샤브 무제한)", desc: "" },
      { time: "19:30", type: "hotel", title: "호텔 투숙 및 휴식", desc: "홍기거영빈루호텔 또는 유곡지란호텔 등" }
    ]
  },
  {
    day: 3,
    date: "2026.06.12 (금)",
    summary: "임주 (천계산/팔리구)",
    items: [
      { time: "07:00", type: "meal", title: "호텔 조식 후 천계산 이동", desc: "약 2시간 30분 소요" },
      { time: "09:30", type: "sightseeing", title: "천계산 관광", desc: "하늘과 땅의 경계라 불리는 천계산 (운봉화랑 전동카)", image: "https://dimgcdn.ybtour.co.kr/TN/91/9149b0d6c2b224186043d53f8e9fc9e5.tn.630x410.jpg" },
      { time: "12:00", type: "meal", title: "중식 (비빔밥)", desc: "" },
      { time: "13:00", type: "bus", title: "팔리구로 이동", desc: "약 20분 소요" },
      { time: "13:30", type: "sightseeing", title: "팔리구 관광", desc: "태항산 남부의 협곡 자연 관광지 (전동카)", image: "https://dimgcdn.ybtour.co.kr/TN/22/221ed4308e2be12136e403a3fc31bf79.tn.630x410.jpg" },
      { time: "16:30", type: "bus", title: "임주로 이동", desc: "약 2시간 30분 소요" },
      { time: "19:00", type: "meal", title: "석식 (삼겹살 무제한)", desc: "석식 후 석판암으로 이동 (약 40분)" },
      { time: "20:30", type: "hotel", title: "호텔 투숙 및 휴식", desc: "임주 호텔" }
    ]
  },
  {
    day: 4,
    date: "2026.06.13 (토)",
    summary: "임주/제남",
    items: [
      { time: "07:30", type: "meal", title: "호텔 조식 후 태항대협곡 이동", desc: "약 30분 소요" },
      { time: "08:30", type: "sightseeing", title: "태항대협곡 관광", desc: "도화곡 풍경구, 환산선 풍경구(전동카), 몽환곡 풍경구(유리다리)", image: "https://dimgcdn.ybtour.co.kr/TN/2d/2dfa9b8e1bb41fd127bf712870d6fad6.tn.630x410.jpg" },
      { time: "12:30", type: "meal", title: "중식 (한식)", desc: "" },
      { time: "13:30", type: "bus", title: "제남으로 이동", desc: "약 4시간 소요" },
      { time: "18:00", type: "meal", title: "석식 (사천요리)", desc: "" },
      { time: "19:30", type: "hotel", title: "호텔 투숙 및 휴식", desc: "루가호텔 또는 동급 (제남)" }
    ]
  },
  {
    day: 5,
    date: "2026.06.14 (일)",
    summary: "제남/인천",
    items: [
      { time: "06:00", type: "meal", title: "조식 후 공항 이동", desc: "귀국편 시간 관계로 조식용 도시락 제공" },
      { time: "08:10", type: "flight", title: "SC8001 제남 출발", desc: "총 1시간 35분 소요" },
      { time: "10:45", type: "flight", title: "인천국제공항 도착", desc: "안녕히 가세요 (중식: 기내식 간단식)" }
    ]
  }
];

export const chatbotData = [
  { keywords: ["호텔", "숙소", "숙박"], answer: "1박: 휘현(화룽리두풍상호텔 등), 2~3박: 임주(홍기거영빈루 등), 4박: 제남(루가호텔 등) 5성급 호텔 예정이며 출발 2일 전 확정됩니다." },
  { keywords: ["가이드", "연락처", "전화"], answer: "김지혜 가이드님이며 연락처는 02-2022-7287 입니다." },
  { keywords: ["미팅", "모임", "어디로", "공항"], answer: "1일차(6/10) 오전 09:00, 인천 국제공항 제1터미널 3층 A카운터 11, 12번에서 미팅합니다." },
  { keywords: ["항공", "비행기", "출발시간", "도착시간"], answer: "출발: SC8002 (06/10 11:45 인천출발 -> 12:30 제남도착)\n귀국: SC8001 (06/14 08:10 제남출발 -> 10:45 인천도착) 입니다." },
  { keywords: ["밥", "식사", "메뉴", "점심", "저녁"], answer: "하남요리, 샤브샤브 무제한, 비빔밥, 삼겹살 무제한, 한식, 사천요리 등 다양한 특식이 준비되어 있습니다." },
  { keywords: ["마사지", "전신마사지"], answer: "2일차(6/11) 오후에 여행의 피로를 풀어주는 60분 전신마사지가 포함되어 있습니다. (팁 별도)" },
  { keywords: ["오늘", "내일", "일정"], answer: "일정 탭에서 1~5일차 일정을 자세히 확인하실 수 있어요. 어떤 장소가 궁금하신가요?" },
  { keywords: ["안녕", "반가워", "하이"], answer: "안녕하세요! 태항산 여행 가이드 챗봇입니다. 일정, 호텔, 비행기 시간 등 궁금한 점을 물어보세요!" },
  { keywords: ["default"], answer: "죄송해요, 그 질문은 제가 아직 잘 몰라요. '호텔', '가이드', '비행기', '마사지' 와 같은 단어로 질문해주시면 답변해 드릴게요!" }
];

export const placesInfo = [
  {
    name: "보천대협곡",
    day: "2일차",
    image: "https://dimgcdn.ybtour.co.kr/TN/b4/b44b4da7755fe55d08304704a39d0a04.tn.630x410.jpg",
    desc: "하남성 국가 4A급 풍경구. 산림 피복율 95% 이상의 울창한 숲과 웅장한 폭포 군락이 장관을 이룹니다.",
    tips: [
      "동굴엘리베이터→전동카→유리전망대→모노레일 순 코스, 미끄러운 신발 주의",
      "유리전망대는 고소공포증 있으신 분 주의",
      "전체 코스 소요 약 3~4시간",
      "중국 내 생태 관광지 중 손꼽히는 명소"
    ],
    funFacts: [
      "협곡 총 길이 약 14km, 산 정상과 바닥의 고도차 1,000m 이상",
      "동굴 안에 엘리베이터를 설치한 세계 희귀 명소 — 수직으로 올라가는 느낌이 짜릿함",
      "산림 피복률 95% 이상으로 여름에도 천연 에어컨 역할 — 다른 태항산 명소보다 시원한 편",
      "폭포가 100여 개 이상 밀집 — '백폭협곡'이라고도 불림"
    ]
  },
  {
    name: "천계산",
    day: "3일차",
    image: "https://dimgcdn.ybtour.co.kr/TN/91/9149b0d6c2b224186043d53f8e9fc9e5.tn.630x410.jpg",
    desc: "'하늘과 땅의 경계'라 불리는 천계산. 주민들이 수년간 징과 망치로 만든 괴벽 도로와 8km 운봉화랑 코스가 압도적입니다.",
    tips: [
      "전동카(GBW) 탑승 필수, 줄이 길 수 있으니 서두르기",
      "8km 코스라 운동화와 편한 복장 추천",
      "산 정상은 서늘하니 가벼운 겉옷 챙기기",
      "관망대마다 탁 트인 절경이 펼쳐짐"
    ],
    funFacts: [
      "산 정상 해발 1,736m — 구름 위를 걷는 느낌",
      "현지 주민들이 수십 년간 맨손으로 절벽을 뚫어 만든 '괴벽도로'가 유명, 삶의 의지의 상징으로 불림",
      "운봉화랑 8km 코스는 중국에서 가장 아름다운 산악 보행로 중 하나로 꼽힘",
      "드라마·영화 촬영지로도 자주 사용되는 곳"
    ]
  },
  {
    name: "팔리구",
    day: "3일차",
    image: "https://dimgcdn.ybtour.co.kr/TN/22/221ed4308e2be12136e403a3fc31bf79.tn.630x410.jpg",
    desc: "하남성 10대 풍경구, AAAA급. 사방이 아름다운 산으로 둘러싸여 있으며 천하폭포를 비롯한 다양한 자연 경관이 펼쳐집니다.",
    tips: [
      "전동카 포함, 테마파크식 이동 방식",
      "천하폭포 포토스팟은 오전 광량이 좋음",
      "계절마다 폭포 수량이 달라 6월은 수량 풍부한 시기"
    ],
    funFacts: [
      "'팔리(八里)'는 협곡 길이 약 8리(약 4km)에서 유래한 이름",
      "천하폭포 낙차 약 50m 이상 — 6월 우기에 수량이 가장 풍부해 장관",
      "협곡 안에서만 자라는 희귀 식물이 서식하는 생태 보호 구역",
      "태항산 중에서도 비교적 덜 알려져 관광객이 적고 한적하게 즐길 수 있음"
    ]
  },
  {
    name: "태항대협곡",
    day: "4일차",
    image: "https://dimgcdn.ybtour.co.kr/TN/2d/2dfa9b8e1bb41fd127bf712870d6fad6.tn.630x410.jpg",
    desc: "'중국의 그랜드 캐니언'. 남북 600km에 달하는 광대한 협곡으로 도화곡, 환산선(전동카), 몽환곡(유리다리)이 하이라이트.",
    tips: [
      "유리다리는 바닥이 투명 — 고소공포증 있으신 분 각오 필요!",
      "도화곡 소나무 터널은 사진 명소, 오전 방문 추천",
      "태항산 일출·일몰은 사진작가들이 즐겨 찾는 포인트",
      "협곡 규모가 커서 전동카 없이는 이동이 매우 힘듦"
    ],
    funFacts: [
      "남북으로 600km에 달하는 광대한 규모 — 실제로 보면 압도되는 스케일",
      "영화 '아바타' 배경 모델이 된 장자제와 함께 중국 3대 협곡 중 하나로 꼽힘",
      "도화곡의 천년 수령 소나무들은 기암절벽 사이를 비집고 자라 신비로운 분위기",
      "몽환곡 유리다리 — 발아래로 수백m 협곡이 내려다보이는 아찔한 체험"
    ]
  }
];

export const prepData = {
  weather: [
    { icon: "ph-thermometer", label: "평균 기온", value: "낮 28~33°C / 밤 18~22°C" },
    { icon: "ph-cloud-rain", label: "강수", value: "6월은 우기 시작 — 우산·우비 필수" },
    { icon: "ph-mountains", label: "산 정상", value: "천계산·보천대협곡 정상은 20~24°C로 서늘" },
    { icon: "ph-sun", label: "자외선", value: "강함 — 선크림 SPF50+ 필수" },
    { icon: "ph-sneaker", label: "추천 복장", value: "반팔 + 얇은 긴팔/가디건 레이어링, 운동화 필수" }
  ],
  packing: [
    {
      category: "여행 서류",
      emoji: "📄",
      items: [
        "여권 (유효기간 6개월 이상 확인)",
        "항공권 e-티켓 (출력 또는 저장)",
        "여행자보험 증권",
        "비상 연락처 메모 (가이드·대사관)"
      ]
    },
    {
      category: "의류 & 신발",
      emoji: "👟",
      items: [
        "반팔 3~4벌",
        "얇은 긴팔 또는 가디건 (산 정상용)",
        "운동화 (필수 — 트레킹 많음)",
        "슬리퍼 (호텔 실내용)",
        "우비 또는 접이식 우산"
      ]
    },
    {
      category: "상비약 & 위생",
      emoji: "💊",
      items: [
        "소화제·지사제",
        "멀미약",
        "진통제·밴드",
        "손소독제·물티슈",
        "선크림 SPF50+",
        "마스크"
      ]
    },
    {
      category: "전자기기",
      emoji: "📱",
      items: [
        "보조배터리 (대용량 추천 — 트레킹 중 충전 불가)",
        "충전케이블",
        "이어폰",
        "카메라 또는 셀카봉"
      ]
    },
    {
      category: "현금 & 결제",
      emoji: "💴",
      items: [
        "위안화 환전 (1인 약 500~800元 권장)",
        "알리페이(Alipay) 앱 사전 설치",
        "신용카드 (비상용)"
      ]
    }
  ],
  chinaTips: [
    {
      icon: "ph-wifi-slash",
      title: "VPN 출국 전 설치 필수",
      desc: "카카오톡·구글·유튜브·인스타그램 모두 중국에서 차단됩니다.\n출국 전에 반드시 VPN 앱을 설치해두세요. 현지에서는 다운로드 자체가 불가능합니다."
    },
    {
      icon: "ph-qr-code",
      title: "알리페이(Alipay) 준비",
      desc: "현지에서 현금보다 QR 결제가 보편적입니다. 알리페이 외국인 계정을 출국 전에 가입해두면 편의점·기념품샵 결제에 유용합니다."
    },
    {
      icon: "ph-currency-cny",
      title: "환율 & 환전",
      desc: "1元(위안) ≈ 190원 내외 (2025년 기준).\n1인 500~800元 권장. 국내 은행 환전이 수수료 면에서 유리합니다."
    },
    {
      icon: "ph-phone-call",
      title: "긴급 연락처",
      desc: "주중 한국대사관: +86-10-8531-0700\n영사콜센터 (24시간): +82-2-3210-0404\n중국 경찰: 110 · 구급: 120 · 소방: 119"
    },
    {
      icon: "ph-plug",
      title: "전원 & 플러그",
      desc: "중국 전압 220V, A형 플러그 사용.\n한국 제품 대부분 어댑터 없이 바로 사용 가능. 멀티탭 하나 챙기면 편합니다."
    }
  ],
  phrases: [
    { situation: "인사", ko: "안녕하세요", zh: "你好", pinyin: "Nǐ hǎo" },
    { situation: "인사", ko: "감사합니다", zh: "谢谢", pinyin: "Xièxiè" },
    { situation: "식당", ko: "이거 주세요", zh: "来这个", pinyin: "Lái zhège" },
    { situation: "식당", ko: "맛있어요!", zh: "很好吃！", pinyin: "Hěn hào chī!" },
    { situation: "쇼핑", ko: "얼마예요?", zh: "多少钱？", pinyin: "Duōshǎo qián?" },
    { situation: "쇼핑", ko: "깎아주세요", zh: "便宜点儿", pinyin: "Piányí diǎnr" },
    { situation: "이동", ko: "화장실 어디예요?", zh: "厕所在哪里？", pinyin: "Cèsuǒ zài nǎlǐ?" },
    { situation: "사진", ko: "사진 찍어도 돼요?", zh: "可以拍照吗？", pinyin: "Kěyǐ pāizhào ma?" },
    { situation: "긴급", ko: "도와주세요!", zh: "救命！", pinyin: "Jiùmìng!" },
    { situation: "긴급", ko: "병원에 가고 싶어요", zh: "我要去医院", pinyin: "Wǒ yào qù yīyuàn" }
  ]
};

