# BackEnd Roadplan

## Summary
- This document keeps the **v1 to v6 planning evolution** while aligning all decisions to `docs/after-class-prd.md`.
- Product target: **safety-first verified campus dating app** with **meetup-first MVP**.
- PRD-critical guardrail: **no normal in-app 1:1 chat thread in MVP**.

## v1 — Foundation Stack (PRD-Aligned)
- **Goal:** establish baseline backend for verified-student mobile flow.
- **Stack direction:**
  - Go backend with REST APIs
  - PostgreSQL for durable product data
  - Redis for cache/rate-limit/ephemeral state only
- **PRD alignment:**
  - mobile-first onboarding and discovery support
  - verified `.edu` access control requirements

## v2 — Data Boundary and Performance Model
- **Goal:** enforce clean source-of-truth boundaries and mobile responsiveness.
- **Locked model:**
  - PostgreSQL authoritative for users/profiles/matches/meetup/safety records
  - Redis ephemeral for presence, typing, cache, rate limits, and event buffers
- **PRD alignment:**
  - supports trust-heavy flows and safety auditability
  - avoids ephemeral-only storage for critical safety and moderation states

## v3 — Product-Flow Specific Backend Shape
- **Goal:** map backend behavior to PRD user journeys end-to-end.
- **Core backend support:**
  - `.edu` verification (manual + Google OAuth with approved `.edu`)
  - face-to-profile authenticity check
  - no-profile chooser (`Find People` / `Review a Friend`)
  - swipe discovery + mutual match
  - in-place match acceptance timer behavior
  - meetup proposal generation with daytime and safety constraints
  - post-date feedback/no-show internal signals
- **PRD alignment:**
  - meetup-first flow
  - friend-review path and moderation support
  - school compatibility support as ranking signal, not hard gate

## v4 — Infrastructure, Security, and Operations
- **Goal:** harden architecture for reliability and safe launch behavior.
- **Infra/security shape:**
  - managed L7 LB + WAF + CDN
  - managed Postgres/Redis/storage
  - strict auth/session rules with managed IdP + internal auth facade
  - role + resource policy enforcement
  - structured logs, metrics, traces, alerts
- **PRD alignment:**
  - safety operations readiness
  - internal admin tooling support for moderation/school/venue controls
  - bounded location-use policy support during meetup windows

## v5 — Production Completeness and Governance
- **Goal:** add DR, retention, release, abuse-control, and admin maturity.
- **Operational defaults:**
  - DR warm standby, RTO <=1h
  - monthly restore drills
  - high-severity safety response target <24h
  - canary rollout + rollback rules
- **Policy defaults:**
  - message retention default: 12 months
  - balanced strict abuse controls (swipe/message limits)
  - explicit retention/deletion lifecycle support
- **PRD alignment:**
  - safety-first incident and moderation handling
  - trust-preserving lifecycle and governance controls

## v6 — Master Consolidation (Build Contract Ready)
- **Goal:** unify v1–v5 into one execution-ready roadmap with no major design gaps.
- **Consolidated technical baseline:**
  - Runtime/API: Go + REST (`/api/v1`)
  - Data: PostgreSQL authoritative, Redis ephemeral only
  - Infra: managed app runtime + Postgres + Redis + object storage/CDN + managed L7 LB + WAF
  - Observability: production-grade baseline
- **Consolidated defaults:**
  - access refresh cadence: 15 minutes
  - re-login horizon: ~30 days
  - idempotency retention: 24 hours
  - API errors: RFC7807 + `app_code` + `retryable` + optional `retry_after`
  - conflict code: `409`
  - discovery cache TTL: 30s
  - presence TTL: 60s
  - discovery p95 target: <=220ms
- **PRD constraints kept explicit:**
  - no monetization in MVP
  - no normal pre/post-match open chat thread in MVP
  - no nighttime-first meetup behavior in MVP
  - no always-on tracking outside meetup windows
  - no student-facing web app required in MVP

## Final PRD-Aligned MVP Backend Scope
- **Identity and onboarding**
  - approved `.edu` verification and age gate
  - face-to-profile authenticity verification
- **Trust and profile**
  - profile, area, radius, weekday/daytime availability
  - backup email and trusted contact
  - friend-review ingestion + moderation path
- **Discovery and matching**
  - swipe cards, match creation, acceptance/expiration handling
- **Meetup and safety**
  - hybrid safe-venue suggestion engine
  - per-date location consent + arrival/proximity support
  - safety prompts, shake emergency flow, escalation logic
  - post-date feedback and safety check-ins
- **Admin**
  - school/domain, venue, moderation, compatibility, and account-state controls

## PRD Coverage Matrix (Core Backend)
- **FR-VER (verification/eligibility):** covered in `v3` and `Final PRD-Aligned MVP Backend Scope > Identity and onboarding`.
- **FR-PRO (profiles/trust/preferences):** covered in `v3` and `Final PRD-Aligned MVP Backend Scope > Trust and profile`.
- **FR-SOC (friend review):** covered in `v3` and `Final PRD-Aligned MVP Backend Scope > Trust and profile` + `Admin`.
- **FR-DIS (discovery/ranking):** covered in `v3` and `Final PRD-Aligned MVP Backend Scope > Discovery and matching`.
- **FR-MAT (matching/acceptance/expiration):** covered in `v3` and `Final PRD-Aligned MVP Backend Scope > Discovery and matching`.
- **FR-MEET (meetup recommendation engine):** covered in `v3` and `Final PRD-Aligned MVP Backend Scope > Meetup and safety`.
- **FR-POST (arrival/feedback/no-show/continuation):** covered in `v3` and `Final PRD-Aligned MVP Backend Scope > Meetup and safety`.
- **FR-COMP (school compatibility/data pipeline):** covered in `v3`, `v5`, and `Admin` scope.
- **FR-SAFE (trust/safety/privacy):** covered in `v4`, `v5`, and `Final PRD-Aligned MVP Backend Scope > Meetup and safety`.
- **FR-ADM (admin console):** covered in `v4` and `Final PRD-Aligned MVP Backend Scope > Admin`.

## Notes on PRD Accuracy
- This roadmap is accurate for **core backend planning** and explicitly keeps MVP PRD constraints.
- For strict implementation-level traceability, the next document should enumerate endpoint/schema-level mappings for every FR item.
