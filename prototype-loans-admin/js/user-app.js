(function() {
  const app = document.getElementById('user-app');
  if (!app) return;

  const badgeMap = {
    complete: 'badge badge-active',
    pending: 'badge badge-pending',
    review: 'badge badge-review',
    draft: 'badge badge-draft',
    overdue: 'badge badge-overdue'
  };

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

  function button(label, href, variant) {
    return `<a href="${href}" class="btn btn-${variant || 'outline'}">${label}</a>`;
  }

  function card(title, body, action) {
    return `
      <div class="card">
        ${title ? `<div class="flex items-center justify-between mb-5"><h3 class="text-lg font-bold text-enx-navy">${title}</h3>${action || ''}</div>` : ''}
        ${body}
      </div>
    `;
  }

  function table(headers, rows) {
    return `
      <table class="data-table">
        <thead><tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    `;
  }

  function badge(label, tone) {
    return `<span class="${badgeMap[tone] || badgeMap.draft}">${label}</span>`;
  }

  function statusStep(label, sub, tone, active) {
    return `
      <div class="portal-status-step ${active ? 'active' : ''}">
        <div class="portal-status-dot ${tone}"></div>
        <div class="portal-status-label">${label}</div>
        <div class="portal-status-sub">${sub}</div>
      </div>
    `;
  }

  function actionItem(title, sub, href, status) {
    return `
      <a href="${href}" class="action-card">
        <div>
          <div class="action-card-title">${title}</div>
          <div class="action-card-sub">${sub}</div>
        </div>
        ${status}
      </a>
    `;
  }

  const routes = {
    'portal-home': {
      title: 'My Application',
      breadcrumb: 'My Application',
      render: function() {
        return `
          ${pageHeader('My Application', 'Track progress, complete outstanding actions, and see what happens next in your loan journey.')}

          <div class="portal-hero mb-6">
            <div>
              <div class="eyebrow">Current stage</div>
              <div class="text-3xl font-bold text-enx-navy">Final Agreement Ready</div>
              <p class="page-intro mt-2">Your checks and approvals are complete. The next step is to review and sign the final agreement. Signing the final agreement accepts the offer and allows the team to move into setup and disbursement preparation.</p>
            </div>
            <div class="portal-hero-meta">
              <div class="portal-hero-item"><span>Application ID</span><strong>APP-24031</strong></div>
              <div class="portal-hero-item"><span>Business</span><strong>Harbour Works Ltd</strong></div>
              <div class="portal-hero-item"><span>Funding request</span><strong>&pound;120,000</strong></div>
            </div>
          </div>

          <div class="card mb-6">
            <div class="flex items-center justify-between mb-5">
              <h3 class="text-lg font-bold text-enx-navy">Status Tracker</h3>
              <span class="prototype-note">Customer-friendly milestones</span>
            </div>
            <div class="portal-status-track">
              ${statusStep('Started', 'Application created', 'complete', true)}
              ${statusStep('Forms Completed', 'Primary and participant forms signed', 'complete', true)}
              ${statusStep('Checks Complete', 'Internal review and approvals done', 'complete', true)}
              ${statusStep('Final Agreement', 'Ready for signature', 'review', true)}
              ${statusStep('Live Loan', 'Repayments appear after disbursement', 'draft', false)}
            </div>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            ${card(
              'Outstanding Actions',
              `
                <div class="action-list">
                  ${actionItem('Review and sign the final agreement', 'Signing the final agreement accepts the offer', '#signatures', badge('Required', 'pending'))}
                  ${actionItem('Check secure messages from the loans team', 'One message includes a request for the preferred drawdown week', '#messages', badge('New', 'pending'))}
                  ${actionItem('Review captured participant details', 'All beneficial owner forms are complete and available to view', '#participants', badge('Ready', 'review'))}
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
                      <div class="font-semibold text-enx-navy text-sm">Supplementary participant form signed</div>
                      <p class="text-sm text-gray-500 mt-1">Conor Keenan completed and signed the beneficial owner form on 07 Mar 2026.</p>
                      <div class="timeline-time">Yesterday</div>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                      <div class="font-semibold text-enx-navy text-sm">Offer approved and legal pack prepared</div>
                      <p class="text-sm text-gray-500 mt-1">Your application has passed internal review and the final agreement pack is ready.</p>
                      <div class="timeline-time">Today, 9:10 AM</div>
                    </div>
                  </div>
                </div>
              `
            )}
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
            ${card('Application Summary', '<div class="doc-list"><div class="doc-item"><div class="doc-item-title">Primary applicant</div><div class="doc-item-sub">John Keenan</div></div><div class="doc-item"><div class="doc-item-title">Supplementary participants</div><div class="doc-item-sub">2 captured, 2 complete</div></div></div>')}
            ${card('Documents', '<div class="doc-list"><div class="doc-item"><div class="doc-item-title">Uploaded</div><div class="doc-item-sub">7 documents</div></div><div class="doc-item"><div class="doc-item-title">Final agreement</div><div class="doc-item-sub">Ready for signature</div></div></div>', button('Open Library', '#library', 'outline'))}
            ${card('Repayments', '<div class="doc-list"><div class="doc-item"><div class="doc-item-title">When visible</div><div class="doc-item-sub">Repayments appear here once your loan is live</div></div><div class="doc-item"><div class="doc-item-title">What you will see</div><div class="doc-item-sub">Schedule, payment history, and support details</div></div></div>', button('Preview Repayments', '#repayments', 'outline'))}
          </div>
        `;
      }
    },
    'application-form': {
      title: 'Application Form',
      breadcrumb: 'Application Form',
      render: function() {
        return `
          ${pageHeader('Application Form', 'Complete the main application form, capture beneficial owners, and sign the application snapshot when finished.', button('Save & Return Later', '#portal-home', 'outline'))}

          <div class="card">
            <div class="stepper" data-current-step="1">
              <div class="step active"><div class="step-circle">1</div><div class="step-label">Business Details</div></div>
              <div class="step-line"></div>
              <div class="step"><div class="step-circle">2</div><div class="step-label">Funding Request</div></div>
              <div class="step-line"></div>
              <div class="step"><div class="step-circle">3</div><div class="step-label">Participants</div></div>
              <div class="step-line"></div>
              <div class="step"><div class="step-circle">4</div><div class="step-label">Declarations</div></div>
              <div class="step-line"></div>
              <div class="step"><div class="step-circle">5</div><div class="step-label">Review &amp; Sign</div></div>
            </div>

            <div class="step-content active" data-step-content="1">
              <h3 class="text-base font-bold text-enx-navy mb-4">Business Details</h3>
              <div class="form-row">
                <div class="form-group"><label class="form-label">Business Name</label><input class="form-input" value="Harbour Works Ltd"></div>
                <div class="form-group"><label class="form-label">Company Registration Number</label><input class="form-input" value="NI245991"></div>
              </div>
              <div class="form-row">
                <div class="form-group"><label class="form-label">Trading Address</label><input class="form-input" value="1 Harbour Estate, Larne"></div>
                <div class="form-group"><label class="form-label">Primary Contact Email</label><input class="form-input" value="john@harbourworks.com"></div>
              </div>
              <div class="stepper-actions"><div></div><button class="btn btn-primary" data-stepper-next>Next: Funding Request</button></div>
            </div>

            <div class="step-content" data-step-content="2">
              <h3 class="text-base font-bold text-enx-navy mb-4">Funding Request</h3>
              <div class="form-row">
                <div class="form-group"><label class="form-label">Amount Requested</label><input class="form-input" value="120000"></div>
                <div class="form-group"><label class="form-label">Preferred Repayment Day</label><select class="form-select"><option>Day 17</option><option>Day 1</option></select></div>
              </div>
              <div class="form-group"><label class="form-label">What will the funding be used for?</label><textarea class="form-textarea">Working capital to expand fabrication capacity and recruit two technical staff.</textarea></div>
              <div class="stepper-actions"><button class="btn btn-secondary" data-stepper-prev>Back</button><button class="btn btn-primary" data-stepper-next>Next: Participants</button></div>
            </div>

            <div class="step-content" data-step-content="3">
              <h3 class="text-base font-bold text-enx-navy mb-4">Beneficial Owners / Participants</h3>
              <div class="warning-banner">Capture each beneficial owner or other required participant here first. The loans team uses this list to issue supplementary forms and track completion.</div>
              <div class="form-row">
                <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" value="Conor Keenan"></div>
                <div class="form-group"><label class="form-label">Email Address</label><input class="form-input" value="conor@harbourworks.com"></div>
              </div>
              <div class="form-row">
                <div class="form-group"><label class="form-label">Role / Relationship</label><input class="form-input" value="Beneficial owner"></div>
                <div class="form-group"><label class="form-label">Ownership % / Reason</label><input class="form-input" value="35% shareholding"></div>
              </div>
              <div class="doc-list mb-5">
                <div class="doc-item"><div class="doc-item-title">Conor Keenan</div><div class="doc-item-sub">Beneficial owner · 35% · Supplementary form required</div></div>
                <div class="doc-item"><div class="doc-item-title">Máire Keenan</div><div class="doc-item-sub">Beneficial owner · 20% · Supplementary form required</div></div>
              </div>
              <div class="flex flex-wrap gap-2 mb-5">
                <button class="btn btn-outline" data-form-submit="Additional participant draft row added">Add Another Participant</button>
              </div>
              <div class="stepper-actions"><button class="btn btn-secondary" data-stepper-prev>Back</button><button class="btn btn-primary" data-stepper-next>Next: Declarations</button></div>
            </div>

            <div class="step-content" data-step-content="4">
              <h3 class="text-base font-bold text-enx-navy mb-4">Declarations</h3>
              <div class="checklist-list">
                <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">I confirm the information provided is accurate</div></div><label class="form-switch"><input type="checkbox" checked><span class="switch-slider"></span></label></div>
                <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">I confirm the participant list is complete to the best of my knowledge</div></div><label class="form-switch"><input type="checkbox" checked><span class="switch-slider"></span></label></div>
                <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">I understand supplementary participants may receive separate secure forms to complete</div></div><label class="form-switch"><input type="checkbox" checked><span class="switch-slider"></span></label></div>
              </div>
              <div class="stepper-actions"><button class="btn btn-secondary" data-stepper-prev>Back</button><button class="btn btn-primary" data-stepper-next>Next: Review &amp; Sign</button></div>
            </div>

            <div class="step-content" data-step-content="5">
              <h3 class="text-base font-bold text-enx-navy mb-4">Review &amp; Sign</h3>
              <div class="ready-banner">When you sign, a snapshot of the main application is stored on your application record and the participant list becomes the source for supplementary invite tracking.</div>
              <div class="summary-grid mb-5">
                <div class="status-block"><div class="eyebrow">Business</div><div class="mini-stat-value">Harbour Works Ltd</div></div>
                <div class="status-block"><div class="eyebrow">Amount Requested</div><div class="mini-stat-value">&pound;120,000</div></div>
                <div class="status-block"><div class="eyebrow">Participants Captured</div><div class="mini-stat-value">2</div></div>
                <div class="status-block"><div class="eyebrow">Repayment Day</div><div class="mini-stat-value">Day 17</div></div>
              </div>
              <div class="stepper-actions"><button class="btn btn-secondary" data-stepper-prev>Back</button><a href="#signatures" class="btn btn-primary">Sign Application</a></div>
            </div>
          </div>
        `;
      }
    },
    'participants': {
      title: 'Participants',
      breadcrumb: 'Participants',
      render: function() {
        return `
          ${pageHeader('Supplementary Participants', 'Track captured beneficial owners, resend invites if needed, and see whether each supplementary form is complete.', button('Return to Application Form', '#application-form', 'outline'))}

          <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            ${card('Captured', '<div class="status-block"><div class="eyebrow">Participants listed</div><div class="mini-stat-value">2</div><div class="mini-stat-sub">Captured in the main application form</div></div>')}
            ${card('Completion', '<div class="status-block"><div class="eyebrow">Forms complete</div><div class="mini-stat-value">2 / 2</div><div class="mini-stat-sub">All supplementary forms now complete</div></div>')}
            ${card('Help', '<div class="status-block"><div class="eyebrow">Need a change?</div><div class="mini-stat-sub">If a participant email or ownership detail is wrong, message the loans team so the list can be corrected.</div></div>', button('Message Team', '#messages', 'outline'))}
          </div>

          ${table(
            ['Participant', 'Role', 'Invite Status', 'Form Status', 'Last Activity', 'Action'],
            [
              ['Máire Keenan', 'Beneficial owner', badge('Delivered', 'complete'), badge('Completed', 'complete'), '07 Mar 2026', button('View Library Copy', '#library', 'outline')],
              ['Conor Keenan', 'Beneficial owner', badge('Delivered', 'complete'), badge('Completed', 'complete'), 'Completed yesterday', button('Open Form Preview', '#supplementary-form', 'outline')]
            ]
          )}
        `;
      }
    },
    'supplementary-form': {
      title: 'Supplementary Form',
      breadcrumb: 'Supplementary Form',
      render: function() {
        return `
          ${pageHeader('Supplementary Form', 'Secure-link form for a beneficial owner or other invited participant.', button('Back to Participants', '#participants', 'outline'))}

          <div class="warning-banner mb-6">Prototype note: this screen is reused for invited supplementary participants, including when they enter from a secure link outside the main portal shell.</div>

          <div class="card">
            <div class="stepper" data-current-step="1">
              <div class="step active"><div class="step-circle">1</div><div class="step-label">Personal Details</div></div>
              <div class="step-line"></div>
              <div class="step"><div class="step-circle">2</div><div class="step-label">Ownership &amp; Role</div></div>
              <div class="step-line"></div>
              <div class="step"><div class="step-circle">3</div><div class="step-label">Address &amp; ID</div></div>
              <div class="step-line"></div>
              <div class="step"><div class="step-circle">4</div><div class="step-label">Declarations</div></div>
              <div class="step-line"></div>
              <div class="step"><div class="step-circle">5</div><div class="step-label">Review &amp; Sign</div></div>
            </div>

            <div class="step-content active" data-step-content="1">
              <h3 class="text-base font-bold text-enx-navy mb-4">Personal Details</h3>
              <div class="form-row">
                <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" value="Conor Keenan"></div>
                <div class="form-group"><label class="form-label">Date of Birth</label><input class="form-input" type="date" value="1988-09-12"></div>
              </div>
              <div class="form-row">
                <div class="form-group"><label class="form-label">Email Address</label><input class="form-input" value="conor@harbourworks.com"></div>
                <div class="form-group"><label class="form-label">Phone Number</label><input class="form-input" value="+44 28 9333 2233"></div>
              </div>
              <div class="stepper-actions"><div></div><button class="btn btn-primary" data-stepper-next>Next: Ownership &amp; Role</button></div>
            </div>

            <div class="step-content" data-step-content="2">
              <h3 class="text-base font-bold text-enx-navy mb-4">Ownership &amp; Role</h3>
              <div class="form-row">
                <div class="form-group"><label class="form-label">Relationship to Business</label><input class="form-input" value="Beneficial owner"></div>
                <div class="form-group"><label class="form-label">Ownership % / Interest</label><input class="form-input" value="35%"></div>
              </div>
              <div class="form-group"><label class="form-label">Role Description</label><textarea class="form-textarea">Director and shareholder involved in operational oversight.</textarea></div>
              <div class="stepper-actions"><button class="btn btn-secondary" data-stepper-prev>Back</button><button class="btn btn-primary" data-stepper-next>Next: Address &amp; ID</button></div>
            </div>

            <div class="step-content" data-step-content="3">
              <h3 class="text-base font-bold text-enx-navy mb-4">Address &amp; ID</h3>
              <div class="form-row">
                <div class="form-group"><label class="form-label">Home Address</label><input class="form-input" value="21 Coast Road, Larne"></div>
                <div class="form-group"><label class="form-label">ID Type</label><select class="form-select"><option>Passport</option><option>Driving Licence</option></select></div>
              </div>
              <div class="upload-zone">
                <div class="upload-zone-title">Upload ID or proof of address</div>
                <div class="upload-zone-sub">PDF, JPG, or PNG up to 10MB</div>
                <button class="btn btn-outline btn-sm mt-3">Choose File</button>
              </div>
              <div class="stepper-actions"><button class="btn btn-secondary" data-stepper-prev>Back</button><button class="btn btn-primary" data-stepper-next>Next: Declarations</button></div>
            </div>

            <div class="step-content" data-step-content="4">
              <h3 class="text-base font-bold text-enx-navy mb-4">Declarations</h3>
              <div class="checklist-list">
                <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">I confirm these details are correct</div></div><label class="form-switch"><input type="checkbox" checked><span class="switch-slider"></span></label></div>
                <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">I understand my information will be attached to the main application record</div></div><label class="form-switch"><input type="checkbox" checked><span class="switch-slider"></span></label></div>
                <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">I consent to the requested ID and address documents being reviewed for the application</div></div><label class="form-switch"><input type="checkbox" checked><span class="switch-slider"></span></label></div>
              </div>
              <div class="stepper-actions"><button class="btn btn-secondary" data-stepper-prev>Back</button><button class="btn btn-primary" data-stepper-next>Next: Review &amp; Sign</button></div>
            </div>

            <div class="step-content" data-step-content="5">
              <h3 class="text-base font-bold text-enx-navy mb-4">Review &amp; Sign</h3>
              <div class="ready-banner">Once signed, your supplementary form is attached to the main application and marked complete in the participant tracker.</div>
              <div class="stepper-actions"><button class="btn btn-secondary" data-stepper-prev>Back</button><button class="btn btn-primary" data-form-submit="Supplementary form signed">Sign Supplementary Form</button></div>
            </div>
          </div>
        `;
      }
    },
    'documents': {
      title: 'Upload Documents',
      breadcrumb: 'Upload Documents',
      render: function() {
        return `
          ${pageHeader('Upload Documents', 'Provide any requested evidence and see what has already been received.')}

          <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            ${card('Required Now', '<div class="status-block"><div class="eyebrow">Outstanding</div><div class="mini-stat-value">0</div><div class="mini-stat-sub">No documents are currently blocking your application</div></div>')}
            ${card('Uploaded', '<div class="status-block"><div class="eyebrow">Accepted files</div><div class="mini-stat-value">7</div><div class="mini-stat-sub">Visible to the review team</div></div>')}
            ${card('Validation', '<div class="status-block"><div class="eyebrow">Allowed types</div><div class="mini-stat-sub">PDF, JPG, PNG. If the team asks for another document, upload it here or attach it in secure messages.</div></div>')}
          </div>

          <div class="doc-grid mb-6">
            <div class="card">
              <div class="queue-card-title mb-2">Additional supporting file</div>
              <div class="queue-card-sub mb-4">Use this area if the loans team asks for another supporting document after your main checklist is complete.</div>
              <div class="upload-zone">
                <div class="upload-zone-title">Drop files here or choose a file</div>
                <div class="upload-zone-sub">Max 10MB</div>
                <button class="btn btn-primary btn-sm mt-3">Upload File</button>
              </div>
            </div>
            <div class="card">
              <div class="queue-card-title mb-2">Documents already uploaded</div>
              <div class="doc-list">
                <div class="doc-item"><div class="doc-item-title">Passport - John Keenan.pdf</div><div class="doc-item-sub">Accepted</div></div>
                <div class="doc-item"><div class="doc-item-title">Participant ID - Conor Keenan.pdf</div><div class="doc-item-sub">Accepted</div></div>
                <div class="doc-item"><div class="doc-item-title">Business bank statement - Feb 2026.pdf</div><div class="doc-item-sub">Accepted</div></div>
              </div>
            </div>
          </div>

          ${card(
            'Document Checklist',
            table(
              ['Document Type', 'Status', 'Last Updated', 'Notes'],
              [
                ['Application form', badge('Signed', 'complete'), '07 Mar 2026', 'Snapshot stored'],
                ['Supplementary forms', badge('Complete', 'complete'), '07 Mar 2026', 'All participant forms signed'],
                ['ID evidence', badge('Accepted', 'complete'), '07 Mar 2026', 'No further action'],
                ['Legal pack', badge('Ready', 'review'), '08 Mar 2026', 'Awaiting final agreement signature']
              ]
            )
          )}
        `;
      }
    },
    'signatures': {
      title: 'Signatures',
      breadcrumb: 'Signatures',
      render: function() {
        return `
          ${pageHeader('Signatures', 'See what has already been signed and what still needs your signature. Signing the final agreement accepts the offer.', button('Open Library', '#library', 'outline'))}

          <div class="signature-strip">
            <div class="signature-step complete"><div class="signature-step-title">Application Form</div><div class="signature-step-sub">Signed on 07 Mar 2026</div></div>
            <div class="signature-step complete"><div class="signature-step-title">Supplementary Forms</div><div class="signature-step-sub">2 of 2 completed</div></div>
            <div class="signature-step pending"><div class="signature-step-title">Final Agreement</div><div class="signature-step-sub">Ready to review and sign</div></div>
            <div class="signature-step"><div class="signature-step-title">Signed Copies</div><div class="signature-step-sub">Appear in your library after completion</div></div>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            ${card(
              'Current Signing Items',
              `
                <div class="doc-list">
                  <div class="doc-item"><div class="doc-item-title">Main application form</div><div class="doc-item-sub">Signed and stored</div></div>
                  <div class="doc-item"><div class="doc-item-title">All supplementary participant forms</div><div class="doc-item-sub">Signed and attached to the application record</div></div>
                  <div class="doc-item"><div class="doc-item-title">Final agreement pack</div><div class="doc-item-sub">Review and sign when ready. This signature accepts the offer.</div></div>
                </div>
                <div class="mt-5">${button('Open Final Agreement', '#library', 'primary')}</div>
              `
            )}
            ${card(
              'How signing works',
              `
                <div class="thread-list">
                  <div class="thread-item"><div class="thread-item-title">1. Review the document</div><div class="thread-item-sub">You will receive a secure prompt when a new document is ready.</div></div>
                  <div class="thread-item"><div class="thread-item-title">2. Sign electronically</div><div class="thread-item-sub">Signing the final agreement is the point where you accept the offer.</div></div>
                  <div class="thread-item"><div class="thread-item-title">3. Download signed copies</div><div class="thread-item-sub">Signed documents will then appear in the portal library.</div></div>
                </div>
              `
            )}
          </div>
        `;
      }
    },
    'messages': {
      title: 'Messages',
      breadcrumb: 'Messages',
      render: function() {
        return `
          ${pageHeader('Messages', 'Secure messages and application-linked replies. Files attached here are stored against your application record.')}

          <div class="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
            ${card(
              'Conversation',
              `
                <div class="message-thread">
                  <div class="message-bubble team">
                    <div class="message-meta">Loans Team · Today 9:10 AM</div>
                    <div class="message-body">Please confirm your preferred drawdown week and attach any supporting note or board minute you want linked to the final agreement record before disbursement planning starts.</div>
                  </div>
                  <div class="message-bubble customer">
                    <div class="message-meta">You · Today 10:02 AM</div>
                    <div class="message-body">Thanks. We are targeting the week beginning 24 March and I will attach the signed board minute in this reply.</div>
                  </div>
                </div>
                <div class="compose-box">
                  <label class="form-label">Reply</label>
                  <textarea class="form-textarea" placeholder="Type your message here..."></textarea>
                  <div class="upload-zone mt-4">
                    <div class="upload-zone-title">Attach a supporting file</div>
                    <div class="upload-zone-sub">Any attachment sent here is saved to your application document record.</div>
                    <button class="btn btn-outline btn-sm mt-3">Choose File</button>
                  </div>
                  <div class="doc-list mt-4">
                    <div class="doc-item"><div class="doc-item-title">Draft attachment</div><div class="doc-item-sub">board-minute-mar-2026.pdf</div></div>
                  </div>
                  <div class="flex items-center justify-between mt-3">
                    <span class="prototype-note">Attachments added here become part of the case document library.</span>
                    <button class="btn btn-primary" data-form-submit="Secure reply sent">Send Reply</button>
                  </div>
                </div>
              `
            )}
            ${card(
              'Message Summary',
              `
                <div class="doc-list">
                  <div class="doc-item"><div class="doc-item-title">Open queries</div><div class="doc-item-sub">1</div></div>
                  <div class="doc-item"><div class="doc-item-title">Latest response due</div><div class="doc-item-sub">Before final disbursement planning</div></div>
                  <div class="doc-item"><div class="doc-item-title">Attachments in draft</div><div class="doc-item-sub">1 file selected</div></div>
                </div>
              `
            )}
          </div>
        `;
      }
    },
    'library': {
      title: 'Document Library',
      breadcrumb: 'Document Library',
      render: function() {
        return `
          ${pageHeader('Document Library', 'Access signed copies, completed forms, and your uploaded files.')}

          ${table(
            ['Document', 'Category', 'Status', 'Added', 'Action'],
            [
              ['Application form snapshot.pdf', 'Completed forms', badge('Signed', 'complete'), '07 Mar 2026', button('View', '#library', 'outline')],
              ['Supplementary form - Conor Keenan.pdf', 'Completed forms', badge('Signed', 'complete'), '07 Mar 2026', button('View', '#library', 'outline')],
              ['Business bank statement - Feb 2026.pdf', 'Uploaded evidence', badge('Accepted', 'complete'), '07 Mar 2026', button('View', '#library', 'outline')],
              ['Final agreement.pdf', 'Signed copies', badge('Ready to sign', 'review'), '08 Mar 2026', button('Open Signatures', '#signatures', 'outline')]
            ]
          )}
        `;
      }
    },
    'repayments': {
      title: 'Repayments',
      breadcrumb: 'Repayments',
      render: function() {
        return `
          ${pageHeader('Repayments', 'Read-only view of your live loan once the loan has been disbursed and collections have started.', button('Need help?', '#messages', 'outline'))}

          <div class="warning-banner mb-6">Prototype note: this page illustrates the post-disbursement state. It becomes relevant once your loan is live and repayments begin.</div>

          <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            ${card('Loan Summary', '<div class="status-block"><div class="eyebrow">Loan ID</div><div class="mini-stat-value">LN-1008</div><div class="mini-stat-sub">&pound;45,000 principal · Day 1 collection</div></div>')}
            ${card('Next Collection', '<div class="status-block"><div class="eyebrow">Due next</div><div class="mini-stat-value">01 Apr 2026</div><div class="mini-stat-sub">&pound;1,359 scheduled</div></div>')}
            ${card('Support', '<div class="status-block"><div class="eyebrow">Need help?</div><div class="mini-stat-sub">If you have questions about a collection, use secure messages so the team can review your loan record.</div></div>', button('Open Messages', '#messages', 'outline'))}
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            ${card(
              'Repayment Schedule',
              table(
                ['Instalment', 'Due Date', 'Amount', 'Status'],
                [
                  ['001', '01 Mar 2026', '&pound;1,359', badge('Paid', 'complete')],
                  ['002', '01 Apr 2026', '&pound;1,359', badge('Scheduled', 'review')],
                  ['003', '01 May 2026', '&pound;1,359', badge('Scheduled', 'review')],
                  ['004', '01 Jun 2026', '&pound;1,359', badge('Scheduled', 'review')]
                ]
              )
            )}
            ${card(
              'Payment History',
              table(
                ['Date', 'Reference', 'Amount', 'Result'],
                [
                  ['01 Mar 2026', 'LN-1008-001', '&pound;1,359', badge('Collected', 'complete')],
                  ['08 Mar 2026', 'Loan disbursement', '&pound;45,000', badge('Completed', 'complete')]
                ]
              )
            )}
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            ${card('Collection Notices', '<div class="doc-list"><div class="doc-item"><div class="doc-item-title">No failed payments currently</div><div class="doc-item-sub">If a collection fails or needs attention, a notice will appear here and the loans team will contact you.</div></div></div>')}
            ${card('Balance Snapshot', '<div class="doc-list"><div class="doc-item"><div class="doc-item-title">Outstanding balance</div><div class="doc-item-sub">&pound;43,641 after the latest imported repayment</div></div><div class="doc-item"><div class="doc-item-title">Payment method</div><div class="doc-item-sub">Direct debit set up by the loans team</div></div></div>')}
          </div>
        `;
      }
    },
    'account': {
      title: 'Profile & Preferences',
      breadcrumb: 'Profile & Preferences',
      render: function() {
        return `
          ${pageHeader('Profile & Preferences', 'Manage contact details and notification preferences for this portal experience.')}

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            ${card(
              'Profile',
              `
                <div class="form-row">
                  <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" value="John Keenan"></div>
                  <div class="form-group"><label class="form-label">Email</label><input class="form-input" value="john@harbourworks.com"></div>
                </div>
                <div class="form-row">
                  <div class="form-group"><label class="form-label">Phone</label><input class="form-input" value="+44 28 9333 1234"></div>
                  <div class="form-group"><label class="form-label">Business</label><input class="form-input" value="Harbour Works Ltd" disabled></div>
                </div>
              `
            )}
            ${card(
              'Preferences',
              `
                <div class="checklist-list">
                  <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">Email notifications</div><div class="queue-card-sub">Receive updates when actions are required or documents are ready</div></div><label class="form-switch"><input type="checkbox" checked><span class="switch-slider"></span></label></div>
                  <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">Message alerts</div><div class="queue-card-sub">Get notified when the team sends a secure message</div></div><label class="form-switch"><input type="checkbox" checked><span class="switch-slider"></span></label></div>
                  <div class="checklist-item flex items-center justify-between"><div><div class="queue-card-title">Repayment notices</div><div class="queue-card-sub">Receive updates when a live-loan payment status changes</div></div><label class="form-switch"><input type="checkbox" checked><span class="switch-slider"></span></label></div>
                </div>
                <div class="flex flex-wrap gap-2 mt-5">
                  <button class="btn btn-outline" data-form-submit="Support contact details shown">View Support Details</button>
                  <button class="btn btn-primary" data-form-submit="Preferences saved">Save Preferences</button>
                </div>
              `
            )}
          </div>
        `;
      }
    }
  };

  const defaultRoute = 'portal-home';

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
    document.title = routeDef.title + ' - Loans Portal - eConX Portal';
  }

  function render() {
    const route = window.location.hash.replace('#', '') || defaultRoute;
    const routeDef = routes[route] || routes[defaultRoute];
    app.innerHTML = routeDef.render();
    setActiveNav(route in routes ? route : defaultRoute);
    updateHeader(routeDef);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function restoreSidebarState() {
    try {
      const state = JSON.parse(sessionStorage.getItem('loansPortalSidebarState') || '{}');
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
      const state = JSON.parse(sessionStorage.getItem('loansPortalSidebarState') || '{}');
      state[section.getAttribute('data-section')] = section.classList.contains('collapsed') ? 'collapsed' : 'expanded';
      sessionStorage.setItem('loansPortalSidebarState', JSON.stringify(state));
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
