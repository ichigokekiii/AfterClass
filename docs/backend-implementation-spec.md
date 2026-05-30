# Backend Implementation Spec (PRD-Mapped)

## Purpose
- Translate `docs/after-class-prd.md` into implementation-ready backend contracts.
- Keep MVP constraints: verified-student access, meetup-first flow, safety-first behaviors, no standard 1:1 chat thread in MVP.

## API Contract Map (`FR-*` -> Endpoints)

### Verification and Access (`FR-VER-*`)
- `POST /api/v1/auth/signup` -> manual `.edu` signup start.
- `POST /api/v1/auth/oauth/google` -> Google OAuth with approved `.edu`.
- `POST /api/v1/auth/verify-email` -> code/link verification completion.
- `POST /api/v1/auth/face-verify` -> face-to-profile authenticity result ingest.
- `GET /api/v1/auth/me` -> account status (`active|under_review|suspended|banned`), school binding.

### Profiles and Trust Setup (`FR-PRO-*`)
- `PUT /api/v1/profile` -> name, age, bio, interests, optional program/year.
- `POST /api/v1/profile/photos/sign-url` -> signed upload URL for photos.
- `POST /api/v1/profile/photos` -> register uploaded photo metadata.
- `PUT /api/v1/profile/location` -> approximate area label + centroid.
- `PUT /api/v1/profile/preferences` -> age/gender preferences, travel radius.
- `PUT /api/v1/profile/availability` -> weekday + daytime windows.
- `PUT /api/v1/profile/safety-contact` -> backup email + trusted contact.
- `GET /api/v1/onboarding/chooser` -> `Find People` / `Review a Friend` eligibility.

### Friend Review (`FR-SOC-*`)
- `POST /api/v1/friend-reviews` -> submit structured friend review.
- `GET /api/v1/friend-reviews/target/{userId}` -> moderator/reviewed-user view (policy-controlled).

### Discovery and Matching (`FR-DIS-*`, `FR-MAT-*`)
- `GET /api/v1/discovery?cursor=...` -> swipe cards (verified, safe, eligible only).
- `POST /api/v1/swipes` -> like/pass action (idempotent).
- `GET /api/v1/matches` -> active/expired match list.
- `POST /api/v1/matches/{matchId}/accept` -> accept match within timer.
- `POST /api/v1/matches/{matchId}/decline` -> explicit decline/expire path.

### Meetup Engine and Flow (`FR-MEET-*`)
- `GET /api/v1/matches/{matchId}/proposal` -> primary venue + alternates + assigned slot.
- `POST /api/v1/matches/{matchId}/proposal/confirm` -> confirm selected proposal.
- `POST /api/v1/matches/{matchId}/proposal/adjust-radius` -> user radius adjustment request.

### Safety, Arrival, Post-Date (`FR-POST-*`, `FR-SAFE-*`)
- `POST /api/v1/meetups/{meetupId}/consent/location` -> per-date location consent.
- `POST /api/v1/meetups/{meetupId}/arrival` -> arrival confirmation.
- `POST /api/v1/meetups/{meetupId}/safety/check-in` -> periodic post-date safety response.
- `POST /api/v1/meetups/{meetupId}/safety/emergency` -> shake/emergency flow action.
- `POST /api/v1/meetups/{meetupId}/feedback` -> adaptive post-date feedback.
- `POST /api/v1/meetups/{meetupId}/no-show` -> private internal no-show signal.
- `POST /api/v1/continuation/{matchId}` -> optional off-platform handoff selection.
- `POST /api/v1/reports` -> report profile/match/meetup.
- `POST /api/v1/blocks` -> block user.

### Admin (`FR-ADM-*`)
- `GET /api/v1/admin/schools`, `POST /api/v1/admin/schools`, `PATCH /api/v1/admin/schools/{id}`
- `GET /api/v1/admin/domains`, `POST /api/v1/admin/domains`, `PATCH /api/v1/admin/domains/{id}`
- `GET /api/v1/admin/reports`, `POST /api/v1/admin/reports/{id}/actions`
- `GET /api/v1/admin/venues`, `POST /api/v1/admin/venues`, `PATCH /api/v1/admin/venues/{id}`
- `GET /api/v1/admin/users/{id}`, `POST /api/v1/admin/users/{id}/status`
- `GET /api/v1/admin/compatibility/schools`

## Data Contract Map (`FR-*` -> Core Tables)

### Identity and School
- `schools`, `school_domains`, `users`, `auth_identities`, `user_status_history`

### Profile and Onboarding
- `profiles`, `profile_photos`, `profile_preferences`, `availability_windows`, `trusted_contacts`, `approx_areas`

### Social Proof and Discovery
- `friend_reviews`, `discovery_impressions`, `swipes`, `matches`, `match_events`

### Meetup and Safety
- `meetup_proposals`, `meetup_participants`, `meetup_consents`, `meetup_arrivals`, `meetup_safety_sessions`, `meetup_feedback`, `no_show_signals`

### Moderation and Governance
- `reports`, `blocks`, `moderation_cases`, `moderation_actions`, `audit_logs`

### Compatibility and Analytics Inputs
- `school_pair_aggregates`, `event_log`

## Event and Queue Map (`FR-*` -> Async Topics)
- `auth.verified`, `auth.face_verified`, `onboarding.completed`
- `discovery.card_served`, `swipe.created`, `match.created`, `match.expired`
- `meetup.proposal_generated`, `meetup.proposal_failed`, `meetup.confirmed`
- `safety.consent_granted`, `safety.arrival_confirmed`, `safety.alert_triggered`, `safety.escalation_sent`
- `feedback.submitted`, `no_show.reported`
- `report.created`, `block.created`, `moderation.action_taken`
- `compatibility.recompute_requested`, `compatibility.recomputed`

## Operational Defaults (Locked)
- Access refresh cadence: `15m`
- Re-login horizon: `~30d`
- Idempotency retention: `24h`
- Error format: RFC7807 + `app_code` + `retryable` + optional `retry_after`
- Conflict response: HTTP `409`
- Discovery cache TTL: `30s`
- Presence TTL: `60s`
- Discovery p95 target: `<=220ms`
- DR target: warm standby, `RTO <=1h`
- Restore drills: monthly

## Acceptance Checks
- End-to-end flow passes: verify -> onboarding -> discovery -> match -> meetup proposal -> arrival -> feedback -> safety check-in.
- Safety controls pass: block/report enforcement and escalation logic.
- PRD constraints pass: no standard chat thread, no nighttime-first behavior, no always-on tracking, no MVP monetization path.
- Reliability checks pass: canary rollout with rollback trigger (error+latency breach in sustained window).
