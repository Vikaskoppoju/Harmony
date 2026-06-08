/* ===========================
   HARMONY SPACES BY G — JS
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  /* ── HAMBURGER ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );

  /* ── BACK TO TOP ── */
  document.getElementById('backTop').addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* ══════════════════════════
     HERO CAROUSEL
  ══════════════════════════ */
  const track   = document.getElementById('carouselTrack');
  const slides  = Array.from(track.querySelectorAll('.slide'));
  const dotsWrap = document.getElementById('carouselDots');
  const fill    = document.getElementById('progressFill');
  let current   = 0;
  let interval;
  const DURATION = 5500;

  function buildDots() {
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Slide ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });
  }

  function updateDots(idx) {
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) =>
      d.classList.toggle('active', i === idx)
    );
  }

  function goTo(idx) {
    slides[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    track.style.transform = `translateX(-${current * 100}%)`;
    updateDots(current);
    resetProgress();
  }

  function resetProgress() {
    fill.style.transition = 'none';
    fill.style.width = '0%';
    requestAnimationFrame(() => {
      fill.style.transition = `width ${DURATION}ms linear`;
      fill.style.width = '100%';
    });
  }

  function startAuto() {
    interval = setInterval(() => goTo(current + 1), DURATION);
  }

  function stopAuto() { clearInterval(interval); }

  buildDots();
  resetProgress();
  startAuto();

  document.getElementById('prevBtn').addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  document.getElementById('nextBtn').addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  /* Touch swipe on carousel */
  let tsX = 0;
  const carouselEl = document.getElementById('carousel');
  carouselEl.addEventListener('touchstart', e => { tsX = e.touches[0].clientX; }, { passive: true });
  carouselEl.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tsX;
    if (Math.abs(dx) > 50) { stopAuto(); goTo(dx < 0 ? current + 1 : current - 1); startAuto(); }
  }, { passive: true });

  /* ── COUNTER ANIMATION ── */
  function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start);
    }, 16);
  }

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.stat-num').forEach(n =>
          animateCounter(n, +n.dataset.target)
        );
        statsObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  /* ══════════════════════════
     SCROLL REVEAL
  ══════════════════════════ */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ══════════════════════════
     3D TILT EFFECT
  ══════════════════════════ */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.setProperty('--rx', `${-y * 10}deg`);
      card.style.setProperty('--ry', `${x * 10}deg`);
      card.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ══════════════════════════
     GALLERY FILTER & LIGHTBOX
  ══════════════════════════ */
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const filterBtns  = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.cat === filter;
        item.classList.toggle('hidden', !match);
      });
    });
  });

  /* Lightbox */
  const lightbox     = document.getElementById('lightbox');
  const lbImg        = document.getElementById('lightboxImg');
  const lbCaption    = document.getElementById('lightboxCaption');
  let   lbIndex      = 0;
  let   visibleItems = galleryItems.filter(i => !i.classList.contains('hidden'));

  function openLightbox(idx) {
    visibleItems = galleryItems.filter(i => !i.classList.contains('hidden'));
    lbIndex = idx;
    const item = visibleItems[lbIndex];
    const img  = item.querySelector('img');
    lbImg.src  = img.src;
    lbImg.alt  = img.alt;
    lbCaption.textContent = item.querySelector('.gallery-hover span')?.textContent || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      visibleItems = galleryItems.filter(it => !it.classList.contains('hidden'));
      const vIdx = visibleItems.indexOf(item);
      if (vIdx > -1) openLightbox(vIdx);
    });
  });

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', () => {
    visibleItems = galleryItems.filter(i => !i.classList.contains('hidden'));
    lbIndex = (lbIndex - 1 + visibleItems.length) % visibleItems.length;
    const img = visibleItems[lbIndex].querySelector('img');
    lbImg.src = img.src; lbImg.alt = img.alt;
    lbCaption.textContent = visibleItems[lbIndex].querySelector('.gallery-hover span')?.textContent || '';
  });
  document.getElementById('lightboxNext').addEventListener('click', () => {
    visibleItems = galleryItems.filter(i => !i.classList.contains('hidden'));
    lbIndex = (lbIndex + 1) % visibleItems.length;
    const img = visibleItems[lbIndex].querySelector('img');
    lbImg.src = img.src; lbImg.alt = img.alt;
    lbCaption.textContent = visibleItems[lbIndex].querySelector('.gallery-hover span')?.textContent || '';
  });
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  document.getElementById('lightboxPrev').click();
    if (e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
  });

  /* ══════════════════════════
     TESTIMONIALS SLIDER
  ══════════════════════════ */
  const tTrack = document.getElementById('testimonialTrack');
  const tCards = Array.from(tTrack.querySelectorAll('.testimonial-card'));
  const tDots  = document.getElementById('tDots');
  let   tCur   = 0;

  tCards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'carousel-dot t-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTest(i));
    tDots.appendChild(d);
  });

  function goTest(idx) {
    tCur = idx;
    tTrack.style.transform = `translateX(-${tCur * 100}%)`;
    tDots.querySelectorAll('.t-dot').forEach((d, i) => d.classList.toggle('active', i === tCur));
  }

  document.getElementById('tPrev').addEventListener('click', () => goTest((tCur - 1 + tCards.length) % tCards.length));
  document.getElementById('tNext').addEventListener('click', () => goTest((tCur + 1) % tCards.length));
  setInterval(() => goTest((tCur + 1) % tCards.length), 5000);

  /* ══════════════════════════
     CONTACT FORM
  ══════════════════════════ */
  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const form    = e.target;
    const success = document.getElementById('formSuccess');
    const btn     = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1200);
  });

  /* ── SMOOTH ACTIVE NAV LINK ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => a.classList.remove('nav-active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('nav-active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));

});
