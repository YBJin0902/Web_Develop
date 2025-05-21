function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
  const content = document.querySelector('.right-panel');
  if (content) {
    content.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (window.innerWidth < 768) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500); // 自動隱藏
}

document.getElementById("discordForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const messageInput = document.getElementById("userMessage");
  const status = document.getElementById("formStatus");

  const message = messageInput.value.trim();
  if (message === "") {
    showToast("⚠️ 請輸入留言內容！");
    return;
  }

  try {
    const response = await fetch("/send-discord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (response.ok) {
      // ✅ 顯示成功通知
      showToast("✅ 留言已送出！");
      messageInput.value = ""; // ✅ 清除輸入框
      status.innerText = "";
    } else {
      const errText = await response.text();
      console.error("❌ Discord 回傳錯誤：", errText);
      showToast("❌ 發送失敗：" + errText);
    }
  } catch (err) {
    console.error("❌ 發送錯誤：", err);
    //alert("❌ 發送錯誤，請確認網路或伺服器連線");
  }
});

