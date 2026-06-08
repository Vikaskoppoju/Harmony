/* Shared nav + footer injected into every page */

const NAV_HTML = `
<nav id="navbar">
  <div class="nav-inner">
    <a href="/" class="logo">
      <img src="logo_nobg.png" alt="Harmony Spaces by G" class="logo-img"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
      <span class="logo-fallback" style="display:none">
        <span class="logo-mark">H</span>
        <div class="logo-text">
          <span class="logo-main">Harmony Spaces</span>
          <span class="logo-sub">by G</span>
        </div>
      </span>
    </a>
    <ul class="nav-links">
      <li><a href="about.html">About</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="projects.html">Projects</a></li>
      <li><a href="gallery.html">Gallery</a></li>
      <li><a href="contact.html" class="nav-cta">Contact Us</a></li>
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="mobile-menu" id="mobileMenu">
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="projects.html">Projects</a>
    <a href="gallery.html">Gallery</a>
    <a href="contact.html">Contact Us</a>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer id="footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="/" class="logo">
          <img src="logo_nobg.png" alt="Harmony Spaces by G" class="logo-img footer-logo-img"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
          <span class="logo-fallback" style="display:none">
            <span class="logo-mark">H</span>
            <div class="logo-text">
              <span class="logo-main">Harmony Spaces</span>
              <span class="logo-sub">by G</span>
            </div>
          </span>
        </a>
        <p>Transforming spaces into extraordinary experiences across the Middle East and India since 2022.</p>
        <div class="social-links">
          <a href="https://instagram.com/harmony_spaces_by_g" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://wa.me/919804804408" target="_blank" rel="noopener" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href="mailto:ceo@harmonyspacesbyg.com" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-links">
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="projects.html">Projects</a></li>
          <li><a href="gallery.html">Gallery</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-links">
        <h4>Services</h4>
        <ul>
          <li><a href="services.html#residential">Residential Design</a></li>
          <li><a href="services.html#commercial">Commercial Interiors</a></li>
          <li><a href="services.html#construction">Construction & Fit-Out</a></li>
          <li><a href="services.html#visualization">3D Visualization</a></li>
          <li><a href="services.html#furniture">Furniture & Décor</a></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h4>Contact</h4>
        <p><a href="tel:+919804804408">+91 98048 04408</a></p>
        <p><a href="tel:+97333143898">+973 3314 3898</a></p>
        <p><a href="mailto:ceo@harmonyspacesbyg.com">ceo@harmonyspacesbyg.com</a></p>
        <p style="margin-top:1rem;color:rgba(255,255,255,0.5);font-size:0.85rem;">Bahrain · Abu Dhabi · Oman<br/>Hyderabad · Bangalore</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 Harmony Spaces by G. All rights reserved.</p>
      <p>Designed with ♥ for beautiful spaces.</p>
    </div>
  </div>
</footer>

<a class="wa-float" href="https://wa.me/97333143898" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  <span class="wa-tooltip">Chat on WhatsApp</span>
</a>
<button class="back-top" id="backTop" aria-label="Back to top">↑</button>`;

/* Inject nav + footer, then wire shared interactions */
document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

/* Highlight active nav link based on current page */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('nav-active-page');
});

/* Navbar scroll */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* Hamburger */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'))
);

/* Back to top */
document.getElementById('backTop').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

/* Scroll reveal */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
