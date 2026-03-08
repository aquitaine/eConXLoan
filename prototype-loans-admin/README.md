# Loans Admin Prototype

This folder contains a static clickable prototype for the Phase 1 loans admin section, the restricted UCF approver view, and the customer portal.

## Open locally

- Internal admin shell: `/Users/dhruv/code/eConXLoans/prototype-loans-admin/index.html`
- UCF restricted shell: `/Users/dhruv/code/eConXLoans/prototype-loans-admin/ucf.html`
- Customer portal shell: `/Users/dhruv/code/eConXLoans/prototype-loans-admin/user.html`

## Included coverage

- Dashboard, queues, enquiries, cases, assessment, approvals, offers, legal, agreement finalisation, setup, disbursement, repayments servicing, and settings
- Restricted UCF approvals inbox, review, and decision history
- Customer portal pages for application status, participant capture, supplementary forms, uploads, signatures, messages with attachments, library, repayments, and profile/preferences
- Styling aligned to the existing eConX property module shell and component language

## Notes

- This is a design prototype, not a connected application.
- Navigation is hash-based inside each shell so all screens are accessible without a build step.
- Phase 1 repayment servicing is modelled as a Bacs direct debit workflow with batch build, outcome import, and reconciliation screens.
