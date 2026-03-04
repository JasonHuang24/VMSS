// script.js (fully centralized navbar + footer loading)

// Load navbar and footer in parallel on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    fetch('navbar.html').then(r => r.text()).catch(() => '<!-- Navbar fetch failed -->'),
    fetch('footer.html').then(r => r.text()).catch(() => '<!-- Footer fetch failed -->')
  ])
  .then(([navbarHtml, footerHtml]) => {
    const navPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (navPlaceholder) navPlaceholder.innerHTML = navbarHtml;
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerHtml;
	  // Mobile menu toggle
	const menuToggle = document.getElementById('menu-toggle');
	const mobileMenu = document.getElementById('mobile-menu');
	const hamburgerIcon = document.getElementById('hamburger-icon');
	const closeIcon = document.getElementById('close-icon');

	if (menuToggle && mobileMenu) {
	  menuToggle.addEventListener('click', () => {
	    const isHidden = mobileMenu.classList.contains('hidden');
	    
	    // Toggle menu visibility
	    mobileMenu.classList.toggle('hidden');
	    
	    // Swap icons
	    hamburgerIcon.classList.toggle('hidden');
	    closeIcon.classList.toggle('hidden');
	  });
	}
  })
  .catch(err => console.error('Failed to load layout components:', err));

  // Theme toggle (polls until button appears)
  const checkToggle = setInterval(() => {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (toggle) {
      clearInterval(checkToggle);

      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        html.setAttribute('data-theme', 'light');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        html.setAttribute('data-theme', 'dark');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
      }

      // Toggle click handler
      toggle.addEventListener('click', () => {
        // Compute new theme first
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Set attribute, icon, and storage
        html.setAttribute('data-theme', newTheme);
        toggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', newTheme);

        // Force mobile repaint for fixed navbar
        html.style.display = 'block';
        setTimeout(() => { html.style.display = ''; }, 0);
        void html.offsetWidth;  // cheap reflow trigger
      });
    }
  }, 100); // Check every 100ms until navbar loads
  
	// Hide/show back arrow only near top
	let lastScrollY = window.scrollY;
	const backArrows = document.querySelectorAll('.back-arrow');

	if (backArrows.length > 0) {
	  const handleScroll = () => {
		const currentScrollY = window.scrollY;

		if (currentScrollY > 120) {
		  // scrolled down → hide
		  backArrows.forEach(arrow => arrow.classList.add('scrolled-hidden'));
		} else {
		  // near top → show
		  backArrows.forEach(arrow => arrow.classList.remove('scrolled-hidden'));
		}

		lastScrollY = currentScrollY;
	  };

	  window.addEventListener('scroll', handleScroll, { passive: true });

	  // Force visible on initial load
	  backArrows.forEach(arrow => arrow.classList.remove('scrolled-hidden'));
	  handleScroll(); // run immediately
	}
});