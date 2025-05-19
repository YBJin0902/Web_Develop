function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
  const content = document.querySelector('.right-panel');
  if (content) {
    content.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  lightboxImg.src = src;
  lightbox.classList.add("show");
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("show");
}


function toggleFloatingMenu() {
  document.getElementById('fabButtons').classList.toggle('show');
}

document.getElementById("discordForm").addEventListener("submit", async function (e) {
  const message = document.getElementById("userMessage").value;
  const status = document.getElementById("formStatus");

  const response = await fetch("/send-discord", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  if (response.ok) {
    status.innerText = "✅ 留言已送出";
    document.getElementById("discordForm").reset();
  } else {
    const errText = await response.text();
    console.error("❌ Discord 回傳錯誤：", errText);
    status.innerText = "❌ 發送失敗：" + errText;
  }

});

document.addEventListener("DOMContentLoaded", function () {
  const MyCalendar = toastui.Calendar;

  const calendar = new MyCalendar('#calendar', {
    defaultView: 'week',
    taskView: false,
    scheduleView: ['time'],
    useCreationPopup: false,
    useDetailPopup: true,
    week: {
      startDayOfWeek: 1
    },
    calendars: [{ id: 'my', name: '我的行程', color: '#ffffff', bgColor: '#0077cc' }]
  });

  calendar.createSchedules([
    {
      id: '1',
      calendarId: 'my',
      title: '會議',
      category: 'time',
      start: '2025-05-19T09:00:00',
      end: '2025-05-19T10:00:00'
    },
    {
      id: '2',
      calendarId: 'my',
      title: '專題',
      category: 'time',
      start: '2025-05-20T14:00:00',
      end: '2025-05-20T16:00:00'
    }
  ]);
});