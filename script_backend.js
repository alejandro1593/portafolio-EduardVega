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
            navbar.style.boxShadow = '0 2px 20px rgba(52, 211, 153, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(52, 211, 153, 0.1)';
        }
    });

    menuToggle.addEventListener('click', function() {
        const isOpen = navMenu.classList.toggle('active');
        this.classList.toggle('active', isOpen);
        this.setAttribute('aria-expanded', isOpen);
        this.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        
        const spans = this.querySelectorAll('span');
        if (isOpen) {
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
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menú');

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
        'const developer = "Backend Developer";',
        'const stack = ["Node.js", "Express", "Docker"];',
        'const passion = true;',
        'function createAmazingCode() { return "🚀"; }'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
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

                if (!entry.target.classList.contains('section')) return;

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

    contactForm.addEventListener('submit', async function(e) {
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

        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-text">Enviando...</span>';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.error || 'Error al enviar el mensaje');
            }

            showNotification(data.message || '¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
            this.reset();
        } catch (err) {
            showNotification(err.message || 'No se pudo enviar el mensaje. Intenta de nuevo.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const bgColor = type === 'success' ? 'rgba(52, 211, 153, 0.9)' : 'rgba(248, 113, 113, 0.9)';
        
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
            border: 1px solid ${type === 'success' ? 'rgba(52, 211, 153, 0.5)' : 'rgba(248, 113, 113, 0.5)'};
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
                color: rgba(52, 211, 153, ${Math.random() * 0.1 + 0.05});
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
                color: rgba(52, 211, 153, ${Math.random() * 0.15 + 0.05});
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

    const parallaxElements = document.querySelectorAll('.hero-title');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${scrolled * 0.3}px)`;
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
                background: ${Math.random() > 0.5 ? 'rgba(52, 211, 153, 0.3)' : 'rgba(96, 165, 250, 0.3)'};
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

    const activeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'true');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('section').forEach(section => {
        activeSectionObserver.observe(section);
    });

    const bootLoader = document.getElementById('bootLoader');
    if (bootLoader) {
        bootLoader.querySelectorAll('.boot-line').forEach((line, i) => {
            line.style.animationDelay = `${0.5 + i * 0.4}s`;
        });
        setTimeout(() => {
            bootLoader.classList.add('boot-hide');
            setTimeout(() => bootLoader.remove(), 900);
        }, 2900);
    }

    const themeToggle = document.getElementById('themeToggle');
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const iconCore = themeToggle.querySelector('.theme-icon');
        iconCore.textContent = theme === 'light' ? '☀️' : '🌙';
        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) themeColor.setAttribute('content', theme === 'light' ? '#f0f4f8' : '#0a0e27');
        localStorage.setItem('theme', theme);
    }
    setTheme(localStorage.getItem('theme') || 'dark');
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'light' ? 'dark' : 'light');
    });

    const I18N = {
        es: {
            'nav-inicio': '<span class="code-keyword">const</span> <span class="code-var">inicio</span>',
            'nav-sobre': '<span class="code-keyword">const</span> <span class="code-var">sobre_mi</span>',
            'nav-habilidades': '<span class="code-keyword">const</span> <span class="code-var">habilidades</span>',
            'nav-experiencia': '<span class="code-keyword">const</span> <span class="code-var">experiencia</span>',
            'nav-proyectos': '<span class="code-keyword">const</span> <span class="code-var">proyectos</span>',
            'nav-contacto': '<span class="code-keyword">const</span> <span class="code-var">contacto</span>',
            'hero-status': 'Disponible para proyectos',
            'btn-proyectos': '<span class="btn-code">&lt;</span><span class="btn-text">Ver Proyectos</span><span class="btn-code">/&gt;</span>',
            'btn-contacto': '<span class="btn-code">&lt;</span><span class="btn-text">Contactar</span><span class="btn-code">/&gt;</span>',
            'btn-cv': '<span class="cv-icon">⬇</span> Descargar CV',
            'hero-cv': 'Descargar CV',
            'sobre-comment': '// Sobre mí',
            'sobre-title': 'sobre_mi',
            'stat-anios': 'Años Exp.',
            'stat-commits': 'Commits',
            'stat-stars': 'Stars',
            'widget-github': '<span class="code-keyword">const</span> <span class="code-var">github</span> <span class="code-operator">=</span> <span class="code-string">"en vivo"</span>;',
            'habilidades-comment': '// Habilidades',
            'habilidades-title': 'habilidades',
            'cat-backend': 'Backend',
            'cat-bd': 'Bases de Datos',
            'cat-devops': 'DevOps',
            'cat-herramientas': 'Herramientas',
            'experiencia-comment': '// Experiencia',
            'experiencia-title': 'experiencia',
            'tl-1-t': 'Inicio en la programación',
            'tl-1-d': 'Primeros proyectos con HTML, CSS y JavaScript; desarrollo de la lógica base y algoritmos.',
            'tl-2-t': 'Especialización Backend',
            'tl-2-d': 'Construcción de APIs REST con Node.js, Express, autenticación JWT y bases de datos SQL/NoSQL.',
            'tl-3-t': 'Arquitectura y DevOps',
            'tl-3-d': 'Docker, CI/CD, microservicios y patrones de arquitectura "package by feature".',
            'tl-4-t': 'Proyectos full-stack',
            'tl-4-d': 'Monorepos e-commerce, clones de plataformas de streaming y servicios con integraciones externas (Stripe, Spotify API).',
            'soft-title': '// soft_skills',
            'soft-1': 'Trabajo en equipo',
            'soft-2': 'Comunicación clara',
            'soft-3': 'Resolución de problemas',
            'soft-4': 'Aprendizaje continuo',
            'soft-5': 'Orientación a resultados',
            'soft-6': 'Autonomía y gestión del tiempo',
            'proyectos-comment': '// Proyectos',
            'proyectos-title': 'proyectos',
            'filtro-todos': 'Todos',
            'filtro-full': 'Full-stack',
            'filtro-front': 'Frontend',
            'filtro-back': 'Backend',
            'contacto-comment': '// Contacto',
            'contacto-title': 'contacto',
            'ct-email': 'Email',
            'ct-github': 'GitHub',
            'ct-linkedin': 'LinkedIn',
            'ct-ubicacion': 'Ubicación',
            'form-nombre': '<span class="code-keyword">const</span> <span class="code-var">nombre</span> <span class="code-operator">=</span>',
            'form-email': '<span class="code-keyword">const</span> <span class="code-var">email</span> <span class="code-operator">=</span>',
            'form-mensaje': '<span class="code-keyword">const</span> <span class="code-var">mensaje</span> <span class="code-operator">=</span>',
            'form-enviar': '<span class="btn-code">&lt;</span><span class="btn-text">Enviar Mensaje</span><span class="btn-code">/&gt;</span>',
            'modal-arq': '// arquitectura',
            'modal-stack': '// stack',
            'modal-repo': 'Ver Repositorio',
            'github-repos': 'Repos públicos',
            'github-followers': 'Seguidores',
            'github-gists': 'Gists',
            'github-unavailable': 'GitHub API no disponible'
        },
        en: {
            'nav-inicio': '<span class="code-keyword">const</span> <span class="code-var">home</span>',
            'nav-sobre': '<span class="code-keyword">const</span> <span class="code-var">about_me</span>',
            'nav-habilidades': '<span class="code-keyword">const</span> <span class="code-var">skills</span>',
            'nav-experiencia': '<span class="code-keyword">const</span> <span class="code-var">experience</span>',
            'nav-proyectos': '<span class="code-keyword">const</span> <span class="code-var">projects</span>',
            'nav-contacto': '<span class="code-keyword">const</span> <span class="code-var">contact</span>',
            'hero-status': 'Available for projects',
            'btn-proyectos': '<span class="btn-code">&lt;</span><span class="btn-text">View Projects</span><span class="btn-code">/&gt;</span>',
            'btn-contacto': '<span class="btn-code">&lt;</span><span class="btn-text">Contact</span><span class="btn-code">/&gt;</span>',
            'btn-cv': '<span class="cv-icon">⬇</span> Download CV',
            'hero-cv': 'Download CV',
            'sobre-comment': '// About me',
            'sobre-title': 'about_me',
            'stat-anios': 'Years Exp.',
            'stat-commits': 'Commits',
            'stat-stars': 'Stars',
            'widget-github': '<span class="code-keyword">const</span> <span class="code-var">github</span> <span class="code-operator">=</span> <span class="code-string">"live"</span>;',
            'habilidades-comment': '// Skills',
            'habilidades-title': 'skills',
            'cat-backend': 'Backend',
            'cat-bd': 'Databases',
            'cat-devops': 'DevOps',
            'cat-herramientas': 'Tools',
            'experiencia-comment': '// Experience',
            'experiencia-title': 'experience',
            'tl-1-t': 'Coding beginnings',
            'tl-1-d': 'First projects with HTML, CSS and JavaScript; core logic and algorithms.',
            'tl-2-t': 'Backend specialization',
            'tl-2-d': 'REST APIs with Node.js, Express, JWT auth and SQL/NoSQL databases.',
            'tl-3-t': 'Architecture & DevOps',
            'tl-3-d': 'Docker, CI/CD, microservices and "package by feature" architecture patterns.',
            'tl-4-t': 'Full-stack projects',
            'tl-4-d': 'E-commerce monorepos, streaming clones and services with external integrations (Stripe, Spotify API).',
            'soft-title': '// soft_skills',
            'soft-1': 'Teamwork',
            'soft-2': 'Clear communication',
            'soft-3': 'Problem solving',
            'soft-4': 'Continuous learning',
            'soft-5': 'Results oriented',
            'soft-6': 'Autonomy and time management',
            'proyectos-comment': '// Projects',
            'proyectos-title': 'projects',
            'filtro-todos': 'All',
            'filtro-full': 'Full-stack',
            'filtro-front': 'Frontend',
            'filtro-back': 'Backend',
            'contacto-comment': '// Contact',
            'contacto-title': 'contact',
            'ct-email': 'Email',
            'ct-github': 'GitHub',
            'ct-linkedin': 'LinkedIn',
            'ct-ubicacion': 'Location',
            'form-nombre': '<span class="code-keyword">const</span> <span class="code-var">name</span> <span class="code-operator">=</span>',
            'form-email': '<span class="code-keyword">const</span> <span class="code-var">email</span> <span class="code-operator">=</span>',
            'form-mensaje': '<span class="code-keyword">const</span> <span class="code-var">message</span> <span class="code-operator">=</span>',
            'form-enviar': '<span class="btn-code">&lt;</span><span class="btn-text">Send Message</span><span class="btn-code">/&gt;</span>',
            'modal-arq': '// architecture',
            'modal-stack': '// stack',
            'modal-repo': 'View Repository',
            'github-repos': 'Public repos',
            'github-followers': 'Followers',
            'github-gists': 'Gists',
            'github-unavailable': 'GitHub API unavailable'
        },
        ph: {
            es: { 'ph-nombre': '"Tu nombre"', 'ph-email': '"tu@gmail.com"', 'ph-mensaje': '"Tu mensaje..."' },
            en: { 'ph-nombre': '"Your name"', 'ph-email': '"you@gmail.com"', 'ph-mensaje': '"Your message..."' }
        }
    };

    let currentLang = localStorage.getItem('lang') || 'es';

    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang === 'en' ? 'en' : 'es';
        const dict = lang === 'en' ? I18N.en : I18N.es;
        const placeholders = lang === 'en' ? I18N.ph.en : I18N.ph.es;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) el.innerHTML = dict[key];
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (placeholders[key] !== undefined) el.setAttribute('placeholder', placeholders[key]);
        });

        const langBtn = document.getElementById('langToggle');
        if (langBtn) {
            const text = langBtn.querySelector('.lang-text');
            if (text) text.textContent = lang === 'en' ? 'ES' : 'EN';
        }

        localStorage.setItem('lang', lang);
    }

    const langToggleBtn = document.getElementById('langToggle');
    langToggleBtn.addEventListener('click', () => {
        setLanguage(currentLang === 'es' ? 'en' : 'es');
        renderGitHubWidget();
        openProjectModal(openModalKey, true);
    });

    const GITHUB_USER = 'alejandro1593';
    const githubWidgetBody = document.getElementById('githubWidgetBody');

    function renderGitHubWidget() {
        if (!githubWidgetBody) return;
        if (!window.__githubData) return;
        const dict = currentLang === 'en' ? I18N.en : I18N.es;
        const data = window.__githubData;
        githubWidgetBody.innerHTML = `
            <div class="github-stat"><span class="github-stat-value">${data.public_repos}</span><span class="github-stat-label">${dict['github-repos']}</span></div>
            <div class="github-stat"><span class="github-stat-value">${data.followers}</span><span class="github-stat-label">${dict['github-followers']}</span></div>
            <div class="github-stat"><span class="github-stat-value">${data.public_gists}</span><span class="github-stat-label">${dict['github-gists']}</span></div>`;
    }

    fetch(`https://api.github.com/users/${GITHUB_USER}`)
        .then(res => (res.ok ? res.json() : Promise.reject(new Error('GitHub API error'))))
        .then(data => {
            window.__githubData = data;
            renderGitHubWidget();
        })
        .catch(() => {
            if (githubWidgetBody) {
                githubWidgetBody.innerHTML = `<span class="github-unavailable">${currentLang === 'en' ? I18N.en['github-unavailable'] : I18N.es['github-unavailable']}</span>`;
            }
        });

    setLanguage(currentLang);

    const projectDetails = {
        ecommerce: {
            icon: '🛒',
            title: 'E-commerce',
            description: {
                es: 'E-commerce full-stack con arquitectura monorepo (backend/, frontend/ y nginx/): catálogo de productos, carrito de compras, pedidos y pagos con Stripe.',
                en: 'Full-stack e-commerce with monorepo architecture (backend/, frontend/ and nginx/): product catalog, shopping cart, orders and Stripe payments.'
            },
            arch: {
                es: 'const ecommerce = {\n  estructura: "monorepo",\n  carpetas: ["backend/", "frontend/", "nginx/"],\n  api: "REST",\n  pagos: "Stripe SDK",\n  proxy: "Nginx (SPA + /api/)"\n};',
                en: 'const ecommerce = {\n  structure: "monorepo",\n  folders: ["backend/", "frontend/", "nginx/"],\n  api: "REST",\n  payments: "Stripe SDK",\n  proxy: "Nginx (SPA + /api/)"\n};'
            },
            stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router 7', 'TanStack Query', 'Zustand', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'JWT', 'Stripe', 'Docker', 'Nginx'],
            repo: 'https://github.com/alejandro1593/E-commerce'
        },
        audioly: {
            icon: '🎵',
            title: 'Audioly',
            description: {
                es: 'Clon de Spotify: reproducción de música y gestión de listas de reproducción, con integraciones de Spotify API, Jamendo y SoundHelix (backend/services/).',
                en: 'Spotify clone: music playback and playlist management, integrating the Spotify API, Jamendo and SoundHelix (backend/services/).'
            },
            arch: {
                es: 'const audioly = {\n  tipo: "clon de Spotify",\n  backend: "Node.js + Express",\n  orm: "Sequelize (PostgreSQL 15)",\n  frontend: "Next.js 14",\n  servicios: ["Spotify", "Jamendo", "SoundHelix"]\n};',
                en: 'const audioly = {\n  type: "Spotify clone",\n  backend: "Node.js + Express",\n  orm: "Sequelize (PostgreSQL 15)",\n  frontend: "Next.js 14",\n  services: ["Spotify", "Jamendo", "SoundHelix"]\n};'
            },
            stack: ['Next.js', 'React 18', 'Tailwind CSS', 'Node.js', 'Express', 'Sequelize', 'PostgreSQL', 'JWT', 'Zustand', 'Docker'],
            repo: 'https://github.com/alejandro1593/Audioly'
        },
        portfolio: {
            icon: '👨‍💻',
            title: 'Portafolio EduardVega',
            description: {
                es: 'Portafolio personal con estética de editor de código, construido sin frameworks ni dependencias externas con HTML5, CSS3 y JavaScript vanilla (ES6+).',
                en: 'Personal portfolio with a code-editor aesthetic, built with no frameworks or external dependencies: HTML5, CSS3 and vanilla JavaScript (ES6+).'
            },
            arch: {
                es: 'const portafolio = {\n  estetica: "editor de código",\n  deps: 0,\n  estructura: ["index.html", "styles_backend.css", "script_backend.js"],\n  responsive: true\n};',
                en: 'const portfolio = {\n  aesthetic: "code editor",\n  deps: 0,\n  structure: ["index.html", "styles_backend.css", "script_backend.js"],\n  responsive: true\n};'
            },
            stack: ['HTML5', 'CSS3', 'JavaScript', 'ES6+', 'Grid/Flexbox', 'Google Fonts'],
            repo: 'https://github.com/alejandro1593/portafolio-EduardVega'
        }
    };

    const modal = document.getElementById('projectModal');
    let openModalKey = null;

    document.querySelectorAll('.project-card').forEach(card => {
        const openCard = () => openProjectModal(card.dataset.project);

        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-code')) return;
            openCard();
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCard();
            }
        });
    });

    function openProjectModal(key, silent) {
        const detail = projectDetails[key];
        if (!detail) return;

        openModalKey = key;
        const dict = currentLang === 'en' ? I18N.en : I18N.es;

        document.getElementById('modalIcon').textContent = detail.icon;
        document.getElementById('projectModalTitle').textContent = detail.title;
        document.getElementById('modalDescription').textContent = detail.description[currentLang === 'en' ? 'en' : 'es'];
        document.getElementById('modalArch').innerHTML = escapeHtml(detail.arch[currentLang === 'en' ? 'en' : 'es']);
        document.getElementById('modalRepo').href = detail.repo;

        document.getElementById('modalTags').innerHTML = detail.stack
            .map(t => `<span class="tech-tag">${t}</span>`)
            .join('');

        document.getElementById('modalStack').innerHTML = detail.stack
            .map(t => `<span class="tech-tag">${t}</span>`)
            .join('');

        if (!silent) {
            modal.hidden = false;
            document.body.classList.add('modal-open');
            document.getElementById('modalClose').focus();
        }
    }

    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function closeProjectModal() {
        modal.hidden = true;
        openModalKey = null;
        document.body.classList.remove('modal-open');
    }

    document.getElementById('modalClose').addEventListener('click', closeProjectModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeProjectModal();
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
            document.querySelectorAll('.project-card').forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.style.display = match ? '' : 'none';
            });
        });
    });

    console.log('%c🚀 Backend Developer Portfolio', 'color: #34d399; font-size: 20px; font-weight: bold; font-family: monospace;');
    console.log('%cconst developer = "Eduardo Alejandro Vega Díaz";', 'color: #60a5fa; font-size: 14px; font-family: monospace;');
    console.log('%cconsole.log("¡Gracias por visitar mi portafolio!");', 'color: #a78bfa; font-size: 14px; font-family: monospace;');
});