/**
 * eConX Layout JS
 * Mobile sidebar toggle
 */
(function() {
  // Mobile sidebar toggle
  document.addEventListener('click', function(e) {
    const toggle = e.target.closest('.mobile-toggle');
    if (toggle) {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.toggle('open');
    }
  });

  // Close sidebar on outside click (mobile)
  document.addEventListener('click', function(e) {
    if (window.innerWidth > 1024) return;
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    if (!sidebar.contains(e.target) && !e.target.closest('.mobile-toggle')) {
      sidebar.classList.remove('open');
    }
  });
})();
