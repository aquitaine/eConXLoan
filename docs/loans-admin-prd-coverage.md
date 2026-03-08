# Loans Admin PRD Coverage Matrix

This matrix validates that every Phase 1 admin requirement in the PRD, plus the agreed workflow-closure additions, maps to at least one admin screen or workspace tab.

## Coverage summary

| PRD / agreed area | Requirement summary | Screen coverage | Notes |
| --- | --- | --- | --- |
| Core workflow | Stage model in eConX | LA-01, LA-06, LA-07 | Visible in dashboard pipeline, case list, and case workspace |
| Core workflow | Admin console with queues and case tracking | LA-01, LA-02, LA-06, LA-07 | Covered |
| Core workflow | Tasks, follow-ups, and communications | LA-02, LA-07 | Covered |
| Core workflow | Unified document handling | LA-07, LA-09, LA-11, LA-15, LA-20, LA-23 | Case and servicing documents both visible |
| Core workflow | Digital forms oversight | LA-07, LA-15 | Includes participant and signing visibility |
| Core workflow | Manual checks and evidence capture | LA-08, LA-09 | Covered |
| Core workflow | Restricted UCF approver access | UA-01, UA-02, UA-03 | Separate shell retained |
| Core workflow | Offer management and legal docs | LA-12, LA-13, LA-14, LA-15 | Covered |
| Core workflow | Signing completion, loan setup, disbursement readiness | LA-16, LA-17, LA-18, LA-19, LA-20 | Signing is the acceptance event |
| Core workflow | Repayment servicing operations | LA-21, LA-22, LA-23, LA-24, LA-20 | Added to close Phase 1 end to end |
| Core workflow | Reporting, exports, audit, permissions | LA-03, LA-25, LA-26, LA-27, LA-28, LA-29, LA-30, LA-07 | Covered |
| Dashboard | Enquiries requiring verification | LA-02 | Covered |
| Dashboard | Incomplete applications / supplementary forms / manual checks | LA-02, LA-07, LA-08, LA-09 | Covered |
| Dashboard | Approvals pending | LA-02, LA-10, UA-01 | Covered |
| Dashboard | Offers awaiting send or signature | LA-02, LA-12, LA-15 | Covered |
| Dashboard | Signed cases pending setup | LA-02, LA-16, LA-17, LA-18 | Covered |
| Dashboard | Collections import and reconciliation hotspots | LA-01, LA-02, LA-21, LA-23, LA-24 | Added |
| Assessment | AML, ID, address, credit, commitments, memo | LA-09 | Covered |
| Approvals | Internal approval capture | LA-10, LA-11 | Covered |
| Approvals | UCF approve / query-back / decline | UA-01, UA-02, UA-03 | Covered |
| Offers | CCA / Non-CCA, APR, term, repayment day, pack generation | LA-13, LA-15, LA-25, LA-30 | Covered |
| Signing | Final agreement tracked to completion | LA-15, LA-17 | Explicitly no duplicate acceptance step |
| Setup | Internal bank details and direct debit setup | LA-16, LA-18, LA-20 | Captured internally only |
| Setup | Repayment schedule generation on loan creation | LA-18, LA-20 | Added |
| Disbursement | Queue gated by signing, setup, and schedule readiness | LA-19 | Added readiness rule |
| Servicing | Collection batch build and export | LA-22 | Added |
| Servicing | Outcome import with preview and matching order | LA-23 | Added |
| Servicing | Underpayment / overpayment / failed return handling | LA-23, LA-24, LA-20 | Added |
| Servicing | Reconciliation queue with manual actions | LA-24 | Added |
| Servicing | Ledger, allocation history, and collection history on loan | LA-20 | Added |
| Reporting | Pipeline, approvals, audit exports | LA-03 | Covered |
| Reporting | Batch history, applied payments, failed payments, overdue, unapplied credit exports | LA-03, LA-21, LA-24 | Added |
| Technical approach | RBAC, audit trail, document storage reuse | LA-28, LA-07, LA-20, LA-23 | Reflected in UI design |
| Placeholder accounts | Missing-email support and later internal linking | LA-07, LA-27 | Still policy-driven |

## Validation notes
- The happy path is now represented end to end: enquiry -> case -> assessment -> internal approval -> UCF approval -> offer -> signing -> agreement finalisation -> loan setup -> disbursement -> collection batch -> outcome import -> reconciliation.
- The admin spec now includes the servicing screens that were previously excluded, so the written handoff matches the prototype direction.
- Signing completion replaces any separate acceptance decision in the admin flow.
- The customer portal remains outside this matrix except where the admin needs oversight of forms, signatures, documents, or messages.
- Statements, accounting integration, advanced arrears automation, and onboarding/login flows remain outside Phase 1.
