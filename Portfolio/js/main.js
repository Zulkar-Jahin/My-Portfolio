// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Change icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                // Reset icon to bars
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // ============================================
    // Smooth Scrolling for Navigation Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // Active Navigation Link on Scroll
    // ============================================
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            
            if (window.scrollY >= (sectionTop - headerHeight - 100)) {
                currentSectionId = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial call and on scroll
    highlightActiveNavLink();
    window.addEventListener('scroll', highlightActiveNavLink);
    
    // ============================================
    // Back to Top Button
    // ============================================
    const backToTopButton = document.getElementById('backToTop');
    
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    }
    
    // Initial check
    toggleBackToTopButton();
    window.addEventListener('scroll', toggleBackToTopButton);
    
    // Scroll to top when clicked
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // Contact Form Handling
    // ============================================
    const contactForm = document.getElementById('messageForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show a success message
            showAlert('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Log form data to console (for demo)
            console.log('Form submitted:', { name, email, message });
        });
    }
    
    // Alert function
    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `custom-alert alert-${type}`;
        alert.innerHTML = `
            <span>${message}</span>
            <button class="alert-close">&times;</button>
        `;
        
        // Add to page
        document.body.appendChild(alert);
        
        // Show alert with animation
        setTimeout(() => {
            alert.classList.add('show');
        }, 5000);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.remove();
                }
            }, 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = alert.querySelector('.alert-close');
        closeBtn.addEventListener('click', function() {
            alert.classList.remove('show');
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.remove();
                }
            }, 300);
        });
    }
    
    // ============================================
    // Animate Skill Bars on Scroll
    // ============================================
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                const width = bar.style.width;
                bar.style.width = '0%';
                
                // Animate to the target width
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            }
        });
    }
    
    // Initial check and on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // ============================================
    // Project Card Hover Effects Enhancement
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // ============================================
    // Current Year in Footer
    // ============================================
    const yearSpan = document.querySelector('.footer-copyright');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = yearSpan.textContent.replace('2023', currentYear);
    }
    
    // ============================================
    // Typing Effect for Hero Text (Optional)
    // ============================================
    function initTypingEffect() {
        const heroDescription = document.querySelector('.hero-description');
        if (!heroDescription) return;
        
        const originalText = heroDescription.textContent;
        heroDescription.textContent = '';
        
        let i = 0;
        const typingSpeed = 30; // milliseconds per character
        
        function typeWriter() {
            if (i < originalText.length) {
                heroDescription.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // Start typing effect when hero section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heroDescription);
    }
    
    // Uncomment the line below to enable typing effect
    // initTypingEffect();
    
    // ============================================
    // Initialize everything
    // ============================================
    console.log('Portfolio website loaded successfully!');
});

// Add CSS for custom alerts (will be added via JS)
const style = document.createElement('style');
style.textContent = `
    .custom-alert {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        z-index: 9999;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .custom-alert.show {
        transform: translateX(0);
    }
    
    .alert-success {
        background-color: #10b981;
        border-left: 4px solid #059669;
    }
    
    .alert-error {
        background-color: #ef4444;
        border-left: 4px solid #dc2626;
    }
    
    .alert-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        margin-left: 15px;
        padding: 0;
        line-height: 1;
    }
    
    .alert-close:hover {
        opacity: 0.8;
    }
    
    @media (max-width: 768px) {
        .custom-alert {
            min-width: auto;
            max-width: 90%;
            left: 20px;
            right: 20px;
        }
    }
`;
document.head.appendChild(style);