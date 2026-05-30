# BackEnd Roadplan

## Summary
- Build a realtime dating-app backend optimized for mobile devices and unstable 3G/4G networks.
- Use a two-phase delivery model:
  - **Phase A (1-week closed beta):** modular monolith, full core user flow.
  - **Phase B (post-beta):** split into full microservices and harden for scale.
- Core principle: **PostgreSQL is authoritative**, **Redis is ephemeral**.

## Locked Stack and Architecture
- **Region:** Singapore (SEA-first).
- **API style:** REST (`/api/v1`) + WebSocket.
- **Runtime:** Go.
- **Infra (managed):** App runtime, Postgres, Redis, object storage + CDN, managed L7 load balancer + WAF.
- **Auth:** Managed IdP + internal auth facade.
- **Location model:** Hybrid (precise internal; coarse external exposure).

## Phase A (Closed Beta in 1 Week)
- **Deploy model:** modular monolith (domain-separated modules, single deployable).
- **Required modules:**
  - auth/session/device
  - profiles + photo upload metadata (signed URLs)
  - discovery feed + like/pass swipe
  - mutual match creation
  - 1:1 text chat + read receipts
  - realtime WS events (message/match/read/presence essentials)
  - push notifications
  - safety baseline (block/report/rate limits)
- **Definition of done:**
  - End-to-end user journey works reliably.
  - Safety enforcement works across discovery and chat.
  - No critical auth/data-loss bugs.
  - Health checks, logging, backup, and rollback basics are in place.

## Phase B (Post-Beta Full Backend)
- Split into services:
  - auth, profile, discovery, match, chat, realtime, notifications, trust-safety, billing, admin
- Use Redis Streams + outbox pattern for async cross-domain events.
- Maintain schema-per-service boundaries in Postgres.
- Add premium billing live integration (store/webhook + entitlement reconciliation).
- Expand moderation/admin tooling, reliability automation, and cost guardrails.

## Security and Reliability Defaults
- **Access token refresh cadence:** every 15 minutes.
- **Re-login horizon:** ~30 days.
- **Idempotency key retention:** 24 hours.
- **API error contract:** RFC7807 + `app_code` + `retryable` + optional `retry_after`.
- **Conflict status:** `409`.
- **DR target:** warm standby, RTO <= 1 hour.
- **Restore drill cadence:** monthly.
- **High-severity report SLA:** <24 hours.

## Rate Limits and Redis TTLs
- **Free right-swipes:** 60/day.
- **Message send cap:** 20/min/user (matched chats).
- **Presence TTL:** 60s.
- **Typing TTL:** 8s.
- **Discovery cache TTL:** 30s.

## Performance and Release Defaults
- **Discovery p95 latency target:** <=220ms.
- **Release strategy:** canary + feature flags.
- **Initial canary step:** 5%.
- **Auto-rollback trigger:** error-rate + latency breach.
- **Rollback breach window:** 5 minutes sustained.

## Data and Retention Rules
- **Postgres-only durable domains:** users, profiles, swipes, matches, conversations/messages, reports/blocks, notification logs, entitlements.
- **Redis-only ephemeral domains:** cache, presence, typing, rate limits, stream/event buffers, dedupe keys.
- **Message retention default:** 12 months.

## Build Completion Gates
- Functional journey passes: auth -> profile -> swipe/match -> chat -> push.
- Safety controls pass: block/report/rate-limit behavior enforced.
- Mobile reliability passes under high-latency/loss simulation.
- Observability and rollback readiness validated before broad rollout.
