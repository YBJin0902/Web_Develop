function showMessage() {
  document.getElementById('message').textContent = 'Hello! Thanks for clicking.';
}

// top-section 動畫縮小控制
window.addEventListener('scroll', function () {
  const topSection = document.querySelector('.top-section');
  if (window.scrollY > 100) {
    topSection.classList.add('shrink');
    document.body.classList.add('shrunk');
  } else {
    topSection.classList.remove('shrink');
    document.body.classList.remove('shrunk');
  }
});

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
