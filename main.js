// =======================
// Initialize AOS
// =======================
if (window.AOS) {
  AOS.init({
    duration: 700,
    offset: 90,
    once: true,
    easing: 'ease-out-cubic'
  });
}

// =======================
// DOM Elements
// =======================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const themeSwitch = document.getElementById('theme-switch');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const progressBar = document.querySelector('.scroll-progress');
const header = document.getElementById('header');

// =======================
// Mobile Menu
// =======================
function closeMobileMenu() {
  mobileMenuBtn.classList.remove('active');
  navLinks.classList.remove('active');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('active') &&
      !navLinks.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });
}

// =======================
// Theme Toggle
// =======================
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeSwitch) themeSwitch.checked = theme === 'dark';
}

if (themeSwitch) {
  themeSwitch.addEventListener('change', () => {
    const theme = themeSwitch.checked ? 'dark' : 'light';
    setTheme(theme);
    localStorage.setItem('theme', theme);
  });

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
}

// =======================
// Scroll & Back To Top
// =======================
window.addEventListener('scroll', () => {
  if (progressBar) {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const width = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${width}%`;
  }

  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }

  if (backToTop) {
    const visible = window.scrollY > 500;
    backToTop.style.opacity = visible ? '1' : '0';
    backToTop.style.visibility = visible ? 'visible' : 'hidden';
  }
}, { passive: true });

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

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

if (typedTextSpan) {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 800);
  });
}

// =======================
// Skill Progress
// =======================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillProgressBars.forEach(bar => {
        bar.style.width = `${bar.dataset.width}%`;
      });
      observer.disconnect();
    }
  });
}, { threshold: 0.3 });

const aboutSection = document.querySelector('#about');
if (aboutSection) observer.observe(aboutSection);

// =======================
// CONTACT FORM
// =======================
if (contactForm) {
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
}

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
