# Loans Admin Screen Spec

## Purpose
This document defines the Phase 1 admin UX for the eConX Loans add-on. It is the written handoff for UI design, prototyping, and frontend implementation.

The module now covers the full Phase 1 operational journey:

- Enquiry intake and triage
- Application, assessment, approval, and offer progression
- Legal pack generation and signing
- Signing completion, loan setup, disbursement readiness, and loan record creation
- Post-disbursement direct debit servicing through Bacs batch handling, outcome import, and reconciliation
- Reporting, exports, permissions, and workflow configuration

Customer-facing pages are documented separately in the user portal spec. This document covers the internal admin shell and the restricted UCF approver shell.

## Product rules now locked
- Signing is the acceptance event. There is no separate customer acceptance journey.
- Borrower bank details and direct debit setup are entered internally by ENI staff.
- Phase 1 repayment servicing uses a Bacs direct debit operating model.
- Collection outcomes are imported back into eConX and matched against repayment lines.
- Non-exact payments apply up to the current due amount and leave any remainder or shortfall in manual reconciliation.

## Design rules

### Shell
- Match the existing property module shell closely.
- Keep the collapsible navy sidebar and sticky breadcrumb header.
- Keep pages dense and operational rather than marketing-led.

### Component usage
- List pages use `header + toolbar + filters + data table`.
- Workspace pages use a summary header with primary actions and tabs underneath.
- Multi-step data entry uses the existing stepper pattern.
- Audit, signing, and collections activity use the timeline card pattern.
- Small corrective actions stay in drawers or modals; stage-changing actions remain full-page.

### Shared status language
Use the existing badge system and extend it with servicing states.

| Type | States |
| --- | --- |
| Case / workflow | `Draft`, `Pending`, `In Progress`, `Query Back`, `Approved`, `Declined`, `Awaiting Signature`, `Accepted`, `Setup Pending`, `Ready to Disburse`, `Completed`, `Overdue` |
| MandateStatus | `Not Started`, `Captured`, `Pending`, `Active`, `Suspended`, `Cancelled` |
| RepaymentLineStatus | `Scheduled`, `Submitted`, `Paid`, `Partially Paid`, `Failed`, `Overdue` |
| BatchStatus | `Draft`, `Ready`, `Submitted`, `Imported`, `Completed`, `Needs Review` |
| ReconciliationStatus | `Open`, `Matched`, `Allocated`, `Retried`, `Resolved` |

## Navigation architecture

### Internal admin shell

#### Dashboard
- Overview
- Work Queues
- Reporting

#### Enquiries
- Manage Enquiries
- Enquiry Review

#### Cases
- Manage Cases
- Case Workspace

#### Assessment
- Assessment Queue
- Assessment Workspace

#### Approvals
- Internal Approvals
- Approval Review

#### Offers & Legal
- Offer Queue
- Offer Builder
- Conditions Checklist
- Legal Pack & Signature Tracking

#### Agreement & Setup
- Pending Setup
- Agreement Finalisation
- Loan Setup
- Disbursement Queue
- Loan Record

#### Repayments
- Repayments Overview
- Collection Batches
- Outcome Import
- Reconciliation Queue

#### Settings
- Templates
- Conditions
- Policies
- Roles & Permissions
- Notifications
- Lookups

### Restricted UCF approver shell
- Approvals Inbox
- Approval Review
- Decision History

## Screen inventory

| ID | Screen | Route | Shell |
| --- | --- | --- | --- |
| LA-01 | Overview Dashboard | `/loans/dashboard/overview.html` | Internal |
| LA-02 | Work Queues | `/loans/dashboard/work-queues.html` | Internal |
| LA-03 | Reporting | `/loans/dashboard/reporting.html` | Internal |
| LA-04 | Manage Enquiries | `/loans/pages/enquiries/manage-enquiries.html` | Internal |
| LA-05 | Enquiry Review | `/loans/pages/enquiries/enquiry-review.html` | Internal |
| LA-06 | Manage Cases | `/loans/pages/cases/manage-cases.html` | Internal |
| LA-07 | Case Workspace | `/loans/pages/cases/case-workspace.html` | Internal |
| LA-08 | Assessment Queue | `/loans/pages/assessment/assessment-queue.html` | Internal |
| LA-09 | Assessment Workspace | `/loans/pages/assessment/assessment-workspace.html` | Internal |
| LA-10 | Internal Approvals | `/loans/pages/approvals/internal-approvals.html` | Internal |
| LA-11 | Approval Review | `/loans/pages/approvals/approval-review.html` | Internal |
| LA-12 | Offer Queue | `/loans/pages/offers/offer-queue.html` | Internal |
| LA-13 | Offer Builder | `/loans/pages/offers/offer-builder.html` | Internal |
| LA-14 | Conditions Checklist | `/loans/pages/offers/conditions-checklist.html` | Internal |
| LA-15 | Legal Pack & Signature Tracking | `/loans/pages/offers/legal-pack.html` | Internal |
| LA-16 | Pending Setup | `/loans/pages/setup/pending-setup.html` | Internal |
| LA-17 | Agreement Finalisation | `/loans/pages/setup/agreement-finalisation.html` | Internal |
| LA-18 | Loan Setup | `/loans/pages/setup/loan-setup.html` | Internal |
| LA-19 | Disbursement Queue | `/loans/pages/setup/disbursement-queue.html` | Internal |
| LA-20 | Loan Record | `/loans/pages/setup/loan-record.html` | Internal |
| LA-21 | Repayments Overview | `/loans/pages/repayments/overview.html` | Internal |
| LA-22 | Collection Batches | `/loans/pages/repayments/collection-batches.html` | Internal |
| LA-23 | Outcome Import | `/loans/pages/repayments/outcome-import.html` | Internal |
| LA-24 | Reconciliation Queue | `/loans/pages/repayments/reconciliation-queue.html` | Internal |
| LA-25 | Templates | `/loans/pages/settings/templates.html` | Internal |
| LA-26 | Conditions | `/loans/pages/settings/conditions.html` | Internal |
| LA-27 | Policies | `/loans/pages/settings/policies.html` | Internal |
| LA-28 | Roles & Permissions | `/loans/pages/settings/roles-permissions.html` | Internal |
| LA-29 | Notifications | `/loans/pages/settings/notifications.html` | Internal |
| LA-30 | Lookups | `/loans/pages/settings/lookups.html` | Internal |
| UA-01 | Approvals Inbox | `/loans/ucf/approvals-inbox.html` | UCF |
| UA-02 | Approval Review | `/loans/ucf/approval-review.html` | UCF |
| UA-03 | Decision History | `/loans/ucf/decision-history.html` | UCF |

## Screen details

### LA-01 Overview Dashboard
Purpose: at-a-glance operational view across pre-disbursement and live-loan servicing.

Content:
- KPI cards for enquiries, cases in progress, approvals, awaiting signature, pending setup, ready to disburse, submitted collections, failed collections, and unapplied credit
- Stage pipeline from enquiry through setup
- Queue cards that deep-link to manual checks, approvals, pending setup, outcome import, and reconciliation
- Alerts for overdue follow-ups, blocked signatures, failed collections, and overdue repayment lines
- Recent decision and servicing activity timeline

### LA-02 Work Queues
Purpose: queue-first daily work management across cases and active-loan exceptions.

Queue groups:
- Verification required
- Supplementary forms outstanding
- Manual checks pending
- Internal approvals pending
- Offers awaiting send or signature
- Setup pending
- Collection outcomes awaiting import
- Reconciliation issues

Table columns:
- Case / loan
- Queue reason
- Stage
- Follow-up
- Owner
- Age
- Status
- Actions

### LA-03 Reporting
Purpose: operational MI and exports for both pipeline and Phase 1 repayment servicing.

Sections:
- Pipeline by stage
- Conversion and signature metrics
- Collections performance snapshot
- Failed payment / overdue totals
- Export center

Exports:
- Pipeline extract
- Approval outcomes
- Audit export
- Batch history
- Applied payments
- Failed payments
- Overdue items
- Unapplied credit

### LA-04 Manage Enquiries
Purpose: intake from imports or handoffs with duplicate awareness and routing into cases.

### LA-05 Enquiry Review
Purpose: review enquiry details, resolve duplicates, and convert the enquiry into a case.

### LA-06 Manage Cases
Purpose: master case list across all pre-disbursement stages.

Filters:
- Stage
- Owner
- Follow-up
- Approval status
- Signature status
- Ageing

### LA-07 Case Workspace
Purpose: primary case detail workspace for staff.

Tabs:
- Summary
- Parties & Forms
- Tasks & Follow-up
- Documents
- Communications
- Audit History

Key requirement:
- `Parties & Forms` must show main applicant form state, captured beneficial owners, invite state, and supplementary completion state.

### LA-08 Assessment Queue
Purpose: cases awaiting AML, ID/address, credit evidence, commitments, or memo completion.

### LA-09 Assessment Workspace
Purpose: structured review workspace for manual checks and assessment recommendation.

Tabs / sections:
- AML checklist
- ID and address evidence
- Credit evidence
- Commitments
- Assessment memo
- Recommendation summary

### LA-10 Internal Approvals
Purpose: queue of cases ready for internal decision.

### LA-11 Approval Review
Purpose: full-page decision screen for internal approval or rejection with mandatory rationale.

### LA-12 Offer Queue
Purpose: cases approved or query-resolved and ready for offer drafting or issuance.

### LA-13 Offer Builder
Purpose: multi-step pack definition for CCA / Non-CCA offers.

Stepper:
1. Offer type and headline terms
2. Pricing and repayment day
3. Guarantees / subordination
4. Recipients and send-to
5. Review

### LA-14 Conditions Checklist
Purpose: case-level gating view before pack issue, signing completion, setup, and disbursement.

### LA-15 Legal Pack & Signature Tracking
Purpose: generate the legal pack, choose recipients, send for signature, and track e-sign completion.

Required behavior:
- The page must make it explicit that completion of the final agreement signature is the acceptance event.
- Signed copies remain stored on the case and later linked into the loan record.

### LA-16 Pending Setup
Purpose: signed cases that still need internal completion steps before the loan record exists.

Table columns:
- Case
- Signed date
- Agreement finalisation
- Bank details
- Mandate
- Repayment schedule
- Loan record
- Actions

### LA-17 Agreement Finalisation
Purpose: internal post-signing confirmation page before loan setup.

Captured fields:
- Signed date
- Signed document reference
- Counter-sign status
- Counter-sign date if used
- Internal completion notes

Rules:
- No separate acceptance outcome is captured here.
- This page confirms that signing has completed and the case can move into setup.

### LA-18 Loan Setup
Purpose: convert a signed case into the live Phase 1 loan record.

Stepper:
1. Agreement and borrower confirmation
2. Bank details and direct debit setup
3. Offer term snapshot and schedule preview
4. Review and create loan

Captured fields:
- Account holder name
- Sort code
- Account number
- Verification status
- Mandate reference
- Mandate instruction date
- Source document / source reference
- First collection date
- Repayment day
- Mandate status
- Principal
- Term
- APR

Creation rules:
- Creating the loan also generates the initial repayment schedule.
- `Ready to Disburse` requires signed agreement complete, bank details entered, mandate setup recorded, repayment schedule generated, and offer terms locked.

### LA-19 Disbursement Queue
Purpose: show only setup-complete loans that satisfy all gating rules for payout recording.

Columns:
- Loan / case
- Borrower
- Amount
- Bank details verified
- Mandate status
- Repayment schedule status
- Readiness
- Actions

### LA-20 Loan Record
Purpose: read-only loan detail workspace once the record has been created.

Summary header:
- Loan ID
- Linked case
- Principal
- APR / repayment day
- Disbursement
- Outstanding balance
- Next collection date

Tabs:
- Overview
- Bank & Mandate
- Repayment Schedule
- Ledger / Allocation History
- Collection History
- Documents
- Audit

### LA-21 Repayments Overview
Purpose: live-loan servicing dashboard for operations.

KPI strip:
- Scheduled
- Submitted
- Paid
- Failed
- Overdue
- Unapplied credit
- Manual review

Content:
- Upcoming collection batches
- Import/outcome backlog
- Reconciliation queue summary
- Recent failed or overdue items

### LA-22 Collection Batches
Purpose: build and export Bacs direct debit submission files from eligible repayment lines.

Required behavior:
- Batch pulls only due lines with valid mandate status.
- Operators can exclude held or disputed lines before export.
- Each batch item carries a stable repayment reference derived from loan and instalment identity.

Core columns:
- Loan
- Instalment
- Mandate reference
- Repayment reference
- Amount
- Collection date
- Batch status
- Action

### LA-23 Outcome Import
Purpose: upload return/result files and preview matching before applying outcomes.

Matching order:
1. Exact batch item or repayment reference
2. Mandate or loan reference plus amount and expected date
3. Loan/account plus amount and date-window fallback
4. Manual reconciliation queue

Preview must show:
- Imported line
- Suggested match
- Outcome state
- Auto-allocation result
- Needs-review flag

### LA-24 Reconciliation Queue
Purpose: handle unmatched lines, failed collections, underpayments, and overpayments.

Operator actions:
- Confirm suggested match
- Allocate unapplied credit
- Retry in next batch
- Hold / dispute
- Mark resolved with note

Default allocation rules:
- Exact paid amount marks the current due line `Paid`
- Underpayment applies to the current due line and leaves the shortfall outstanding with a reconciliation issue
- Overpayment clears the current due line up to its amount and leaves remainder as unapplied credit
- Failed or returned items mark the line `Failed` or `Overdue` and create a queue item

### LA-25 Templates
Purpose: manage CCA / Non-CCA templates and repayment merge fields.

### LA-26 Conditions
Purpose: maintain checklist templates, including disbursement and repayment setup gates.

### LA-27 Policies
Purpose: configure workflow, reminder, signing, and servicing defaults.

Policy areas:
- Signature reminder cadence
- Placeholder account handling
- Default docs send-to
- Reconciliation warning thresholds
- Repayment reference pattern

### LA-28 Roles & Permissions
Purpose: define internal and restricted roles including repayment operations permissions.

### LA-29 Notifications
Purpose: manage templates and logging for case, signing, and repayment events.

Event examples:
- Docs requested
- Offer sent
- Signing complete
- Batch exported
- Failed collection imported

### LA-30 Lookups
Purpose: seeded reference data for referral sources, outcomes, offer types, repayment days, and servicing statuses.

## Design-level entities
These entities must exist in the design and implementation model so the servicing workflow is unambiguous:

- `LoanMandate`
- `RepaymentScheduleLine`
- `CollectionBatch`
- `CollectionBatchItem`
- `RepaymentLedgerEntry`
- `ReconciliationIssue`

## Validation checklist
- Every admin stage is covered end to end: enquiry -> case -> assessment -> internal approval -> UCF approval -> offer -> signing -> agreement finalisation -> loan setup -> disbursement -> collection batch -> outcome import -> reconciliation.
- The customer portal handoff is visible through `Parties & Forms`, `Communications`, and legal/signature tracking pages.
- Signing is never duplicated with a separate acceptance decision.
- Internal setup captures bank details and direct debit setup without requiring customer self-service bank entry.
- Batch creation only includes eligible repayment lines.
- Outcome import explicitly shows exact matches, fallback matches, failed returns, underpayments, overpayments, and unresolved items.
- Loan record, repayments overview, and reporting all reconcile to the same servicing states.

## Explicit exclusions
- Login and onboarding screens
- Full arrears strategy and collections automation beyond the queue-based Phase 1 model
- Customer self-service bank detail changes
- Statements, accounting integration, and month-end finance tooling
- Automated bureau, AML, or bank feed integrations
- Multi-envelope signing behavior beyond the agreed Phase 1 flow
