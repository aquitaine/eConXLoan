(function() {
  const app = document.getElementById('ucf-app');
  if (!app) return;

  function badge(text, className) {
    return `<span class="${className}">${text}</span>`;
  }

  function pageHeader(title, subtitle, actions) {
    return `
      <div class="page-header">
        <div>
          <h2>${title}</h2>
          ${subtitle ? `<p class="page-intro">${subtitle}</p>` : ''}
        </div>
        <div class="flex items-center gap-2 flex-wrap">${actions || ''}</div>
      </div>
    `;
  }

  function table(headers, rows) {
    return `
      <table class="data-table">
        <thead><tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((col) => `<td>${col}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    `;
  }

  function card(title, body) {
    return `<div class="card">${title ? `<h3 class="text-lg font-bold text-enx-navy mb-5">${title}</h3>` : ''}${body}</div>`;
  }

  const routes = {
    'approvals-inbox': {
      title: 'Approvals Inbox',
      breadcrumb: 'Approvals Inbox',
      render: function() {
        return `
          ${pageHeader('Approvals Inbox', 'Restricted list of cases awaiting UCF review.')}
          ${table(
            ['Case', 'Organisation', 'Requested Amount', 'Submitted Date', 'Status', 'Action'],
            [
              ['L-24031', 'Harbour Works Ltd', '&pound;110,000', '08 Mar 2026', badge('Pending', 'badge badge-pending'), '<a href="#approval-review" class="btn btn-primary btn-sm">Review</a>'],
              ['L-24019', 'Glenfield Engineering', '&pound;180,000', '07 Mar 2026', badge('Query Back', 'badge badge-review'), '<a href="#approval-review" class="btn btn-outline btn-sm">Review</a>']
            ]
          )}
        `;
      }
    },
    'approval-review': {
      title: 'Approval Review',
      breadcrumb: 'Approval Review',
      render: function() {
        return `
          ${pageHeader('Approval Review', 'Read-only case pack with decision actions limited to approve, query-back, or decline.')}
          <div class="split-layout">
            <div class="space-y-6">
              ${card(
                'Case Summary',
                `
                  <div class="summary-grid">
                    <div><div class="info-item-label">Case</div><div class="info-item-value">L-24031</div><div class="info-item-sub">Harbour Works Ltd</div></div>
                    <div><div class="info-item-label">Requested amount</div><div class="info-item-value">&pound;110,000</div><div class="info-item-sub">Internal approval already recorded</div></div>
                    <div><div class="info-item-label">Repayment day</div><div class="info-item-value">Day 17</div><div class="info-item-sub">CCA pack proposed</div></div>
                  </div>
                `
              )}
              ${card(
                'Supporting Documents',
                `
                  <div class="doc-list">
                    <div class="doc-item"><div class="doc-item-title">Assessment memo v3.pdf</div><div class="doc-item-sub">Uploaded by ENI operations</div></div>
                    <div class="doc-item"><div class="doc-item-title">Equifax report.pdf</div><div class="doc-item-sub">Read-only evidence attachment</div></div>
                    <div class="doc-item"><div class="doc-item-title">Commitments summary.pdf</div><div class="doc-item-sub">Latest affordability evidence</div></div>
                  </div>
                `
              )}
              ${card(
                'Existing Comments',
                `
                  <div class="thread-list">
                    <div class="thread-item"><div class="thread-item-title">ENI operations</div><div class="thread-item-sub">Please review after reduced recommendation to &pound;110,000 following affordability assessment.</div></div>
                    <div class="thread-item"><div class="thread-item-title">Internal approval</div><div class="thread-item-sub">Approved internally subject to UCF confirmation and standard guarantee requirements.</div></div>
                  </div>
                `
              )}
            </div>
            ${card(
              'Decision',
              `
                <div class="space-y-4">
                  <div class="form-group">
                    <label class="form-label">Decision</label>
                    <select class="form-select">
                      <option>Approve</option>
                      <option>Query Back</option>
                      <option>Decline</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Mandatory rationale</label>
                    <textarea class="form-textarea" placeholder="Record the reason for the UCF decision...">Approved based on current pack and internal recommendation.</textarea>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Optional attachment</label>
                    <div class="doc-item"><div class="doc-item-title">No attachment selected</div><div class="doc-item-sub">Decision documents can be uploaded if needed.</div></div>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button class="btn btn-danger" data-form-submit="UCF decline recorded">Decline</button>
                    <button class="btn btn-outline" data-form-submit="UCF query-back recorded">Query Back</button>
                    <a href="#decision-history" class="btn btn-primary">Approve</a>
                  </div>
                </div>
              `
            )}
          </div>
        `;
      }
    },
    'decision-history': {
      title: 'Decision History',
      breadcrumb: 'Decision History',
      render: function() {
        return `
          ${pageHeader('Decision History', 'Completed UCF decisions only. No broader CRM data is exposed.')}
          ${table(
            ['Case', 'Decision', 'Date', 'Comment Summary', 'Documents'],
            [
              ['L-24004', badge('Approved', 'badge badge-active'), '06 Mar 2026', 'Approved with standard guarantee conditions.', '1 attachment'],
              ['L-24002', badge('Declined', 'badge badge-overdue'), '04 Mar 2026', 'Affordability concerns not resolved.', '0 attachments'],
              ['L-23991', badge('Query Back', 'badge badge-review'), '02 Mar 2026', 'Requested updated management accounts.', '1 attachment']
            ]
          )}
        `;
      }
    }
  };

  const defaultRoute = 'approvals-inbox';

  function setActiveNav(route) {
    document.querySelectorAll('.nav-item').forEach(function(item) {
      item.classList.toggle('active', item.getAttribute('data-route') === route);
    });
  }

  function updateHeader(def) {
    document.getElementById('page-title').textContent = def.title;
    document.getElementById('breadcrumb-current').textContent = def.breadcrumb;
    document.title = def.title + ' - UCF Approvals - eConX Portal';
  }

  function render() {
    const route = window.location.hash.replace('#', '') || defaultRoute;
    const def = routes[route] || routes[defaultRoute];
    app.innerHTML = def.render();
    updateHeader(def);
    setActiveNav(route in routes ? route : defaultRoute);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  window.toggleSection = function(header) {
    const section = header.closest('.nav-section');
    if (section) section.classList.toggle('collapsed');
  };

  if (!window.location.hash) {
    window.location.hash = '#' + defaultRoute;
  }

  document.addEventListener('DOMContentLoaded', render);
  window.addEventListener('hashchange', render);
})();
