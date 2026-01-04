// Music News - Main JavaScript

(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        
        // Mobile Menu Toggle
        initMobileMenu();
        
        // Smooth Scroll
        initSmoothScroll();
        
        // Back to Top
        initBackToTop();
        
        // Image Lazy Loading
        initLazyLoad();
        
        // Dropdown Menu
        initDropdownMenu();
        
        console.log('Music News website initialized');
    });

    // Mobile Menu
    function initMobileMenu() {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.style.cssText = 'display:none;position:absolute;top:20px;right:20px;background:#e74c3c;color:#fff;border:none;font-size:24px;padding:10px 15px;cursor:pointer;border-radius:5px;';
        
        const nav = document.querySelector('.nav__primary');
        if (nav && nav.parentElement) {
            nav.parentElement.insertBefore(menuToggle, nav);
            
            menuToggle.addEventListener('click', function() {
                const menu = document.querySelector('.sf-menu');
                if (menu) {
                    menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
                }
            });
            
            // Show toggle on mobile
            function checkMobile() {
                if (window.innerWidth <= 768) {
                    menuToggle.style.display = 'block';
                    const menu = document.querySelector('.sf-menu');
                    if (menu) menu.style.display = 'none';
                } else {
                    menuToggle.style.display = 'none';
                    const menu = document.querySelector('.sf-menu');
                    if (menu) menu.style.display = 'flex';
                }
            }
            
            checkMobile();
            window.addEventListener('resize', checkMobile);
        }
    }

    // Smooth Scroll for anchor links
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#top') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // Back to Top Button
    function initBackToTop() {
        const backTop = document.getElementById('back-top-wrapper');
        if (!backTop) return;
        
        // Hide initially
        backTop.style.display = 'none';
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backTop.style.display = 'block';
            } else {
                backTop.style.display = 'none';
            }
        });
    }

    // Lazy Load Images
    function initLazyLoad() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            images.forEach(function(img) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // Dropdown Menu
    function initDropdownMenu() {
        const menuItems = document.querySelectorAll('.sf-menu > li');
        
        menuItems.forEach(function(item) {
            const submenu = item.querySelector('.sub-menu');
            if (submenu) {
                item.addEventListener('mouseenter', function() {
                    submenu.style.display = 'block';
                });
                
                item.addEventListener('mouseleave', function() {
                    submenu.style.display = 'none';
                });
                
                // Mobile touch support
                item.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        const isVisible = submenu.style.display === 'block';
                        // Close all submenus
                        document.querySelectorAll('.sub-menu').forEach(function(sm) {
                            sm.style.display = 'none';
                        });
                        // Toggle current submenu
                        submenu.style.display = isVisible ? 'none' : 'block';
                        e.stopPropagation();
                    }
                });
            }
        });
        
        // Close submenus when clicking outside
        document.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                document.querySelectorAll('.sub-menu').forEach(function(sm) {
                    sm.style.display = 'none';
                });
            }
        });
    }

    // Simple Slider (if needed)
    function initSlider() {
        const slider = document.querySelector('.camera_wrap');
        if (!slider) return;
        
        const slides = slider.querySelectorAll('[data-src]');
        if (slides.length === 0) return;
        
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach(function(slide, i) {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        showSlide(currentSlide);
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

})();
