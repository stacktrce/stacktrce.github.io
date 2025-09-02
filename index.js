// Portfolio JavaScript - Modern Interactions & Effects

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCustomCursor();
    initializeScrollEffects();
    initializeIntersectionObserver();
    initializeSmoothScrolling();
    initializeTypingEffect();
    initializeParticleBackground();
    initializeContactFormInteractions();
});

// Custom Cursor with Trail Effect
function initializeCustomCursor() {
    // Only initialize on non-touch devices
    if ('ontouchstart' in window) return;
    
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    
    const trailArray = [];
    const maxTrails = 15;
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trail effect
        createTrail(e.clientX, e.clientY);
    });
    
    // Create trail particles
    function createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x - 3 + 'px';
        trail.style.top = y - 3 + 'px';
        
        document.body.appendChild(trail);
        trailArray.push(trail);
        
        // Remove old trails
        if (trailArray.length > maxTrails) {
            const oldTrail = trailArray.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.remove();
            }
        }
        
        // Auto remove after animation
        setTimeout(() => {
            if (trail && trail.parentNode) {
                trail.remove();
                const index = trailArray.indexOf(trail);
                if (index > -1) {
                    trailArray.splice(index, 1);
                }
            }
        }, 800);
    }
    
    // Smooth cursor movement
    function animateCursor() {
        // Cursor follows with slight delay
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        // Dot follows with less delay
        dotX += (mouseX - dotX) * 0.8;
        dotY += (mouseY - dotY) * 0.8;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        cursorDot.style.left = dotX - 4 + 'px';
        cursorDot.style.top = dotY - 4 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });
    
    // Special effects for different sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.addEventListener('mouseenter', () => {
            const hue = (index * 60) % 360;
            cursor.style.filter = `hue-rotate(${hue}deg)`;
        });
        
        section.addEventListener('mouseleave', () => {
            cursor.style.filter = 'none';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

// Hide/Show Header on Scroll
function initializeScrollEffects() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    let scrollTimeout;

    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down & past threshold
                header.style.transform = 'translateY(-100%)';
                header.style.opacity = '0';
            } else if (scrollTop < lastScrollTop) {
                // Scrolling up
                header.style.transform = 'translateY(0)';
                header.style.opacity = '1';
            }
            
            lastScrollTop = scrollTop;
        }, 10); // Small delay for smoother performance
    }, { passive: true });
}

// Intersection Observer for Animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for list items
                const listItems = entry.target.querySelectorAll('li');
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Observe list items for staggered animation
    const listItems = document.querySelectorAll('li');
    listItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
}

// Smooth Scrolling for Links
function initializeSmoothScrolling() {
    // Add smooth scrolling to internal links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Account for header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing Effect for Header
function initializeTypingEffect() {
    const subtitle = document.querySelector('header p');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    
    let index = 0;
    const typingSpeed = 100;
    const startDelay = 1500;
    
    setTimeout(() => {
        function typeChar() {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, typingSpeed);
            } else {
                // Add blinking cursor effect
                const cursor = document.createElement('span');
                cursor.textContent = '|';
                cursor.style.animation = 'blink 1s infinite';
                subtitle.appendChild(cursor);
                
                // Remove cursor after 3 seconds
                setTimeout(() => {
                    if (cursor.parentNode) {
                        cursor.remove();
                    }
                }, 3000);
            }
        }
        typeChar();
    }, startDelay);
}

// Particle Background Effect
function initializeParticleBackground() {
    const particleContainer = document.createElement('div');
    particleContainer.classList.add('particles');
    document.body.appendChild(particleContainer);
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    particle.style.cssText = `
        position: fixed;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(96, 165, 250, ${Math.random() * 0.5 + 0.1});
        border-radius: 50%;
        left: ${startX}px;
        top: ${startY}px;
        pointer-events: none;
        z-index: -1;
        animation: float ${Math.random() * 20 + 10}s linear infinite;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, (Math.random() * 20 + 10) * 1000);
}

// Enhanced Contact Interactions
function initializeContactFormInteractions() {
    const contactLinks = document.querySelectorAll('#contact a');
    
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
            this.style.textShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            
            // Special cursor effect for contact links
            const cursor = document.querySelector('.cursor');
            if (cursor) {
                cursor.style.background = 'linear-gradient(45deg, #34d399, #10b981)';
                cursor.style.boxShadow = '0 0 30px rgba(52, 211, 153, 0.7)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
            
            // Reset cursor
            const cursor = document.querySelector('.cursor');
            if (cursor) {
                cursor.style.background = '';
                cursor.style.boxShadow = '';
            }
        });
        
        link.addEventListener('click', function(e) {
            // Add ripple effect
            createRippleEffect(e, this);
            
            // Create cursor explosion effect
            createCursorExplosion(e);
        });
    });
}

// Cursor explosion effect
function createCursorExplosion(event) {
    const colors = ['#60a5fa', '#a78bfa', '#f472b6', '#fbbf24', '#34d399'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${colors[i % colors.length]};
            border-radius: 50%;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
            pointer-events: none;
            z-index: 9999;
            animation: explode 0.6s ease-out forwards;
        `;
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        
        particle.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 600);
    }
}

// Ripple Effect
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Project Links Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const projectLinks = document.querySelectorAll('#projekte a');
    
    projectLinks.forEach(link => {
        // Add external link indicator
        if (link.href.includes('github.com')) {
            const icon = document.createElement('span');
            icon.innerHTML = ' 🔗';
            icon.style.fontSize = '0.8em';
            icon.style.opacity = '0.7';
            link.appendChild(icon);
        }
        
        // Add hover effect with preview
        link.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(96, 165, 250, 0.1)';
            this.style.padding = '2px 6px';
            this.style.borderRadius = '4px';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
            this.style.padding = '0';
        });
    });
});

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konamiSequence.toString()) {
        // Easter egg activated
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        window.alert('Ich versuche, deinen Verstand zu befreien, Neo. Aber ich kann dir nur die Tür zeigen. Hindurchgehen musst du alleine. 🧿');
        konamiCode = [];
    }
});