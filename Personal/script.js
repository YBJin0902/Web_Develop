function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
  const content = document.querySelector('.right-panel');
  if (content) {
    content.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function toggleFloatingMenu() {
  document.getElementById('fabButtons').classList.toggle('show');
}
