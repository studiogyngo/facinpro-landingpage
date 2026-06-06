/**
 * FACINPRO — Landing Page Biomedicina
 * Interações, CRO, UTM, countdown PROUNI e preparação SpotForm/CRM
 */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const EXIT_POPUP_KEY = 'facinpro_exit_popup_shown';

  /* ---------- Ícones SVG para cards de áreas ---------- */
  const AREA_ICONS = {
    microscope: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>',
    lab: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6v7l5 9H4l5-9V3z"/><path d="M9 3h6"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/></svg>',
    scan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18M12 3v18"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
    research: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M10 13h4M10 17h4"/></svg>',
    dna: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3c0 3 2 5 6 5s6-2 6-5M6 21c0-3 2-5 6-5s6 2 6 5M6 9c0 3 2 5 6 5s6-2 6-5M6 15c0 3 2 5 6 5s6-2 6-5"/></svg>',
    gene: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M8 6h8M8 18h8M6 10h12M6 14h12"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6v7l5 9H4l5-9V3z"/></svg>',
    public: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>',
    rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01"/></svg>',
    hospital: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/><path d="M9 9v2M11 11H9"/></svg>',
    pill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.5 20.5l10-10a5 5 0 10-7-7l-10 10a5 5 0 107 7z"/></svg>',
    cosmetic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 014 4v2H8V6a4 4 0 014-4z"/><rect x="8" y="8" width="8" height="14" rx="2"/></svg>',
    consult: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'
  };

  function initAreaIcons() {
    $$('[data-icon]').forEach((el) => {
      const key = el.dataset.icon;
      if (AREA_ICONS[key]) el.innerHTML = AREA_ICONS[key];
    });
  }

  function initReadProgress() {
    const bar = $('#readProgress');
    if (!bar) return;

    window.addEventListener(
      'scroll',
      () => {
        const doc = document.documentElement;
        const scrolled = doc.scrollTop;
        const height = doc.scrollHeight - doc.clientHeight;
        bar.style.width = height > 0 ? `${(scrolled / height) * 100}%` : '0%';
      },
      { passive: true }
    );
  }

  function initHeader() {
    const header = $('#header');
    const toggle = $('#navToggle');
    const nav = $('#mainNav');

    const onScroll = () => {
      if (!header) return;
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    toggle?.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.classList.toggle('menu-open', open);
    });

    $$('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        nav?.classList.remove('open');
        toggle?.classList.remove('active');
        toggle?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });

    const sections = $$('section[id]');
    const navLinks = $$('.nav__link');

    window.addEventListener(
      'scroll',
      () => {
        let current = '';
        sections.forEach((sec) => {
          if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
        });
        navLinks.forEach((link) => {
          const href = link.getAttribute('href')?.slice(1);
          link.classList.toggle('active', href === current);
        });
      },
      { passive: true }
    );
  }

  function initReveal() {
    const reveals = $$('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  function animateCounter(el, target, duration = 1800) {
    const start = performance.now();
    const from = 0;

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(from + (target - from) * eased);
      el.textContent = value.toLocaleString('pt-BR');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = $$('.counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10) || 0;
          animateCounter(el, target);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => observer.observe(c));
  }

  function initProuniCountdown() {
    const target = new Date('2026-08-01T00:00:00-03:00').getTime();
    const daysEl = $('#cd-days');
    const hoursEl = $('#cd-hours');
    const minsEl = $('#cd-mins');
    const secsEl = $('#cd-secs');

    if (!daysEl) return;

    function pad(n) {
      return String(n).padStart(2, '0');
    }

    function tick() {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      daysEl.textContent = pad(d);
      hoursEl.textContent = pad(h);
      minsEl.textContent = pad(m);
      secsEl.textContent = pad(s);
    }

    tick();
    setInterval(tick, 1000);
  }

  function initUtmCapture() {
    const params = new URLSearchParams(window.location.search);
    const fields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];

    const stored = {};
    fields.forEach((key) => {
      const val = params.get(key);
      if (val) {
        stored[key] = val;
        sessionStorage.setItem(`facinpro_${key}`, val);
      } else {
        stored[key] = sessionStorage.getItem(`facinpro_${key}`) || '';
      }
      const input = $(`#${key}`);
      if (input) input.value = stored[key];
    });

    window.FACINPRO_LEAD_CONTEXT = {
      page: 'biomedicina-landing',
      course: 'Biomedicina',
      utm: stored,
      capturedAt: new Date().toISOString()
    };
  }

  function initLeadForm() {
    const form = $('#leadForm');
    const toast = $('#formToast');
    if (!form) return;

    const whatsapp = $('#whatsapp');
    whatsapp?.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
      else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      else if (v.length > 0) v = `(${v}`;
      e.target.value = v;
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nome = $('#nome');
      const wpp = $('#whatsapp');
      const ingresso = $('#forma_ingresso');

      if (!nome?.value.trim() || !wpp?.value.trim() || !ingresso?.value) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      const payload = Object.fromEntries(new FormData(form).entries());

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'lead_submit',
        form_name: 'biomedicina_landing',
        forma_ingresso: payload.forma_ingresso,
        ...window.FACINPRO_LEAD_CONTEXT?.utm
      });

      console.info('[FACINPRO] Lead capturado (modo demo):', payload);

      toast?.removeAttribute('hidden');
      toast?.classList.add('show');
      form.reset();
      sessionStorage.setItem(EXIT_POPUP_KEY, '1');

      initUtmCapture();

      setTimeout(() => {
        toast?.classList.remove('show');
      }, 5000);
    });
  }

  function initCtaPresets() {
    const ingressoSelect = $('#forma_ingresso');

    document.querySelectorAll('[data-cta]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const cta = btn.dataset.cta;
        const map = {
          'hero-enem': 'Nota ENEM',
          'hero-prouni': 'Interesse PROUNI',
          'prouni-alert': 'Interesse PROUNI',
          'enem-cta': 'Nota ENEM'
        };
        if (map[cta] && ingressoSelect) {
          setTimeout(() => {
            ingressoSelect.value = map[cta];
          }, 400);
        }
      });
    });
  }

  function initReelsCarousel() {
    const track = $('#reelsTrack');
    const prev = $('#reelsPrev');
    const next = $('#reelsNext');
    const dotsWrap = $('#reelsDots');
    if (!track) return;

    const cards = $$('.testimonial-card', track);
    let index = 0;

    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => scrollToIndex(i));
      dotsWrap?.appendChild(dot);
    });

    const dots = $$('#reelsDots button');

    function scrollToIndex(i) {
      index = Math.max(0, Math.min(i, cards.length - 1));
      const card = cards[index];
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft - 20, behavior: 'smooth' });
      dots.forEach((d, j) => d.classList.toggle('active', j === index));
    }

    prev?.addEventListener('click', () => scrollToIndex(index - 1));
    next?.addEventListener('click', () => scrollToIndex(index + 1));

    track.addEventListener(
      'scroll',
      () => {
        const scrollLeft = track.scrollLeft;
        let closest = 0;
        let minDist = Infinity;
        cards.forEach((card, i) => {
          const dist = Math.abs(card.offsetLeft - track.offsetLeft - scrollLeft);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });
        index = closest;
        dots.forEach((d, j) => d.classList.toggle('active', j === index));
      },
      { passive: true }
    );

    setInterval(() => {
      if (document.hidden) return;
      scrollToIndex(index + 1 >= cards.length ? 0 : index + 1);
    }, 6000);
  }

  function initUrgency() {
    const el = $('#vagasRestantes');
    if (!el) return;

    const base = 12;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        let n = base;
        const interval = setInterval(() => {
          if (n > 7) {
            n--;
            el.textContent = n;
          } else {
            clearInterval(interval);
          }
        }, 8000);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
  }

  /* ---------- Popup: 1x no final da página + 1x ao tentar fechar o navegador ---------- */
  function initExitPopup() {
    const popup = $('#exitPopup');
    if (!popup) return;

    const form = $('#leadForm');
    const panel = popup.querySelector('.exit-popup__panel');

    const BOTTOM_THRESHOLD = 60;

    const alreadySubmitted = () => sessionStorage.getItem(EXIT_POPUP_KEY) === '1';

    let reachedBottom = false;
    let bottomPopupShown = false;
    let exitIntentShown = false;

    const isNearBottom = () => {
      const doc = document.documentElement;
      return window.innerHeight + window.scrollY >= doc.scrollHeight - BOTTOM_THRESHOLD;
    };

    const close = () => {
      popup.setAttribute('hidden', '');
      document.body.classList.remove('exit-popup-open');
    };

    const open = () => {
      if (alreadySubmitted()) return;
      if (!popup.hasAttribute('hidden')) return;

      popup.removeAttribute('hidden');
      document.body.classList.add('exit-popup-open');

      if (panel) {
        panel.style.animation = 'none';
        void panel.offsetHeight;
        panel.style.animation = '';
      }
    };

    $('#exitPopupClose')?.addEventListener('click', close);
    $('#exitPopupBackdrop')?.addEventListener('click', close);
    $('#exitPopupDismiss')?.addEventListener('click', close);
    $('#exitPopupCta')?.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !popup.hasAttribute('hidden')) close();
    });

    /* Uma única vez ao chegar no final da página */
    window.addEventListener(
      'scroll',
      () => {
        if (alreadySubmitted() || bottomPopupShown) return;

        if (isNearBottom()) {
          reachedBottom = true;
          bottomPopupShown = true;
          open();
        }
      },
      { passive: true }
    );

    /* Uma única vez ao tentar fechar aba/janela (cursor sai pelo topo) */
    document.addEventListener('mouseout', (e) => {
      if (alreadySubmitted() || exitIntentShown) return;
      if (!reachedBottom) return;
      if (e.relatedTarget || e.clientY > 15) return;

      exitIntentShown = true;
      open();
    });

    form?.addEventListener(
      'submit',
      () => {
        sessionStorage.setItem(EXIT_POPUP_KEY, '1');
        close();
      },
      { capture: true }
    );
  }

  function initVideoPlaceholder() {
    $('#playVideo')?.addEventListener('click', () => {
      alert('Substitua o bloco de vídeo pelo embed do YouTube institucional da FACINPRO.');
    });
  }

  function initYear() {
    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function initHeroEntrance() {
    requestAnimationFrame(() => {
      $$('.hero .reveal').forEach((el) => el.classList.add('visible'));
    });
  }

  function init() {
    initAreaIcons();
    initReadProgress();
    initHeader();
    initReveal();
    initCounters();
    initProuniCountdown();
    initUtmCapture();
    initLeadForm();
    initCtaPresets();
    initReelsCarousel();
    initUrgency();
    initExitPopup();
    initVideoPlaceholder();
    initYear();
    initHeroEntrance();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
