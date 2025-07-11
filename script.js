// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Validate form data
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from Portfolio Website`);
    const mailtoLink = `mailto:dhruvsaxena132@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Email client opened! Please send the email to complete your message.', 'success');
    
    // Clear form after a short delay
    setTimeout(() => {
        contactForm.reset();
    }, 1000);
});

// Notification function
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    const backgroundColor = type === 'error' ? 
        'linear-gradient(135deg, #dc3545, #c82333)' : 
        'linear-gradient(135deg, #007bff, #0056b3)';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
        z-index: 1000;
        font-weight: 500;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
        font-family: inherit;
        line-height: 1.4;
    `;
    
    // Add CSS animation
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach((el) => {
    observer.observe(el);
});

// Add animations to project cards with staggered delay
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(card);
});

// Add animations to resume cards
document.querySelectorAll('.education-card, .skills-card').forEach((card, index) => {
    card.classList.add('slide-in-left');
    if (index % 2 === 1) {
        card.classList.remove('slide-in-left');
        card.classList.add('slide-in-right');
    }
    card.style.transitionDelay = `${index * 0.3}s`;
    observer.observe(card);
});

// Add scroll-based navbar styling
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Project Slider Functionality
const projectCards = document.querySelector('.project-cards');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentPosition = 0;
const cardWidth = 100; // percentage

function updateSliderPosition() {
    projectCards.style.transform = `translateX(${currentPosition}%)`;
}

nextBtn.addEventListener('click', () => {
    const totalCards = document.querySelectorAll('.project-card').length;
    if (Math.abs(currentPosition) < (totalCards - 1) * cardWidth) {
        currentPosition -= cardWidth;
        updateSliderPosition();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPosition < 0) {
        currentPosition += cardWidth;
        updateSliderPosition();
    }
});