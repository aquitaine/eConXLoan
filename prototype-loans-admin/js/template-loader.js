/**
 * eConX Template Loader
 * Loads sidebar and header partials, sets active nav and breadcrumb
 */
(function() {
  const basePath = window.__basePath || '';

  function resolvePath(path) {
    return basePath + path;
  }

  // Replace {base} placeholders in HTML with the actual base path
  function replaceBasePaths(html) {
    return html.replace(/\{base\}/g, basePath);
  }

  async function loadPartial(url, containerId) {
    try {
      const resp = await fetch(resolvePath(url));
      if (!resp.ok) throw new Error(`Failed to load ${url}`);
      let html = await resp.text();
      html = replaceBasePaths(html);
      document.getElementById(containerId).innerHTML = html;
    } catch(e) {
      console.warn('Template loader:', e.message);
    }
  }

  async function init() {
    const body = document.body;
    const pageTitle = body.getAttribute('data-page-title') || 'Overview';
    const breadcrumb = body.getAttribute('data-breadcrumb') || 'Overview';
    const activeNav = body.getAttribute('data-active-nav') || '';

    // Load partials
    await Promise.all([
      loadPartial('partials/sidebar.html', 'sidebar-container'),
      loadPartial('partials/header.html', 'header-container')
    ]);

    // Set page title
    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent = pageTitle;

    // Set breadcrumb
    const bcEl = document.getElementById('breadcrumb-current');
    if (bcEl) bcEl.textContent = breadcrumb;

    // Set document title
    document.title = pageTitle + ' - eConX Portal';

    // Set active nav item
    if (activeNav) {
      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach(item => {
        if (item.getAttribute('data-nav') === activeNav) {
          item.classList.add('active');
          // Ensure parent section is expanded
          const section = item.closest('.nav-section');
          if (section) section.classList.remove('collapsed');
        }
      });
    }

    // Restore sidebar collapsed states
    restoreSidebarState();
  }

  // Sidebar section collapse/expand state persistence
  function restoreSidebarState() {
    try {
      const state = JSON.parse(sessionStorage.getItem('sidebarState') || '{}');
      Object.keys(state).forEach(section => {
        if (state[section] === 'collapsed') {
          const el = document.querySelector(`[data-section="${section}"]`);
          // Don't collapse if it has the active nav item
          if (el && !el.querySelector('.nav-item.active')) {
            el.classList.add('collapsed');
          }
        }
      });
    } catch(e) {}
  }

  // Make toggleSection globally available
  window.toggleSection = function(header) {
    const section = header.closest('.nav-section');
    section.classList.toggle('collapsed');

    // Save state
    try {
      const state = JSON.parse(sessionStorage.getItem('sidebarState') || '{}');
      const sectionId = section.getAttribute('data-section');
      state[sectionId] = section.classList.contains('collapsed') ? 'collapsed' : 'expanded';
      sessionStorage.setItem('sidebarState', JSON.stringify(state));
    } catch(e) {}
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
