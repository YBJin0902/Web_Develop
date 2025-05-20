const days = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];

const today = new Date().getDay();
const orderedDays = Array.from({ length: 7 }, (_, i) => (today + i) % 7);

document.querySelectorAll('.day-column').forEach(column => {
  const day = Number(column.dataset.day);
  const index = orderedDays.indexOf(day); // 排在第幾
  column.style.order = index;
});

const events = [
  // 1
  { day: 1, title: '會議', detail: '碩士每周會議', start: 10, end: 11 },
  { day: 1, title: '課程', detail: '多媒體', start: 14, end: 16 },
  { day: 1, title: '會議', detail: '車頭燈\r\n田宜自主會議', start: 19, end: 21 },

  // 2
  { day: 2, title: '課程', detail: '專題研討', start: 13, end: 15 },
  { day: 2, title: '會議', detail: '實驗室每周\r\n會議', start: 18, end: 21 },

  // 3
  { day: 3, title: '課程', detail: '職涯分析', start: 10, end: 12 },
  { day: 3, title: '助教', detail: '微處理機實習', start: 13, end: 16 },
  { day: 3, title: '會議', detail: '漢翔計畫', start: 14, end: 15 },
  { day: 3, title: '會議', detail: '田宜車載計畫', start: 16, end: 17 },
  { day: 3, title: '會議', detail: '搖搖椅', start: 19, end: 20 },

  // 4
  { day: 4, title: '課程', detail: '專題研討', start: 14, end: 16 },
  { day: 4, title: '教課', detail: 'USBLB\r\n知識', start: 18, end: 21 },

  // 5
  { day: 5, title: '課程', detail: '無線網路', start: 13, end: 16 },

  // 6
  { day: 6, title: '研究', detail: '計畫研究\r\n自主研究', start: 0, end: 24 },

  // 7
  { day: 0, title: '研究', detail: '計畫研究\r\n自主研究', start: 0, end: 24 },
];

function renderSchedule() {
  const grid = document.getElementById('weekGrid');

  if (window.innerWidth < 768) {
    // 手機版
    const orderedDays = Array.from({ length: 7 }, (_, i) => (today + i) % 7);

    orderedDays.forEach(day => {
      const column = document.createElement('div');
      column.className = 'day-column';
      column.dataset.day = day;
      if (day === today) column.classList.add('today');

      const title = document.createElement('div');
      title.className = 'day-title';
      title.innerText = days[day];

      column.appendChild(title);
      grid.appendChild(column);
    });

  } else {
    // 桌面版
    for (let i = 0; i < 7; i++) {
      const column = document.createElement('div');
      column.className = 'day-column';
      column.dataset.day = i;
      if (i === today) column.classList.add('today');

      const title = document.createElement('div');
      title.className = 'day-title';
      title.innerText = days[i];

      column.appendChild(title);
      grid.appendChild(column);
    }
  }

  events.sort((a, b) => a.start - b.start);

  events.forEach(event => {
    const column = document.querySelector(`.day-column[data-day="${event.day}"]`);
    if (!column) return;

    const eventBox = document.createElement('div');
    eventBox.className = 'event';
    eventBox.innerText = `${event.start}:00-${event.end}:00 \r\n ${event.title}`;

    const duration = event.end - event.start;
    eventBox.style.height = `${40 + duration * 10}px`;

    eventBox.addEventListener('click', () => {
      const existing = eventBox.nextElementSibling;
      if (existing && existing.classList.contains('event-detail')) {
        existing.remove();
        return;
      }

      const detailBox = document.createElement('div');
      detailBox.className = 'event-detail';
      detailBox.innerText = event.detail;
      detailBox.animate([
        { opacity: 0, transform: 'translateY(-20px) scale(0.95)', boxShadow: '0 0 0 rgba(0,0,0,0)' },
        { opacity: 1, transform: 'translateY(0) scale(1)', boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }
      ], {
        duration: 450,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
      });

      column.insertBefore(detailBox, eventBox.nextSibling);
    });

    column.appendChild(eventBox);
  });
}

document.addEventListener('DOMContentLoaded', renderSchedule);