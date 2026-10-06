/* ===================================================
   PORTFOLIO JAVASCRIPT
   Van Rayver Villaruz
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================
     1. NAVBAR - Scroll effect (adds background on scroll)
     =================================================== */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link
    updateActiveLink();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ===================================================
     2. MOBILE NAVIGATION - Hamburger toggle
     =================================================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute(
      'aria-expanded',
      hamburger.classList.contains('active')
    );
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('active') &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ===================================================
     3. ACTIVE NAV LINK ON SCROLL
     =================================================== */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 120;
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  /* ===================================================
     4. SCROLL REVEAL ANIMATIONS
     Uses IntersectionObserver to reveal elements
     =================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* ===================================================
     5. TYPEWRITER EFFECT (Hero subtitle)
     Cycles through roles with a typing animation
     =================================================== */
  const typewriterEl = document.getElementById('typewriter');
  const roles = [
    'BSIT Student',
    'Aspiring Web Developer',
    'Problem Solver',
    'Tech Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      // Deleting characters
      typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Typing characters
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    // Finished typing the current role
    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    }
    // Finished deleting
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // Pause before typing next
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Start the typewriter effect
  if (typewriterEl) {
    setTimeout(typeEffect, 500);
  }

  /* ===================================================
     6. CONTACT FORM - Client-side validation
     =================================================== */
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  function showFeedback(message, type) {
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback ${type}`;
    // Clear feedback after a few seconds
    setTimeout(() => {
      formFeedback.textContent = '';
      formFeedback.className = 'form-feedback';
    }, 5000);
  }

  function isValidEmail(email) {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      let isValid = true;

      // Reset error states
      [nameInput, emailInput, messageInput].forEach(input => {
        input.classList.remove('error');
      });

      // Validate name
      if (name.length < 2) {
        nameInput.classList.add('error');
        isValid = false;
      }

      // Validate email
      if (!isValidEmail(email)) {
        emailInput.classList.add('error');
        isValid = false;
      }

      // Validate message
      if (message.length < 5) {
        messageInput.classList.add('error');
        isValid = false;
      }

      if (!isValid) {
        showFeedback('Please fill out all fields correctly.', 'error');
        return;
      }

      // Simulate success (no backend)
      showFeedback(
        `Thanks, ${name}! Your message has been sent. I'll get back to you soon. ??`,
        'success'
      );

      // Reset form
      contactForm.reset();
    });

    // Clear error state on input
    contactForm.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
      });
    });
  }

  /* ===================================================
     7. SMOOTH SCROLLING FOR ANCHOR LINKS
     (Fallback for browsers that don't support CSS smooth scroll)
     =================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ===================================================
     8. DYNAMIC YEAR IN FOOTER (optional)
     =================================================== */
  // Uncomment below if you want the year to update automatically
  // const yearEl = document.querySelector('.footer-copy');
  // if (yearEl) {
  //   const currentYear = new Date().getFullYear();
  //   yearEl.textContent = `© ${currentYear} Van Rayver Villaruz. All Rights Reserved.`;
  // }

  /* ===================================================
     9. INITIAL CALL
     =================================================== */
  handleScroll();

});