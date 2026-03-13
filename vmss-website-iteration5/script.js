document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.innerHTML =
        theme === 'light'
          ? '<i class="fas fa-sun"></i>'
          : '<i class="fas fa-moon"></i>';
    }
  }

  function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    applyTheme(getPreferredTheme());

    toggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') || getPreferredTheme();
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  }

  function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');

      if (hamburgerIcon) hamburgerIcon.classList.toggle('hidden');
      if (closeIcon) closeIcon.classList.toggle('hidden');
    });
  }

  function initJoinModal() {
    const openEntryModalBtn = document.getElementById('open-entry-modal');
    const closeEntryModalBtn = document.getElementById('close-entry-modal');
    const entryModal = document.getElementById('entryModal');
    const entryForm = document.getElementById('entryForm');

    function showEntryForm() {
      if (!entryModal) return;
      entryModal.classList.remove('hidden');
      entryModal.classList.add('flex');
    }

    function hideEntryForm() {
      if (!entryModal) return;
      entryModal.classList.add('hidden');
      entryModal.classList.remove('flex');
    }

    if (openEntryModalBtn) {
      openEntryModalBtn.addEventListener('click', showEntryForm);
    }

    if (closeEntryModalBtn) {
      closeEntryModalBtn.addEventListener('click', hideEntryForm);
    }

    if (entryForm) {
      entryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        hideEntryForm();

        setTimeout(() => {
          alert("✅ Application Received.\n\nWelcome, citizen.\n\nYour moral accounting and implant procedure have been scheduled. You will begin in the Main Layer (0).\n\nThe choice — and the consequences — are now yours.");
        }, 600);
      });
    }
  }

  function initBackArrows() {
    const backArrows = document.querySelectorAll('.back-arrow');
    if (backArrows.length === 0) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 120) {
        backArrows.forEach(arrow => arrow.classList.add('scrolled-hidden'));
      } else {
        backArrows.forEach(arrow => arrow.classList.remove('scrolled-hidden'));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    backArrows.forEach(arrow => arrow.classList.remove('scrolled-hidden'));
    handleScroll();
  }

  Promise.all([
    fetch('navbar.html').then(r => r.text()).catch(() => '<!-- Navbar fetch failed -->'),
    fetch('footer.html').then(r => r.text()).catch(() => '<!-- Footer fetch failed -->')
  ])
    .then(([navbarHtml, footerHtml]) => {
      const navPlaceholder = document.getElementById('navbar-placeholder');
      const footerPlaceholder = document.getElementById('footer-placeholder');

      if (navPlaceholder) navPlaceholder.innerHTML = navbarHtml;
      if (footerPlaceholder) footerPlaceholder.innerHTML = footerHtml;

      initThemeToggle();
      initMobileMenu();
      initJoinModal();
    })
    .catch(err => console.error('Failed to load layout components:', err));

  initBackArrows();
});