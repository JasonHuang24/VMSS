const SUPABASE_URL = 'https://nizitfgihubglrtovget.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_yDPdS68HfKjVQNPQ6KEhyA_333w01sV';

let supabaseClient = null;


// =========================
// VMSS GLOBAL STATE
// =========================
const VMSS_DEFAULT_STATE = {
  selectedLayer: '0',
  stiScore: 43,
  profile: 'Balanced baseline',
  tone: 'Containment threshold engaged',
  lastEvent: 'Baseline loaded',
  values: {
    civic: 11,
    contribution: 11,
    conduct: 8,
    competence: 8,
    endorsement: 6,
    recovery: 5,
    violations: 6,
  }
};

function vmssClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function vmssLayerForScore(score) {
  if (score >= 85) return { key:'+1', label:'+1 Sanctuary', short:'+1 Sanctuary', band:'85–100' };
  if (score >= 70) return { key:'0', label:'Main Layer (0)', short:'Layer 0', band:'70–84' };
  if (score >= 50) return { key:'-1', label:'-1 Noncompliance', short:'-1 Noncompliance', band:'50–69' };
  if (score >= 30) return { key:'-2', label:'-2 Violent Offense', short:'-2 Violent Offense', band:'30–49' };
  return { key:'-3', label:'-3 Terminal', short:'-3 Terminal', band:'0–29' };
}

function vmssAnimateNumber(element, target, options = {}) {
  if (!element) return;
  const duration = options.duration ?? 520;
  const decimals = options.decimals ?? 0;
  const prefix = options.prefix ?? '';
  const suffix = options.suffix ?? '';
  const start = Number(element.dataset.currentValue ?? element.textContent.replace(/[^0-9.-]/g, '')) || 0;
  const end = Number(target) || 0;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
    element.dataset.currentValue = String(end);
    return;
  }
  const startTime = performance.now();
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  cancelAnimationFrame(element._vmssRaf || 0);
  const tick = (now) => {
    const progress = Math.min(1, (now - startTime) / duration);
    const value = start + (end - start) * ease(progress);
    element.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
    if (progress < 1) {
      element._vmssRaf = requestAnimationFrame(tick);
    } else {
      element.dataset.currentValue = String(end);
      element.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
    }
  };
  element._vmssRaf = requestAnimationFrame(tick);
}
window.vmssAnimateNumber = vmssAnimateNumber;

(function initVmssGlobal() {
  const STORAGE_KEY = 'vmss_state';
  const safeLoad = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return vmssClone(VMSS_DEFAULT_STATE);
      const parsed = JSON.parse(raw);
      return {
        ...vmssClone(VMSS_DEFAULT_STATE),
        ...parsed,
        values: { ...VMSS_DEFAULT_STATE.values, ...(parsed.values || {}) }
      };
    } catch (e) {
      console.warn('VMSS state load failed:', e);
      return vmssClone(VMSS_DEFAULT_STATE);
    }
  };
  const safeSave = (state) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { console.warn('VMSS state save failed:', e); }
  };
  const state = safeLoad();
  window.VMSS = {
    state,
    layerForScore: vmssLayerForScore,
    getState() { return vmssClone(this.state); },
    setState(patch = {}, meta = {}) {
      const next = {
        ...this.state,
        ...patch,
        values: { ...this.state.values, ...(patch.values || {}) }
      };
      if ((patch.stiScore ?? next.stiScore) !== undefined && (patch.selectedLayer === undefined)) {
        next.selectedLayer = vmssLayerForScore(Number(next.stiScore) || 0).key;
      }
      this.state = next;
      safeSave(this.state);
      document.dispatchEvent(new CustomEvent('vmss:state-change', { detail: { state: this.getState(), meta } }));
      return this.getState();
    },
    reset() {
      this.state = vmssClone(VMSS_DEFAULT_STATE);
      safeSave(this.state);
      document.dispatchEvent(new CustomEvent('vmss:state-change', { detail: { state: this.getState(), meta: { source: 'reset' } } }));
      return this.getState();
    }
  };
})();

// Safe Supabase init (prevents crashes on pages without it)
if (typeof window !== 'undefined' && typeof window.supabase !== 'undefined') {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (e) {
    console.warn('Supabase init failed:', e);
    supabaseClient = null;
  }
}

// =========================
// SUPABASE HELPERS
// =========================
function loadApplicantCount() {
  const countEl = document.getElementById('applicant-count');
  if (!countEl || !supabaseClient) return Promise.resolve();

  return supabaseClient
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .then(({ count, error }) => {
      if (error) throw error;
      countEl.textContent = count ?? '0';
    })
    .catch((err) => {
      console.error('Failed to load applicant count:', err);
      countEl.textContent = '—';
    });
}

function loadRecentApplicants() {
  const container = document.getElementById('recent-applicants');
  if (!container || !supabaseClient) return Promise.resolve();

  return supabaseClient
    .from('applications')
    .select('city, country')
    .order('created_at', { ascending: false })
    .limit(5)
    .then(({ data, error }) => {
      if (error) throw error;

      container.innerHTML = '';

      if (!data || data.length === 0) {
        container.innerHTML = '<div>No applications yet.</div>';
        return;
      }

      data.forEach((row) => {
        const city = row.city || '';
        const country = row.country || '';
        const line = document.createElement('div');
        line.textContent = `• ${city}${city && country ? ', ' : ''}${country}`;
        container.appendChild(line);
      });
    })
    .catch((err) => {
      console.error('Failed to load recent applicants:', err);
      container.innerHTML = '<div>—</div>';
    });
}



function initVmssHud() {
  if (!document.body || document.getElementById('vmss-hud')) return;
  const savedHudMinimized = localStorage.getItem('vmss_hud_minimized') === 'true';
  const hud = document.createElement('aside');
  hud.id = 'vmss-hud';
  hud.className = 'vmss-hud';
  hud.innerHTML = `
    <div class="vmss-hud-top">
      <div class="vmss-hud-kicker">VMSS live state</div>
      <button class="vmss-hud-toggle" type="button" aria-expanded="true" aria-label="Minimize live state panel">−</button>
    </div>
    <div class="vmss-hud-body">
      <div class="vmss-hud-row"><span class="vmss-hud-label">Layer</span><strong data-vmss-hud-layer>Main Layer (0)</strong></div>
      <div class="vmss-hud-row"><span class="vmss-hud-label">STI</span><strong data-vmss-hud-score>43</strong></div>
      <div class="vmss-hud-row"><span class="vmss-hud-label">Profile</span><span data-vmss-hud-profile>Balanced baseline</span></div>
      <div class="vmss-hud-row"><span class="vmss-hud-label">Last event</span><span class="vmss-hud-event" data-vmss-hud-event>Baseline loaded</span></div>
    </div>
    <div class="vmss-hud-actions">
      <a class="vmss-hud-btn is-primary" href="simulations.html#sti-console">Open simulation</a>
      <a class="vmss-hud-btn" href="layers.html">Open rings</a>
    </div>
  `;
  document.body.appendChild(hud);
  const layerTarget = hud.querySelector('[data-vmss-hud-layer]');
  const scoreTarget = hud.querySelector('[data-vmss-hud-score]');
  const profileTarget = hud.querySelector('[data-vmss-hud-profile]');
  const eventTarget = hud.querySelector('[data-vmss-hud-event]');
  const toggleBtn = hud.querySelector('.vmss-hud-toggle');
  let idleTimer = null;
  const setIdle = (idle) => hud.classList.toggle('is-idle', idle);
  const scheduleIdle = () => {
    clearTimeout(idleTimer);
    setIdle(false);
    idleTimer = setTimeout(() => setIdle(true), 2600);
  };
  const setMinimized = (minimized) => {
    hud.classList.toggle('is-minimized', minimized);
    toggleBtn.textContent = minimized ? '+' : '−';
    toggleBtn.setAttribute('aria-expanded', minimized ? 'false' : 'true');
    toggleBtn.setAttribute('aria-label', minimized ? 'Expand live state panel' : 'Minimize live state panel');
    try {
      localStorage.setItem('vmss_hud_minimized', String(minimized));
    } catch (e) {
      console.warn('HUD minimized state save failed:', e);
    }
  };
  toggleBtn?.addEventListener('click', () => {
    setMinimized(!hud.classList.contains('is-minimized'));
    scheduleIdle();
  });
  ['mouseenter', 'mousemove', 'focusin', 'touchstart'].forEach((evt) => {
    hud.addEventListener(evt, scheduleIdle, { passive: true });
  });
  const apply = (state = window.VMSS?.getState?.() || VMSS_DEFAULT_STATE) => {
    const layer = window.VMSS?.layerForScore?.(Number(state.stiScore) || 0) || vmssLayerForScore(Number(state.stiScore) || 0);
    hud.dataset.layer = state.selectedLayer || layer.key;
    if (layerTarget) layerTarget.textContent = layer.label;
    if (scoreTarget) window.vmssAnimateNumber(scoreTarget, Number(state.stiScore) || 0, { duration: 420 });
    if (profileTarget) profileTarget.textContent = state.profile || 'Balanced baseline';
    if (eventTarget) eventTarget.textContent = state.lastEvent || 'Baseline loaded';
    hud.classList.remove('is-updating');
    void hud.offsetWidth;
    hud.classList.add('is-updating');
    setTimeout(() => hud.classList.remove('is-updating'), 540);
    scheduleIdle();
  };
  document.addEventListener('vmss:state-change', (event) => apply(event.detail?.state));
  setMinimized(savedHudMinimized);
  apply();
}

function initVmssLayerEcho() {
  const layerTargets = Array.from(document.querySelectorAll('[data-vmss-layer-echo]'));
  const scoreTargets = Array.from(document.querySelectorAll('[data-vmss-score-echo]'));
  const eventTargets = Array.from(document.querySelectorAll('[data-vmss-event-echo]'));
  if (!layerTargets.length && !scoreTargets.length && !eventTargets.length) return;
  const apply = () => {
    const state = window.VMSS.getState();
    const layer = window.VMSS.layerForScore(state.stiScore);
    layerTargets.forEach((el) => el.textContent = layer.label);
    scoreTargets.forEach((el) => el.textContent = String(state.stiScore));
    eventTargets.forEach((el) => el.textContent = state.lastEvent || 'Baseline loaded');
  };
  apply();
  document.addEventListener('vmss:state-change', apply);
}

function initVmssLayerLinks() {
  const links = Array.from(document.querySelectorAll('[data-layer]'));
  if (!links.length || !window.VMSS) return;
  const apply = () => {
    const state = window.VMSS.getState();
    links.forEach((link) => link.classList.toggle('is-vmss-current', link.dataset.layer === state.selectedLayer));
  };
  links.forEach((link) => {
    link.addEventListener('click', () => {
      window.VMSS.setState({ selectedLayer: link.dataset.layer, lastEvent: `Focused ${link.dataset.layer} ring` }, { source: 'layer-link' });
    });
  });
  apply();
  document.addEventListener('vmss:state-change', apply);
}

document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => document.body.classList.add('vmss-ui-ready'));
  const html = document.documentElement;

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
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
    const navLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    if (!menuToggle || !mobileMenu) return;

    const setExpanded = (open) => {
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileMenu.classList.toggle('hidden', !open);
      if (hamburgerIcon) hamburgerIcon.classList.toggle('hidden', open);
      if (closeIcon) closeIcon.classList.toggle('hidden', !open);
    };

    menuToggle.addEventListener('click', () => {
      const isOpening = mobileMenu.classList.contains('hidden');
      setExpanded(isOpening);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => setExpanded(false));
    });
  }

  function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    if (!navLinks.length) return;

    let currentPage = window.location.pathname.split('/').pop();
    if (!currentPage || currentPage === '') currentPage = 'index.html';

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;

      if (href === currentPage) {
        link.classList.add('nav-link-active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('nav-link-active');
        link.removeAttribute('aria-current');
      }
    });
  }

  function initJoinModal() {
    const openBtn = document.getElementById('open-entry-modal');
    const closeBtn = document.getElementById('close-entry-modal');
    const entryModal = document.getElementById('entryModal');
    const entryForm = document.getElementById('entryForm');
    const submitBtn = document.getElementById('entry-submit-btn');
    const messageEl = document.getElementById('entry-form-message');

    if (!entryModal) return;

    const lockPage = () => {
      document.body.classList.add('overflow-hidden');
      document.documentElement.classList.add('overflow-hidden');
      document.body.style.touchAction = 'none';
    };

    const unlockPage = () => {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
      document.body.style.touchAction = '';
    };

    const showEntryForm = () => {
      entryModal.classList.remove('hidden');
      entryModal.classList.add('block');
      entryModal.setAttribute('aria-hidden', 'false');
      lockPage();
    };

    const hideEntryForm = () => {
      entryModal.classList.add('hidden');
      entryModal.classList.remove('block');
      entryModal.setAttribute('aria-hidden', 'true');
      unlockPage();
    };

    const setMessage = (text, isError = false) => {
      if (!messageEl) return;
      messageEl.textContent = text;
      messageEl.classList.remove('hidden');
      messageEl.style.color = isError ? '#f87171' : '';
    };

    const clearMessage = () => {
      if (!messageEl) return;
      messageEl.textContent = '';
      messageEl.classList.add('hidden');
      messageEl.style.color = '';
    };

    if (openBtn) openBtn.addEventListener('click', showEntryForm);
    if (closeBtn) closeBtn.addEventListener('click', hideEntryForm);

    entryModal.addEventListener('click', (e) => {
      if (e.target === entryModal) hideEntryForm();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !entryModal.classList.contains('hidden')) {
        hideEntryForm();
      }
    });

    if (!entryForm) return;

    entryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearMessage();

      if (!supabaseClient) {
        setMessage('Submission system is not configured yet.', true);
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }

      const formData = new FormData(entryForm);

      const honeypot = formData.get('company')?.toString().trim();
      if (honeypot) {
        console.warn('Bot submission blocked by honeypot.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Entry Application';
        }
        return;
      }

      const ENTRY_COOLDOWN_MS = 60 * 1000;
      const lastSubmissionTime = localStorage.getItem('vmss_last_submission_time');
      const now = Date.now();

      if (lastSubmissionTime && now - Number(lastSubmissionTime) < ENTRY_COOLDOWN_MS) {
        const secondsLeft = Math.ceil(
          (ENTRY_COOLDOWN_MS - (now - Number(lastSubmissionTime))) / 1000
        );
        setMessage(`Please wait ${secondsLeft} seconds before submitting again.`, true);

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Entry Application';
        }
        return;
      }

      const payload = {
        full_name: formData.get('full_name')?.toString().trim() || '',
        age: Number(formData.get('age')),
        city: formData.get('city')?.toString().trim() || '',
        state: formData.get('state')?.toString().trim() || '',
        country: formData.get('country')?.toString().trim() || '',
        phone: formData.get('phone')?.toString().trim() || '',
        motivation: formData.get('motivation')?.toString().trim() || '',
        consent_implants: formData.get('consent_implants') === 'on',
        consent_reassignment: formData.get('consent_reassignment') === 'on',
        consent_continuity: formData.get('consent_continuity') === 'on',
        consent_charter: formData.get('consent_charter') === 'on'
      };

      try {
        const { error } = await supabaseClient.from('applications').insert([payload]);
        if (error) throw error;

        localStorage.setItem('vmss_last_submission_time', String(Date.now()));

        if (document.getElementById('applicant-count')) loadApplicantCount();
        if (document.getElementById('recent-applicants')) loadRecentApplicants();

        entryForm.reset();
        hideEntryForm();

        setTimeout(() => {
          alert(`✅ Application Received.

Welcome, citizen.

Your application to The Five Rings has been recorded for review.

The choice — and the consequences — are now yours.`);
        }, 200);
      } catch (err) {
        console.error('Submission error:', err);
        setMessage('Submission failed. Please try again in a moment.', true);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Entry Application';
        }
      }
    });
  }

  function initBackArrows() {
    const backArrows = document.querySelectorAll('.back-arrow');
    if (!backArrows.length) return;

    let scrollRaf = null;
    const handleScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        const hidden = window.scrollY > 150;
        backArrows.forEach((arrow) => arrow.classList.toggle('scrolled-hidden', hidden));
        scrollRaf = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  function enhancePageLayout() {
    document.body.classList.add('vmss-page-shell');

    document.querySelectorAll('body > section, main > section').forEach((section) => {
      section.classList.add('vmss-main-section');

      const firstContainer = section.querySelector(':scope > div');
      if (firstContainer) firstContainer.classList.add('vmss-content-frame');

      const firstH1 = section.querySelector('h1');
      if (firstH1) firstH1.classList.add('vmss-title');

      const firstDiv = section.querySelector(':scope > div');
      if (firstDiv) {
        const directChildren = Array.from(firstDiv.children);
        const h1 = directChildren.find((el) => el.tagName === 'H1');
        const introP = h1 ? directChildren.find((el) => el.tagName === 'P') : null;

        if (h1 && introP && !firstDiv.querySelector(':scope > .vmss-page-intro')) {
          const introWrap = document.createElement('div');
          introWrap.className = 'vmss-page-intro reveal-item';
          firstDiv.insertBefore(introWrap, h1);
          introWrap.appendChild(h1);
          introWrap.appendChild(introP);
        }
      }
    });

    document.querySelectorAll('.prose').forEach((el) => {
      el.classList.add('vmss-prose', 'vmss-panel');
      el.classList.remove('prose-invert');
    });

    document.querySelectorAll('.layer-card, .sad-card').forEach((el) => {
      el.classList.add('vmss-enhanced-card', 'reveal-item');
    });

    document
      .querySelectorAll('section [class*="bg-[var(--bg-secondary)]"]')
      .forEach((el) => {
        el.classList.add('vmss-enhanced-panel', 'reveal-item');
      });
  }

  function initReveal() {
    const items = document.querySelectorAll('.reveal-item');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const seen = new WeakSet();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if ((entry.isIntersecting || entry.intersectionRatio > 0) && !seen.has(entry.target)) {
            seen.add(entry.target);
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px -5% 0px'
      }
    );

    items.forEach((item) => observer.observe(item));

    /* Safety fallback — reveal anything still hidden after nav/footer load settles */
    setTimeout(() => {
      items.forEach((item) => {
        if (!seen.has(item)) item.classList.add('is-visible');
      });
    }, 1400);
  }

  Promise.all([
    fetch('navbar.html').then((r) => r.text()).catch(() => '<!-- Navbar fetch failed -->'),
    fetch('footer.html').then((r) => r.text()).catch(() => '<!-- Footer fetch failed -->')
  ])
    .then(([navbarHtml, footerHtml]) => {
      const navPlaceholder = document.getElementById('navbar-placeholder');
      const footerPlaceholder = document.getElementById('footer-placeholder');

      if (navPlaceholder) navPlaceholder.innerHTML = navbarHtml;
      if (footerPlaceholder) footerPlaceholder.innerHTML = footerHtml;

      requestAnimationFrame(() => {
        initThemeToggle();
        initMobileMenu();
        initActiveNav();
        initVmssHud();
        initVmssLayerEcho();
        initVmssLayerLinks();
        initJoinModal();

        if (document.getElementById('applicant-count')) {
          loadApplicantCount();
        }

        if (document.getElementById('recent-applicants')) {
          loadRecentApplicants();
        }
      });
    })
    .catch((err) => console.error('Failed to load layout components:', err));

  enhancePageLayout();
  initBackArrows();
  initReveal();
});
