import { tourInfo, scheduleData, placesInfo, prepData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initQuickInfo();
  initTimezone();
  initPrepSection();
  initTimeline();
  initStickyTabs();
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

function initTimezone() {
  const container = document.getElementById('timezoneContent');
  if (!container) return;
  container.innerHTML = `
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
  `;
}

// 3. 여행 준비 정보 섹션
function initPrepSection() {
  const tabBtns = document.querySelectorAll('.prep-tab');
  const content = document.getElementById('prepContent');

  const renders = { costs: renderExtraCosts, weather: renderWeather, packing: renderPacking, tips: renderChinaTips, phrases: renderPhrases };
  renders.costs(content);

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renders[btn.dataset.prep](content);
    });
  });
}

function renderExtraCosts(el) {
  el.innerHTML = `
    <div class="cost-notice">
      <i class="ph ph-warning"></i> 아래 비용은 여행 상품가에 <strong>포함되지 않습니다.</strong>
    </div>
    ${prepData.extraCosts.map(c => `
      <div class="cost-card ${c.type}">
        <div class="cost-icon-wrap"><i class="ph ${c.icon}"></i></div>
        <div class="cost-body">
          <div class="cost-title">${c.title} ${c.type === 'required' ? '<span class="cost-badge required">필수</span>' : '<span class="cost-badge optional">자율</span>'}</div>
          <div class="cost-when"><i class="ph ph-clock"></i> ${c.when}</div>
          <div class="cost-note">${c.note}</div>
        </div>
      </div>
    `).join('')}
  `;
}

function renderWeather(el) {
  el.innerHTML = `
    <div class="weather-grid">
      ${prepData.weather.map(w => `
        <div class="weather-item">
          <i class="ph ${w.icon}"></i>
          <div>
            <div class="w-label">${w.label}</div>
            <div class="w-value">${w.value}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderPacking(el) {
  const key = (cat, i) => `taihang-pack-${cat}-${i}`;
  const totalItems = prepData.packing.reduce((s, c) => s + c.items.length, 0);
  const checkedCount = () => prepData.packing.reduce((s, c) => s + c.items.filter((_, i) => localStorage.getItem(key(c.category, i)) === '1').length, 0);

  const render = () => {
    const done = checkedCount();
    el.innerHTML = `
      <div class="pack-progress">
        <span>${done}/${totalItems} 준비 완료</span>
        <div class="pack-bar"><div class="pack-bar-fill" style="width:${Math.round(done/totalItems*100)}%"></div></div>
      </div>
      ${prepData.packing.map(cat => `
        <div class="pack-category">
          <div class="pack-cat-title">${cat.emoji} ${cat.category}</div>
          <ul class="pack-list">
            ${cat.items.map((item, i) => {
              const checked = localStorage.getItem(key(cat.category, i)) === '1';
              return `<li><label class="pack-item${checked ? ' done' : ''}">
                <input type="checkbox" data-key="${key(cat.category, i)}"${checked ? ' checked' : ''}> ${item}
              </label></li>`;
            }).join('')}
          </ul>
        </div>
      `).join('')}
    `;
    el.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        localStorage.setItem(cb.dataset.key, cb.checked ? '1' : '0');
        cb.closest('label').classList.toggle('done', cb.checked);
        render();
      });
    });
  };
  render();
}

function renderChinaTips(el) {
  el.innerHTML = prepData.chinaTips.map(tip => `
    <div class="china-tip-card">
      <div class="tip-icon-wrap"><i class="ph ${tip.icon}"></i></div>
      <div class="tip-body">
        <div class="tip-title">${tip.title}</div>
        <div class="tip-desc">${tip.desc.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
  `).join('');
}

function renderPhrases(el) {
  const situations = [...new Set(prepData.phrases.map(p => p.situation))];
  el.innerHTML = `
    <div class="phrase-note"><i class="ph ph-copy"></i> 중국어를 탭하면 클립보드에 복사됩니다</div>
    ${situations.map(sit => `
      <div class="phrase-group">
        <div class="phrase-sit-badge">${sit}</div>
        ${prepData.phrases.filter(p => p.situation === sit).map(p => `
          <div class="phrase-row">
            <div class="phrase-ko">${p.ko}</div>
            <div class="phrase-right">
              <div class="phrase-zh" data-copy="${p.zh}">${p.zh}</div>
              <div class="phrase-pinyin">${p.pinyin}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `).join('')}
  `;
  el.querySelectorAll('.phrase-zh').forEach(el => {
    el.addEventListener('click', () => {
      navigator.clipboard.writeText(el.dataset.copy).then(() => {
        el.classList.add('copied');
        setTimeout(() => el.classList.remove('copied'), 1200);
      });
    });
  });
}

// 4. Timeline Rendering
const typeIcons = {
  flight: 'ph-airplane-tilt',
  bus: 'ph-bus',
  meal: 'ph-fork-knife',
  hotel: 'ph-bed',
  sightseeing: 'ph-binoculars'
};

function initTimeline() {
  const container = document.getElementById('timelineContainer');
  let html = '';

  scheduleData.forEach((dayData, index) => {
    const isOpen = index < 2 ? 'open' : '';

    let itemsHtml = dayData.items.map(item => {
      const icon = typeIcons[item.type] || 'ph-circle';
      const place = item.type === 'sightseeing'
        ? placesInfo.find(p => item.title.includes(p.name))
        : null;

      const placeHtml = place ? `
        <div class="place-photo-strip">
          ${place.images.map(src => `<img src="${src}" alt="${place.name}" loading="lazy">`).join('')}
        </div>
        <button class="place-tips-btn" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('hidden')">
          <i class="ph ph-lightbulb"></i> 꿀팁 &amp; 알아두기 <i class="ph ph-caret-down"></i>
        </button>
        <div class="place-tips-body hidden">
          <div class="inline-section-title">알아두면 좋은 팁</div>
          <ul class="inline-tips">
            ${place.tips.map(t => `<li>${t}</li>`).join('')}
          </ul>
          <div class="inline-section-title" style="margin-top:10px">미리 알면 재미있는 사실 ★</div>
          <ul class="inline-tips facts">
            ${place.funFacts.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>
      ` : '';

      return `
      <div class="timeline-item type-${item.type}">
        <div class="time-badge">${item.time}</div>
        <div class="item-content">
          <div class="item-title"><i class="ph ${icon} type-icon"></i>${item.title}</div>
          ${item.desc ? `<div class="item-desc">${item.desc.replace(/\n/g, '<br>')}</div>` : ''}
          ${placeHtml}
        </div>
      </div>
    `;
    }).join('');

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

// 5. Sticky Tabs
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

