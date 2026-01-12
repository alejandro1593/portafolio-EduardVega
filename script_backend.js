document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const contactForm = document.getElementById('contactForm');
    const counters = document.querySelectorAll('.counter');
    const skillBars = document.querySelectorAll('.skill-progress');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 39, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.1)';
        }
    });

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';

            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    const typingText = document.getElementById('typing');
    const phrases = [
        '<span class="code-keyword">const</span> <span class="code-var">developer</span> <span class="code-operator">=</span> <span class="code-string">"Backend Developer"</span>;',
        '<span class="code-keyword">const</span> <span class="code-var">stack</span> <span class="code-operator">=</span> [<span class="code-string">"Node.js"</span>, <span class="code-string">"Express"</span>, <span class="code-string">"Docker"</span>];',
        '<span class="code-keyword">const</span> <span class="code-var">passion</span> <span class="code-operator">=</span> <span class="code-boolean">true</span>;',
        '<span class="code-keyword">function</span> <span class="code-func">createAmazingCode</span>() { <span class="code-keyword">return</span> <span class="code-string">"🚀"</span>; }'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.innerHTML = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            typingText.innerHTML = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 50;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                if (entry.target.querySelector('.skill-progress')) {
                    entry.target.querySelectorAll('.skill-progress').forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        bar.style.width = progress + '%';
                    });
                }

                if (entry.target.querySelector('.counter')) {
                    entry.target.querySelectorAll('.counter').forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        animateCounter(counter, target);
                    });
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .skill-category, .project-card, .stat-card').forEach(el => {
        observer.observe(el);
    });

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }

    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillObserver.observe(item);
    });

    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                    projectObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        projectObserver.observe(card);
    });

    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, index * 100);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statObserver.observe(card);
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            return;
        }

        showNotification('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
        this.reset();
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const bgColor = type === 'success' ? 'rgba(0, 255, 136, 0.9)' : 'rgba(255, 85, 85, 0.9)';
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            color: #fff;
            font-weight: 600;
            z-index: 9999;
            animation: slideIn 0.5s ease, slideOut 0.5s ease 4.5s forwards;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            background: ${bgColor};
            font-family: 'Fira Code', monospace;
            border: 1px solid ${type === 'success' ? 'rgba(0, 255, 136, 0.5)' : 'rgba(255, 85, 85, 0.5)'};
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
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

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                pointer-events: none;
                width: 100px;
                height: 100px;
                transform: translate(-50%, -50%) scale(0);
                animation: rippleEffect 0.6s ease-out;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    document.querySelectorAll('.glitch').forEach(glitch => {
        glitch.addEventListener('mouseover', function() {
            this.style.animation = 'glitch-1 0.3s infinite linear alternate-reverse';
        });
        
        glitch.addEventListener('mouseout', function() {
            this.style.animation = '';
        });
    });

    const binaryBackground = document.querySelector('.binary-background');
    if (binaryBackground) {
        for (let i = 0; i < 20; i++) {
            const binaryText = document.createElement('div');
            binaryText.className = 'binary-floating';
            binaryText.textContent = Math.random() > 0.5 ? '01001' : '10110';
            binaryText.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 15 + 10}px;
                color: rgba(0, 255, 136, ${Math.random() * 0.1 + 0.05});
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatBinary ${Math.random() * 15 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
            `;
            binaryBackground.appendChild(binaryText);
        }
    }

    const codeRain = document.querySelector('.code-rain');
    if (codeRain) {
        const chars = '{ } [ ] ( ) < > ; : = + - * / % & | ^ ~ ! ?';
        for (let i = 0; i < 50; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const rainDrop = document.createElement('div');
            rainDrop.className = 'rain-char';
            rainDrop.textContent = char;
            rainDrop.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 12 + 8}px;
                color: rgba(0, 255, 136, ${Math.random() * 0.15 + 0.05});
                left: ${Math.random() * 100}%;
                top: -50px;
                animation: rainFall ${Math.random() * 10 + 5}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
                font-family: 'Fira Code', monospace;
            `;
            codeRain.appendChild(rainDrop);
        }
    }

    let lastScrollTop = 0;
    let scrollTimeout;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        clearTimeout(scrollTimeout);
        
        document.body.classList.add('is-scrolling');
        
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
        }, 100);
        
        lastScrollTop = scrollTop;
    });

    const parallaxElements = document.querySelectorAll('.hero-title, .project-card');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.classList.contains('hero-title') ? 0.3 : 0.1;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    document.querySelectorAll('.code-panel, .code-block, .project-code').forEach(codeBlock => {
        codeBlock.addEventListener('click', function() {
            const code = this.textContent;
            navigator.clipboard.writeText(code).then(() => {
                showNotification('Código copiado al portapapeles', 'success');
            }).catch(() => {
                showNotification('No se pudo copiar el código', 'error');
            });
        });
        
        codeBlock.style.cursor = 'pointer';
        codeBlock.title = 'Click para copiar código';
    });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const particles = [];
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'hero-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: ${Math.random() > 0.5 ? 'rgba(0, 255, 136, 0.3)' : 'rgba(0, 212, 255, 0.3)'};
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 10 + 5}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            heroSection.appendChild(particle);
            particles.push(particle);
        }
    }

    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translateY(0) scale(1);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-20px) scale(1.2);
                opacity: 0.6;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const activeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('section').forEach(section => {
        activeSectionObserver.observe(section);
    });

    console.log('%c🚀 Backend Developer Portfolio', 'color: #00ff88; font-size: 20px; font-weight: bold; font-family: monospace;');
    console.log('%cconst developer = "Eduardo Alejandro Vega Díaz";', 'color: #00d4ff; font-size: 14px; font-family: monospace;');
    console.log('%cconsole.log("¡Gracias por visitar mi portafolio!");', 'color: #bd93f9; font-size: 14px; font-family: monospace;');
});