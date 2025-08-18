(function () {
  async function insertNav() {
    const placeholder = document.getElementById('nav-placeholder');
    if (!placeholder) return;
    try {
      const res = await fetch('/partials/nav.html', { cache: 'no-store' });
      const html = await res.text();
      placeholder.outerHTML = html;

      // Highlight current page link
      const path = location.pathname.replace(/\/index\.html$/, '/');
      document.querySelectorAll('.menu a').forEach(a => {
        if (a.getAttribute('href') === path || a.pathname === location.pathname) {
          a.setAttribute('aria-current', 'page');
        }
      });
    } catch (e) {
      console.error('Nav load failed:', e);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertNav);
  } else {
    insertNav();
  }
})();
