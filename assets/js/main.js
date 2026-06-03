/* ==============================================================
   Kathiravan Nambirajan — Portfolio Global Script
   Custom cursor, particles, mouse-glow, loader, navbar, theme,
   counters, magnetic buttons, scroll progress, GSAP setup.
   ============================================================== */

(() => {
    const $ = (s, el = document) => el.querySelector(s);
    const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Loader ---------- */
    const hideLoader = () => {
        const loader = $('.page-loader');
        if (loader) loader.classList.add('is-hidden');
    };
    window.addEventListener('load', () => setTimeout(hideLoader, 600));
    // Safety net: never let the loader trap the page (e.g. a hung CDN request)
    setTimeout(hideLoader, 3500);

    /* ---------- Theme toggle (dark/light) ---------- */
    const root = document.documentElement;
    const stored = localStorage.getItem('kn-theme');
    if (stored === 'light') root.setAttribute('data-theme', 'light');

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.theme-toggle');
        if (!btn) return;
        const isLight = root.getAttribute('data-theme') === 'light';
        if (isLight) {
            root.removeAttribute('data-theme');
            localStorage.setItem('kn-theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('kn-theme', 'light');
        }
        updateThemeIcon();
    });
    function updateThemeIcon() {
        $$('.theme-toggle').forEach((btn) => {
            const light = root.getAttribute('data-theme') === 'light';
            btn.innerHTML = light
                ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
                : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
        });
    }
    updateThemeIcon();

    /* ---------- Mobile nav is wired in partials.js ---------- */

    /* ---------- Custom Cursor ---------- */
    if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
        const dot = document.createElement('div');
        const ring = document.createElement('div');
        dot.className = 'cursor-dot';
        ring.className = 'cursor-ring';
        document.body.append(dot, ring);

        let mx = window.innerWidth / 2, my = window.innerHeight / 2;
        let rx = mx, ry = my;
        window.addEventListener('mousemove', (e) => {
            mx = e.clientX; my = e.clientY;
            dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        });
        function raf() {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
            requestAnimationFrame(raf);
        }
        raf();

        const hoverSel = 'a, button, .btn, [data-cursor="hover"], input, textarea';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(hoverSel)) ring.classList.add('hover');
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(hoverSel)) ring.classList.remove('hover');
        });
    }

    /* ---------- Mouse-follow glow (skip on touch / reduced motion) ---------- */
    if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
        const glow = document.createElement('div');
        glow.className = 'glow-cursor';
        document.body.appendChild(glow);
        let gx = window.innerWidth / 2, gy = window.innerHeight / 2;
        let tgx = gx, tgy = gy;
        window.addEventListener('mousemove', (e) => { tgx = e.clientX; tgy = e.clientY; });
        function glowLoop() {
            gx += (tgx - gx) * 0.06;
            gy += (tgy - gy) * 0.06;
            glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
            requestAnimationFrame(glowLoop);
        }
        glowLoop();
    }

    /* ---------- Scroll progress bar ---------- */
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        bar.style.width = pct + '%';
    }, { passive: true });

    /* ---------- Particles canvas in hero (desktop only) ---------- */
    const particleCanvas = $('#particles');
    const isSmallScreen = window.matchMedia('(max-width: 720px)').matches;
    if (particleCanvas && !prefersReducedMotion && !isSmallScreen) {
        const ctx = particleCanvas.getContext('2d');
        let w, h;
        let particles = [];
        const COUNT = 60;
        const COLORS = ['rgba(255,87,51,0.7)', 'rgba(99,102,241,0.7)', 'rgba(6,182,212,0.7)'];

        function resize() {
            w = particleCanvas.width = particleCanvas.offsetWidth * devicePixelRatio;
            h = particleCanvas.height = particleCanvas.offsetHeight * devicePixelRatio;
        }
        function init() {
            particles = Array.from({ length: COUNT }).map(() => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.4 * devicePixelRatio,
                vy: (Math.random() - 0.5) * 0.4 * devicePixelRatio,
                r: (Math.random() * 1.6 + 0.4) * devicePixelRatio,
                c: COLORS[Math.floor(Math.random() * COLORS.length)],
            }));
        }
        function step() {
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
                ctx.beginPath();
                ctx.fillStyle = p.c;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const dx = p.x - q.x, dy = p.y - q.y;
                    const d = Math.hypot(dx, dy);
                    if (d < 120 * devicePixelRatio) {
                        ctx.strokeStyle = `rgba(148,163,184,${0.15 - d / (120 * devicePixelRatio) * 0.15})`;
                        ctx.lineWidth = 0.6 * devicePixelRatio;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(step);
        }
        resize(); init(); step();
        window.addEventListener('resize', () => { resize(); init(); });
    }

    /* ---------- Magnetic buttons ---------- */
    if (!prefersReducedMotion) {
        $$('[data-magnetic]').forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
            });
            el.addEventListener('mouseleave', () => { el.style.transform = ''; });
        });
    }

    /* ---------- Skill card 3D-ish glow follow ---------- */
    $$('.skill-card, .feature-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
    });

    /* ---------- Animated counters ---------- */
    const counters = $$('[data-counter]');
    if (counters.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    runCounter(e.target);
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.4 });
        counters.forEach((c) => io.observe(c));
    }
    function runCounter(el) {
        const target = parseFloat(el.dataset.counter);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const dur = parseInt(el.dataset.duration || '1600', 10);
        const start = performance.now();
        function tick(now) {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = (target * eased).toFixed(decimals);
            el.textContent = prefix + Intl.NumberFormat('en-US').format(decimals ? val : Math.floor(val)) + suffix;
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    /* ---------- Skill bars fill on view ---------- */
    const bars = $$('.bar-fill');
    if (bars.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.style.width = e.target.dataset.value + '%';
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.4 });
        bars.forEach((b) => io.observe(b));
    }

    /* ---------- Contribution graph (random plausible) ---------- */
    const cg = $('.contrib-graph');
    if (cg) {
        const total = 52 * 7;
        let html = '';
        for (let i = 0; i < total; i++) {
            const seed = Math.random();
            let level = 0;
            if (seed > 0.4) level = 1;
            if (seed > 0.6) level = 2;
            if (seed > 0.8) level = 3;
            if (seed > 0.93) level = 4;
            html += `<div class="contrib-cell ${level ? 'l' + level : ''}"></div>`;
        }
        cg.innerHTML = html;
    }

    /* ---------- Blog search & filter ---------- */
    const blogSearch = $('#blog-search');
    if (blogSearch) {
        const cards = $$('.blog-card');
        const tabs = $$('.blog-tab');
        let activeTab = 'all';
        function apply() {
            const q = blogSearch.value.trim().toLowerCase();
            cards.forEach((c) => {
                const cat = c.dataset.cat || '';
                const txt = c.innerText.toLowerCase();
                const matchTab = activeTab === 'all' || cat === activeTab;
                const matchQ = !q || txt.includes(q);
                c.style.display = matchTab && matchQ ? '' : 'none';
            });
        }
        blogSearch.addEventListener('input', apply);
        tabs.forEach((t) => {
            t.addEventListener('click', () => {
                tabs.forEach((x) => x.classList.remove('active'));
                t.classList.add('active');
                activeTab = t.dataset.cat || 'all';
                apply();
            });
        });
    }

    /* ---------- Contact Form Validation & Submit (FormSubmit AJAX) ---------- */
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    const successMsg = document.getElementById('successMsg');
    const errorMsg = document.getElementById('errorMsg');
    const loader = document.getElementById('loader');
    const submitBtn = document.getElementById('submitBtn');

    // Show success banner if redirected back from non-JS fallback (?sent=1)
    if (successMsg && new URLSearchParams(location.search).get('sent') === '1') {
        successMsg.classList.remove('hidden');
        history.replaceState(null, '', location.pathname);
    }

    if (form) {
        // Live-clear errors as user types
        [nameInput, emailInput, messageInput].forEach((el) => {
            if (!el) return;
            el.addEventListener('input', () => el.classList.remove('input-error'));
        });

        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            let valid = true;

            if (nameInput.value.trim() === '') {
                nameError.classList.remove('hidden');
                nameInput.classList.add('input-error');
                valid = false;
            } else {
                nameError.classList.add('hidden');
                nameInput.classList.remove('input-error');
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
            if (!emailPattern.test(emailInput.value.trim())) {
                emailError.classList.remove('hidden');
                emailInput.classList.add('input-error');
                valid = false;
            } else {
                emailError.classList.add('hidden');
                emailInput.classList.remove('input-error');
            }

            if (messageInput.value.trim() === '') {
                messageError.classList.remove('hidden');
                messageInput.classList.add('input-error');
                valid = false;
            } else {
                messageError.classList.add('hidden');
                messageInput.classList.remove('input-error');
            }

            if (!valid) {
                const firstErr = form.querySelector('.input-error');
                if (firstErr) firstErr.focus({ preventScroll: false });
                return;
            }

            successMsg.classList.add('hidden');
            errorMsg.classList.add('hidden');
            loader.classList.remove('hidden');
            submitBtn.disabled = true;

            const formData = new FormData(form);

            try {
                const response = await fetch('https://formsubmit.co/ajax/nkathiravan90@gmail.com', {
                    method: 'POST',
                    body: formData,
                });

                let data = null;
                try { data = await response.json(); } catch { /* non-JSON response */ }

                // FormSubmit returns `{ "success": "true", ... }` — note `success` is a STRING.
                const ok = response.ok && data && String(data.success).toLowerCase() === 'true';

                if (ok) {
                    successMsg.classList.remove('hidden');
                    errorMsg.classList.add('hidden');
                    form.reset();
                } else {
                    const detail = data && (data.message || data.error);
                    const errSpan = errorMsg.querySelector('[data-err-detail]');
                    if (errSpan && detail) errSpan.textContent = ' (' + detail + ')';
                    throw new Error(detail || ('HTTP ' + response.status));
                }
            } catch (error) {
                console.error('Contact form submission failed:', error);
                errorMsg.classList.remove('hidden');
                successMsg.classList.add('hidden');
            } finally {
                loader.classList.add('hidden');
                submitBtn.disabled = false;
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    /* ---------- Typed.js init ---------- */
    if (window.Typed && document.getElementById('typed-roles')) {
        new Typed('#typed-roles', {
            strings: [
                'React.js Developer',
                'Node.js Engineer',
                'Full Stack Architect',
                'AI Integration Expert',
                'AWS Cloud Engineer',
                'SaaS Builder',
            ],
            typeSpeed: 55,
            backSpeed: 30,
            backDelay: 1400,
            loop: true,
            smartBackspace: true,
        });
    }

    /* ---------- AOS init ---------- */
    if (window.AOS) {
        AOS.init({
            duration: 700,
            once: true,
            easing: 'ease-out-cubic',
            offset: 60,
        });
    }

    /* ---------- Swiper init (testimonials / tech carousel) ---------- */
    if (window.Swiper && document.querySelector('.tech-swiper')) {
        new Swiper('.tech-swiper', {
            slidesPerView: 'auto',
            spaceBetween: 16,
            loop: true,
            speed: 4000,
            autoplay: { delay: 0, disableOnInteraction: false },
            allowTouchMove: false,
            freeMode: true,
        });
    }

    /* ---------- GSAP scroll reveals (extra polish) ---------- */
    if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
        gsap.registerPlugin(ScrollTrigger);
        $$('.gsap-stagger').forEach((wrap) => {
            const items = Array.from(wrap.children);
            if (!items.length) return;
            gsap.fromTo(
                items,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power3.out',
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: wrap,
                        start: 'top 85%',
                        once: true,
                    },
                }
            );
        });

        // Hero entrance
        const hero = document.querySelector('.hero-content');
        if (hero) {
            gsap.from(hero.querySelectorAll('.hero-anim'), {
                opacity: 0,
                y: 24,
                duration: 0.9,
                stagger: 0.12,
                ease: 'power3.out',
                delay: 0.4,
            });
        }
    } else {
        // Fallback: GSAP/ScrollTrigger unavailable (or reduced motion) — ensure content is visible.
        $$('.gsap-stagger').forEach((wrap) => {
            Array.from(wrap.children).forEach((el) => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        });
    }

    /* ---------- Mark current nav link ---------- */
    // Normalise the pathname so '/about', '/about/', '/about.html' all collapse to '/about'.
    // Home collapses to '/'.
    const normalisePath = (p) => {
        let n = (p || '/').replace(/\.html$/i, '').replace(/\/index$/i, '/');
        if (n.length > 1 && n.endsWith('/')) n = n.slice(0, -1);
        return n || '/';
    };
    const currentPath = normalisePath(location.pathname);
    $$('.nav-link, .nav-mobile a').forEach((a) => {
        const href = normalisePath(a.getAttribute('href') || '');
        if (href === currentPath) a.classList.add('active');
    });
})();
