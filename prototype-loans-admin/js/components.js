/**
 * eConX Components JS
 * Modal, Tab, Stepper, Toast systems
 */
(function() {

  // ===== MODAL SYSTEM =====
  document.addEventListener('click', function(e) {
    // Open modal
    const trigger = e.target.closest('[data-modal-target]');
    if (trigger) {
      const modalId = trigger.getAttribute('data-modal-target');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
      return;
    }

    // Close modal via close button
    const closeBtn = e.target.closest('[data-modal-close]');
    if (closeBtn) {
      const modal = closeBtn.closest('.modal-overlay');
      if (modal) closeModal(modal);
      return;
    }

    // Close modal via overlay click
    if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('active')) {
      closeModal(e.target);
    }
  });

  // Close modal on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal-overlay.active');
      if (openModal) closeModal(openModal);
    }
  });

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ===== TAB SYSTEM =====
  document.addEventListener('click', function(e) {
    const tabBtn = e.target.closest('[data-tab]');
    if (!tabBtn) return;

    const tabContainer = tabBtn.closest('[data-tabs]') || tabBtn.parentElement;
    const tabGroup = tabContainer.getAttribute('data-tabs') || tabBtn.getAttribute('data-tab-group');
    const tabName = tabBtn.getAttribute('data-tab');

    // Update tab buttons
    const allBtns = tabContainer.querySelectorAll('[data-tab]');
    allBtns.forEach(btn => btn.classList.remove('active'));
    tabBtn.classList.add('active');

    // Update tab panels
    const parent = tabContainer.parentElement;
    const panels = parent.querySelectorAll('[data-tab-panel]');
    panels.forEach(panel => {
      panel.classList.toggle('active', panel.getAttribute('data-tab-panel') === tabName);
    });
  });

  // ===== STEPPER SYSTEM =====
  window.stepperGoTo = function(stepperEl, stepNum) {
    const steps = stepperEl.querySelectorAll('.step');
    const lines = stepperEl.querySelectorAll('.step-line');
    const contents = stepperEl.parentElement.querySelectorAll('.step-content');

    steps.forEach((step, i) => {
      const num = i + 1;
      step.classList.remove('active', 'completed');
      if (num < stepNum) step.classList.add('completed');
      else if (num === stepNum) step.classList.add('active');
    });

    lines.forEach((line, i) => {
      line.classList.toggle('completed', i < stepNum - 1);
    });

    contents.forEach(content => {
      const contentStep = parseInt(content.getAttribute('data-step-content'));
      content.classList.toggle('active', contentStep === stepNum);
    });

    // Store current step
    stepperEl.setAttribute('data-current-step', stepNum);
  };

  document.addEventListener('click', function(e) {
    // Next step
    const nextBtn = e.target.closest('[data-stepper-next]');
    if (nextBtn) {
      const stepper = document.querySelector('.stepper');
      if (stepper) {
        const current = parseInt(stepper.getAttribute('data-current-step') || '1');
        const maxSteps = stepper.querySelectorAll('.step').length;
        if (current < maxSteps) stepperGoTo(stepper, current + 1);
      }
      return;
    }

    // Previous step
    const prevBtn = e.target.closest('[data-stepper-prev]');
    if (prevBtn) {
      const stepper = document.querySelector('.stepper');
      if (stepper) {
        const current = parseInt(stepper.getAttribute('data-current-step') || '1');
        if (current > 1) stepperGoTo(stepper, current - 1);
      }
      return;
    }
  });

  // ===== TOAST SYSTEM =====
  window.showToast = function(message, type) {
    type = type || 'success';
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast' + (type === 'error' ? ' error' : '');

    const icon = type === 'success'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>';

    toast.innerHTML = icon + '<span>' + message + '</span>';
    container.appendChild(toast);

    setTimeout(function() {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(function() {
        toast.remove();
        if (container.children.length === 0) container.remove();
      }, 300);
    }, 3000);
  };

  // ===== FORM SUBMIT HANDLER (Visual Only) =====
  document.addEventListener('click', function(e) {
    const submitBtn = e.target.closest('[data-form-submit]');
    if (submitBtn) {
      const message = submitBtn.getAttribute('data-form-submit') || 'Successfully saved!';
      const modal = submitBtn.closest('.modal-overlay');
      if (modal) closeModal(modal);
      showToast(message);
    }
  });

  // ===== SWITCH TOGGLE =====
  document.addEventListener('click', function(e) {
    const toggle = e.target.closest('.switch-toggle');
    if (toggle) {
      toggle.classList.toggle('active');
    }
  });

  // ===== TREE VIEW =====
  document.addEventListener('click', function(e) {
    const treeToggle = e.target.closest('.tree-toggle');
    if (treeToggle) {
      treeToggle.classList.toggle('expanded');
      const children = treeToggle.nextElementSibling;
      if (children && children.classList.contains('tree-children')) {
        children.classList.toggle('expanded');
      }
    }
  });

  // ===== DROPDOWN MENU =====
  document.addEventListener('click', function(e) {
    const actionBtn = e.target.closest('.table-actions-btn');
    if (actionBtn) {
      // Close all other dropdowns first
      document.querySelectorAll('.action-dropdown.active').forEach(d => d.classList.remove('active'));
      const dropdown = actionBtn.nextElementSibling;
      if (dropdown && dropdown.classList.contains('action-dropdown')) {
        dropdown.classList.toggle('active');
      }
      return;
    }
    // Close dropdowns on outside click
    if (!e.target.closest('.action-dropdown')) {
      document.querySelectorAll('.action-dropdown.active').forEach(d => d.classList.remove('active'));
    }
  });

})();
