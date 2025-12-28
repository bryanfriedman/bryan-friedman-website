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
