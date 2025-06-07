// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
    
    if (menuToggle && navigation) {
        menuToggle.addEventListener('click', function() {
            navigation.classList.toggle('active');
        });
    }

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 메뉴 토글 기능
    const navSections = document.querySelectorAll('.nav-section-header');
    
    navSections.forEach(section => {
        section.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.classList.toggle('collapsed');
        });
    });

    // 페이지 전환 효과
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('/')) {
                e.preventDefault();
                document.querySelector('.content').classList.add('loading');
                
                setTimeout(() => {
                    window.location = this.href;
                }, 300);
            }
        });
    });
}); 