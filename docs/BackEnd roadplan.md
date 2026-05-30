# BackEnd Roadplan

## Summary
- Backend roadmap aligned to `docs/after-class-prd.md` (Draft v2, May 23, 2026).
- Product is a **safety-first verified campus dating app** with meetup-first flow.
- Core rule: **no normal in-app 1:1 chat in MVP**.

## MVP Product-Aligned Backend Scope
- **Identity and onboarding**
  - `.edu` verification (manual + Google OAuth using approved `.edu` account)
  - face-to-profile authenticity verification
  - age 18+ gating
- **Profile and trust setup**
  - profile, approximate area, travel radius, weekday availability, daytime windows
  - backup email + trusted contact capture
  - no-profile chooser (`Find People` / `Review a Friend`)
- **Discovery and matching**
  - swipe cards, mutual-like match creation
  - 30-second in-place “Found a Match” acceptance timer
  - match expiration rules
- **Meetup engine**
  - hybrid venue sourcing (approved venues + external places fallback)
  - daytime-only meetup windows (8:00 AM to 6:00 PM)
  - midpoint + radius overlap logic
  - graceful failure when no safe valid venue exists
- **Safety flows**
  - per-date consent for meetup-window location usage
  - arrival confirmation with proximity support
  - shake emergency flow
  - post-date safety check-ins (up to 24h policy window)
  - trusted-contact escalation on no-response/danger signals
- **Post-date and continuation**
  - adaptive feedback
  - internal no-show signal tracking
  - optional off-platform continuation handoff
- **Admin tooling**
  - school/domain approval
  - report moderation and account state control
  - venue oversight
  - school-compatibility oversight
  - friend-review moderation

## MVP Technical Stack (Execution Baseline)
- **Runtime/API:** Go, REST (`/api/v1`)
- **Data:** PostgreSQL authoritative, Redis ephemeral/cache/rate-limit
- **Infra:** managed app runtime + Postgres + Redis + object storage/CDN + managed L7 LB + WAF
- **Observability:** structured logs, metrics, traces, alerts
- **Release:** closed beta, canary + rollback rules

## Locked Operational Defaults
- Access token refresh cadence: every 15 minutes
- Re-login horizon: ~30 days
- Idempotency key retention: 24 hours
- API errors: RFC7807 + `app_code` + `retryable` + optional `retry_after`
- Conflict status: `409`
- Discovery cache TTL: 30s
- Presence TTL: 60s
- Discovery p95 target: <=220ms
- DR target: warm standby, RTO <=1h
- Restore drills: monthly

## Explicit PRD-Driven Constraints
- No monetization in MVP (premium/billing out of scope).
- No normal pre/post-match open chat thread in MVP.
- No nighttime-first meetup behavior in MVP.
- No always-on background tracking outside meetup windows.
- No student-facing web app required for MVP.
