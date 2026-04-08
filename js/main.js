document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitch();
    initCustomCursor();
    initScrollAnimations();
    initNavActive();
});

function initThemeSwitch() {
    const themeBtn = document.getElementById('themeToggle');
    const icon = themeBtn.querySelector('i');

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.replace('light-theme', 'dark-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        }
    });
}

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorGlow = document.querySelector('.cursor-glow');

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Hover scale effect on interactable elements
    const interactables = document.querySelectorAll('a, button, input, textarea');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover-active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover-active');
        });
    });

    // Hide default cursor completely if we have custom ones working cleanly
    // For better experience, we could set body { cursor: none; } 
    // but typically it's safer to leave fallback for some elements.
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Global UI Logic (Command Palette & Tabs)
document.addEventListener('DOMContentLoaded', () => {
    initCommandPalette();
    initTabs();
});

function initCommandPalette() {
    const cmdWrapper = document.getElementById('commandPalette');
    const cmdInput = document.getElementById('cmdInput');
    const cmdTriggers = document.querySelectorAll('.cmd-trigger');
    const cmdItems = document.querySelectorAll('.cmd-item');

    // Toggle Palette
    const togglePalette = () => {
        const isHidden = cmdWrapper.hasAttribute('hidden');
        if (isHidden) {
            cmdWrapper.removeAttribute('hidden');
            cmdInput.focus();
        } else {
            cmdWrapper.setAttribute('hidden', '');
            cmdInput.value = '';
            filterItems('');
        }
    };

    // Keyboard Shortcut (Cmd+K or Ctrl+K)
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            togglePalette();
        }
        if (e.key === 'Escape' && !cmdWrapper.hasAttribute('hidden')) {
            togglePalette();
        }
    });

    cmdTriggers.forEach(btn => btn.addEventListener('click', togglePalette));

    // Close on clicking outside
    cmdWrapper.addEventListener('click', (e) => {
        if (e.target === cmdWrapper) togglePalette();
    });

    // Filtering items
    const filterItems = (query) => {
        const lowerQuery = query.toLowerCase();
        cmdItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(lowerQuery)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    };

    cmdInput.addEventListener('input', (e) => filterItems(e.target.value));

    // Actions
    cmdItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            if (action === 'scroll') {
                const target = item.getAttribute('data-target');
                document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
            } else if (action === 'theme') {
                document.getElementById('themeToggle').click();
            } else if (action === 'resume') {
                document.getElementById('resumeBtn').click();
            } else if (action === 'cp-profile') {
                window.open('https://codolio.com/profile/Zulkar_Jahin', '_blank');
            }
            togglePalette();
        });
    });
}



function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => {
                p.style.display = 'none';
                p.classList.remove('active');
            });

            // Set clicked tab to active
            btn.classList.add('active');
            const target = document.getElementById('tab-' + btn.getAttribute('data-tab'));
            target.style.display = 'block';

            // Allow block render before animating opacity
            setTimeout(() => {
                target.classList.add('active');
            }, 10);
        });
    });
}


function initNavActive() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sectionToNav = {};
    sections.forEach(sec => {
        const id = sec.id;
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) sectionToNav[id] = link;
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = sectionToNav[id];
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { threshold: 0.5 });
    sections.forEach(sec => observer.observe(sec));
}

