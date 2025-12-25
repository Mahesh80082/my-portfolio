// Custom Cursor
const cursorDot = document.querySelector("#cursor-dot");
const cursorOutline = document.querySelector("#cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add a slight delay to the outline for a fluid effect
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Theme Controller
class ThemeController {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.body = document.body;
        this.icon = this.themeToggle.querySelector('i');

        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);

        this.themeToggle.addEventListener('click', () => {
            const currentTheme = this.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
        });
    }

    setTheme(theme) {
        this.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (theme === 'light') {
            this.icon.classList.remove('fa-moon');
            this.icon.classList.add('fa-sun');
        } else {
            this.icon.classList.remove('fa-sun');
            this.icon.classList.add('fa-moon');
        }
    }
}

// Typing Effect
const animateText = () => {
    const element = document.querySelector('.hero-title');
    if (!element) return;

    const originalHTML = element.innerHTML;
    const textContent = element.textContent.trim(); // "Building digital experiences that matter."

    // For this premium feel, let's just type the subtitle "Full Stack Developer" instead to avoid breaking the complex H1 structure.

    const subtitle = document.querySelector('.hero-subtitle');
    const text = "Full Stack Developer";
    subtitle.textContent = "";
    subtitle.classList.add('typing-cursor');

    let i = 0;
    const type = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                subtitle.classList.remove('typing-cursor');
            }, 1000);
        }
    };

    // Start typing after a small delay
    setTimeout(type, 500);
};

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navList.classList.toggle("active");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navList.classList.remove("active");
    });
});

// Scroll Animations (Intersection Observer)
const observerOptions = {
    threshold: 0.2, // Trigger when 20% of element is visible
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Add fade-in class to elements we want to animate
const animatedElements = document.querySelectorAll('.hero-content, .hero-visual, .section-title, .project-card, .about-content, .contact-container');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

const navObserverOptions = {
    threshold: 0.3 // Trigger when 30% of section is visible
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove active class from all links
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, navObserverOptions);

sections.forEach(section => {
    navObserver.observe(section);
});

// Add css class for the animation states
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .in-view {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(styleSheet);

// Dynamic Footer & Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme
    new ThemeController();

    // Start Typing Effect
    animateText();

    // Set Footer Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Enhance Contact Form
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Message Sent!';
            btn.style.backgroundColor = '#22c55e'; // Green success color directly
            btn.style.borderColor = '#22c55e';

            form.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
            }, 3000);
        });
    }
});
