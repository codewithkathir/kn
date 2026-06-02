/* Renders global navbar and footer markup. Loaded BEFORE main.js. */
(() => {
    const navLinks = [
        { href: 'index.html', label: 'Home' },
        { href: 'about.html', label: 'About' },
        { href: 'projects.html', label: 'Projects' },
        { href: 'experience.html', label: 'Experience' },
        { href: 'services.html', label: 'Services' },
        { href: 'blog.html', label: 'Blog' },
        { href: 'contact.html', label: 'Contact' },
    ];

    const navHTML = `
    <header class="nav-shell">
        <nav class="nav-bar">
            <a href="index.html" class="nav-brand">
                <span class="nav-brand-mark">KN</span>
                <span>Kathiravan<span style="color: var(--primary);">.</span></span>
            </a>
            <div class="nav-links">
                ${navLinks.map((l) => `<a class="nav-link" href="${l.href}">${l.label}</a>`).join('')}
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
                <button class="theme-toggle" aria-label="Toggle theme"></button>
                <a class="nav-cta" href="contact.html" data-cursor="hover">
                    Let's Talk
                    <svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </a>
                <button class="nav-menu-btn" type="button" aria-label="Open menu" aria-controls="primary-mobile-nav" aria-expanded="false">
                    <svg class="icon-open" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">
                        <path d="M4 7h16M4 12h16M4 17h16"/>
                    </svg>
                    <svg class="icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">
                        <path d="M6 6l12 12M18 6 6 18"/>
                    </svg>
                    <span class="label">Menu</span>
                </button>
            </div>
        </nav>
        <div class="nav-mobile" id="primary-mobile-nav">
            ${navLinks.map((l) => `<a href="${l.href}" data-mobile-link>${l.label}</a>`).join('')}
            <a href="contact.html" data-mobile-link style="margin-top:8px; background: var(--grad-primary); color: white; text-align:center; font-weight:600;">Let's Talk →</a>
        </div>
    </header>`;

    const footerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div>
                    <div class="footer-brand">
                        <span class="nav-brand-mark">KN</span>
                        <span>Kathiravan Nambirajan</span>
                    </div>
                    <p class="footer-desc">
                        Senior Full Stack Developer building scalable SaaS platforms,
                        AI-powered systems, and cloud-native applications. Based in Chennai,
                        India — working with teams worldwide.
                    </p>
                    <div class="footer-socials">
                        <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noopener">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.5-.3-5.2-1.3-5.2-5.6 0-1.2.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.3-5.2 5.6.4.3.8 1 .8 2v2.9c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/kathiravan-nambirajan" aria-label="LinkedIn" target="_blank" rel="noopener">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
                        </a>
                        <a href="https://wa.me/918754101216" aria-label="WhatsApp" target="_blank" rel="noopener">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.4 11.4 0 0 0 12.1 0C5.5 0 .2 5.4.2 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7 1 3.7 1.5 5.8 1.5 6.6 0 11.9-5.4 11.9-12 0-3.2-1.2-6.2-3.4-8.4zM12.1 21.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.7.9 1-3.6-.2-.4a9.7 9.7 0 0 1-1.5-5.2 9.8 9.8 0 0 1 16.7-6.9c1.9 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.9-9.9 9.9zm5.4-7.4-1.7-.8c-.2-.1-.4-.2-.6.2l-.9 1.1c-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.9 2.9 4.6 4.1.6.3 1.1.4 1.4.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.2-.1-.5-.2z"/></svg>
                        </a>
                        <a href="mailto:nkathiravan90@gmail.com" aria-label="Email">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                        </a>
                    </div>
                </div>

                <div>
                    <h5>Navigate</h5>
                    <div class="footer-links">
                        ${navLinks.slice(0, 4).map((l) => `<a href="${l.href}">${l.label}</a>`).join('')}
                    </div>
                </div>
                <div>
                    <h5>More</h5>
                    <div class="footer-links">
                        ${navLinks.slice(4).map((l) => `<a href="${l.href}">${l.label}</a>`).join('')}
                    </div>
                </div>
                <div>
                    <h5>Contact</h5>
                    <div class="footer-links">
                        <a href="mailto:nkathiravan90@gmail.com">nkathiravan90@gmail.com</a>
                        <a href="tel:+918754101216">+91 87541 01216</a>
                        <a href="https://wa.me/918754101216" target="_blank" rel="noopener">WhatsApp Chat</a>
                        <a href="#">Chennai, India</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <span>© ${new Date().getFullYear()} Kathiravan Nambirajan. Crafted with care.</span>
                <span style="display:inline-flex; align-items:center; gap:8px;">
                    <span class="kbd">v2.0</span>
                    <span>Built with Tailwind · GSAP · Vanilla JS</span>
                </span>
            </div>
        </div>
    </footer>

    <a class="wa-float" href="https://wa.me/918754101216?text=Hi%20Kathiravan%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.4 11.4 0 0 0 12.1 0C5.5 0 .2 5.4.2 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7 1 3.7 1.5 5.8 1.5 6.6 0 11.9-5.4 11.9-12 0-3.2-1.2-6.2-3.4-8.4zM12.1 21.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.7.9 1-3.6-.2-.4a9.7 9.7 0 0 1-1.5-5.2 9.8 9.8 0 0 1 16.7-6.9c1.9 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.9-9.9 9.9zm5.4-7.4-1.7-.8c-.2-.1-.4-.2-.6.2l-.9 1.1c-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.9 2.9 4.6 4.1.6.3 1.1.4 1.4.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.2-.1-.5-.2z"/></svg>
    </a>`;

    // Mount synchronously — partials.js is loaded at end of body so mounts already exist.
    const navMount = document.getElementById('nav-mount');
    const footMount = document.getElementById('footer-mount');
    if (navMount) navMount.outerHTML = navHTML;
    if (footMount) footMount.outerHTML = footerHTML;

    // ===== Mobile menu wiring (done here so it works even if main.js is slow) =====
    const menuBtn = document.querySelector('.nav-menu-btn');
    const drawer = document.getElementById('primary-mobile-nav');
    const scrim = (() => {
        const el = document.createElement('div');
        el.className = 'nav-scrim';
        document.body.appendChild(el);
        return el;
    })();

    function openMenu() {
        if (!drawer) return;
        drawer.classList.add('open');
        scrim.classList.add('open');
        menuBtn?.classList.add('is-open');
        menuBtn?.setAttribute('aria-expanded', 'true');
        document.body.classList.add('nav-locked');
    }
    function closeMenu() {
        if (!drawer) return;
        drawer.classList.remove('open');
        scrim.classList.remove('open');
        menuBtn?.classList.remove('is-open');
        menuBtn?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-locked');
    }
    function toggleMenu() {
        if (!drawer) return;
        if (drawer.classList.contains('open')) closeMenu();
        else openMenu();
    }

    menuBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    scrim.addEventListener('click', closeMenu);
    // Close drawer when any mobile link is tapped — links still navigate normally.
    drawer?.querySelectorAll('[data-mobile-link]').forEach((a) => {
        a.addEventListener('click', () => {
            // small delay so the click registers, then close (navigation happens regardless)
            closeMenu();
        });
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 980) closeMenu();
    });

    // Expose for debugging
    window.__nav = { open: openMenu, close: closeMenu, toggle: toggleMenu };
})();
