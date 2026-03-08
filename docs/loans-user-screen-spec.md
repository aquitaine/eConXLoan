# Loans User Portal Screen Spec

## Purpose
This document defines the Phase 1 customer-facing portal pages for the eConX Loans module. It complements the admin and UCF specs and covers the borrower and supplementary participant experience after access has already been granted.

## Product rules now locked
- No login, invite-accept, or onboarding screens are included in this pass.
- Signing the final agreement is the acceptance event.
- Bank details and direct debit setup are entered by the business internally, not by the customer.
- Repayments are visible to the customer on a read-only basis once the loan is live.

## Phase 1 user scope
- Application status tracker
- Main application form completion and digital signing
- Beneficial owner / participant capture before invites are sent
- Participant invite tracking and supplementary form completion
- Required document uploads and validation messaging
- E-sign status and signed-copy visibility
- Secure messaging with attachment upload
- Document library
- Read-only repayment visibility after disbursement
- Profile and notification preferences

## Route inventory

| ID | Screen | Route | Purpose |
| --- | --- | --- | --- |
| UP-01 | My Application | `prototype-loans-admin/user.html#portal-home` | Customer dashboard with status tracker, outstanding actions, and recent activity |
| UP-02 | Application Form | `prototype-loans-admin/user.html#application-form` | Main applicant multi-step application completion, participant capture, and signing flow |
| UP-03 | Participants | `prototype-loans-admin/user.html#participants` | Main applicant view of captured beneficial owners, invite state, and supplementary completion |
| UP-04 | Supplementary Form | `prototype-loans-admin/user.html#supplementary-form` | Secure-link participant flow for beneficial owner details, uploads, declarations, and signing |
| UP-05 | Upload Documents | `prototype-loans-admin/user.html#documents` | Required document prompts, upload area, and checklist state |
| UP-06 | Signatures | `prototype-loans-admin/user.html#signatures` | Status of application, supplementary forms, and final agreement signing |
| UP-07 | Messages | `prototype-loans-admin/user.html#messages` | Secure application-linked messaging with attachment support |
| UP-08 | Document Library | `prototype-loans-admin/user.html#library` | Access to completed forms, uploaded files, and signed copies |
| UP-09 | Repayments | `prototype-loans-admin/user.html#repayments` | Read-only live-loan view with repayment schedule and payment history |
| UP-10 | Profile & Preferences | `prototype-loans-admin/user.html#account` | Contact details, notification preferences, and support guidance |

## Design notes
- The portal reuses the eConX shell language with a simpler, more customer-friendly hierarchy than the admin console.
- The main applicant captures beneficial owners inside the application form before supplementary invites are managed from the `Participants` page.
- The supplementary form is shared between portal navigation and secure-link access.
- The `Repayments` page is only relevant once the loan is live; it is still part of the Phase 1 route set so the customer journey remains complete after disbursement.
- Because onboarding is excluded, the prototype starts inside an already-accessible application context.

## Screen details

### UP-01 My Application
Purpose: orient the applicant, show stage progress, surface current actions, and show recent activity.

Required content:
- Current stage hero
- Customer-friendly milestone tracker
- Outstanding action cards
- Recent activity timeline
- Summary cards for participants, documents, and signing

### UP-02 Application Form
Purpose: complete the main loan application and capture beneficial owners before signing.

Stepper:
1. Business details
2. Funding request
3. Beneficial owners / participants
4. Declarations
5. Review and sign

Participant capture fields:
- Full name
- Email
- Role / relationship to business
- Ownership percentage or reason for inclusion
- Invite required indicator

Rules:
- Signing stores a snapshot of the main application form.
- Captured participants feed the `Participants` management page.

### UP-03 Participants
Purpose: manage captured beneficial owners after they have been entered in the application form.

Content:
- Completion summary
- Invite summary
- Table of participants with invite status, supplementary form status, last activity, and actions
- Clear guidance that changes to the participant list are requested through the application form or secure message flow

### UP-04 Supplementary Form
Purpose: let invited beneficial owners complete their own details, uploads, declarations, and signature.

Stepper:
1. Personal details
2. Ownership and role
3. Address and ID upload
4. Declarations
5. Review and sign

### UP-05 Upload Documents
Purpose: show requested evidence, upload new files, and show checklist state.

### UP-06 Signatures
Purpose: present all signed and pending signature steps across the application lifecycle.

Required behavior:
- The page must explicitly state that signing the final agreement accepts the offer.
- Signed copies appear in the library after completion.

### UP-07 Messages
Purpose: secure query-back thread with attachment support.

Required behavior:
- Customers can attach supporting files to replies.
- Attachment copy explains that files become part of the application record.

### UP-08 Document Library
Purpose: access to form snapshots, uploaded evidence, and signed copies.

### UP-09 Repayments
Purpose: read-only live-loan servicing view after disbursement.

Required content:
- Loan summary
- Outstanding balance
- Next collection date
- Repayment schedule
- Payment history
- Failed-payment or overdue notices if present
- Support contact / help text

Rules:
- No customer editing of bank details or mandate data in Phase 1.
- This page reflects imported repayment outcomes from the admin servicing workflow.

### UP-10 Profile & Preferences
Purpose: maintain contact details and notification preferences without introducing login management screens.

## Validation checklist
- Main applicant can capture beneficial owners before invite management begins.
- Supplementary participants can complete a full end-to-end form with uploads and signature.
- Query-back replies can include attachments.
- Final agreement signature is clearly shown as the acceptance event.
- Read-only repayment visibility exists for live loans even though bank details are managed internally.
- No login, password-reset, or onboarding flows appear in this Phase 1 scope.
