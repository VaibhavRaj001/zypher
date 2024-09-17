document.addEventListener('DOMContentLoaded', () => {
  // Setup Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('three-js-canvas').appendChild(renderer.domElement);

  // Add a simple geometry and material
  const geometry = new THREE.SphereGeometry(1, 32, 32); // Create a sphere
  const material = new THREE.MeshBasicMaterial({ color: 0x3498db, wireframe: true }); // Blue wireframe material
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Position the camera
  camera.position.z = 5;

  // Animation loop
  function animate() {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Add smooth scroll for navigation links
  const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
  navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 50, // Adjust offset for fixed header
                  behavior: 'smooth'
              });
          }
      });
  });

  // Highlight the navigation link corresponding to the current section
  const sections = document.querySelectorAll('section');
  const navBarLinks = document.querySelectorAll('nav ul li a');

  function updateNavHighlight() {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      sections.forEach(section => {
          if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
              navBarLinks.forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href').substring(1) === section.id) {
                      link.classList.add('active');
                  }
              });
          }
      });
  }

  // Reveal sections on scroll
  function revealSectionsOnScroll() {
      sections.forEach(section => {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          const windowHeight = window.innerHeight;
          if (sectionTop < windowHeight * 0.75) { // Reveal sections when they are 75% visible
              section.classList.add('visible');
          }
      });
  }

  // Update navigation highlight and reveal sections on scroll
  window.addEventListener('scroll', () => {
      updateNavHighlight();
      revealSectionsOnScroll();
  });

  // Also update on page load to handle hash in URL
  updateNavHighlight();
  revealSectionsOnScroll();

  // Add scroll-to-top button functionality
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.className = 'scroll-to-top-btn';
  document.body.appendChild(scrollToTopBtn);

  scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  // Show or hide scroll-to-top button based on scroll position
  function toggleScrollToTopBtn() {
      if (window.scrollY > 300) {
          scrollToTopBtn.classList.add('show');
      } else {
          scrollToTopBtn.classList.remove('show');
      }
  }

  window.addEventListener('scroll', toggleScrollToTopBtn);
  toggleScrollToTopBtn(); // Initial check
});
