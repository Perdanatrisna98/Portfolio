// Init AOS
AOS.init({
    duration: 800,
    offset: 100,
    onc: true,
    easing: 'ease-in-out'
});

// Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Header Scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.screenY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get Form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    alert(`Terima kasih ${name}! Pesan Anda "${subject}" telah berhasil dikirim. Saya akan memabalas pesan Anda ke "${email} dalam waktu 24 jam."`)
    
    // Reset
    contactForm.reset();
});

// Hover effect to project cards 
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY0px)';
    });
});