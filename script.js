// ── 自定义光标 ──
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0, outX = 0, outY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

(function animateOutline() {
  outX += (mouseX - outX) * 0.12;
  outY += (mouseY - outY) * 0.12;
  outline.style.left = outX + 'px';
  outline.style.top  = outY + 'px';
  requestAnimationFrame(animateOutline);
})();

document.querySelectorAll('a, button, summary, .clay').forEach(el => {
  el.addEventListener('mouseenter', () => {
    outline.style.width  = '56px';
    outline.style.height = '56px';
    outline.style.opacity = '.8';
  });
  el.addEventListener('mouseleave', () => {
    outline.style.width  = '36px';
    outline.style.height = '36px';
    outline.style.opacity = '.5';
  });
});

// ── 导航滚动效果 ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ── 磁性按钮 ──
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    btn.style.transform = `translate(${x * .25}px, ${y * .25}px) translateY(-3px) scale(1.04)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ── 滚动入场动画 ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .showcase-card, .faq-item, .download-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.34,1.56,.64,1)';
  observer.observe(el);
});

// ── 年份 ──
document.querySelectorAll('#currentYear').forEach(el => el.textContent = new Date().getFullYear());
