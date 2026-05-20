# After Class Product Requirements Document

*Build-ready MVP specification for a verified campus dating app*

- Product: After Class
- Document type: Product requirements document
- Status: Draft v1 for implementation planning
- Version: 1.0
- Last updated: May 21, 2026
- Primary audience: Founders, product, design, engineering, and future coding agents

---

## Executive Summary

After Class is a mobile-first dating app for verified college students. Only active students age 18 or older with approved .edu email domains may join. The MVP combines a familiar swipe-and-match experience with two product choices that differentiate it from mainstream dating apps: school-based compatibility insights and a match-to-meet flow that proposes a daytime public meetup instead of leaving users in an empty chat.

- Trust layer: school verification happens through approved .edu domains that are mapped to recognized colleges and universities.
- Core loop: verify, build a profile, browse verified students, match, receive a curated meetup suggestion, then use chat only to confirm or adjust.
- Differentiator: the app surfaces directional school-to-school compatibility based on platform behavior without presenting it as scientific certainty.
- Safety posture: exact home addresses are never required, meetup suggestions are limited to curated public venues, and nighttime meetup slots are out of scope for the MVP.

## Product Vision and Principles

After Class should feel safer, more intentional, and less awkward than a generic dating app. The MVP is deliberately narrow: it exists to help active students discover each other, form mutual matches, and move toward a low-pressure daytime meetup in a public place.

1. Verified identity first. School verification is part of the product promise, not a back-office check.
2. Reduce first-move friction. The app should help matched users take a practical next step instead of forcing one person to craft an opener.
3. Optimize for safe daytime behavior. Product defaults should encourage public, convenient, daylight meetups and make riskier patterns harder by design.
4. Use data as a guide, not a claim of truth. School compatibility is a directional signal for discovery, not a guarantee of chemistry or relationship quality.
5. Keep v1 narrow and buildable. The MVP should prioritize the smallest system that proves verified student demand and the match-to-meet loop.

## Problem and Opportunity

Mainstream dating apps create three problems for college students: low trust, high social friction after a match, and weak context for deciding whether to meet. Students want to know whether someone is real, whether they are likely to have compatible campus context, and whether there is an easy next step that does not feel unsafe or overly serious.

- General dating apps allow too many unverifiable or low-context profiles, which weakens trust before the first conversation begins.
- Even when people match, many conversations die because neither side wants to make the first move or negotiate logistics from scratch.
- Students often think in terms of campus, commute, neighborhood, and convenience, so school identity and travel radius matter more than they do in a generic dating product.
- A campus-focused product can turn school context and location constraints into useful discovery signals without requiring exact address sharing.

## Target Users and Eligibility

### Primary user

The primary user is an active college or university student, age 18 or older, who wants to meet other verified students nearby through a lighter-weight dating experience that encourages safe daytime meetups.

### Eligible users

- Active undergraduate, graduate, or professional students with a working approved .edu email address.
- Students enrolled at a school whose email domain has been reviewed and activated by admins.
- Users who complete age gating and affirm that they are at least 18 years old.

### Excluded users

- Alumni who still have access to a legacy .edu mailbox but are no longer current students.
- Faculty, staff, contractors, or campus partners who are not part of the student audience.
- Users under 18 years old, even if they possess an approved school email.
- Schools and domains that have not yet been approved by the admin team.

## MVP Scope

### In scope

- Student mobile onboarding with .edu verification, profile setup, approximate area selection, and travel radius selection.
- Swipe-style discovery, mutual matching, and one-to-one messaging after match.
- An immediate match-to-meet suggestion flow that proposes a public daytime meetup and a small set of time slots.
- User-facing school compatibility insights based on aggregated platform data.
- Internal admin tooling for school-domain approval, venue curation, moderation, and compatibility oversight.
- Core safety controls such as reporting, blocking, moderation queues, and policy enforcement.

### Out of scope for MVP

- Paid subscriptions, boosts, or monetization systems.
- Video profiles, voice notes, stories, or social feed mechanics.
- Student-facing web app experiences.
- Nighttime meetup scheduling, bar-first recommendations, or nightlife positioning.
- Persistent live location sharing, exact home-address capture, or always-on background tracking.
- Campus ambassador workflows, referral growth loops, event products, or group matching.
- Complex machine-learning personalization controls exposed directly to users.

## Core User Journeys

### Journey 1: Onboarding and verification

1. User downloads the app, confirms they are at least 18, and enters an approved .edu email address.
2. System sends a verification link or code to the email address and checks whether the domain belongs to an activated school record.
3. After verification, the user creates a profile with photos, name, age, school, optional program or year, interests, approximate area, and maximum travel radius in kilometers.
4. User sets basic discovery preferences and reaches the swipe queue only after required profile and verification steps are complete.

### Journey 2: Discovery and matching

1. User browses verified students in a swipe-style card flow.
2. Cards are ranked by a hybrid score that combines preference fit, distance fit, school compatibility, activity freshness, and safety filters.
3. Mutual likes create a match and trigger the post-match meetup flow immediately.

### Journey 3: Match-to-meet

1. When a match is created, the app computes the feasible venue set using both users' approximate areas, both travel radii, venue operating hours, and the daytime scheduling window.
2. The app proposes one primary venue near the midpoint plus up to two alternates, along with three suggested daytime slots between 8:00 AM and 6:00 PM local time.
3. Either user may accept the primary suggestion, choose an alternate, request a different slot, or allow the match to expire if they do not want to proceed.
4. If no venue exists that respects both radii and safety rules, the app clearly says so and prompts users to enlarge radius or let the match expire instead of fabricating an invalid suggestion.
5. The meetup proposal screen must show a visible match expiration countdown; if the timer elapses without a mutually accepted plan, the match closes.

### Journey 4: Safety actions

1. A user can block or report another user from the profile, match screen, or chat screen.
2. The report captures reason codes, optional details, and relevant context such as the triggering message or profile.
3. Admin moderators review queued reports and can warn, restrict, or remove offending accounts.

### Journey 5: Post-meetup review

1. After the scheduled meetup time passes (or both users mark the meetup as completed), each user is prompted for lightweight experience feedback.
2. The prompt asks whether the experience felt positive ("cool") or negative ("not cool"), with optional free-text detail.
3. Feedback is private, used for product quality and safety signals, and must not be shown as a public rating on the other user's profile in MVP.
4. Users may skip the review; skipping must not block returning to discovery or messaging an existing match.

## UX Flow and Wireframes

This section captures the **founder wireframe flow** (v1) and maps it to screens. A grayscale interactive wireframe lives at `prototype/wireframe/index.html`.

### Design intent (wireframe phase)

- **No visual brand yet** — structure, copy hierarchy, and screen order only (grayscale boxes).
- **Chat is not the first post-match action** — the meetup proposal screen is the hero; chat unlocks after the meetup step is resolved or the match expires.
- **Urgency** — matches that do not progress toward a meetup plan expire on a countdown timer.

### Primary happy path (student app)

| Step | Screen | What happens |
|------|--------|----------------|
| 1 | Welcome | Standard app entry; sign up or log in. |
| 2 | Age gate | User confirms 18+. |
| 3 | School email | User enters approved `.edu` email. |
| 4 | Verify email | Code or magic link confirmation. |
| 5 | Profile setup | Photos, name, age, school (auto), bio. |
| 6 | Area and radius | Approximate area + max travel radius (default 10 km). |
| 7 | Discovery / swipe | Swipe left (pass) or right (like); school context on card. |
| 8 | Match | Brief celebration; CTA to meetup plan (not chat). |
| 9 | Meetup proposal | See copy pattern below; pick slot; accept or alternates; countdown visible. |
| 10 | Meetup confirmed | Both accepted; reminder of venue and time. |
| 11 | Post-meetup review | "Cool" or "Not cool" plus optional note. |
| 12 | Thanks / continue | Return to discovery or open chat if match still active. |

### Meetup proposal screen — voice and content (founder spec)

When two users match, the app speaks **as the product** (concierge tone), summarizing overlap before suggesting a plan:

> Oh hey — you both said you're open to meeting. You both set a **[X] km** radius. You're both available for a **daytime** meetup. Your midpoint is **[area label]**. I'm suggesting you meet at **[venue]** at **[time]**. **This match expires in [countdown].**

Supporting UI on the same screen:

- Primary venue + up to two alternates (from PRD meetup engine).
- Three daytime slot chips (8:00 AM–6:00 PM).
- Actions: accept meetup, see alternates, let match expire.
- **No chat composer** on this screen in MVP wireframe.

### Match expiration (founder spec)

- Every new match starts a **visible expiration countdown** on the meetup proposal screen.
- If neither user accepts a meetup plan before the timer ends, the match moves to an **expired** state and is closed for new coordination.
- Default expiration window for MVP wireframe: **48 hours** from match creation (product default; engineering may tune).
- Expired matches do not surface in active match lists; users return to discovery.

### Post-meetup review (founder spec)

- Trigger: after scheduled meetup time **or** explicit "we met" / meetup-completed action by either user.
- Question: **"How was it?"** with two taps: **Cool** / **Not cool**.
- Optional short text field; skip allowed.
- Used for internal quality and safety analytics, not public reviews.

### Chat unlock rules (wireframe + PRD)

| State | Chat |
|-------|------|
| Match just created | Locked — meetup proposal first |
| Both accepted meetup | Unlocked — coordination and meetup context pinned |
| Match expired | Locked / thread archived |
| After review | Unlocked if match still active |

### Edge screens (from PRD, in wireframe)

- **No shared venue** — both radii exclude all curated venues; offer widen radius or expire.
- **Report / block** — available from profile, match, and chat (not wireframed in v1 HTML).

### Wireframe artifact

- Path: `prototype/wireframe/index.html`
- Format: single-file HTML, mobile frame, prev/next navigation
- Screens: 15 (includes edge cases)

## Functional Requirements

### Verification and school identity

- FR-VER-1: The app must allow sign-up only with approved .edu domains tied to active school records.
- FR-VER-2: Verification must happen through an email code or magic link sent to the submitted address before the user can browse or message.
- FR-VER-3: Each approved school must have a canonical school record and one or more approved email domains managed by admins.
- FR-VER-4: The system must classify the user to a school automatically from the verified domain rather than asking the user to self-assign their school.
- FR-VER-5: Accounts that lose verification status, are tied to deactivated domains, or are flagged as non-student misuse must be placed into a restricted state pending review.
- FR-VER-6: The product must enforce a self-attested 18-plus age gate before account activation.

### Profiles and preferences

- FR-PRO-1: Profiles must support display name, age, school, bio, interests, and three to six photos.
- FR-PRO-2: Program, year level, and profile prompts are optional in MVP and should enrich context without blocking activation.
- FR-PRO-3: Users must provide an approximate area represented by a place label and stored centroid, such as a campus zone, neighborhood, or district.
- FR-PRO-4: Users must choose a maximum travel radius in kilometers. The default is 10 km, and the supported MVP options are 2, 5, 10, 15, 20, and 30 km.
- FR-PRO-5: Exact addresses, dorm room details, and precise home coordinates must never be required profile fields.
- FR-PRO-6: Basic discovery preferences may include age range and gender interest, but advanced preference tuning is out of scope for MVP.

### Discovery and ranking

- FR-DIS-1: Discovery is cross-school by default across the currently approved school network.
- FR-DIS-2: The ranking model must combine preference fit, distance fit, school compatibility, recency of activity, and safety eligibility.
- FR-DIS-3: School compatibility can influence ranking, but it must not fully block otherwise eligible users from appearing.
- FR-DIS-4: Distance fit must use approximate area centroids and user radius preferences rather than exact home locations.
- FR-DIS-5: Users who are blocked, banned, under review, or otherwise ineligible must never surface in discovery.
- FR-DIS-6: Discovery cards must show school context clearly enough to reinforce the verified-student value proposition.
- FR-DIS-7: Compatibility insights may appear in discovery as supportive context, but they must not overpower the core profile information.

### Matching

- FR-MAT-1: Mutual likes create a match immediately.
- FR-MAT-2: Match creation must emit analytics events for school-pair aggregation and post-match funnel tracking.
- FR-MAT-3: The first post-match screen must emphasize the meetup suggestion flow rather than an empty chat composer.
- FR-MAT-4: Chat must remain locked on the first post-match screen; users cannot open a message composer until the meetup step is accepted by both parties or the match expires per product policy.
- FR-MAT-5: Every match must display a countdown until expiration on the meetup proposal screen. The MVP default expiration window is 48 hours from match creation unless changed by product policy.
- FR-MAT-6: When a match expires without a mutually accepted meetup plan, the match must move to an expired state, disappear from active match lists, and stop new chat messages.

### Meetup recommendation engine

- FR-MEET-1: Every match must trigger a meetup suggestion attempt unless one of the users is no longer eligible or safety-restricted.
- FR-MEET-2: The engine must use each user's approximate area centroid and declared radius to define the feasible meetup zone.
- FR-MEET-3: The engine must calculate a midpoint between the two approximate origin centroids, then search curated venues that are within both users' allowed radius limits.
- FR-MEET-4: Only curated public venues are eligible in MVP. Examples include cafes, dessert shops, bookstores, campus lounges, and other daytime-friendly spots.
- FR-MEET-5: Bars, clubs, hotels, private residences, and other high-risk or low-visibility venues are excluded from the curated set.
- FR-MEET-6: The engine must rank eligible venues by midpoint closeness, venue quality, daytime suitability, and whether the venue is open during candidate slots.
- FR-MEET-7: The app must propose one primary venue and up to two alternates when multiple valid options exist.
- FR-MEET-8: Suggested time slots must stay inside the MVP daytime window of 8:00 AM to 6:00 PM local time.
- FR-MEET-9: Suggested slots should feel after-class friendly, with default slots biased toward late morning, early afternoon, and late afternoon rather than early morning extremes.
- FR-MEET-10: If no venue exists exactly near the midpoint, the system must fall back to the nearest acceptable curated venue that still respects both users' radius constraints.
- FR-MEET-11: If there is no shared feasible venue at all, the app must clearly communicate that no valid suggestion is available and offer users the option to adjust radius or continue in chat.
- FR-MEET-12: User-facing meetup suggestions must never expose the other person's precise underlying approximate-area centroid or any exact address source used for the calculation.

### Messaging

- FR-CHAT-1: The MVP must support one-to-one text chat for matched users.
- FR-CHAT-2: Chat becomes available only after both users accept a meetup plan or after the match expires per FR-MAT-6; the meetup suggestion screen alone must not unlock chat.
- FR-CHAT-3: Messaging is intended for coordination and rapport, so advanced features such as voice, video, disappearing media, and group chat are out of scope.
- FR-CHAT-4: Users must be able to block or report from inside chat.
- FR-CHAT-5: Chat should preserve the meetup context by showing the current suggested venue and slot near the top of the thread or match detail view.

### Post-meetup review

- FR-REV-1: After a scheduled meetup time passes or a user marks the meetup complete, the app must prompt each user for private experience feedback with at least two options: positive ("cool") and negative ("not cool").
- FR-REV-2: Users may add optional short text and may skip the review without losing access to discovery or an still-active match thread.
- FR-REV-3: Review responses must not be displayed as public profile ratings in MVP; they feed internal analytics, safety review, and product quality only.

### School compatibility insights

- FR-COMP-1: The product must maintain school-to-school compatibility aggregates derived from recent platform behavior.
- FR-COMP-2: Inputs should include mutual-like conversion to match, chat start rate, reply rate, early conversation continuation, and meetup acceptance or completion signals when enough data exists.
- FR-COMP-3: The default evaluation window is the trailing 90 days so the signal stays fresh and can respond to changing behavior.
- FR-COMP-4: Compatibility must be treated as directional. The app may use score bands such as High, Strong, Emerging, and Early Signal rather than presenting false precision.
- FR-COMP-5: A school pair must meet minimum data thresholds before a user-facing compatibility label is shown. The default threshold for MVP is at least 40 two-way likes and 20 matches in the trailing 90 days.
- FR-COMP-6: If the threshold is not met, the app should show a neutral early-signal state rather than a low score that implies poor compatibility.
- FR-COMP-7: School compatibility may influence discovery ranking, but it should contribute no more than a minority share of the final ranking score so it does not become a hard gate.
- FR-COMP-8: All user-facing copy must frame compatibility as a fun, data-informed indicator and must not promise relationship success or scientific certainty.

### Trust, safety, and privacy

- FR-SAFE-1: The product must include blocking and reporting on profiles, matches, and chats.
- FR-SAFE-2: Meetup defaults must favor public venues and daytime hours only.
- FR-SAFE-3: Exact addresses, dorm names, and live-location history must not be exposed to other users in MVP.
- FR-SAFE-4: Users under investigation, repeatedly reported accounts, and clearly abusive actors must be reviewable and removable through admin tools.
- FR-SAFE-5: The app must explain in plain language that compatibility insights are aggregate product signals, not statements of personal safety or romantic outcome.
- FR-SAFE-6: The app must support basic account restriction states such as active, under review, suspended, and banned.
- FR-SAFE-7: The MVP should launch in a limited geography or campus cluster so venue curation and moderation quality stay manageable.

### Admin console

- FR-ADM-1: Admins must be able to create, edit, activate, and deactivate school records.
- FR-ADM-2: Admins must be able to add and review approved email domains per school.
- FR-ADM-3: Admins must be able to review queued reports, inspect relevant profile or chat context, and take moderation actions.
- FR-ADM-4: Admins must be able to create, edit, and deactivate curated meetup venues with address, coordinates, category, operating hours, and safety tags.
- FR-ADM-5: Admins must be able to inspect school compatibility aggregates and suppress misleading or low-quality school-pair displays if needed.
- FR-ADM-6: Admins must be able to search for a user, review account state, and change status to active, under review, suspended, or banned.
- FR-ADM-7: Admin tooling must be internal-only and can be web-based even though the student product is mobile-first.
- FR-ADM-8: MVP admin permissions may be simple role tiers such as moderator and super-admin rather than a full granular permissions matrix.

## Product-side Domain Objects and Events

### Core domain objects

- School: canonical record for one college or university, including active status and metadata used in discovery and reporting.
- SchoolDomain: approved email domain mapped to a School record and managed by admins.
- User: verified student account with profile fields, eligibility state, preferences, approximate area, and radius.
- ApproxArea: user-selected place label plus stored centroid coordinates used for ranking and meetup generation.
- Venue: curated public meetup location with coordinates, category, opening hours, and moderation-safe status.
- Match: record created when two users like each other, including timestamps and school-pair context.
- MeetupProposal: generated venue and slot recommendation tied to a match, with primary option, alternates, and user actions such as accepted or skipped.
- Conversation: one-to-one chat thread between matched users.
- Report: trust-and-safety case attached to a user, profile, match, or message.
- SchoolCompatibilityAggregate: rolling school-pair metrics and display band used in ranking and user-facing insight surfaces.

### Required event tracking

- Account created, verification email sent, verification completed, and onboarding completed.
- Discovery card shown, like, pass, mutual match created.
- Meetup proposal generated, proposal failed, venue accepted, alternate selected, slot changed, and suggestion skipped.
- Chat started, first reply sent, reply within 24 hours, and early conversation continuation milestone reached.
- Report filed, block applied, moderation action taken.
- School compatibility aggregate recalculated and school-pair display state changed.

## Ranking, Compatibility, and Meetup Defaults

The PRD should set defaults clearly enough that implementation can start without another product workshop. These defaults are product policy, not final algorithm lock-in.

- Discovery ranking default weighting: preference fit and safety eligibility are mandatory gates; among eligible users, distance fit and activity freshness carry the largest weight, while school compatibility remains a meaningful but minority factor.
- Compatibility default score bands: 80 to 100 High, 65 to 79 Strong, 50 to 64 Emerging, below threshold Early Signal rather than a punitive low label.
- Compatibility display thresholds: show a user-facing band only after at least 40 two-way likes and 20 matches for the school pair in the trailing 90 days.
- Meetup radius default: 10 km. Metric units are the only supported unit system in MVP.
- Time-slot default behavior: suggest three slots inside 8:00 AM to 6:00 PM local time, biased toward late morning, early afternoon, and late afternoon.
- Fallback behavior: first search near the midpoint, then search the broader overlap zone, then fail gracefully if no curated venue satisfies both users' radius limits.

## Success Metrics and Launch Criteria

### North-star outcome

The north-star outcome for MVP is a verified student match that progresses to a credible meetup plan. The product should optimize for trust, match quality, and meetup follow-through rather than raw swipe volume alone.

### Core metrics

- Verification completion rate for eligible signups.
- Profile completion rate before discovery access.
- Like-to-match conversion rate.
- Percentage of matches that receive a valid meetup proposal within five seconds.
- Meetup proposal acceptance rate and alternate-selection rate.
- First reply rate and 24-hour conversation continuation rate.
- Report rate per 1,000 active users and moderation resolution time.
- Coverage of approved schools and curated venues in the pilot geography.

### Launch gates

- At least three approved schools are active in the initial pilot cluster.
- Each launch geography has enough curated venues to support common midpoint suggestions across likely student corridors.
- Verification, matching, and meetup proposal generation work reliably enough that the core loop can be demonstrated end to end.
- Moderation workflows, report review, and emergency deactivation are operational before public launch.

## Risks and Mitigations

- Cold-start data risk: new schools will not have enough compatibility data. Mitigation: show Early Signal until thresholds are met and rely more heavily on distance and preference fit at launch.
- Venue coverage risk: midpoint math may fail in sparse or traffic-heavy areas. Mitigation: launch in dense campus clusters first and maintain a healthy curated venue pool.
- Safety perception risk: a student dating app can feel risky if location handling is unclear. Mitigation: never require exact home addresses, explain approximate-area usage clearly, and enforce daytime public-venue defaults.
- Verification loophole risk: some non-students may retain school mailboxes. Mitigation: state active-student-only policy, allow review states, and give admins tools to remove misuse.
- Behavioral risk: some users may still prefer chat-first interaction. Mitigation: keep chat available immediately after the meetup suggestion and test whether the guided flow increases coordination rather than suppressing it.

## Future Roadmap After MVP

- More advanced scheduling based on user availability rather than static daytime slot defaults.
- Richer school insights, campus-specific prompts, or same-school versus cross-school discovery controls.
- Premium features, referral loops, student-facing web, or broader social/community mechanics only after the core verified dating loop proves value.
- Smarter compatibility weighting, better venue personalization, and experimentation on how meetup suggestions influence outcomes.

## Acceptance Criteria for the Next Implementation Agent

- The implementation plan must preserve the active-student-only eligibility model and approved-domain school mapping.
- The student product must be mobile-first, while admin tooling may be a separate internal web surface.
- The core end-to-end flow must be verify, profile, browse, match, meetup suggestion, then optional chat.
- Meetup generation must use approximate areas and radius preferences rather than exact address sharing or persistent live tracking.
- The MVP must exclude night meetups and non-curated venues.
- School compatibility must remain directional and threshold-gated, not a hard matching rule.
- Safety controls, moderation states, and admin venue curation are required parts of MVP rather than post-launch extras.
- Any technical design produced later may choose specific vendors or frameworks, but it must not change the product defaults documented here without an explicit product decision.
