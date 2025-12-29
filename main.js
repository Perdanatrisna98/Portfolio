// =======================
// Initialize AOS
// =======================
AOS.init({
  duration: 800,
  offset: 100,
  once: true,
  easing: 'ease-out-cubic'
});

// =======================
// DOM Elements
// =======================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const themeSwitch = document.getElementById('theme-switch');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// =======================
// Custom Cursor
// =======================
document.addEventListener('mousemove', (e) => {
  cursorDot.style.left = `${e.clientX}px`;
  cursorDot.style.top = `${e.clientY}px`;

  cursorOutline.animate(
    { left: `${e.clientX}px`, top: `${e.clientY}px` },
    { duration: 300, fill: 'forwards' }
  );
});

document.addEventListener('mousedown', () => {
  cursorDot.style.width = '12px';
  cursorDot.style.height = '12px';
  cursorOutline.style.width = '60px';
  cursorOutline.style.height = '60px';
});

document.addEventListener('mouseup', () => {
  cursorDot.style.width = '8px';
  cursorDot.style.height = '8px';
  cursorOutline.style.width = '40px';
  cursorOutline.style.height = '40px';
});

// Hover effect
document.querySelectorAll('a, button, .project-card, .skill-category').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.style.width = '16px';
    cursorDot.style.height = '16px';
    cursorOutline.style.width = '60px';
    cursorOutline.style.height = '60px';
  });

  el.addEventListener('mouseleave', () => {
    cursorDot.style.width = '8px';
    cursorDot.style.height = '8px';
    cursorOutline.style.width = '40px';
    cursorOutline.style.height = '40px';
  });
});

// =======================
// Mobile Menu
// =======================
mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  navLinks.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// =======================
// Theme Toggle
// =======================
themeSwitch.addEventListener('change', () => {
  const theme = themeSwitch.checked ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeSwitch.checked = savedTheme === 'dark';
}

// =======================
// Scroll & Back To Top
// =======================
window.addEventListener('scroll', () => {
  const progressBar = document.querySelector('.scroll-progress');
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(window.scrollY / totalHeight) * 100}%`;

  document.getElementById('header')
    .classList.toggle('scrolled', window.scrollY > 50);

  backToTop.style.opacity = window.scrollY > 500 ? '1' : '0';
  backToTop.style.visibility = window.scrollY > 500 ? 'visible' : 'hidden';
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =======================
// Typing Effect
// =======================
const typedTextSpan = document.querySelector('.typed-text');
const textArray = ['Pelajar SMK RPL', 'Web Developer Pemula', 'UI/UX Learner', 'Tech Enthusiast'];
let textArrayIndex = 0, charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex][charIndex++];
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, --charIndex);
    setTimeout(erase, 50);
  } else {
    textArrayIndex = (textArrayIndex + 1) % textArray.length;
    setTimeout(type, 500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 1000);
});

// =======================
// Skill Progress
// =======================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillProgressBars.forEach(bar => {
        bar.style.width = `${bar.dataset.width}%`;
      });
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('#about');
if (aboutSection) observer.observe(aboutSection);

// =======================
// CONTACT FORM (AMAN)
// =======================
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    subject: document.getElementById('subject').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    showError('Harap lengkapi semua field!');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    showError('Format email tidak valid!');
    return;
  }

  try {
    const res = await fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      showSuccessMessage(formData.name, formData.email);
      contactForm.reset();
      saveToLocalStorage(formData);
    } else {
      showError('Gagal mengirim pesan');
    }
  } catch {
    showError('Terjadi kesalahan jaringan');
  }
});

// =======================
// UI Helpers
// =======================
function showSuccessMessage(name, email) {
  const container = contactForm.parentElement;
  contactForm.style.display = 'none';

  const div = document.createElement('div');
  div.className = 'success-message';
  div.innerHTML = `
    <h3>Pesan Terkirim ✅</h3>
    <p>Terima kasih ${name}! Saya akan membalas ke ${email}.</p>
    <button class="btn btn-primary" onclick="location.reload()">Kirim Lagi</button>
  `;
  container.appendChild(div);
}

function showError(message) {
  const old = document.querySelector('.error-message');
  if (old) old.remove();

  const div = document.createElement('div');
  div.className = 'error-message';
  div.textContent = message;
  contactForm.parentElement.insertBefore(div, contactForm);

  setTimeout(() => div.remove(), 5000);
}

function saveToLocalStorage(data) {
  const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  messages.push({ ...data, time: new Date().toISOString() });
  localStorage.setItem('contactMessages', JSON.stringify(messages.slice(-50)));
}
