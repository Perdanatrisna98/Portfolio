// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true,
    easing: 'ease-out-cubic'
});

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const themeSwitch = document.getElementById('theme-switch');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    
    cursorOutline.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
    }, { duration: 300, fill: 'forwards' });
});

// Interactive cursor effects
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

// Hover effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.width = '16px';
        cursorDot.style.height = '16px';
        cursorDot.style.background = 'var(--primary)';
        cursorOutline.style.borderColor = 'var(--primary)';
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorDot.style.background = 'var(--primary)';
        cursorOutline.style.borderColor = 'var(--primary)';
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
    });
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Theme Toggle
themeSwitch.addEventListener('change', () => {
    document.documentElement.setAttribute('data-theme', 
        themeSwitch.checked ? 'dark' : 'light'
    );
    localStorage.setItem('theme', themeSwitch.checked ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeSwitch.checked = savedTheme === 'dark';
}

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
    
    // Header scroll effect
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

// Back to top
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing Effect
const typedTextSpan = document.querySelector('.typed-text');
const textArray = ['Pelajar SMK RPL', 'Web Developer Pemula', 'UI/UX Learner', 'Tech Enthusiast'];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1500;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Skill Progress Bars Animation
function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = `${width}%`;
    });
}

// Intersection Observer for skill bars
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
        }
    });
}, observerOptions);

const aboutSection = document.querySelector('#about');
if (aboutSection) observer.observe(aboutSection);

// Add animation for floating elements
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--primary);
            border-radius: 50%;
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${posX}%;
            top: ${posY}%;
            animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Add particle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
        }
        75% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Add hover effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate hero elements - GUNAKAN SELECTOR YANG LEBIH SPESIFIK
gsap.from('.hero-subtitle, .hero-name, .hero-role', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out'
});

// Animate floating cards
gsap.to('.floating-card', {
    y: -20,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    stagger: 0.5
});

// Scroll animations
document.querySelectorAll('section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form
async function sendToTelegram(data) {
    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzETmKAuKWAsq9-1dBVFBku3cSYsI1_Rrj_P8pHK8UDsASF5efc45U5Sz1WLWwQkvOo/exec",
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        }
    );

    return await response.json();
}

document.getElementById('contactForm').addEventListener('submit', async function(e) {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showError('Format email tidak valid!');
        return;
    }

    try {
        const result = await sendToTelegram(formData);

        if (result.success) {
            showSuccessMessage(formData.name, formData.email);

            contactForm.reset();

            saveToLocalStorage(formData);
        } else {
            showError(result.message);
        } 
    } catch (error) {
        showError('Terjadi kesalahan: ' + error.message);
    }
});

function showSuccessMessage(name, email) {
    const formContainer = document.querySelector('.contact-form');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>Pesan Terkirim!</h3>
        <p>Terima kasih ${name}! Saya akan membalas pesan Anda ke ${email} dalam waktu 24 jam.</p>
        <p class="telegram-info"><i class="fab fa-telegram"></i> Pesan juga telah dikirim ke Telegram bot.</p>
        <button class="btn btn-primary" onclick="location.reload()">Kirim Pesan Lain</button>
    `;

    successMessage.style.cssText = `
        text-align: center;
        padding: 40px;
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(99, 102, 241, 0.1))
        border-radius: var(--radius);
        margin-top: 20px;
        animation: fadeIn 0.5s ease;
    `;

    successMessage.querySelector('.success-icon').style.cssText = `
        font-size: 4rem;
        color: var(--secondary);
        margin-bottom: 20px
    `;

    contactForm.style.display = 'none';
    formContainer.appendChild(successMessage);
}

function showError(message) {
    const oldError = document.querySelector('.error-message');
    if (oldError) oldError.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-icon">
            <i class="fas fa-exclamation-circle"></i>
        </div>
        <p>${message}</p>
    `;

    errorDiv.style.cssText = `
        text-align: center;
        padding: 15px;
        background: rgba(239, 68, 68, 0.1);
        border-left: 4px solid #ef4444;
        border-radius: var(--radius);
        margin-bottom: 20px;
        color: #ef4444;
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(errorDiv, form);

    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

function saveToLocalStorage(data) {
    try {
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('contactMessages', JSON.stringify(messages.slice(-50)));
    } catch (error) {
        console.error('Gagal menyimpan ke localStorage: ', error);
    }
}