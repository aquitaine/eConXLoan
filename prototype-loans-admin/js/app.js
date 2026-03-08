(function() {
  const app = document.getElementById('app');
  if (!app) return;

  const badgeMap = {
    'Draft': 'badge badge-draft',
    'Pending': 'badge badge-pending',
    'In Progress': 'badge badge-in-progress',
    'Query Back': 'badge badge-review',
    'Approved': 'badge badge-active',
    'Declined': 'badge badge-overdue',
    'Awaiting Signature': 'badge badge-pending',
    'Accepted': 'badge badge-active',
    'Setup Pending': 'badge badge-pending',
    'Ready to Disburse': 'badge badge-review',
    'Completed': 'badge badge-completed',
    'Overdue': 'badge badge-overdue',
    'Not Started': 'badge badge-draft',
    'Captured': 'badge badge-review',
    'Active': 'badge badge-active',
    'Suspended': 'badge badge-review',
    'Cancelled': 'badge badge-overdue',
    'Scheduled': 'badge badge-pending',
    'Ready': 'badge badge-review',
    'Submitted': 'badge badge-in-progress',
    'Imported': 'badge badge-review',
    'Needs Review': 'badge badge-review',
    'Paid': 'badge badge-active',
    'Partially Paid': 'badge badge-pending',
    'Failed': 'badge badge-overdue',
    'Open': 'badge badge-pending',
    'Matched': 'badge badge-review',
    'Allocated': 'badge badge-active',
    'Retried': 'badge badge-review',
    'Resolved': 'badge badge-active'
  };

  function badge(text) {
    return `<span class="${badgeMap[text] || 'badge badge-draft'}">${text}</span>`;
  }

  function button(label, href, variant) {
    variant = variant || 'outline';
    return `<a href="${href}" class="btn btn-${variant}">${label}</a>`;
  }

  function iconButton(label, href, icon, variant) {
    return `<a href="${href}" class="btn btn-${variant || 'outline'}">${icon || ''}${label}</a>`;
  }

  function pageHeader(title, subtitle, actions) {
    return `
      <div class="page-header">
        <div>
          <h2>${title}</h2>
          ${subtitle ? `<p class="page-intro">${subtitle}</p>` : ''}
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          ${actions || ''}
        </div>
      </div>
    `;
  }

  function kpiCard(label, value, sub, icon) {
    return `
      <div class="kpi-card">
        <div class="kpi-icon">${icon}</div>
        <div>
          <div class="kpi-label">${label}</div>
          <div class="kpi-value">${value}</div>
          <div class="kpi-sub">${sub}</div>
        </div>
      </div>
    `;
  }

  function miniStat(label, value, sub) {
    return `
      <div class="mini-stat">
        <div class="mini-stat-label">${label}</div>
        <div class="mini-stat-value">${value}</div>
        <div class="mini-stat-sub">${sub}</div>
      </div>
    `;
  }

  function avatar(initials, tone) {
    const styles = {
      green: 'background:#dcfce7;color:#16a34a;',
      blue: 'background:#eff6ff;color:#2563eb;',
      amber: 'background:#fff7ed;color:#ea580c;',
      red: 'background:#fef2f2;color:#dc2626;',
      gray: 'background:#f3f4f6;color:#6b7280;'
    };
    return `<div class="table-avatar" style="${styles[tone] || ''}">${initials}</div>`;
  }

  function cell(main, sub, tone) {
    return `
      <div style="display:flex; align-items:center; gap:12px;">
        ${tone ? avatar(main.slice(0, 2).toUpperCase(), tone) : ''}
        <div>
          <div class="table-cell-main">${main}</div>
          ${sub ? `<div class="table-cell-sub">${sub}</div>` : ''}
        </div>
      </div>
    `;
  }

  function table(headers, rows) {
    return `
      <table class="data-table">
        <thead>
          <tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${rows.map((row) => `<tr>${row.map((col) => `<td>${col}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    `;
  }

  function card(title, body, action) {
    return `
      <div class="card">
        ${title ? `<div class="flex items-center justify-between mb-5"><h3 class="text-lg font-bold text-enx-navy">${title}</h3>${action || ''}</div>` : ''}
        ${body}
      </div>
    `;
  }

  function stageTrack() {
    return `
      <div class="stage-track">
        <div class="stage-node complete">
          <div class="stage-node-title">Enquiry</div>
          <div class="stage-node-sub">Imported and verified</div>
        </div>
        <div class="stage-line complete"></div>
        <div class="stage-node complete">
          <div class="stage-node-title">Application</div>
          <div class="stage-node-sub">Forms signed</div>
        </div>
        <div class="stage-line complete"></div>
        <div class="stage-node active">
          <div class="stage-node-title">Assessment</div>
          <div class="stage-node-sub">Credit evidence pending sign-off</div>
        </div>
        <div class="stage-line"></div>
        <div class="stage-node">
          <div class="stage-node-title">Approval</div>
          <div class="stage-node-sub">Internal and UCF decision</div>
        </div>
        <div class="stage-line"></div>
        <div class="stage-node">
          <div class="stage-node-title">Offer</div>
          <div class="stage-node-sub">CCA / Non-CCA pack</div>
        </div>
        <div class="stage-line"></div>
        <div class="stage-node">
          <div class="stage-node-title">Setup</div>
          <div class="stage-node-sub">Signing completion and loan record</div>
        </div>
      </div>
    `;
  }

  function routesIntro(text) {
    return `<p class="prototype-note">${text}</p>`;
  }

  const routes = {
    'overview': {
      title: 'Overview',
      breadcrumb: 'Overview',
      render: function() {
        const queueCards = `
          <div class="queue-list">
            <a href="#work-queues" class="queue-card">
              <div>
                <div class="queue-card-title">Manual checks pending</div>
                <div class="queue-card-sub">12 cases missing credit evidence, ID review, or commitments.</div>
              </div>
              <div class="number-pill">12</div>
            </a>
            <a href="#internal-approvals" class="queue-card">
              <div>
                <div class="queue-card-title">Approvals ready</div>
                <div class="queue-card-sub">5 cases are packaged and waiting for internal decision.</div>
              </div>
              <div class="number-pill">5</div>
            </a>
            <a href="#pending-setup" class="queue-card">
              <div>
                <div class="queue-card-title">Signed cases pending setup</div>
                <div class="queue-card-sub">3 signed cases still need internal agreement finalisation, bank data, or mandate setup.</div>
              </div>
              <div class="number-pill">3</div>
            </a>
            <a href="#outcome-import" class="queue-card">
              <div>
                <div class="queue-card-title">Outcome files awaiting import</div>
                <div class="queue-card-sub">1 submitted Bacs batch is waiting for result import and line matching.</div>
              </div>
              <div class="number-pill">1</div>
            </a>
            <a href="#reconciliation-queue" class="queue-card">
              <div>
                <div class="queue-card-title">Reconciliation issues</div>
                <div class="queue-card-sub">4 repayment exceptions need allocation, retry, or dispute handling.</div>
              </div>
              <div class="number-pill">4</div>
            </a>
          </div>
        `;

        const ageingChart = `
          <div class="bar-chart">
            ${[
              ['Enquiry', '18', 110],
              ['Application', '12', 90],
              ['Assessment', '9', 160],
              ['Approval', '5', 100],
              ['Offer', '4', 120],
              ['Setup', '3', 80]
            ].map(function(item) {
              return `
                <div class="bar-col">
                  <div class="bar" style="height:${item[2]}px"></div>
                  <div class="bar-value">${item[1]}</div>
                  <div class="bar-label">${item[0]}</div>
                </div>
              `;
            }).join('')}
          </div>
        `;

        return `
          ${pageHeader(
            'Loans Overview',
            'Daily operational view across enquiries, live cases, signatures, setup, and active-loan servicing.',
            iconButton('New Enquiry', '#manage-enquiries', '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>', 'primary') +
            button('Export Dashboard', '#reporting', 'outline')
          )}

          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
            ${kpiCard('Active Enquiries', '24', '7 due follow-up today', '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>')}
            ${kpiCard('Cases In Progress', '42', 'Across application to offer', '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h12"/></svg>')}
            ${kpiCard('Pending Approvals', '8', '5 internal, 3 UCF', '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>')}
            ${kpiCard('Awaiting Signature', '6', '4 viewed, 2 sent today', '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>')}
            ${kpiCard('Pending Setup', '3', 'Agreement or bank data incomplete', '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>')}
            ${kpiCard('Ready To Disburse', '2', 'All gates satisfied', '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7H14a3.5 3.5 0 010 7H6"/></svg>')}
            ${kpiCard('Submitted Collections', '18', 'Next outcome file due 18 Mar 2026', '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h10M7 13h6"/></svg>')}
            ${kpiCard('Failed Collections', '4', '2 already queued for retry', '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>')}
            ${kpiCard('Unapplied Credit', '&pound;640', 'Across 3 active loans', '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 000 7H14a3.5 3.5 0 010 7H6"/></svg>')}
          </div>

          <div class="card mb-6">
            <div class="flex items-center justify-between mb-5">
              <h3 class="text-lg font-bold text-enx-navy">Stage Pipeline</h3>
              <a class="subtle-link" href="#manage-cases">Open master case list</a>
            </div>
            ${stageTrack()}
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            ${card('Queue Hotspots', queueCards)}
            ${card('Ageing By Stage', ageingChart)}
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            ${card(
              'Alerts',
              `
                <div class="warning-banner">4 cases are overdue for follow-up, 2 offers will expire in 48 hours, and 4 repayment outcomes need reconciliation before month-end reporting.</div>
                <div class="doc-list">
                  <div class="doc-item">
                    <div class="doc-item-title">Signature blocked on case L-24031</div>
                    <div class="doc-item-sub">Missing guarantor attachment. Ownership: Sarah Mitchell.</div>
                  </div>
                  <div class="doc-item">
                    <div class="doc-item-title">Manual check escalation on case L-24019</div>
                    <div class="doc-item-sub">Equifax report uploaded but affordability commitments not finalised.</div>
                  </div>
                  <div class="doc-item">
                    <div class="doc-item-title">Imported return line unmatched for LN-1012-003</div>
                    <div class="doc-item-sub">Amount differs from due line. Review in reconciliation queue.</div>
                  </div>
                </div>
              `
            )}
            ${card(
              'Recent Activity',
              `
                <div class="timeline">
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                      <div class="font-semibold text-enx-navy text-sm">Internal approval recorded for Harbour Works Ltd</div>
                      <p class="text-sm text-gray-500 mt-1">Approved at &pound;120,000 with repayment day set to Day 17.</p>
                      <div class="timeline-time">Today, 11:42 AM</div>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                      <div class="font-semibold text-enx-navy text-sm">UCF query-back received for Glenfield Engineering</div>
                      <p class="text-sm text-gray-500 mt-1">Requested updated commitments summary and latest management accounts.</p>
                      <div class="timeline-time">Today, 09:18 AM</div>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                      <div class="font-semibold text-enx-navy text-sm">Bacs batch BACS-2026-03-17-01 exported</div>
                      <p class="text-sm text-gray-500 mt-1">18 repayment lines moved from Scheduled to Submitted with stable repayment references.</p>
                      <div class="timeline-time">Today, 08:32 AM</div>
                    </div>
                  </div>
                </div>
              `
            )}
          </div>
        `;
      }
    },
    'work-queues': {
      title: 'Work Queues',
      breadcrumb: 'Work Queues',
      render: function() {
        return `
          ${pageHeader('Work Queues', 'Queue-first operational triage across the Phase 1 lending and repayment workflow.')}

          <div class="mini-stat-grid">
            ${miniStat('Due Today', '17', 'Tasks or follow-ups with today as due date')}
            ${miniStat('Overdue', '4', 'Needs immediate attention')}
            ${miniStat('Blocked', '6', 'Waiting on customer, document, or repayment outcome input')}
            ${miniStat('Ready For Decision', '8', 'Assessment complete and routed')}
          </div>

          <div class="chip-row">
            <span class="chip">Verification Required</span>
            <span class="chip">Supplementary Forms</span>
            <span class="chip">Manual Checks</span>
            <span class="chip">Approvals</span>
            <span class="chip">Signatures</span>
            <span class="chip">Setup Pending</span>
            <span class="chip">Outcome Import</span>
            <span class="chip">Reconciliation</span>
          </div>

          ${table(
            ['Case', 'Queue Reason', 'Stage', 'Follow-up', 'Owner', 'Age', 'Status', 'Actions'],
            [
              [cell('Harbour Works Ltd', 'L-24031 · 1 beneficial owner outstanding'), 'Supplementary form outstanding', 'Application', 'Today', 'Sarah Mitchell', '3d', badge('Pending'), button('Open', '#case-workspace', 'outline')],
              [cell('Glenfield Engineering', 'L-24019 · Query-back from UCF'), 'Updated commitments requested', 'Approval', 'Overdue', 'Colin Boyd', '11d', badge('Overdue'), button('Open', '#approval-review', 'outline')],
              [cell('North Shore Foods', 'L-24042 · Equifax evidence uploaded'), 'Manual credit review needed', 'Assessment', 'Tomorrow', 'Irene Kelly', '2d', badge('In Progress'), button('Assess', '#assessment-workspace', 'outline')],
              [cell('Newtown Creative CIC', 'L-24036 · Offer created'), 'Awaiting DocuSign send', 'Offer', 'Today', 'Aisling Kane', '1d', badge('Pending'), button('Send Pack', '#legal-pack', 'primary')],
              [cell('Ballymena Print Co', 'L-24008 · Signed yesterday'), 'Bank details incomplete', 'Setup', 'Today', 'Ryan O\'Neill', '1d', badge('Setup Pending'), button('Continue', '#loan-setup', 'primary')],
              [cell('LN-1012', 'Mackle Precision · batch BACS-2026-03-17-01'), 'Imported return needs allocation', 'Repayment', 'Today', 'Aisling Kane', '0d', badge('Needs Review'), button('Review', '#reconciliation-queue', 'outline')]
            ]
          )}
        `;
      }
    },
    'reporting': {
      title: 'Reporting',
      breadcrumb: 'Reporting',
      render: function() {
        return `
          ${pageHeader('Reporting', 'Operational MI and export entry points across pipeline and live-loan servicing.', button('Export CSV', '#reporting', 'primary'))}

          <div class="chip-row">
            <span class="chip">Last 30 days</span>
            <span class="chip">All owners</span>
            <span class="chip">All referral sources</span>
            <span class="chip">CCA + Non-CCA</span>
            <span class="chip">Active loans included</span>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            ${card(
              'Pipeline By Stage',
              `
                <div class="bar-chart">
                  ${[
                    ['Enquiry', '24', 130],
                    ['Application', '18', 120],
                    ['Assessment', '14', 165],
                    ['Approval', '8', 110],
                    ['Offer', '6', 90],
                    ['Setup', '3', 70]
                  ].map(function(item) {
                    return `<div class="bar-col"><div class="bar" style="height:${item[2]}px"></div><div class="bar-value">${item[1]}</div><div class="bar-label">${item[0]}</div></div>`;
                  }).join('')}
                </div>
              `
            )}
            ${card(
              'Conversion Snapshot',
              `
                <div class="summary-grid">
                  <div class="status-block"><div class="eyebrow">Enquiry to Case</div><div class="mini-stat-value">62%</div><div class="mini-stat-sub">Best source: accountant referral</div></div>
                  <div class="status-block"><div class="eyebrow">Assessment to Approval</div><div class="mini-stat-value">71%</div><div class="mini-stat-sub">Average cycle time: 4.2 days</div></div>
                  <div class="status-block"><div class="eyebrow">Offer to Signing</div><div class="mini-stat-value">83%</div><div class="mini-stat-sub">Average signature turnaround: 2.1 days</div></div>
                </div>
              `
            )}
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            ${card(
              'Collections Snapshot',
              `
                <div class="summary-grid">
                  <div class="status-block"><div class="eyebrow">Submitted this cycle</div><div class="mini-stat-value">18</div><div class="mini-stat-sub">&pound;5,240 in current batch</div></div>
                  <div class="status-block"><div class="eyebrow">Paid successfully</div><div class="mini-stat-value">14</div><div class="mini-stat-sub">77.8% after latest import</div></div>
                  <div class="status-block"><div class="eyebrow">Needs review</div><div class="mini-stat-value">4</div><div class="mini-stat-sub">Partial, failed, or unmatched items</div></div>
                </div>
              `,
              button('Open Repayments', '#repayments-overview', 'outline')
            )}
            ${card(
              'Servicing Alerts',
              `
                <div class="doc-list">
                  <div class="doc-item"><div class="doc-item-title">Failed collections</div><div class="doc-item-sub">4 lines imported as failed or overdue this cycle.</div></div>
                  <div class="doc-item"><div class="doc-item-title">Unapplied credit</div><div class="doc-item-sub">&pound;640 awaiting operator allocation.</div></div>
                  <div class="doc-item"><div class="doc-item-title">Next batch build</div><div class="doc-item-sub">17 Mar 2026 includes 21 eligible schedule lines.</div></div>
                </div>
              `
            )}
          </div>

          ${card(
            'Export Centre',
            `
              <div class="export-grid">
                <div class="queue-card">
                  <div>
                    <div class="queue-card-title">Pipeline Extract</div>
                    <div class="queue-card-sub">Stage, owner, ageing, and follow-up level case export.</div>
                  </div>
                  ${button('Download', '#reporting', 'outline')}
                </div>
                <div class="queue-card">
                  <div>
                    <div class="queue-card-title">Approval Outcomes</div>
                    <div class="queue-card-sub">Internal and UCF decisions with reasons and timestamps.</div>
                  </div>
                  ${button('Download', '#reporting', 'outline')}
                </div>
                <div class="queue-card">
                  <div>
                    <div class="queue-card-title">Audit Export</div>
                    <div class="queue-card-sub">Stage changes, edits, communications, and upload events.</div>
                  </div>
                  ${button('Download', '#reporting', 'outline')}
                </div>
                <div class="queue-card">
                  <div>
                    <div class="queue-card-title">Batch History</div>
                    <div class="queue-card-sub">Submission batches, exported totals, and import status.</div>
                  </div>
                  ${button('Download', '#collection-batches', 'outline')}
                </div>
                <div class="queue-card">
                  <div>
                    <div class="queue-card-title">Applied Payments</div>
                    <div class="queue-card-sub">Ledger entries and schedule lines cleared by imported outcomes.</div>
                  </div>
                  ${button('Download', '#outcome-import', 'outline')}
                </div>
                <div class="queue-card">
                  <div>
                    <div class="queue-card-title">Failed & Overdue</div>
                    <div class="queue-card-sub">Failed collections, overdue lines, and retry outcomes.</div>
                  </div>
                  ${button('Download', '#reconciliation-queue', 'outline')}
                </div>
                <div class="queue-card">
                  <div>
                    <div class="queue-card-title">Unapplied Credit</div>
                    <div class="queue-card-sub">Overpayments awaiting manual allocation to a loan schedule.</div>
                  </div>
                  ${button('Download', '#reconciliation-queue', 'outline')}
                </div>
              </div>
            `
          )}
        `;
      }
    },
    'manage-enquiries': {
      title: 'Manage Enquiries',
      breadcrumb: 'Manage Enquiries',
      render: function() {
        return `
          ${pageHeader('Manage Enquiries', 'Import-first intake with duplicate awareness and quick routing into cases.', iconButton('Add Enquiry', '#enquiry-review', '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>', 'primary'))}

          <div class="toolbar">
            <div class="search-box">
              <input type="text" placeholder="Search enquiries by organisation, contact, or ID">
              <button class="btn btn-primary btn-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            </div>
            <div class="toolbar-right">
              <button class="btn btn-outline btn-sm">Filter</button>
              <button class="btn btn-outline btn-sm">Import Batch Review</button>
            </div>
          </div>

          ${table(
            ['Enquiry', 'Referral Source', 'Amount Sought', 'Follow-up', 'Outcome', 'Duplicate Flag', 'Owner', 'Actions'],
            [
              [cell('E-24088', 'Harbour Works Ltd · john@harbourworks.com'), 'Accountant referral', '&pound;120,000', 'Today', 'Proceed', '<span class="badge badge-pending">Possible duplicate</span>', 'Sarah Mitchell', button('Review', '#enquiry-review', 'outline')],
              [cell('E-24084', 'Ballymena Print Co · admin@ballyprint.co.uk'), 'Website handoff', '&pound;45,000', 'Tomorrow', 'Proceed', '<span class="badge badge-draft">No duplicate</span>', 'Ryan O\'Neill', button('Review', '#enquiry-review', 'outline')],
              [cell('E-24079', 'Glenfield Engineering · roisin@glenfieldeng.com'), 'Partner intro', '&pound;180,000', 'Overdue', 'Refer', '<span class="badge badge-review">Review existing org</span>', 'Colin Boyd', button('Review', '#enquiry-review', 'outline')],
              [cell('E-24074', 'North Shore Foods · contact@northshorefoods.com'), 'LEA referral', '&pound;75,000', 'Fri 12 Mar', 'Proceed', '<span class="badge badge-draft">No duplicate</span>', 'Irene Kelly', button('Review', '#enquiry-review', 'outline')]
            ]
          )}
        `;
      }
    },
    'enquiry-review': {
      title: 'Enquiry Review',
      breadcrumb: 'Enquiry Review',
      render: function() {
        return `
          ${pageHeader('Enquiry Review', 'Review intake details, resolve duplicates, and route the enquiry.', button('Back to Enquiries', '#manage-enquiries', 'outline'))}

          <div class="workspace-summary">
            <div class="card">
              <div class="flex items-center justify-between mb-5">
                <div>
                  <div class="eyebrow">Enquiry ID</div>
                  <div class="text-2xl font-bold text-enx-navy">E-24088</div>
                </div>
                ${badge('Pending')}
              </div>
              <div class="info-list">
                <div class="info-row">
                  <div><div class="info-item-label">Organisation</div><div class="info-item-value">Harbour Works Ltd</div><div class="info-item-sub">john@harbourworks.com</div></div>
                  <div><div class="info-item-label">Source</div><div class="info-item-value">Accountant referral</div><div class="info-item-sub">Imported from NISBLF handoff</div></div>
                  <div><div class="info-item-label">Amount sought</div><div class="info-item-value">&pound;120,000</div><div class="info-item-sub">Follow-up due today</div></div>
                </div>
                <div>
                  <div class="info-item-label">Free-text details</div>
                  <div class="text-sm text-gray-600 leading-6">Seeking working capital support to expand fabrication capacity and hire two technical staff. Business has traded for six years and currently banks with Bank of Ireland.</div>
                </div>
              </div>
            </div>
            <div class="card">
              <h3 class="text-lg font-bold text-enx-navy mb-4">Next Actions</h3>
              <div class="doc-list mb-5">
                <div class="doc-item"><div class="doc-item-title">Resolve duplicate</div><div class="doc-item-sub">One similar organisation match found.</div></div>
                <div class="doc-item"><div class="doc-item-title">Set case owner</div><div class="doc-item-sub">Sarah Mitchell currently assigned.</div></div>
              </div>
              <div class="flex flex-wrap gap-2">
                <button class="btn btn-outline" data-modal-target="duplicate-modal">Resolve Duplicate</button>
                <a href="#manage-enquiries" class="btn btn-secondary">Reject</a>
                <a href="#manage-enquiries" class="btn btn-outline">Refer</a>
                <a href="#case-workspace" class="btn btn-primary">Proceed to Case</a>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            ${card(
              'Duplicate Candidates',
              `
                <div class="doc-list">
                  <div class="doc-item">
                    <div class="doc-item-title">Harbourworks Fabrication Ltd</div>
                    <div class="doc-item-sub">Existing organisation record · Main contact: John Keenan · Last active 4 months ago</div>
                  </div>
                </div>
              `
            )}
            ${card(
              'Enquiry History',
              `
                <div class="timeline">
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                      <div class="font-semibold text-enx-navy text-sm">Enquiry imported</div>
                      <p class="text-sm text-gray-500 mt-1">Imported from handoff batch March-08-A with referral source and amount populated.</p>
                      <div class="timeline-time">Today, 08:12 AM</div>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                      <div class="font-semibold text-enx-navy text-sm">Potential duplicate flagged</div>
                      <p class="text-sm text-gray-500 mt-1">Organisation name similarity above threshold.</p>
                      <div class="timeline-time">Today, 08:12 AM</div>
                    </div>
                  </div>
                </div>
              `
            )}
          </div>

          <div class="modal-overlay" id="duplicate-modal">
            <div class="modal modal-lg">
              <div class="modal-header">
                <h3>Resolve Duplicate</h3>
                <button class="modal-close" data-modal-close>&times;</button>
              </div>
              <div class="modal-body">
                <p class="text-sm text-gray-500 mb-4">Choose whether to link the enquiry to an existing organisation or confirm a new record.</p>
                <div class="doc-list">
                  <div class="doc-item">
                    <div class="doc-item-title">Harbourworks Fabrication Ltd</div>
                    <div class="doc-item-sub">NI245991 · 92% match · Main contact: John Keenan</div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary" data-modal-close>Cancel</button>
                <button class="btn btn-outline" data-form-submit="Confirmed as new organisation">Create New</button>
                <button class="btn btn-primary" data-form-submit="Linked to existing organisation">Use Existing Record</button>
              </div>
            </div>
          </div>
        `;
      }
    },
    'manage-cases': {
      title: 'Manage Cases',
      breadcrumb: 'Manage Cases',
      render: function() {
        return `
          ${pageHeader('Manage Cases', 'Master view of active loan cases from enquiry through setup.')}

          <div class="chip-row">
            <span class="chip">My Cases</span>
            <span class="chip">Overdue</span>
            <span class="chip">Blocked</span>
            <span class="chip">Ready For Approval</span>
          </div>

          ${table(
            ['Case', 'Stage', 'Outcome', 'Follow-up', 'Internal', 'UCF', 'Signature', 'Owner', 'Actions'],
            [
              [cell('L-24031', 'Harbour Works Ltd'), 'Assessment', 'Proceed to approval', 'Today', badge('Pending'), badge('Pending'), '<span class="badge badge-draft">Not started</span>', 'Sarah Mitchell', button('Open', '#case-workspace', 'outline')],
              [cell('L-24019', 'Glenfield Engineering'), 'Approval', 'Query-back received', 'Overdue', badge('Approved'), badge('Query Back'), '<span class="badge badge-draft">N/A</span>', 'Colin Boyd', button('Open', '#approval-review', 'outline')],
              [cell('L-24036', 'Newtown Creative CIC'), 'Offer', 'Legal pack ready', 'Today', badge('Approved'), badge('Approved'), badge('Awaiting Signature'), 'Aisling Kane', button('Open', '#legal-pack', 'outline')],
              [cell('L-24008', 'Ballymena Print Co'), 'Setup', 'Accepted', 'Today', badge('Approved'), badge('Approved'), badge('Completed'), 'Ryan O\'Neill', button('Open', '#loan-setup', 'outline')]
            ]
          )}
        `;
      }
    },
    'case-workspace': {
      title: 'Case Workspace',
      breadcrumb: 'Case Workspace',
      render: function() {
        return `
          ${pageHeader('Case Workspace', 'Central case hub with parties, tasks, documents, communications, and audit.', button('Advance Stage', '#assessment-workspace', 'primary'))}

          <div class="workspace-summary">
            <div class="card">
              <div class="flex items-center justify-between mb-5">
                <div>
                  <div class="eyebrow">Case ID</div>
                  <div class="text-2xl font-bold text-enx-navy">L-24031</div>
                  <div class="prototype-note mt-1">Harbour Works Ltd · Main contact John Keenan</div>
                </div>
                ${badge('In Progress')}
              </div>
              ${stageTrack()}
            </div>
            <div class="card">
              <h3 class="text-lg font-bold text-enx-navy mb-4">Key Summary</h3>
              <div class="info-list">
                <div><div class="info-item-label">Amount sought</div><div class="info-item-value">&pound;120,000</div></div>
                <div><div class="info-item-label">Docs send to</div><div class="info-item-value">Main contact</div></div>
                <div><div class="info-item-label">Follow-up</div><div class="info-item-value">Today</div></div>
                <div><div class="info-item-label">Current blocker</div><div class="info-item-value">Final affordability review</div></div>
              </div>
              <div class="flex flex-wrap gap-2 mt-5">
                <a href="#assessment-workspace" class="btn btn-outline">Assessment</a>
                <a href="#offer-builder" class="btn btn-outline">Offer Draft</a>
                <a href="#legal-pack" class="btn btn-outline">Legal Pack</a>
              </div>
            </div>
          </div>

          <div>
            <div class="tabs" data-tabs="case-tabs">
              <button class="tab-btn active" data-tab="case-summary">Summary</button>
              <button class="tab-btn" data-tab="case-parties">Parties &amp; Forms</button>
              <button class="tab-btn" data-tab="case-tasks">Tasks &amp; Follow-up</button>
              <button class="tab-btn" data-tab="case-documents">Documents</button>
              <button class="tab-btn" data-tab="case-comms">Communications</button>
              <button class="tab-btn" data-tab="case-audit">Audit History</button>
            </div>

            <div class="tab-panel active" data-tab-panel="case-summary">
              <div class="card">
                <div class="summary-grid">
                  <div class="status-block"><div class="eyebrow">Current recommendation</div><div class="mini-stat-value">&pound;110,000</div><div class="mini-stat-sub">Pending final approval pack</div></div>
                  <div class="status-block"><div class="eyebrow">Beneficial owners</div><div class="mini-stat-value">2</div><div class="mini-stat-sub">All supplementary invites sent</div></div>
                  <div class="status-block"><div class="eyebrow">Outstanding blockers</div><div class="mini-stat-value">1</div><div class="mini-stat-sub">Commitments sign-off</div></div>
                </div>
              </div>
            </div>

            <div class="tab-panel" data-tab-panel="case-parties">
              <div class="card">
                <div class="doc-list">
                  <div class="doc-item"><div class="doc-item-title">Primary applicant</div><div class="doc-item-sub">John Keenan · john@harbourworks.com · Signed application on 5 Mar 2026</div></div>
                  <div class="doc-item"><div class="doc-item-title">Beneficial owner 1</div><div class="doc-item-sub">Máire Keenan · Supplementary form signed</div></div>
                  <div class="doc-item"><div class="doc-item-title">Beneficial owner 2</div><div class="doc-item-sub">Conor Keenan · Invite sent, not yet signed</div></div>
                  <div class="doc-item"><div class="doc-item-title">Placeholder account state</div><div class="doc-item-sub">Not used on this case. All participants have live email addresses.</div></div>
                </div>
              </div>
            </div>

            <div class="tab-panel" data-tab-panel="case-tasks">
              <div class="card">
                ${table(
                  ['Task', 'Owner', 'Due', 'Status', 'Action'],
                  [
                    ['Confirm latest commitments total', 'Sarah Mitchell', 'Today', badge('In Progress'), button('Open Assessment', '#assessment-workspace', 'outline')],
                    ['Respond to document request if queried', 'Harbour Works Ltd', 'Tomorrow', badge('Pending'), button('Open Comms', '#case-workspace', 'outline')]
                  ]
                )}
              </div>
            </div>

            <div class="tab-panel" data-tab-panel="case-documents">
              <div class="card">
                <div class="doc-list">
                  <div class="doc-item"><div class="doc-item-title">Application form.pdf</div><div class="doc-item-sub">Signed · Uploaded 05 Mar 2026</div></div>
                  <div class="doc-item"><div class="doc-item-title">Equifax report.pdf</div><div class="doc-item-sub">Assessment evidence · Uploaded today</div></div>
                  <div class="doc-item"><div class="doc-item-title">Passport - John Keenan.pdf</div><div class="doc-item-sub">ID evidence · Reviewed</div></div>
                </div>
              </div>
            </div>

            <div class="tab-panel" data-tab-panel="case-comms">
              <div class="card">
                <div class="thread-list">
                  <div class="thread-item"><div class="thread-item-title">Email · Supplementary invite sent</div><div class="thread-item-sub">To Conor Keenan · Delivery status: delivered</div></div>
                  <div class="thread-item"><div class="thread-item-title">Email · Documents requested</div><div class="thread-item-sub">To John Keenan · Template key: loans.docs.request</div></div>
                </div>
              </div>
            </div>

            <div class="tab-panel" data-tab-panel="case-audit">
              <div class="card">
                <div class="timeline">
                  <div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-content"><div class="font-semibold text-enx-navy text-sm">Stage changed to Assessment</div><p class="text-sm text-gray-500 mt-1">Moved from Application after all primary forms were signed.</p><div class="timeline-time">06 Mar 2026, 2:10 PM</div></div></div>
                  <div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-content"><div class="font-semibold text-enx-navy text-sm">Equifax evidence uploaded</div><p class="text-sm text-gray-500 mt-1">Uploaded by Sarah Mitchell.</p><div class="timeline-time">08 Mar 2026, 9:14 AM</div></div></div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    },
    'assessment-queue': {
      title: 'Assessment Queue',
      breadcrumb: 'Assessment Queue',
      render: function() {
        return `
          ${pageHeader('Assessment Queue', 'Cases awaiting manual checks, commitments, memo completion, or recommendation sign-off.')}

          <div class="mini-stat-grid">
            ${miniStat('AML Incomplete', '4', 'Checklist or note missing')}
            ${miniStat('Credit Evidence Missing', '3', 'No uploaded report yet')}
            ${miniStat('Commitments Outstanding', '5', 'Needs affordability review')}
            ${miniStat('Ready For Recommendation', '2', 'All evidence captured')}
          </div>

          ${table(
            ['Case', 'Missing Item', 'Stage Age', 'Owner', 'Due', 'Priority', 'Actions'],
            [
              [cell('L-24031', 'Harbour Works Ltd'), 'Commitments total sign-off', '4d', 'Sarah Mitchell', 'Today', '<span class="badge badge-pending">High</span>', button('Open', '#assessment-workspace', 'outline')],
              [cell('L-24042', 'North Shore Foods'), 'Credit evidence upload', '2d', 'Irene Kelly', 'Tomorrow', '<span class="badge badge-review">Medium</span>', button('Open', '#assessment-workspace', 'outline')],
              [cell('L-24028', 'Moyle Marine Services'), 'Assessment memo missing', '6d', 'Patrick Long', 'Overdue', '<span class="badge badge-overdue">High</span>', button('Open', '#assessment-workspace', 'outline')]
            ]
          )}
        `;
      }
    },
    'assessment-workspace': {
      title: 'Assessment Workspace',
      breadcrumb: 'Assessment Workspace',
      render: function() {
        return `
          ${pageHeader('Assessment Workspace', 'Manual AML, ID, address, credit, commitments, and recommendation capture.', button('Mark Assessment Ready', '#internal-approvals', 'primary'))}

          <div class="workspace-summary">
            <div class="card">
              <div class="info-row">
                <div><div class="info-item-label">Case</div><div class="info-item-value">L-24031 · Harbour Works Ltd</div><div class="info-item-sub">Assessment owner: Sarah Mitchell</div></div>
                <div><div class="info-item-label">Target review date</div><div class="info-item-value">Today</div><div class="info-item-sub">Final affordability approval due</div></div>
                <div><div class="info-item-label">Gate status</div><div class="info-item-value">1 blocker remaining</div><div class="info-item-sub">Commitments sign-off</div></div>
              </div>
            </div>
            <div class="ready-banner">Four of five manual checks are complete. Once commitments are approved, the case can move to internal approval.</div>
          </div>

          <div>
            <div class="tabs" data-tabs="assessment-tabs">
              <button class="tab-btn active" data-tab="aml">AML Checklist</button>
              <button class="tab-btn" data-tab="id-address">ID &amp; Address</button>
              <button class="tab-btn" data-tab="credit">Credit Evidence</button>
              <button class="tab-btn" data-tab="commitments">Commitments</button>
              <button class="tab-btn" data-tab="memo">Assessment Memo</button>
              <button class="tab-btn" data-tab="recommendation">Recommendation</button>
            </div>

            <div class="tab-panel active" data-tab-panel="aml">
              <div class="card">
                <div class="checklist-list">
                  <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">Business ownership confirmed</div><div class="queue-card-sub">Reviewer: Sarah Mitchell</div></div>${badge('Completed')}</div>
                  <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">Sanctions screening reviewed</div><div class="queue-card-sub">No adverse findings recorded</div></div>${badge('Completed')}</div>
                  <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">AML notes finalised</div><div class="queue-card-sub">Manual notes saved at 09:04 AM</div></div>${badge('Completed')}</div>
                </div>
              </div>
            </div>

            <div class="tab-panel" data-tab-panel="id-address">
              <div class="card">
                <div class="doc-list">
                  <div class="doc-item"><div class="doc-item-title">Passport - John Keenan.pdf</div><div class="doc-item-sub">Verified and approved</div></div>
                  <div class="doc-item"><div class="doc-item-title">Utility Bill - Harbour Works.pdf</div><div class="doc-item-sub">Address evidence reviewed on 07 Mar 2026</div></div>
                </div>
              </div>
            </div>

            <div class="tab-panel" data-tab-panel="credit">
              <div class="card">
                <div class="summary-grid">
                  <div class="status-block"><div class="eyebrow">Method</div><div class="mini-stat-value">Equifax</div><div class="mini-stat-sub">Report uploaded today</div></div>
                  <div class="status-block"><div class="eyebrow">Outcome</div><div class="mini-stat-value">Acceptable</div><div class="mini-stat-sub">No adverse flags preventing progression</div></div>
                </div>
              </div>
            </div>

            <div class="tab-panel" data-tab-panel="commitments">
              <div class="card">
                ${table(
                  ['Party', 'Commitment Type', 'Monthly Amount', 'Notes'],
                  [
                    ['John Keenan', 'Credit card', '&pound;420', 'Business spend card'],
                    ['Máire Keenan', 'Vehicle finance', '&pound;265', 'Monthly direct debit'],
                    ['Organisation', 'Lease / rent', '&pound;1,850', 'Existing unit costs']
                  ]
                )}
                <div class="warning-banner mt-5">Auto-calculated total monthly commitments: <strong>&pound;2,535</strong>. Reviewer sign-off still required.</div>
              </div>
            </div>

            <div class="tab-panel" data-tab-panel="memo">
              <div class="card">
                <div class="doc-list">
                  <div class="doc-item"><div class="doc-item-title">Assessment memo v3.pdf</div><div class="doc-item-sub">Uploaded today · Ready for approval pack</div></div>
                </div>
              </div>
            </div>

            <div class="tab-panel" data-tab-panel="recommendation">
              <div class="card">
                <div class="summary-grid">
                  <div class="status-block"><div class="eyebrow">Recommended path</div><div class="mini-stat-value">Proceed to Approval</div><div class="mini-stat-sub">Subject to commitments sign-off</div></div>
                  <div class="status-block"><div class="eyebrow">Recommended amount</div><div class="mini-stat-value">&pound;110,000</div><div class="mini-stat-sub">Lower than requested based on affordability review</div></div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    },
    'internal-approvals': {
      title: 'Internal Approvals',
      breadcrumb: 'Internal Approvals',
      render: function() {
        return `
          ${pageHeader('Internal Approvals', 'Cases ready for internal decision after assessment completion.', button('Open UCF Inbox', 'ucf.html#approvals-inbox', 'outline'))}

          ${table(
            ['Case', 'Organisation', 'Recommended Amount', 'Submitted By', 'Submitted Date', 'UCF Required', 'Actions'],
            [
              [cell('L-24031', 'Harbour Works Ltd'), '&pound;110,000', 'Sarah Mitchell', '08 Mar 2026', 'Yes', button('Review', '#approval-review', 'primary')],
              [cell('L-24028', 'Moyle Marine Services'), '&pound;65,000', 'Patrick Long', '07 Mar 2026', 'No', button('Review', '#approval-review', 'outline')]
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
          ${pageHeader('Approval Review', 'Prepared internal decision page with supporting evidence, summary, and mandatory rationale.')}

          <div class="split-layout">
            <div class="space-y-6">
              ${card(
                'Case Pack Summary',
                `
                  <div class="summary-grid">
                    <div><div class="info-item-label">Case</div><div class="info-item-value">L-24031</div><div class="info-item-sub">Harbour Works Ltd</div></div>
                    <div><div class="info-item-label">Requested</div><div class="info-item-value">&pound;120,000</div><div class="info-item-sub">Recommended: &pound;110,000</div></div>
                    <div><div class="info-item-label">Repayment day</div><div class="info-item-value">Day 17</div><div class="info-item-sub">CCA under review</div></div>
                  </div>
                `
              )}
              ${card(
                'Supporting Documents',
                `
                  <div class="doc-list">
                    <div class="doc-item"><div class="doc-item-title">Assessment memo v3.pdf</div><div class="doc-item-sub">Prepared by Sarah Mitchell</div></div>
                    <div class="doc-item"><div class="doc-item-title">Equifax report.pdf</div><div class="doc-item-sub">Uploaded and reviewed</div></div>
                    <div class="doc-item"><div class="doc-item-title">Commitments summary</div><div class="doc-item-sub">Total monthly commitments &pound;2,535</div></div>
                  </div>
                `
              )}
              ${card(
                'Comments & Context',
                `
                  <div class="thread-list">
                    <div class="thread-item"><div class="thread-item-title">Assessment note</div><div class="thread-item-sub">Recommend reduced amount to align with affordability assessment and seasonality of cash flow.</div></div>
                    <div class="thread-item"><div class="thread-item-title">Operations comment</div><div class="thread-item-sub">Customer has confirmed availability for same-week signing if approved.</div></div>
                  </div>
                `
              )}
            </div>

            ${card(
              'Decision Panel',
              `
                <div class="space-y-4">
                  <div class="form-group">
                    <label class="form-label">Decision</label>
                    <select class="form-select">
                      <option>Approve</option>
                      <option>Reject</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Mandatory rationale</label>
                    <textarea class="form-textarea" placeholder="Record the reason for the internal decision...">Approved subject to issue of a CCA pack at &pound;110,000 with repayment day Day 17 and standard guarantee requirements.</textarea>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Comment to operations</label>
                    <textarea class="form-textarea" placeholder="Optional comment back to operations...">Please route to UCF immediately after the internal record is saved.</textarea>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Approval document</label>
                    <div class="doc-item"><div class="doc-item-title">No file uploaded</div><div class="doc-item-sub">Approval documents can be attached to the decision record.</div></div>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <a href="#internal-approvals" class="btn btn-secondary">Return</a>
                    <button class="btn btn-outline" data-form-submit="Assessment update requested">Request Assessment Update</button>
                    <button class="btn btn-danger" data-form-submit="Case declined">Reject</button>
                    <a href="#offer-queue" class="btn btn-primary">Approve</a>
                  </div>
                </div>
              `
            )}
          </div>
        `;
      }
    },
    'offer-queue': {
      title: 'Offer Queue',
      breadcrumb: 'Offer Queue',
      render: function() {
        return `
          ${pageHeader('Offer Queue', 'Cases ready for draft, issue, or post-query resumption.', iconButton('Create Offer', '#offer-builder', '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>', 'primary'))}

          ${table(
            ['Case', 'Offer Type', 'Principal', 'Stage', 'Signature Status', 'Owner', 'Actions'],
            [
              [cell('L-24031', 'Harbour Works Ltd'), 'CCA', '&pound;110,000', 'Ready to draft', '<span class="badge badge-draft">Not sent</span>', 'Sarah Mitchell', button('Build', '#offer-builder', 'primary')],
              [cell('L-24036', 'Newtown Creative CIC'), 'Non-CCA', '&pound;60,000', 'Awaiting send', '<span class="badge badge-pending">Generated</span>', 'Aisling Kane', button('Open', '#legal-pack', 'outline')],
              [cell('L-24012', 'Macklin Trade Supplies'), 'CCA', '&pound;80,000', 'Awaiting signature', badge('Awaiting Signature'), 'Ryan O\'Neill', button('Track', '#legal-pack', 'outline')]
            ]
          )}
        `;
      }
    },
    'offer-builder': {
      title: 'Offer Builder',
      breadcrumb: 'Offer Builder',
      render: function() {
        return `
          ${pageHeader('Offer Builder', 'Four-step offer creation flow for commercial terms, conditions, delivery, and review.')}

          <div class="card">
            <div class="stepper" data-current-step="1">
              <div class="step active">
                <div class="step-circle">1</div>
                <div class="step-label">Terms</div>
              </div>
              <div class="step-line"></div>
              <div class="step">
                <div class="step-circle">2</div>
                <div class="step-label">Conditions</div>
              </div>
              <div class="step-line"></div>
              <div class="step">
                <div class="step-circle">3</div>
                <div class="step-label">Delivery</div>
              </div>
              <div class="step-line"></div>
              <div class="step">
                <div class="step-circle">4</div>
                <div class="step-label">Review</div>
              </div>
            </div>

            <div class="step-content active" data-step-content="1">
              <h3 class="text-base font-bold text-enx-navy mb-4">Offer Type &amp; Commercial Terms</h3>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Offer Type</label>
                  <select class="form-select"><option>CCA</option><option>Non-CCA</option></select>
                </div>
                <div class="form-group">
                  <label class="form-label">Principal</label>
                  <input class="form-input" value="110000">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Term (months)</label>
                  <input class="form-input" value="48">
                </div>
                <div class="form-group">
                  <label class="form-label">APR</label>
                  <input class="form-input" value="6.25">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Repayment Day</label>
                  <select class="form-select"><option>Day 17</option><option>Day 1</option></select>
                </div>
                <div class="form-group">
                  <label class="form-label">Loan Subordination Required</label>
                  <select class="form-select"><option>Yes</option><option>No</option></select>
                </div>
              </div>
              <div class="stepper-actions">
                <div></div>
                <button class="btn btn-primary" data-stepper-next>Next: Conditions</button>
              </div>
            </div>

            <div class="step-content" data-step-content="2">
              <h3 class="text-base font-bold text-enx-navy mb-4">Conditions &amp; Guarantees</h3>
              <div class="checklist-list">
                <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">Guarantee required</div><div class="queue-card-sub">Default CCA setting</div></div><label class="form-switch"><input type="checkbox" checked><span class="switch-slider"></span></label></div>
                <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">AML complete before issue</div><div class="queue-card-sub">Must be satisfied before pack send</div></div><label class="form-switch"><input type="checkbox" checked><span class="switch-slider"></span></label></div>
              </div>
              <div class="stepper-actions">
                <button class="btn btn-secondary" data-stepper-prev>Back</button>
                <button class="btn btn-primary" data-stepper-next>Next: Delivery</button>
              </div>
            </div>

            <div class="step-content" data-step-content="3">
              <h3 class="text-base font-bold text-enx-navy mb-4">Delivery &amp; Recipient</h3>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Docs Send To</label>
                  <select class="form-select"><option>Main contact</option><option>Organisation</option></select>
                </div>
                <div class="form-group">
                  <label class="form-label">Template Pack</label>
                  <select class="form-select"><option>CCA standard pack</option><option>CCA pack with guarantee schedule</option></select>
                </div>
              </div>
              <div class="stepper-actions">
                <button class="btn btn-secondary" data-stepper-prev>Back</button>
                <button class="btn btn-primary" data-stepper-next>Next: Review</button>
              </div>
            </div>

            <div class="step-content" data-step-content="4">
              <h3 class="text-base font-bold text-enx-navy mb-4">Review &amp; Create</h3>
              <div class="status-block mb-5">
                <div class="eyebrow">Offer Summary</div>
                <div class="info-row">
                  <div><div class="info-item-value">CCA</div><div class="info-item-sub">Offer type</div></div>
                  <div><div class="info-item-value">&pound;110,000</div><div class="info-item-sub">Principal</div></div>
                  <div><div class="info-item-value">48 months</div><div class="info-item-sub">Term</div></div>
                  <div><div class="info-item-value">Day 17</div><div class="info-item-sub">Repayment day</div></div>
                </div>
              </div>
              <div class="stepper-actions">
                <button class="btn btn-secondary" data-stepper-prev>Back</button>
                <a href="#legal-pack" class="btn btn-primary">Create Offer Draft</a>
              </div>
            </div>
          </div>
        `;
      }
    },
    'conditions-checklist': {
      title: 'Conditions Checklist',
      breadcrumb: 'Conditions Checklist',
      render: function() {
        return `
          ${pageHeader('Conditions Checklist', 'Gate offer issue and disbursement readiness from one case-level checklist.')}

          <div class="ready-banner">Offer issue is blocked until all mandatory conditions are satisfied. Current missing item: guarantor attachment.</div>

          ${card(
            'Current Conditions',
            `
              <div class="checklist-list">
                <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">AML complete</div><div class="queue-card-sub">Reviewer: Sarah Mitchell</div></div>${badge('Completed')}</div>
                <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">Credit evidence attached</div><div class="queue-card-sub">Equifax report uploaded and reviewed</div></div>${badge('Completed')}</div>
                <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">Signed application present</div><div class="queue-card-sub">Primary form signed on 05 Mar 2026</div></div>${badge('Completed')}</div>
                <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">Guarantee uploaded</div><div class="queue-card-sub">Outstanding</div></div>${badge('Pending')}</div>
                <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">Mandate ready</div><div class="queue-card-sub">Only required for setup/disbursement</div></div>${badge('Draft')}</div>
              </div>
            `
          )}
        `;
      }
    },
    'legal-pack': {
      title: 'Legal Pack & Signature Tracking',
      breadcrumb: 'Legal Pack',
      render: function() {
        return `
          ${pageHeader('Legal Pack & Signature Tracking', 'Generate documents, control recipients, and monitor signature progress.', button('Send For Signature', '#legal-pack', 'primary'))}

          <div class="signature-strip">
            <div class="signature-step complete"><div class="signature-step-title">Generated</div><div class="signature-step-sub">Pack generated at 10:05 AM</div></div>
            <div class="signature-step pending"><div class="signature-step-title">Sent</div><div class="signature-step-sub">Queued to John Keenan and guarantor</div></div>
            <div class="signature-step"><div class="signature-step-title">Viewed</div><div class="signature-step-sub">Waiting for first open event</div></div>
            <div class="signature-step"><div class="signature-step-title">Signed</div><div class="signature-step-sub">Signed copies will appear here</div></div>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            ${card(
              'Generated Documents',
              `
                <div class="doc-list">
                  <div class="doc-item"><div class="doc-item-title">CCA offer pack.pdf</div><div class="doc-item-sub">Generated from standard pack template</div></div>
                  <div class="doc-item"><div class="doc-item-title">Guarantee schedule.pdf</div><div class="doc-item-sub">Required attachment</div></div>
                  <div class="doc-item"><div class="doc-item-title">Repayment summary.pdf</div><div class="doc-item-sub">Pre-populated from offer fields</div></div>
                </div>
              `
            )}
            ${card(
              'Recipient & Envelope Status',
              `
                <div class="info-list">
                  <div><div class="info-item-label">Docs send to</div><div class="info-item-value">Main contact</div><div class="info-item-sub">john@harbourworks.com</div></div>
                  <div><div class="info-item-label">Envelope status</div><div class="info-item-value">Prepared</div><div class="info-item-sub">Not yet opened by recipients</div></div>
                  <div><div class="info-item-label">Reminder cadence</div><div class="info-item-value">2-day follow-up</div><div class="info-item-sub">Configured in notifications settings</div></div>
                </div>
              `
            )}
          </div>

          <div class="card mt-6">
            <div class="flex items-center justify-between mb-5">
              <h3 class="text-lg font-bold text-enx-navy">Signature Timeline</h3>
              <a href="#case-workspace" class="subtle-link">Back to case communications</a>
            </div>
            <div class="timeline">
              <div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-content"><div class="font-semibold text-enx-navy text-sm">Pack generated</div><p class="text-sm text-gray-500 mt-1">CCA pack created with merge-field population complete.</p><div class="timeline-time">Today, 10:05 AM</div></div></div>
              <div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-content"><div class="font-semibold text-enx-navy text-sm">Envelope queued</div><p class="text-sm text-gray-500 mt-1">Recipients staged but send action not yet confirmed.</p><div class="timeline-time">Today, 10:09 AM</div></div></div>
            </div>
          </div>
        `;
      }
    },
    'pending-setup': {
      title: 'Pending Setup',
      breadcrumb: 'Pending Setup',
      render: function() {
        return `
          ${pageHeader('Pending Setup', 'Signed cases waiting for internal finalisation, bank data, mandate setup, or loan creation.')}

          ${table(
            ['Case', 'Signed Date', 'Agreement Finalisation', 'Bank Details', 'Mandate', 'Schedule', 'Loan Record', 'Actions'],
            [
              [cell('L-24008', 'Ballymena Print Co'), 'Yesterday', badge('Pending'), badge('Not Started'), badge('Not Started'), badge('Not Started'), '<span class="badge badge-draft">Not created</span>', button('Continue', '#agreement-finalisation', 'primary')],
              [cell('L-24003', 'Mackle Precision'), '06 Mar 2026', badge('Completed'), badge('Completed'), badge('Active'), badge('Completed'), '<span class="badge badge-draft">Not created</span>', button('Open', '#loan-setup', 'outline')]
            ]
          )}
        `;
      }
    },
    'agreement-finalisation': {
      title: 'Agreement Finalisation',
      breadcrumb: 'Agreement Finalisation',
      render: function() {
        return `
          ${pageHeader('Agreement Finalisation', 'Record signed-agreement completion, countersign status, and internal notes before setup.', button('Proceed to Loan Setup', '#loan-setup', 'primary'))}

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            ${card(
              'Signing Completion',
              `
                <div class="form-group">
                  <label class="form-label">Signed date</label>
                  <input class="form-input" type="date" value="2026-03-08">
                </div>
                <div class="form-group">
                  <label class="form-label">E-sign envelope reference</label>
                  <input class="form-input" value="DS-240308-8821">
                </div>
                <div class="form-group">
                  <label class="form-label">Counter-sign status</label>
                  <select class="form-select"><option>Pending internal countersign</option><option>Counter-signed</option><option>Not required</option></select>
                </div>
                <div class="form-group">
                  <label class="form-label">Counter-sign date</label>
                  <input class="form-input" type="date" value="2026-03-08">
                </div>
                <div class="form-group">
                  <label class="form-label">Internal completion notes</label>
                  <textarea class="form-textarea">Final agreement signature received. This signature acts as acceptance and setup can now proceed once bank details and mandate data are recorded.</textarea>
                </div>
              `
            )}
            ${card(
              'Linked Signed Documents',
              `
                <div class="ready-banner">Final agreement signing is the acceptance event. No separate acceptance capture is required in Phase 1.</div>
                <div class="doc-list">
                  <div class="doc-item"><div class="doc-item-title">Final signed agreement.pdf</div><div class="doc-item-sub">Returned from DocuSign and stored on the case</div></div>
                  <div class="doc-item"><div class="doc-item-title">Offer pack snapshot.pdf</div><div class="doc-item-sub">Already stored in legal pack</div></div>
                  <div class="doc-item"><div class="doc-item-title">Signature certificate.pdf</div><div class="doc-item-sub">Envelope evidence retained for audit</div></div>
                </div>
              `
            )}
          </div>
        `;
      }
    },
    'loan-setup': {
      title: 'Loan Setup',
      breadcrumb: 'Loan Setup',
      render: function() {
        return `
          ${pageHeader('Loan Setup', 'Create the live loan record, capture bank and direct debit data, and generate the initial repayment schedule.')}

          <div class="card">
            <div class="stepper" data-current-step="1">
              <div class="step active"><div class="step-circle">1</div><div class="step-label">Agreement</div></div>
              <div class="step-line"></div>
              <div class="step"><div class="step-circle">2</div><div class="step-label">Bank &amp; DD Setup</div></div>
              <div class="step-line"></div>
              <div class="step"><div class="step-circle">3</div><div class="step-label">Terms &amp; Schedule</div></div>
              <div class="step-line"></div>
              <div class="step"><div class="step-circle">4</div><div class="step-label">Create Loan</div></div>
            </div>

            <div class="step-content active" data-step-content="1">
              <h3 class="text-base font-bold text-enx-navy mb-4">Agreement Confirmation</h3>
              <div class="summary-grid">
                <div class="status-block"><div class="eyebrow">Case</div><div class="mini-stat-value">L-24008</div><div class="mini-stat-sub">Ballymena Print Co</div></div>
                <div class="status-block"><div class="eyebrow">Signed Date</div><div class="mini-stat-value">08 Mar 2026</div><div class="mini-stat-sub">Final agreement received</div></div>
                <div class="status-block"><div class="eyebrow">Counter-sign</div><div class="mini-stat-value">Completed</div><div class="mini-stat-sub">Legal ops confirmed today</div></div>
                <div class="status-block"><div class="eyebrow">Terms Locked</div><div class="mini-stat-value">Yes</div><div class="mini-stat-sub">Offer fields frozen for schedule creation</div></div>
              </div>
              <div class="stepper-actions"><div></div><button class="btn btn-primary" data-stepper-next>Next: Bank &amp; DD Setup</button></div>
            </div>

            <div class="step-content" data-step-content="2">
              <h3 class="text-base font-bold text-enx-navy mb-4">Bank Details &amp; Direct Debit Setup</h3>
              <div class="form-row">
                <div class="form-group"><label class="form-label">Account Holder Name</label><input class="form-input" value="Ballymena Print Co"></div>
                <div class="form-group"><label class="form-label">Sort Code</label><input class="form-input" value="90-12-34"></div>
              </div>
              <div class="form-row">
                <div class="form-group"><label class="form-label">Account Number</label><input class="form-input" value="23455678"></div>
                <div class="form-group"><label class="form-label">Verification Status</label><select class="form-select"><option>Verified</option><option>Pending verification</option><option>Exception</option></select></div>
              </div>
              <div class="form-row">
                <div class="form-group"><label class="form-label">Mandate Reference</label><input class="form-input" value="DDM-LN1008-01"></div>
                <div class="form-group"><label class="form-label">Mandate Status</label><select class="form-select"><option>Active</option><option>Captured</option><option>Pending</option><option>Suspended</option></select></div>
              </div>
              <div class="form-row">
                <div class="form-group"><label class="form-label">Mandate Instruction Date</label><input class="form-input" type="date" value="2026-03-08"></div>
                <div class="form-group"><label class="form-label">Source Document / Reference</label><input class="form-input" value="Signed agreement appendix A"></div>
              </div>
              <div class="form-row">
                <div class="form-group"><label class="form-label">First Collection Date</label><input class="form-input" type="date" value="2026-04-01"></div>
                <div class="form-group"><label class="form-label">Repayment Day</label><select class="form-select"><option>Day 1</option><option>Day 17</option></select></div>
              </div>
              <div class="stepper-actions"><button class="btn btn-secondary" data-stepper-prev>Back</button><button class="btn btn-primary" data-stepper-next>Next: Terms &amp; Schedule</button></div>
            </div>

            <div class="step-content" data-step-content="3">
              <h3 class="text-base font-bold text-enx-navy mb-4">Offer Term Snapshot &amp; Schedule Preview</h3>
              <div class="summary-grid">
                <div class="status-block"><div class="eyebrow">Principal</div><div class="mini-stat-value">&pound;45,000</div></div>
                <div class="status-block"><div class="eyebrow">Term</div><div class="mini-stat-value">36 months</div></div>
                <div class="status-block"><div class="eyebrow">APR</div><div class="mini-stat-value">5.5%</div></div>
                <div class="status-block"><div class="eyebrow">Repayment Day</div><div class="mini-stat-value">Day 1</div></div>
                <div class="status-block"><div class="eyebrow">First Collection</div><div class="mini-stat-value">01 Apr 2026</div></div>
                <div class="status-block"><div class="eyebrow">Expected Instalment</div><div class="mini-stat-value">&pound;1,359</div></div>
              </div>
              <div class="doc-list mt-5">
                <div class="doc-item"><div class="doc-item-title">Repayment schedule preview</div><div class="doc-item-sub">36 monthly lines will be generated from the signed terms and first collection date.</div></div>
                <div class="doc-item"><div class="doc-item-title">Stable reference pattern</div><div class="doc-item-sub">Collection lines will use references such as <code>LN-1008-001</code> and <code>LN-1008-002</code>.</div></div>
              </div>
              <div class="stepper-actions"><button class="btn btn-secondary" data-stepper-prev>Back</button><button class="btn btn-primary" data-stepper-next>Next: Create Loan</button></div>
            </div>

            <div class="step-content" data-step-content="4">
              <h3 class="text-base font-bold text-enx-navy mb-4">Review &amp; Create Loan Record</h3>
              <div class="ready-banner">All required setup fields are present. Creating the loan will also generate the repayment schedule and mark the record ready for disbursement once all gates are satisfied.</div>
              <div class="doc-list mb-5">
                <div class="doc-item"><div class="doc-item-title">Signed agreement complete</div><div class="doc-item-sub">Yes</div></div>
                <div class="doc-item"><div class="doc-item-title">Bank details verified</div><div class="doc-item-sub">Yes</div></div>
                <div class="doc-item"><div class="doc-item-title">Mandate setup recorded</div><div class="doc-item-sub">Yes</div></div>
              </div>
              <div class="stepper-actions"><button class="btn btn-secondary" data-stepper-prev>Back</button><a href="#loan-record" class="btn btn-primary">Create Loan &amp; Schedule</a></div>
            </div>
          </div>
        `;
      }
    },
    'disbursement-queue': {
      title: 'Disbursement Queue',
      breadcrumb: 'Disbursement Queue',
      render: function() {
        return `
          ${pageHeader('Disbursement Queue', 'Only signed, DD-ready loans with generated schedules appear here.')}

          <div class="mini-stat-grid">
            ${miniStat('Ready', '2', 'Eligible for payout recording')}
            ${miniStat('Blocked', '1', 'Mandate or schedule issue still open')}
            ${miniStat('First Collections Set', '2', 'Initial direct debit dates already staged')}
          </div>

          ${table(
            ['Loan / Case', 'Borrower', 'Amount', 'Bank Verified', 'Mandate', 'Schedule', 'Readiness', 'Actions'],
            [
              ['LN-1008 / L-24008', 'Ballymena Print Co', '&pound;45,000', badge('Completed'), badge('Active'), badge('Completed'), badge('Ready to Disburse'), '<button class="btn btn-primary btn-sm" data-modal-target="disburse-modal">Record</button>'],
              ['LN-1012 / L-24003', 'Mackle Precision', '&pound;75,000', badge('Completed'), badge('Pending'), badge('Completed'), badge('Pending'), button('Open Loan', '#loan-record', 'outline')]
            ]
          )}

          <div class="modal-overlay" id="disburse-modal">
            <div class="modal">
              <div class="modal-header">
                <h3>Record Disbursement</h3>
                <button class="modal-close" data-modal-close>&times;</button>
              </div>
              <div class="modal-body">
                <div class="form-group"><label class="form-label">Disbursement Date</label><input type="date" class="form-input" value="2026-03-08"></div>
                <div class="form-group"><label class="form-label">Amount</label><input class="form-input" value="45000"></div>
                <div class="form-group"><label class="form-label">Reference</label><input class="form-input" value="BOI-PAY-240308-01"></div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary" data-modal-close>Cancel</button>
                <button class="btn btn-primary" data-form-submit="Disbursement recorded">Confirm</button>
              </div>
            </div>
          </div>
        `;
      }
    },
    'loan-record': {
      title: 'Loan Record',
      breadcrumb: 'Loan Record',
      render: function() {
        return `
          ${pageHeader('Loan Record', 'Live loan detail view with mandate, schedule, ledger, collections, documents, and audit history.')}

          <div class="workspace-summary">
            <div class="card">
              <div class="flex items-center justify-between mb-5">
                <div>
                  <div class="eyebrow">Loan ID</div>
                  <div class="text-2xl font-bold text-enx-navy">LN-1008</div>
                  <div class="prototype-note mt-1">Linked case L-24008 · Ballymena Print Co</div>
                </div>
                ${badge('Completed')}
              </div>
              <div class="summary-grid">
                <div><div class="info-item-label">Principal</div><div class="info-item-value">&pound;45,000</div><div class="info-item-sub">36 months</div></div>
                <div><div class="info-item-label">APR</div><div class="info-item-value">5.5%</div><div class="info-item-sub">Repayment day Day 1</div></div>
                <div><div class="info-item-label">Disbursement</div><div class="info-item-value">08 Mar 2026</div><div class="info-item-sub">Reference BOI-PAY-240308-01</div></div>
                <div><div class="info-item-label">Outstanding Balance</div><div class="info-item-value">&pound;43,641</div><div class="info-item-sub">After first imported collection</div></div>
                <div><div class="info-item-label">Next Collection</div><div class="info-item-value">01 Apr 2026</div><div class="info-item-sub">Batch BACS-2026-04-01-01</div></div>
              </div>
            </div>
            <div class="card">
              <h3 class="text-lg font-bold text-enx-navy mb-4">Quick Links</h3>
              <div class="doc-list">
                <div class="doc-item"><div class="doc-item-title">Source case</div><div class="doc-item-sub">Open case workspace for historic context</div></div>
                <div class="doc-item"><div class="doc-item-title">Current batch</div><div class="doc-item-sub">BACS-2026-03-17-01 submitted</div></div>
                <div class="doc-item"><div class="doc-item-title">Reconciliation queue</div><div class="doc-item-sub">No open issues on this loan</div></div>
              </div>
            </div>
          </div>

          <div>
            <div class="tabs" data-tabs="loan-record-tabs">
              <button class="tab-btn active" data-tab="loan-overview">Overview</button>
              <button class="tab-btn" data-tab="loan-bank">Bank &amp; Mandate</button>
              <button class="tab-btn" data-tab="loan-schedule">Repayment Schedule</button>
              <button class="tab-btn" data-tab="loan-ledger">Ledger / Allocation History</button>
              <button class="tab-btn" data-tab="loan-collections">Collection History</button>
              <button class="tab-btn" data-tab="loan-documents">Documents</button>
              <button class="tab-btn" data-tab="loan-audit">Audit</button>
            </div>

            <div class="tab-panel active" data-tab-panel="loan-overview">
              <div class="card"><div class="summary-grid"><div class="status-block"><div class="eyebrow">Borrower</div><div class="mini-stat-value">Ballymena Print Co</div></div><div class="status-block"><div class="eyebrow">Status</div><div class="mini-stat-value">Live Loan</div></div><div class="status-block"><div class="eyebrow">Mandate</div><div class="mini-stat-value">Active</div></div><div class="status-block"><div class="eyebrow">Last Payment</div><div class="mini-stat-value">&pound;1,359</div><div class="mini-stat-sub">Paid 01 Mar 2026</div></div></div></div>
            </div>
            <div class="tab-panel" data-tab-panel="loan-bank">
              <div class="card"><div class="doc-list"><div class="doc-item"><div class="doc-item-title">Account Holder</div><div class="doc-item-sub">Ballymena Print Co · sort code 90-12-34 · account ending 5678</div></div><div class="doc-item"><div class="doc-item-title">Verification</div><div class="doc-item-sub">Verified by operations on 08 Mar 2026</div></div><div class="doc-item"><div class="doc-item-title">Mandate</div><div class="doc-item-sub">Active · ref DDM-LN1008-01 · first instruction 08 Mar 2026</div></div></div></div>
            </div>
            <div class="tab-panel" data-tab-panel="loan-schedule">
              <div class="card">
                ${table(
                  ['Instalment', 'Due Date', 'Amount', 'Repayment Ref', 'Status'],
                  [
                    ['001', '01 Apr 2026', '&pound;1,359', 'LN-1008-001', badge('Scheduled')],
                    ['002', '01 May 2026', '&pound;1,359', 'LN-1008-002', badge('Scheduled')],
                    ['003', '01 Jun 2026', '&pound;1,359', 'LN-1008-003', badge('Scheduled')],
                    ['004', '01 Jul 2026', '&pound;1,359', 'LN-1008-004', badge('Scheduled')]
                  ]
                )}
              </div>
            </div>
            <div class="tab-panel" data-tab-panel="loan-ledger">
              <div class="card">
                ${table(
                  ['Date', 'Entry Type', 'Amount', 'Result', 'Note'],
                  [
                    ['08 Mar 2026', 'Disbursement', '&pound;45,000', badge('Completed'), 'Initial payout recorded'],
                    ['17 Mar 2026', 'Batch submission', '&pound;1,359', badge('Submitted'), 'Included in BACS-2026-03-17-01'],
                    ['18 Mar 2026', 'Repayment allocation', '&pound;1,359', badge('Allocated'), 'Line LN-1008-001 marked paid']
                  ]
                )}
              </div>
            </div>
            <div class="tab-panel" data-tab-panel="loan-collections">
              <div class="card">
                ${table(
                  ['Batch', 'Collection Date', 'Items', 'Amount', 'Status', 'Action'],
                  [
                    ['BACS-2026-03-17-01', '17 Mar 2026', '1', '&pound;1,359', badge('Imported'), button('Open Import', '#outcome-import', 'outline')],
                    ['BACS-2026-04-01-01', '01 Apr 2026', '1', '&pound;1,359', badge('Draft'), button('Open Batch', '#collection-batches', 'outline')]
                  ]
                )}
              </div>
            </div>
            <div class="tab-panel" data-tab-panel="loan-documents">
              <div class="card"><div class="doc-list"><div class="doc-item"><div class="doc-item-title">Final signed agreement.pdf</div><div class="doc-item-sub">Linked from legal pack</div></div><div class="doc-item"><div class="doc-item-title">Repayment schedule preview.pdf</div><div class="doc-item-sub">Generated during loan setup</div></div><div class="doc-item"><div class="doc-item-title">Bacs batch export.txt</div><div class="doc-item-sub">Linked from collection batch history</div></div></div></div>
            </div>
            <div class="tab-panel" data-tab-panel="loan-audit">
              <div class="card"><div class="timeline"><div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-content"><div class="font-semibold text-enx-navy text-sm">Loan record created</div><p class="text-sm text-gray-500 mt-1">Created from signed case L-24008 and schedule lines generated.</p><div class="timeline-time">08 Mar 2026, 1:42 PM</div></div></div><div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-content"><div class="font-semibold text-enx-navy text-sm">Batch item submitted</div><p class="text-sm text-gray-500 mt-1">Repayment line LN-1008-001 included in BACS-2026-03-17-01.</p><div class="timeline-time">17 Mar 2026, 8:32 AM</div></div></div><div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-content"><div class="font-semibold text-enx-navy text-sm">Repayment allocated</div><p class="text-sm text-gray-500 mt-1">Imported outcome matched exactly and cleared schedule line 001.</p><div class="timeline-time">18 Mar 2026, 9:16 AM</div></div></div></div></div>
            </div>
          </div>
        `;
      }
    },
    'repayments-overview': {
      title: 'Repayments Overview',
      breadcrumb: 'Repayments Overview',
      render: function() {
        return `
          ${pageHeader('Repayments Overview', 'Operational servicing dashboard for active-loan collections, imports, and reconciliation.', button('New Collection Batch', '#collection-batches', 'primary') + button('Import Outcomes', '#outcome-import', 'outline'))}

          <div class="mini-stat-grid">
            ${miniStat('Scheduled', '21', 'Next due lines awaiting batch build')}
            ${miniStat('Submitted', '18', 'Current batch lines sent to Bacs')}
            ${miniStat('Paid', '14', 'Imported and allocated successfully')}
            ${miniStat('Failed', '2', 'Returned in latest outcome file')}
            ${miniStat('Overdue', '2', 'Still outstanding after outcome import')}
            ${miniStat('Unapplied Credit', '&pound;640', 'Awaiting manual allocation')}
            ${miniStat('Manual Review', '4', 'Open reconciliation issues')}
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            ${card(
              'Current Cycle',
              `
                <div class="queue-list">
                  <a href="#collection-batches" class="queue-card"><div><div class="queue-card-title">Next batch ready to build</div><div class="queue-card-sub">21 eligible lines with active mandates and due dates in scope.</div></div><div class="number-pill">21</div></a>
                  <a href="#outcome-import" class="queue-card"><div><div class="queue-card-title">Imported file waiting to apply</div><div class="queue-card-sub">1 Bacs result file parsed with 4 lines needing review.</div></div><div class="number-pill">1</div></a>
                  <a href="#reconciliation-queue" class="queue-card"><div><div class="queue-card-title">Open reconciliation issues</div><div class="queue-card-sub">Partial, failed, and unmatched items still need operator action.</div></div><div class="number-pill">4</div></a>
                </div>
              `
            )}
            ${card(
              'Servicing Rules',
              `
                <div class="doc-list">
                  <div class="doc-item"><div class="doc-item-title">Reference pattern</div><div class="doc-item-sub">Use stable line references such as <code>LN-1008-003</code>.</div></div>
                  <div class="doc-item"><div class="doc-item-title">Exact match priority</div><div class="doc-item-sub">Batch item / repayment reference, then mandate or loan reference, then date-window fallback.</div></div>
                  <div class="doc-item"><div class="doc-item-title">Default allocation</div><div class="doc-item-sub">Apply to the current due amount first and send the remainder or shortfall to reconciliation.</div></div>
                </div>
              `
            )}
          </div>

          ${table(
            ['Batch', 'Collection Date', 'Lines', 'Total', 'Status', 'Action'],
            [
              ['BACS-2026-03-17-01', '17 Mar 2026', '18', '&pound;5,240', badge('Submitted'), button('Open', '#outcome-import', 'outline')],
              ['BACS-2026-04-01-01', '01 Apr 2026', '21', '&pound;6,117', badge('Draft'), button('Build', '#collection-batches', 'primary')]
            ]
          )}
        `;
      }
    },
    'collection-batches': {
      title: 'Collection Batches',
      breadcrumb: 'Collection Batches',
      render: function() {
        return `
          ${pageHeader('Collection Batches', 'Build Bacs direct debit submissions from eligible repayment lines and export the batch file.', button('Export Bacs File', '#collection-batches', 'primary'))}

          <div class="warning-banner">Stable repayment references are generated from the loan and instalment identity, for example <code>LN-1008-003</code>. Held or disputed lines can be removed before export.</div>

          <div class="mini-stat-grid">
            ${miniStat('Eligible Lines', '21', 'Due with active mandates')}
            ${miniStat('Held From Batch', '3', 'Suspended or disputed lines')}
            ${miniStat('Draft Total', '&pound;6,117', 'Current export value')}
          </div>

          ${table(
            ['Loan', 'Instalment', 'Mandate', 'Repayment Ref', 'Amount', 'Collection Date', 'Batch Status', 'Action'],
            [
              ['LN-1008', '001', 'DDM-LN1008-01', 'LN-1008-001', '&pound;1,359', '01 Apr 2026', badge('Ready'), button('Keep', '#collection-batches', 'outline')],
              ['LN-1012', '003', 'DDM-LN1012-01', 'LN-1012-003', '&pound;1,780', '01 Apr 2026', badge('Ready'), button('Keep', '#collection-batches', 'outline')],
              ['LN-1041', '002', 'DDM-LN1041-01', 'LN-1041-002', '&pound;965', '01 Apr 2026', badge('Ready'), button('Keep', '#collection-batches', 'outline')]
            ]
          )}

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
            ${card(
              'Held From Batch',
              `
                <div class="doc-list">
                  <div class="doc-item"><div class="doc-item-title">LN-1023-004</div><div class="doc-item-sub">Mandate suspended pending account clarification.</div></div>
                  <div class="doc-item"><div class="doc-item-title">LN-1055-001</div><div class="doc-item-sub">Open dispute on prior failed collection.</div></div>
                </div>
              `
            )}
            ${card(
              'Submission Flow',
              `
                <div class="thread-list">
                  <div class="thread-item"><div class="thread-item-title">1. Build draft batch</div><div class="thread-item-sub">Eligible schedule lines are pulled automatically.</div></div>
                  <div class="thread-item"><div class="thread-item-title">2. Export Bacs file</div><div class="thread-item-sub">Submission marks included lines as Submitted.</div></div>
                  <div class="thread-item"><div class="thread-item-title">3. Import outcomes</div><div class="thread-item-sub">Results are matched and either allocated or sent to reconciliation.</div></div>
                </div>
              `
            )}
          </div>
        `;
      }
    },
    'outcome-import': {
      title: 'Outcome Import',
      breadcrumb: 'Outcome Import',
      render: function() {
        return `
          ${pageHeader('Outcome Import', 'Upload Bacs return files and preview matching before imported outcomes are applied.', button('Apply Imported Outcomes', '#reconciliation-queue', 'primary'))}

          <div class="mini-stat-grid">
            ${miniStat('Imported Lines', '18', 'Parsed from current file')}
            ${miniStat('Exact Matches', '14', 'Batch reference matched directly')}
            ${miniStat('Fallback Matches', '2', 'Matched on mandate / amount / date')}
            ${miniStat('Needs Review', '4', 'Partial, failed, or unmatched')}
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            ${card(
              'Upload File',
              `
                <div class="upload-zone">
                  <div class="upload-zone-title">Drop Bacs result file here or choose a file</div>
                  <div class="upload-zone-sub">Imported rows are previewed before they update repayment lines or ledger history.</div>
                  <button class="btn btn-primary btn-sm mt-3">Choose File</button>
                </div>
              `
            )}
            ${card(
              'Matching Order',
              `
                <div class="doc-list">
                  <div class="doc-item"><div class="doc-item-title">1. Exact repayment reference</div><div class="doc-item-sub">Match the collection line directly to a submitted batch item.</div></div>
                  <div class="doc-item"><div class="doc-item-title">2. Mandate or loan fallback</div><div class="doc-item-sub">Use mandate or loan plus amount and expected date.</div></div>
                  <div class="doc-item"><div class="doc-item-title">3. Date-window fallback</div><div class="doc-item-sub">Use account or loan with amount and nearby due date.</div></div>
                  <div class="doc-item"><div class="doc-item-title">4. Manual reconciliation</div><div class="doc-item-sub">Anything unresolved moves to the reconciliation queue.</div></div>
                </div>
              `
            )}
          </div>

          ${table(
            ['Imported Ref', 'Suggested Match', 'Outcome', 'Allocation Result', 'Needs Review', 'Action'],
            [
              ['LN-1008-001', 'LN-1008 instalment 001', badge('Paid'), badge('Allocated'), 'No', button('View Loan', '#loan-record', 'outline')],
              ['LN-1012-003', 'LN-1012 instalment 003', badge('Partially Paid'), badge('Open'), 'Yes', button('Review', '#reconciliation-queue', 'outline')],
              ['DDM-LN1041-01', 'LN-1041 instalment 002', badge('Failed'), badge('Open'), 'Yes', button('Review', '#reconciliation-queue', 'outline')],
              ['UNMATCHED-4451', 'No automatic match', badge('Needs Review'), badge('Open'), 'Yes', button('Review', '#reconciliation-queue', 'outline')]
            ]
          )}
        `;
      }
    },
    'reconciliation-queue': {
      title: 'Reconciliation Queue',
      breadcrumb: 'Reconciliation Queue',
      render: function() {
        return `
          ${pageHeader('Reconciliation Queue', 'Review repayment exceptions and complete manual allocation, retry, or dispute actions.', button('Export Queue', '#reconciliation-queue', 'outline'))}

          <div class="mini-stat-grid">
            ${miniStat('Open Issues', '4', 'All unresolved reconciliation items')}
            ${miniStat('Failed Returns', '2', 'Need retry or hold decision')}
            ${miniStat('Partial Payments', '1', 'Shortfall remains overdue')}
            ${miniStat('Unapplied Credit', '1', 'Overpayment awaiting allocation')}
            ${miniStat('Overdue Lines', '2', 'Still unpaid after outcome import')}
          </div>

          ${table(
            ['Issue', 'Imported Ref', 'Suggested Loan', 'Status', 'Recommended Action', 'Action'],
            [
              ['Partial payment', 'LN-1012-003', 'LN-1012', badge('Open'), 'Allocate paid amount and leave shortfall overdue', button('Allocate', '#loan-record', 'primary')],
              ['Failed collection', 'DDM-LN1041-01', 'LN-1041', badge('Open'), 'Retry next batch or hold mandate', button('Retry', '#collection-batches', 'outline')],
              ['Overpayment credit', 'LN-1088-002', 'LN-1088', badge('Open'), 'Leave remainder unapplied until assigned', button('Assign Credit', '#loan-record', 'outline')],
              ['Unmatched return', 'UNMATCHED-4451', 'No match', badge('Open'), 'Manual loan lookup required', button('Investigate', '#loan-record', 'outline')]
            ]
          )}

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
            ${card(
              'Default Allocation Rules',
              `
                <div class="doc-list">
                  <div class="doc-item"><div class="doc-item-title">Exact payment</div><div class="doc-item-sub">Mark the current due line as Paid.</div></div>
                  <div class="doc-item"><div class="doc-item-title">Underpayment</div><div class="doc-item-sub">Apply the paid amount and leave the shortfall outstanding with a queue item.</div></div>
                  <div class="doc-item"><div class="doc-item-title">Overpayment</div><div class="doc-item-sub">Clear the current due amount and place the remainder into unapplied credit.</div></div>
                  <div class="doc-item"><div class="doc-item-title">Failed return</div><div class="doc-item-sub">Mark the line failed or overdue and choose retry, manual handling, or hold.</div></div>
                </div>
              `
            )}
            ${card(
              'Recent Resolutions',
              `
                <div class="timeline">
                  <div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-content"><div class="font-semibold text-enx-navy text-sm">Credit allocated to LN-0998</div><p class="text-sm text-gray-500 mt-1">&pound;120 overpayment assigned to the next due line.</p><div class="timeline-time">Today, 10:44 AM</div></div></div>
                  <div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-content"><div class="font-semibold text-enx-navy text-sm">Retry approved for LN-1041</div><p class="text-sm text-gray-500 mt-1">Failed return moved into the next collection batch.</p><div class="timeline-time">Today, 9:52 AM</div></div></div>
                </div>
              `
            )}
          </div>
        `;
      }
    },
    'templates': {
      title: 'Templates',
      breadcrumb: 'Templates',
      render: function() {
        return `
          ${pageHeader('Templates', 'Manage CCA / Non-CCA pack templates and merge-field defaults.')}
          <div class="card-grid">
            ${card('CCA Standard Pack', '<div class="doc-list"><div class="doc-item"><div class="doc-item-title">Merge fields</div><div class="doc-item-sub">Principal, APR, term, repayment day, guarantor details</div></div><div class="doc-item"><div class="doc-item-title">Last updated</div><div class="doc-item-sub">02 Mar 2026 by Legal Ops</div></div></div>', button('Preview', '#templates', 'outline'))}
            ${card('Non-CCA Pack', '<div class="doc-list"><div class="doc-item"><div class="doc-item-title">Merge fields</div><div class="doc-item-sub">Principal, flat fee, term, subordination language</div></div><div class="doc-item"><div class="doc-item-title">Last updated</div><div class="doc-item-sub">27 Feb 2026 by Legal Ops</div></div></div>', button('Preview', '#templates', 'outline'))}
          </div>
        `;
      }
    },
    'conditions': {
      title: 'Conditions',
      breadcrumb: 'Conditions',
      render: function() {
        return `
          ${pageHeader('Conditions', 'Default checklist templates by offer type and progression gate.')}
          ${table(
            ['Offer Type', 'Condition', 'Required', 'Default Owner', 'Blocks Progression'],
            [
              ['CCA', 'Guarantee uploaded', 'Yes', 'Operations', 'Yes'],
              ['CCA', 'AML complete', 'Yes', 'Assessment', 'Yes'],
              ['Non-CCA', 'Subordination docs uploaded', 'Conditional', 'Operations', 'Yes'],
              ['All', 'Direct debit setup recorded', 'Yes', 'Setup', 'Disbursement only'],
              ['All', 'Repayment schedule generated', 'Yes', 'Setup', 'Disbursement only']
            ]
          )}
        `;
      }
    },
    'policies': {
      title: 'Policies',
      breadcrumb: 'Policies',
      render: function() {
        return `
          ${pageHeader('Policies', 'Workflow rules, reminders, defaults, and gating policies for the loans module.')}
          <div class="rule-list">
            <div class="rule-item flex items-center justify-between"><div><div class="rule-item-title">Overdue follow-up alert</div><div class="rule-item-sub">Show dashboard warning after 1 missed follow-up date</div></div><label class="form-switch"><input type="checkbox" checked><span class="switch-slider"></span></label></div>
            <div class="rule-item flex items-center justify-between"><div><div class="rule-item-title">Docs send to default</div><div class="rule-item-sub">Default outbound recipient to primary contact</div></div><select class="form-select" style="width:auto"><option>Main contact</option><option>Organisation</option></select></div>
            <div class="rule-item flex items-center justify-between"><div><div class="rule-item-title">Placeholder account handling</div><div class="rule-item-sub">Allow imported cases without email to remain unclaimed until linked</div></div><label class="form-switch"><input type="checkbox" checked><span class="switch-slider"></span></label></div>
            <div class="rule-item flex items-center justify-between"><div><div class="rule-item-title">Signature reminder cadence</div><div class="rule-item-sub">Automatic reminder after pack sent but unsigned</div></div><select class="form-select" style="width:auto"><option>48 hours</option><option>72 hours</option></select></div>
            <div class="rule-item flex items-center justify-between"><div><div class="rule-item-title">Repayment reference pattern</div><div class="rule-item-sub">Stable loan and instalment reference used in Bacs exports and imports</div></div><input class="form-input" style="width:180px" value="LN-{loan}-{line}"></div>
            <div class="rule-item flex items-center justify-between"><div><div class="rule-item-title">Import allocation default</div><div class="rule-item-sub">Apply to current due amount first and queue any remainder or shortfall for reconciliation</div></div><label class="form-switch"><input type="checkbox" checked><span class="switch-slider"></span></label></div>
          </div>
        `;
      }
    },
    'roles-permissions': {
      title: 'Roles & Permissions',
      breadcrumb: 'Roles & Permissions',
      render: function() {
        return `
          ${pageHeader('Roles & Permissions', 'Loan-module role model and access boundaries.')}
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div class="card role-card"><div class="queue-card-title mb-2">ENI Super Admin</div><div class="queue-card-sub">Full access to all loan cases, settings, exports, and audit history.</div></div>
            <div class="card role-card"><div class="queue-card-title mb-2">ENI Operations Admin</div><div class="queue-card-sub">Can manage enquiries, cases, documents, assessment workflow, and setup.</div></div>
            <div class="card role-card"><div class="queue-card-title mb-2">Internal Approver</div><div class="queue-card-sub">Can review approval packs and record approve/reject decisions.</div></div>
          </div>
          ${table(
            ['User', 'Role', 'Scope', 'Last Active', 'Status', 'Actions'],
            [
              [cell('Stephen Edwards', 'stephen.edwards@enterpriseni.com', 'green'), 'ENI Super Admin', 'All loans', 'Today', badge('Completed'), button('Edit', '#roles-permissions', 'outline')],
              [cell('Sarah Mitchell', 'sarah.mitchell@enterpriseni.com', 'blue'), 'Operations Admin', 'Case processing', 'Today', badge('Completed'), button('Edit', '#roles-permissions', 'outline')],
              [cell('UCF Group', 'restricted portal users', 'amber'), 'UCF Approver', 'UCF only', 'Yesterday', badge('Completed'), button('View', 'ucf.html#approvals-inbox', 'outline')]
            ]
          )}
        `;
      }
    },
    'notifications': {
      title: 'Notifications',
      breadcrumb: 'Notifications',
      render: function() {
        return `
          ${pageHeader('Notifications', 'Email, SMS, and communication logging settings for key case events.')}
          <div class="card-grid">
            ${card('Email Templates', '<div class="doc-list"><div class="doc-item"><div class="doc-item-title">loans.docs.request</div><div class="doc-item-sub">Used when requesting missing evidence</div></div><div class="doc-item"><div class="doc-item-title">loans.offer.sent</div><div class="doc-item-sub">Used when sending a legal pack</div></div><div class="doc-item"><div class="doc-item-title">loans.payment.failed</div><div class="doc-item-sub">Used when a collection outcome imports as failed</div></div></div>')}
            ${card('SMS Templates', '<div class="doc-list"><div class="doc-item"><div class="doc-item-title">loans.signature.reminder</div><div class="doc-item-sub">Short reminder for unsigned documents</div></div><div class="doc-item"><div class="doc-item-title">loans.batch.import.alert</div><div class="doc-item-sub">Internal servicing alert when an import needs review</div></div></div>')}
            ${card('Logging Rules', '<div class="doc-list"><div class="doc-item"><div class="doc-item-title">Communication audit</div><div class="doc-item-sub">Store channel, template key, recipient, and delivery state on the case record.</div></div></div>')}
          </div>
        `;
      }
    },
    'lookups': {
      title: 'Lookups',
      breadcrumb: 'Lookups',
      render: function() {
        return `
          ${pageHeader('Lookups', 'Seeded reference data for sources, outcomes, offer types, repayment options, and servicing states.')}
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
            ${card('Referral Sources', '<div class="chip-row"><span class="chip">Accountant referral</span><span class="chip">Website handoff</span><span class="chip">LEA referral</span><span class="chip">Partner intro</span></div>')}
            ${card('Enquiry & Stage Outcomes', '<div class="chip-row"><span class="chip">Proceed</span><span class="chip">Reject</span><span class="chip">Refer</span><span class="chip">Proceed to Approval</span><span class="chip">Accepted</span></div>')}
            ${card('Offer Types & Repayment Days', '<div class="chip-row"><span class="chip">CCA</span><span class="chip">Non-CCA</span><span class="chip">Day 1</span><span class="chip">Day 17</span><span class="chip">Scheduled</span><span class="chip">Failed</span></div>')}
          </div>
        `;
      }
    }
  };

  const defaultRoute = 'overview';

  function setActiveNav(route) {
    document.querySelectorAll('.nav-item').forEach(function(item) {
      item.classList.toggle('active', item.getAttribute('data-route') === route);
    });

    const active = document.querySelector(`.nav-item[data-route="${route}"]`);
    if (active) {
      const section = active.closest('.nav-section');
      if (section) section.classList.remove('collapsed');
    }
  }

  function updateHeader(routeDef) {
    document.getElementById('page-title').textContent = routeDef.title;
    document.getElementById('breadcrumb-current').textContent = routeDef.breadcrumb;
    document.title = routeDef.title + ' - Loans Admin - eConX Portal';
  }

  function render() {
    const route = window.location.hash.replace('#', '') || defaultRoute;
    const routeDef = routes[route] || routes[defaultRoute];
    app.innerHTML = routeDef.render();
    updateHeader(routeDef);
    setActiveNav(route in routes ? route : defaultRoute);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function restoreSidebarState() {
    try {
      const state = JSON.parse(sessionStorage.getItem('loansSidebarState') || '{}');
      Object.keys(state).forEach(function(sectionName) {
        const section = document.querySelector(`[data-section="${sectionName}"]`);
        if (section && state[sectionName] === 'collapsed' && !section.querySelector('.nav-item.active')) {
          section.classList.add('collapsed');
        }
      });
    } catch (e) {
      return;
    }
  }

  window.toggleSection = function(header) {
    const section = header.closest('.nav-section');
    if (!section) return;
    section.classList.toggle('collapsed');
    try {
      const state = JSON.parse(sessionStorage.getItem('loansSidebarState') || '{}');
      state[section.getAttribute('data-section')] = section.classList.contains('collapsed') ? 'collapsed' : 'expanded';
      sessionStorage.setItem('loansSidebarState', JSON.stringify(state));
    } catch (e) {
      return;
    }
  };

  if (!window.location.hash) {
    window.location.hash = '#' + defaultRoute;
  }

  document.addEventListener('DOMContentLoaded', function() {
    restoreSidebarState();
    render();
  });
  window.addEventListener('hashchange', render);
})();
