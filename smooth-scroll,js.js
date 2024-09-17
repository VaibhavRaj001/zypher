document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Adjust offset for fixed header if needed
                    behavior: 'smooth'
                });
            }
        });
    });
});
