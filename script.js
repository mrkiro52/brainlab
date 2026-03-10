// Loader animation
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    
    // Only run loader animation if loader exists on the page
    if (loader) {
        // Start fade in animation
        loader.classList.add('fade-in');
        
        // After logo fades in (0.8s), wait 0.2s and slide up
        setTimeout(() => {
            loader.classList.add('slide-up');
            
            // Remove loader from DOM after animation completes
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000); // 0.8s fade + 0.2s pause
    }
});

// Language selector functionality
const languageSelector = document.querySelector('.language-selector');
const languageArrow = document.getElementById('languageArrow');
const languageDropdown = document.getElementById('languageDropdown');

if (languageSelector && languageArrow && languageDropdown) {
    languageSelector.addEventListener('click', function(e) {
        e.stopPropagation();
        languageArrow.classList.toggle('rotated');
        languageDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        languageArrow.classList.remove('rotated');
        languageDropdown.classList.remove('show');
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            const burgerMenu = document.getElementById('burgerMenu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                burgerMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu functionality
const burgerMenu = document.getElementById('burgerMenu');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (burgerMenu && mobileMenu && mobileMenuClose) {
    // Open mobile menu
    burgerMenu.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        burgerMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        burgerMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            burgerMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            burgerMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

