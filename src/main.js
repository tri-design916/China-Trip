import { tourInfo, scheduleData, placesInfo } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initQuickInfo();
  initTimeline();
  initStickyTabs();
  initGallery();
});

// 1. Hero Section & D-Day
function initHero() {
  document.getElementById('tripTitle').textContent = tourInfo.title;
  
  const dDayEl = document.getElementById('dDayCounter');
  const updateDDay = () => {
    const now = new Date();
    const dDay = new Date(tourInfo.dDay);
    const diff = dDay - now;
    if (diff <= 0) {
      dDayEl.innerHTML = `D-Day <i class="ph ph-confetti"></i> 여행 출발!`;
      return;
    }
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    dDayEl.textContent = `출발까지 D-${days}`;
  };
  updateDDay();
  setInterval(updateDDay, 1000 * 60 * 60);

  // Hero Slider
  const slider = document.getElementById('heroSlider');
  let currentImg = 0;
  const images = tourInfo.heroImages;
  if (images.length > 0) {
    slider.style.backgroundImage = `url(${images[0]})`;
    setInterval(() => {
      currentImg = (currentImg + 1) % images.length;
      slider.style.backgroundImage = `url(${images[currentImg]})`;
    }, 4000);
  }
}

// 2. Quick Info
function initQuickInfo() {
  document.getElementById('infoFlight').textContent = `출발: ${tourInfo.flightIn}`;
  document.getElementById('infoHotel').textContent = tourInfo.hotel;
  document.getElementById('infoGuide').textContent = tourInfo.guideContact;
}

// 3. Timeline Rendering
function initTimeline() {
  const container = document.getElementById('timelineContainer');
  let html = '';

  scheduleData.forEach((dayData, index) => {
    const isOpen = index < 2 ? 'open' : '';
    
    let itemsHtml = dayData.items.map(item => `
      <div class="timeline-item">
        <div class="time-badge">${item.time}</div>
        <div class="item-content">
          <div class="item-title">${item.title}</div>
          ${item.desc ? `<div class="item-desc">${item.desc}</div>` : ''}
          ${item.image ? `<img src="${item.image}" class="item-img" alt="${item.title}" loading="lazy">` : ''}
        </div>
      </div>
    `).join('');

    html += `
      <section class="day-section ${isOpen}" id="day-${dayData.day}">
        <div class="day-header" onclick="toggleDay(${dayData.day})">
          <div>
            <h2>${dayData.day}일차 - ${dayData.date}</h2>
            <p>${dayData.summary}</p>
          </div>
          <div class="toggle-icon">▼</div>
        </div>
        <div class="timeline" id="timeline-${dayData.day}">
          ${itemsHtml}
        </div>
      </section>
    `;
  });

  container.innerHTML = html;

  window.toggleDay = (day) => {
    const section = document.getElementById(`day-${day}`);
    section.classList.toggle('open');
  };
}

// 4. Sticky Tabs
function initStickyTabs() {
  const tabsContainer = document.getElementById('stickyTabs');
  let html = '';
  
  scheduleData.forEach((dayData, index) => {
    const activeClass = index === 0 ? 'active' : '';
    html += `<button class="tab-btn ${activeClass}" data-target="day-${dayData.day}">${dayData.day}일차</button>`;
  });
  
  tabsContainer.innerHTML = html;

  const buttons = tabsContainer.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      buttons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const targetId = e.target.getAttribute('data-target');
      const section = document.getElementById(targetId);
      if (!section.classList.contains('open')) {
        section.classList.add('open');
      }
      
      const yOffset = -70;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
}

// 5. Gallery Modal — 여행지 정보 + 시차 안내
function initGallery() {
  const btn = document.getElementById('galleryBtn');
  const modal = document.getElementById('galleryModal');
  const closeBtn = document.getElementById('closeGallery');
  const content = document.getElementById('galleryContent');

  btn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    if (content.innerHTML.trim() === '') {
      renderGalleryContent(content);
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // 모달 바깥 클릭 시 닫기
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

function renderGalleryContent(content) {
  // ── 시차 안내 카드 ──
  const tzHtml = `
    <div class="info-section-title"><i class="ph ph-clock"></i> 시차 안내</div>
    <div class="tz-card">
      <div class="tz-badge">KST (한국) = CST (중국) + 1시간</div>
      <div class="tz-row">
        <i class="ph ph-airplane-takeoff"></i>
        <div>
          <strong>출국 (6/10)</strong><br>
          인천 <b>11:45</b> (KST) 출발 → 제남 <b>12:30</b> (CST) 도착<br>
          <span class="tz-note">실제 비행시간 1시간 45분<br>※ 현지 시각이 45분 차이로 보이는 건 시차 때문 (11:45 KST = 10:45 CST)</span>
        </div>
      </div>
      <div class="tz-row">
        <i class="ph ph-airplane-landing"></i>
        <div>
          <strong>귀국 (6/14)</strong><br>
          제남 <b>08:10</b> (CST) 출발 → 인천 <b>10:45</b> (KST) 도착<br>
          <span class="tz-note">실제 비행시간 1시간 35분<br>※ 중국 시각 + 1시간 = 한국 시각</span>
        </div>
      </div>
    </div>
  `;

  // ── 여행지 정보 카드 ──
  const placesHtml = placesInfo.map(place => `
    <div class="place-card">
      <div class="place-img-wrap">
        <img src="${place.image}" alt="${place.name}" loading="lazy">
        <span class="place-day-badge">${place.day}</span>
      </div>
      <div class="place-body">
        <h3>${place.name}</h3>
        <p class="place-desc">${place.desc}</p>
        <div class="place-tips-title"><i class="ph ph-lightbulb"></i> 알아두면 좋은 팁</div>
        <ul class="place-tips">
          ${place.tips.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  content.innerHTML = `
    <div class="info-section-title"><i class="ph ph-map-pin"></i> 여행지 핵심 정보</div>
    ${placesHtml}
    ${tzHtml}
  `;
}
