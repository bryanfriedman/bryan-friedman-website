window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    const navToggler = document.querySelector('.navbar-toggler');
    const navTarget = document.querySelector(navToggler?.getAttribute('data-bs-target') || '#navbarResponsive');

    if (navToggler && navTarget) {
        navToggler.addEventListener('click', () => {
            const isOpen = navTarget.classList.toggle('show');
            navToggler.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    // Lazy-load non-critical assets (Prism/lite-yt) when needed
    const assets = window.assetPaths || {};

    const injectStylesheet = (href) => {
        if (!href || document.querySelector(`link[href="${href}"]`)) return;
        const l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = href;
        document.head.appendChild(l);
    };

    const injectScript = (src) => {
        if (!src || document.querySelector(`script[src="${src}"]`)) return;
        const s = document.createElement('script');
        s.src = src;
        s.defer = true;
        document.body.appendChild(s);
    };

    const lazyLoadAssets = ({ selector, css, js, rootMargin = '300px' }) => {
        const targets = document.querySelectorAll(selector);
        if (!targets.length) return;
        const load = () => {
            if (css) injectStylesheet(css);
            if (js) injectScript(js);
        };
        const observer = new IntersectionObserver((entries, obs) => {
            if (entries.some(e => e.isIntersecting)) {
                load();
                obs.disconnect();
            }
        }, { rootMargin });
        targets.forEach(t => observer.observe(t));
    };

    // Prism CSS only when code blocks are present/near view
    lazyLoadAssets({
        selector: 'pre code',
        css: assets.prismCss
    });

    // Lite YouTube assets only when a lite-youtube element is near view
    lazyLoadAssets({
        selector: 'lite-youtube',
        css: assets.liteCss,
        js: assets.liteJs
    });

    // Swap masthead background to high-res after load
    const swapHero = () => {
        const masthead = document.querySelector('.masthead[data-bg-high]');
        if (!masthead) return;
        const high = masthead.getAttribute('data-bg-high');
        const low = masthead.getAttribute('data-bg-low');
        if (!high || high === low) return;
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
            masthead.style.backgroundImage = `url('${high}')`;
            masthead.dataset.bgLoaded = 'true';
        };
        img.src = high;
    };
    if ('requestIdleCallback' in window) {
        requestIdleCallback(swapHero);
    } else {
        setTimeout(swapHero, 0);
    }

    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

function init() {
    var vidDefer = document.getElementsByTagName('iframe');
    for (var i=0; i<vidDefer.length; i++) {
        if(vidDefer[i].getAttribute('data-src')) {
            vidDefer[i].setAttribute('src',vidDefer[i].getAttribute('data-src'));
        } 
    } 
}

window.onload = init;
