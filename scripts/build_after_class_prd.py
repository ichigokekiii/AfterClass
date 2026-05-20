from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path

from docx import Document
from docx.enum.section import WD_SECTION_START
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import HRFlowable, ListFlowable, ListItem, Paragraph, SimpleDocTemplate, Spacer


BLACK = RGBColor(0x00, 0x00, 0x00)
BLUE = RGBColor(0x2E, 0x74, 0xB5)
DARK_BLUE = RGBColor(0x1F, 0x4D, 0x78)
MUTED = RGBColor(0x66, 0x66, 0x66)


@dataclass(frozen=True)
class Block:
    kind: str
    level: int | None = None
    text: str | None = None
    items: tuple[str, ...] | None = None


TITLE = "After Class Product Requirements Document"
SUBTITLE = "Build-ready MVP specification for a verified campus dating app"
DATE = "May 21, 2026"

METADATA = (
    ("Product", "After Class"),
    ("Document type", "Product requirements document"),
    ("Status", "Draft v1 for implementation planning"),
    ("Version", "1.0"),
    ("Last updated", DATE),
    ("Primary audience", "Founders, product, design, engineering, and future coding agents"),
)

BLOCKS: tuple[Block, ...] = (
    Block(
        "heading",
        level=1,
        text="Executive Summary",
    ),
    Block(
        "paragraph",
        text=(
            "After Class is a mobile-first dating app for verified college students. "
            "Only active students age 18 or older with approved .edu email domains may join. "
            "The MVP combines a familiar swipe-and-match experience with two product choices that "
            "differentiate it from mainstream dating apps: school-based compatibility insights and "
            "a match-to-meet flow that proposes a daytime public meetup instead of leaving users in an empty chat."
        ),
    ),
    Block(
        "bullets",
        items=(
            "Trust layer: school verification happens through approved .edu domains that are mapped to recognized colleges and universities.",
            "Core loop: verify, build a profile, browse verified students, match, receive a curated meetup suggestion, then use chat only to confirm or adjust.",
            "Differentiator: the app surfaces directional school-to-school compatibility based on platform behavior without presenting it as scientific certainty.",
            "Safety posture: exact home addresses are never required, meetup suggestions are limited to curated public venues, and nighttime meetup slots are out of scope for the MVP.",
        ),
    ),
    Block("heading", level=1, text="Product Vision and Principles"),
    Block(
        "paragraph",
        text=(
            "After Class should feel safer, more intentional, and less awkward than a generic dating app. "
            "The MVP is deliberately narrow: it exists to help active students discover each other, form mutual matches, "
            "and move toward a low-pressure daytime meetup in a public place."
        ),
    ),
    Block(
        "numbered",
        items=(
            "Verified identity first. School verification is part of the product promise, not a back-office check.",
            "Reduce first-move friction. The app should help matched users take a practical next step instead of forcing one person to craft an opener.",
            "Optimize for safe daytime behavior. Product defaults should encourage public, convenient, daylight meetups and make riskier patterns harder by design.",
            "Use data as a guide, not a claim of truth. School compatibility is a directional signal for discovery, not a guarantee of chemistry or relationship quality.",
            "Keep v1 narrow and buildable. The MVP should prioritize the smallest system that proves verified student demand and the match-to-meet loop.",
        ),
    ),
    Block("heading", level=1, text="Problem and Opportunity"),
    Block(
        "paragraph",
        text=(
            "Mainstream dating apps create three problems for college students: low trust, high social friction after a match, "
            "and weak context for deciding whether to meet. Students want to know whether someone is real, whether they are likely "
            "to have compatible campus context, and whether there is an easy next step that does not feel unsafe or overly serious."
        ),
    ),
    Block(
        "bullets",
        items=(
            "General dating apps allow too many unverifiable or low-context profiles, which weakens trust before the first conversation begins.",
            "Even when people match, many conversations die because neither side wants to make the first move or negotiate logistics from scratch.",
            "Students often think in terms of campus, commute, neighborhood, and convenience, so school identity and travel radius matter more than they do in a generic dating product.",
            "A campus-focused product can turn school context and location constraints into useful discovery signals without requiring exact address sharing.",
        ),
    ),
    Block("heading", level=1, text="Target Users and Eligibility"),
    Block("heading", level=2, text="Primary user"),
    Block(
        "paragraph",
        text=(
            "The primary user is an active college or university student, age 18 or older, who wants to meet other verified students nearby "
            "through a lighter-weight dating experience that encourages safe daytime meetups."
        ),
    ),
    Block("heading", level=2, text="Eligible users"),
    Block(
        "bullets",
        items=(
            "Active undergraduate, graduate, or professional students with a working approved .edu email address.",
            "Students enrolled at a school whose email domain has been reviewed and activated by admins.",
            "Users who complete age gating and affirm that they are at least 18 years old.",
        ),
    ),
    Block("heading", level=2, text="Excluded users"),
    Block(
        "bullets",
        items=(
            "Alumni who still have access to a legacy .edu mailbox but are no longer current students.",
            "Faculty, staff, contractors, or campus partners who are not part of the student audience.",
            "Users under 18 years old, even if they possess an approved school email.",
            "Schools and domains that have not yet been approved by the admin team.",
        ),
    ),
    Block("heading", level=1, text="MVP Scope"),
    Block("heading", level=2, text="In scope"),
    Block(
        "bullets",
        items=(
            "Student mobile onboarding with .edu verification, profile setup, approximate area selection, and travel radius selection.",
            "Swipe-style discovery, mutual matching, and one-to-one messaging after match.",
            "An immediate match-to-meet suggestion flow that proposes a public daytime meetup and a small set of time slots.",
            "User-facing school compatibility insights based on aggregated platform data.",
            "Internal admin tooling for school-domain approval, venue curation, moderation, and compatibility oversight.",
            "Core safety controls such as reporting, blocking, moderation queues, and policy enforcement.",
        ),
    ),
    Block("heading", level=2, text="Out of scope for MVP"),
    Block(
        "bullets",
        items=(
            "Paid subscriptions, boosts, or monetization systems.",
            "Video profiles, voice notes, stories, or social feed mechanics.",
            "Student-facing web app experiences.",
            "Nighttime meetup scheduling, bar-first recommendations, or nightlife positioning.",
            "Persistent live location sharing, exact home-address capture, or always-on background tracking.",
            "Campus ambassador workflows, referral growth loops, event products, or group matching.",
            "Complex machine-learning personalization controls exposed directly to users.",
        ),
    ),
    Block("heading", level=1, text="Core User Journeys"),
    Block("heading", level=2, text="Journey 1: Onboarding and verification"),
    Block(
        "numbered",
        items=(
            "User downloads the app, confirms they are at least 18, and enters an approved .edu email address.",
            "System sends a verification link or code to the email address and checks whether the domain belongs to an activated school record.",
            "After verification, the user creates a profile with photos, name, age, school, optional program or year, interests, approximate area, and maximum travel radius in kilometers.",
            "User sets basic discovery preferences and reaches the swipe queue only after required profile and verification steps are complete.",
        ),
    ),
    Block("heading", level=2, text="Journey 2: Discovery and matching"),
    Block(
        "numbered",
        items=(
            "User browses verified students in a swipe-style card flow.",
            "Cards are ranked by a hybrid score that combines preference fit, distance fit, school compatibility, activity freshness, and safety filters.",
            "Mutual likes create a match and trigger the post-match meetup flow immediately.",
        ),
    ),
    Block("heading", level=2, text="Journey 3: Match-to-meet"),
    Block(
        "numbered",
        items=(
            "When a match is created, the app computes the feasible venue set using both users' approximate areas, both travel radii, venue operating hours, and the daytime scheduling window.",
            "The app proposes one primary venue near the midpoint plus up to two alternates, along with three suggested daytime slots between 8:00 AM and 6:00 PM local time.",
            "Either user may accept the primary suggestion, choose an alternate, request a different slot, or allow the match to expire if they do not want to proceed.",
            "If no venue exists that respects both radii and safety rules, the app clearly says so and prompts users to enlarge radius or let the match expire instead of fabricating an invalid suggestion.",
            "The meetup proposal screen must show a visible match expiration countdown; if the timer elapses without a mutually accepted plan, the match closes.",
        ),
    ),
    Block("heading", level=2, text="Journey 4: Safety actions"),
    Block(
        "numbered",
        items=(
            "A user can block or report another user from the profile, match screen, or chat screen.",
            "The report captures reason codes, optional details, and relevant context such as the triggering message or profile.",
            "Admin moderators review queued reports and can warn, restrict, or remove offending accounts.",
        ),
    ),
    Block("heading", level=2, text="Journey 5: Post-meetup review"),
    Block(
        "numbered",
        items=(
            "After the scheduled meetup time passes (or both users mark the meetup as completed), each user is prompted for lightweight experience feedback.",
            'The prompt asks whether the experience felt positive ("cool") or negative ("not cool"), with optional free-text detail.',
            "Feedback is private, used for product quality and safety signals, and must not be shown as a public rating on the other user's profile in MVP.",
            "Users may skip the review; skipping must not block returning to discovery or messaging an existing match.",
        ),
    ),
    Block("heading", level=1, text="UX Flow and Wireframes"),
    Block(
        "paragraph",
        text=(
            "This section captures the founder wireframe flow (v1) and maps it to screens. "
            "A grayscale interactive wireframe lives at prototype/wireframe/index.html."
        ),
    ),
    Block("heading", level=2, text="Design intent (wireframe phase)"),
    Block(
        "bullets",
        items=(
            "No visual brand yet — structure, copy hierarchy, and screen order only (grayscale boxes).",
            "Chat is not the first post-match action — the meetup proposal screen is the hero; chat unlocks after the meetup step is resolved or the match expires.",
            "Urgency — matches that do not progress toward a meetup plan expire on a countdown timer.",
        ),
    ),
    Block("heading", level=2, text="Primary happy path (student app)"),
    Block(
        "bullets",
        items=(
            "Welcome — standard app entry; sign up or log in.",
            "Age gate — user confirms 18+.",
            "School email — user enters approved .edu email.",
            "Verify email — code or magic link confirmation.",
            "Profile setup — photos, name, age, school (auto), bio.",
            "Area and radius — approximate area plus max travel radius (default 10 km).",
            "Discovery / swipe — swipe left or right; school context on card.",
            "Match — brief celebration; CTA to meetup plan (not chat).",
            "Meetup proposal — overlap summary, venue, slots, countdown; accept or alternates.",
            "Meetup confirmed — both accepted; reminder of venue and time.",
            'Post-meetup review — "Cool" or "Not cool" plus optional note.',
            "Thanks / continue — return to discovery or open chat if match still active.",
        ),
    ),
    Block("heading", level=2, text="Meetup proposal screen — voice and content (founder spec)"),
    Block(
        "paragraph",
        text=(
            'When two users match, the app speaks as the product (concierge tone): "Oh hey — you both said you\'re open to meeting. '
            "You both set a [X] km radius. You're both available for a daytime meetup. Your midpoint is [area label]. "
            "I'm suggesting you meet at [venue] at [time]. This match expires in [countdown].\" "
            "Supporting UI: primary venue, up to two alternates, three daytime slot chips, accept / alternates / expire actions, and no chat composer on this screen."
        ),
    ),
    Block("heading", level=2, text="Match expiration (founder spec)"),
    Block(
        "bullets",
        items=(
            "Every new match starts a visible expiration countdown on the meetup proposal screen.",
            "If neither user accepts a meetup plan before the timer ends, the match moves to an expired state and is closed for new coordination.",
            "MVP default expiration window: 48 hours from match creation (product default; engineering may tune).",
            "Expired matches do not surface in active match lists; users return to discovery.",
        ),
    ),
    Block("heading", level=2, text="Post-meetup review (founder spec)"),
    Block(
        "bullets",
        items=(
            'Trigger: after scheduled meetup time or explicit "we met" / meetup-completed action.',
            'Question: "How was it?" with two taps: Cool / Not cool.',
            "Optional short text field; skip allowed.",
            "Used for internal quality and safety analytics, not public reviews.",
        ),
    ),
    Block("heading", level=2, text="Chat unlock rules (wireframe + PRD)"),
    Block(
        "bullets",
        items=(
            "Match just created — chat locked; meetup proposal first.",
            "Both accepted meetup — chat unlocked with meetup context pinned.",
            "Match expired — chat locked or thread archived.",
            "After review — chat unlocked if match still active.",
        ),
    ),
    Block("heading", level=2, text="Wireframe artifact"),
    Block(
        "bullets",
        items=(
            "Path: prototype/wireframe/index.html",
            "Format: single-file HTML, mobile frame, prev/next navigation",
            "Screens: 15 (includes edge cases)",
        ),
    ),
    Block("heading", level=1, text="Functional Requirements"),
    Block("heading", level=2, text="Verification and school identity"),
    Block(
        "bullets",
        items=(
            "FR-VER-1: The app must allow sign-up only with approved .edu domains tied to active school records.",
            "FR-VER-2: Verification must happen through an email code or magic link sent to the submitted address before the user can browse or message.",
            "FR-VER-3: Each approved school must have a canonical school record and one or more approved email domains managed by admins.",
            "FR-VER-4: The system must classify the user to a school automatically from the verified domain rather than asking the user to self-assign their school.",
            "FR-VER-5: Accounts that lose verification status, are tied to deactivated domains, or are flagged as non-student misuse must be placed into a restricted state pending review.",
            "FR-VER-6: The product must enforce a self-attested 18-plus age gate before account activation.",
        ),
    ),
    Block("heading", level=2, text="Profiles and preferences"),
    Block(
        "bullets",
        items=(
            "FR-PRO-1: Profiles must support display name, age, school, bio, interests, and three to six photos.",
            "FR-PRO-2: Program, year level, and profile prompts are optional in MVP and should enrich context without blocking activation.",
            "FR-PRO-3: Users must provide an approximate area represented by a place label and stored centroid, such as a campus zone, neighborhood, or district.",
            "FR-PRO-4: Users must choose a maximum travel radius in kilometers. The default is 10 km, and the supported MVP options are 2, 5, 10, 15, 20, and 30 km.",
            "FR-PRO-5: Exact addresses, dorm room details, and precise home coordinates must never be required profile fields.",
            "FR-PRO-6: Basic discovery preferences may include age range and gender interest, but advanced preference tuning is out of scope for MVP.",
        ),
    ),
    Block("heading", level=2, text="Discovery and ranking"),
    Block(
        "bullets",
        items=(
            "FR-DIS-1: Discovery is cross-school by default across the currently approved school network.",
            "FR-DIS-2: The ranking model must combine preference fit, distance fit, school compatibility, recency of activity, and safety eligibility.",
            "FR-DIS-3: School compatibility can influence ranking, but it must not fully block otherwise eligible users from appearing.",
            "FR-DIS-4: Distance fit must use approximate area centroids and user radius preferences rather than exact home locations.",
            "FR-DIS-5: Users who are blocked, banned, under review, or otherwise ineligible must never surface in discovery.",
            "FR-DIS-6: Discovery cards must show school context clearly enough to reinforce the verified-student value proposition.",
            "FR-DIS-7: Compatibility insights may appear in discovery as supportive context, but they must not overpower the core profile information.",
        ),
    ),
    Block("heading", level=2, text="Matching"),
    Block(
        "bullets",
        items=(
            "FR-MAT-1: Mutual likes create a match immediately.",
            "FR-MAT-2: Match creation must emit analytics events for school-pair aggregation and post-match funnel tracking.",
            "FR-MAT-3: The first post-match screen must emphasize the meetup suggestion flow rather than an empty chat composer.",
            "FR-MAT-4: Chat must remain locked on the first post-match screen; users cannot open a message composer until the meetup step is accepted by both parties or the match expires per product policy.",
            "FR-MAT-5: Every match must display a countdown until expiration on the meetup proposal screen. The MVP default expiration window is 48 hours from match creation unless changed by product policy.",
            "FR-MAT-6: When a match expires without a mutually accepted meetup plan, the match must move to an expired state, disappear from active match lists, and stop new chat messages.",
        ),
    ),
    Block("heading", level=2, text="Meetup recommendation engine"),
    Block(
        "bullets",
        items=(
            "FR-MEET-1: Every match must trigger a meetup suggestion attempt unless one of the users is no longer eligible or safety-restricted.",
            "FR-MEET-2: The engine must use each user's approximate area centroid and declared radius to define the feasible meetup zone.",
            "FR-MEET-3: The engine must calculate a midpoint between the two approximate origin centroids, then search curated venues that are within both users' allowed radius limits.",
            "FR-MEET-4: Only curated public venues are eligible in MVP. Examples include cafes, dessert shops, bookstores, campus lounges, and other daytime-friendly spots.",
            "FR-MEET-5: Bars, clubs, hotels, private residences, and other high-risk or low-visibility venues are excluded from the curated set.",
            "FR-MEET-6: The engine must rank eligible venues by midpoint closeness, venue quality, daytime suitability, and whether the venue is open during candidate slots.",
            "FR-MEET-7: The app must propose one primary venue and up to two alternates when multiple valid options exist.",
            "FR-MEET-8: Suggested time slots must stay inside the MVP daytime window of 8:00 AM to 6:00 PM local time.",
            "FR-MEET-9: Suggested slots should feel after-class friendly, with default slots biased toward late morning, early afternoon, and late afternoon rather than early morning extremes.",
            "FR-MEET-10: If no venue exists exactly near the midpoint, the system must fall back to the nearest acceptable curated venue that still respects both users' radius constraints.",
            "FR-MEET-11: If there is no shared feasible venue at all, the app must clearly communicate that no valid suggestion is available and offer users the option to adjust radius or continue in chat.",
            "FR-MEET-12: User-facing meetup suggestions must never expose the other person's precise underlying approximate-area centroid or any exact address source used for the calculation.",
        ),
    ),
    Block("heading", level=2, text="Messaging"),
    Block(
        "bullets",
        items=(
            "FR-CHAT-1: The MVP must support one-to-one text chat for matched users.",
            "FR-CHAT-2: Chat becomes available only after both users accept a meetup plan or after the match expires per FR-MAT-6; the meetup suggestion screen alone must not unlock chat.",
            "FR-CHAT-3: Messaging is intended for coordination and rapport, so advanced features such as voice, video, disappearing media, and group chat are out of scope.",
            "FR-CHAT-4: Users must be able to block or report from inside chat.",
            "FR-CHAT-5: Chat should preserve the meetup context by showing the current suggested venue and slot near the top of the thread or match detail view.",
        ),
    ),
    Block("heading", level=2, text="Post-meetup review"),
    Block(
        "bullets",
        items=(
            'FR-REV-1: After a scheduled meetup time passes or a user marks the meetup complete, the app must prompt each user for private experience feedback with at least two options: positive ("cool") and negative ("not cool").',
            "FR-REV-2: Users may add optional short text and may skip the review without losing access to discovery or an still-active match thread.",
            "FR-REV-3: Review responses must not be displayed as public profile ratings in MVP; they feed internal analytics, safety review, and product quality only.",
        ),
    ),
    Block("heading", level=2, text="School compatibility insights"),
    Block(
        "bullets",
        items=(
            "FR-COMP-1: The product must maintain school-to-school compatibility aggregates derived from recent platform behavior.",
            "FR-COMP-2: Inputs should include mutual-like conversion to match, chat start rate, reply rate, early conversation continuation, and meetup acceptance or completion signals when enough data exists.",
            "FR-COMP-3: The default evaluation window is the trailing 90 days so the signal stays fresh and can respond to changing behavior.",
            "FR-COMP-4: Compatibility must be treated as directional. The app may use score bands such as High, Strong, Emerging, and Early Signal rather than presenting false precision.",
            "FR-COMP-5: A school pair must meet minimum data thresholds before a user-facing compatibility label is shown. The default threshold for MVP is at least 40 two-way likes and 20 matches in the trailing 90 days.",
            "FR-COMP-6: If the threshold is not met, the app should show a neutral early-signal state rather than a low score that implies poor compatibility.",
            "FR-COMP-7: School compatibility may influence discovery ranking, but it should contribute no more than a minority share of the final ranking score so it does not become a hard gate.",
            "FR-COMP-8: All user-facing copy must frame compatibility as a fun, data-informed indicator and must not promise relationship success or scientific certainty.",
        ),
    ),
    Block("heading", level=2, text="Trust, safety, and privacy"),
    Block(
        "bullets",
        items=(
            "FR-SAFE-1: The product must include blocking and reporting on profiles, matches, and chats.",
            "FR-SAFE-2: Meetup defaults must favor public venues and daytime hours only.",
            "FR-SAFE-3: Exact addresses, dorm names, and live-location history must not be exposed to other users in MVP.",
            "FR-SAFE-4: Users under investigation, repeatedly reported accounts, and clearly abusive actors must be reviewable and removable through admin tools.",
            "FR-SAFE-5: The app must explain in plain language that compatibility insights are aggregate product signals, not statements of personal safety or romantic outcome.",
            "FR-SAFE-6: The app must support basic account restriction states such as active, under review, suspended, and banned.",
            "FR-SAFE-7: The MVP should launch in a limited geography or campus cluster so venue curation and moderation quality stay manageable.",
        ),
    ),
    Block("heading", level=2, text="Admin console"),
    Block(
        "bullets",
        items=(
            "FR-ADM-1: Admins must be able to create, edit, activate, and deactivate school records.",
            "FR-ADM-2: Admins must be able to add and review approved email domains per school.",
            "FR-ADM-3: Admins must be able to review queued reports, inspect relevant profile or chat context, and take moderation actions.",
            "FR-ADM-4: Admins must be able to create, edit, and deactivate curated meetup venues with address, coordinates, category, operating hours, and safety tags.",
            "FR-ADM-5: Admins must be able to inspect school compatibility aggregates and suppress misleading or low-quality school-pair displays if needed.",
            "FR-ADM-6: Admins must be able to search for a user, review account state, and change status to active, under review, suspended, or banned.",
            "FR-ADM-7: Admin tooling must be internal-only and can be web-based even though the student product is mobile-first.",
            "FR-ADM-8: MVP admin permissions may be simple role tiers such as moderator and super-admin rather than a full granular permissions matrix.",
        ),
    ),
    Block("heading", level=1, text="Product-side Domain Objects and Events"),
    Block("heading", level=2, text="Core domain objects"),
    Block(
        "bullets",
        items=(
            "School: canonical record for one college or university, including active status and metadata used in discovery and reporting.",
            "SchoolDomain: approved email domain mapped to a School record and managed by admins.",
            "User: verified student account with profile fields, eligibility state, preferences, approximate area, and radius.",
            "ApproxArea: user-selected place label plus stored centroid coordinates used for ranking and meetup generation.",
            "Venue: curated public meetup location with coordinates, category, opening hours, and moderation-safe status.",
            "Match: record created when two users like each other, including timestamps and school-pair context.",
            "MeetupProposal: generated venue and slot recommendation tied to a match, with primary option, alternates, and user actions such as accepted or skipped.",
            "Conversation: one-to-one chat thread between matched users.",
            "Report: trust-and-safety case attached to a user, profile, match, or message.",
            "SchoolCompatibilityAggregate: rolling school-pair metrics and display band used in ranking and user-facing insight surfaces.",
        ),
    ),
    Block("heading", level=2, text="Required event tracking"),
    Block(
        "bullets",
        items=(
            "Account created, verification email sent, verification completed, and onboarding completed.",
            "Discovery card shown, like, pass, mutual match created.",
            "Meetup proposal generated, proposal failed, venue accepted, alternate selected, slot changed, and suggestion skipped.",
            "Chat started, first reply sent, reply within 24 hours, and early conversation continuation milestone reached.",
            "Report filed, block applied, moderation action taken.",
            "School compatibility aggregate recalculated and school-pair display state changed.",
        ),
    ),
    Block("heading", level=1, text="Ranking, Compatibility, and Meetup Defaults"),
    Block(
        "paragraph",
        text=(
            "The PRD should set defaults clearly enough that implementation can start without another product workshop. "
            "These defaults are product policy, not final algorithm lock-in."
        ),
    ),
    Block(
        "bullets",
        items=(
            "Discovery ranking default weighting: preference fit and safety eligibility are mandatory gates; among eligible users, distance fit and activity freshness carry the largest weight, while school compatibility remains a meaningful but minority factor.",
            "Compatibility default score bands: 80 to 100 High, 65 to 79 Strong, 50 to 64 Emerging, below threshold Early Signal rather than a punitive low label.",
            "Compatibility display thresholds: show a user-facing band only after at least 40 two-way likes and 20 matches for the school pair in the trailing 90 days.",
            "Meetup radius default: 10 km. Metric units are the only supported unit system in MVP.",
            "Time-slot default behavior: suggest three slots inside 8:00 AM to 6:00 PM local time, biased toward late morning, early afternoon, and late afternoon.",
            "Fallback behavior: first search near the midpoint, then search the broader overlap zone, then fail gracefully if no curated venue satisfies both users' radius limits.",
        ),
    ),
    Block("heading", level=1, text="Success Metrics and Launch Criteria"),
    Block("heading", level=2, text="North-star outcome"),
    Block(
        "paragraph",
        text=(
            "The north-star outcome for MVP is a verified student match that progresses to a credible meetup plan. "
            "The product should optimize for trust, match quality, and meetup follow-through rather than raw swipe volume alone."
        ),
    ),
    Block("heading", level=2, text="Core metrics"),
    Block(
        "bullets",
        items=(
            "Verification completion rate for eligible signups.",
            "Profile completion rate before discovery access.",
            "Like-to-match conversion rate.",
            "Percentage of matches that receive a valid meetup proposal within five seconds.",
            "Meetup proposal acceptance rate and alternate-selection rate.",
            "First reply rate and 24-hour conversation continuation rate.",
            "Report rate per 1,000 active users and moderation resolution time.",
            "Coverage of approved schools and curated venues in the pilot geography.",
        ),
    ),
    Block("heading", level=2, text="Launch gates"),
    Block(
        "bullets",
        items=(
            "At least three approved schools are active in the initial pilot cluster.",
            "Each launch geography has enough curated venues to support common midpoint suggestions across likely student corridors.",
            "Verification, matching, and meetup proposal generation work reliably enough that the core loop can be demonstrated end to end.",
            "Moderation workflows, report review, and emergency deactivation are operational before public launch.",
        ),
    ),
    Block("heading", level=1, text="Risks and Mitigations"),
    Block(
        "bullets",
        items=(
            "Cold-start data risk: new schools will not have enough compatibility data. Mitigation: show Early Signal until thresholds are met and rely more heavily on distance and preference fit at launch.",
            "Venue coverage risk: midpoint math may fail in sparse or traffic-heavy areas. Mitigation: launch in dense campus clusters first and maintain a healthy curated venue pool.",
            "Safety perception risk: a student dating app can feel risky if location handling is unclear. Mitigation: never require exact home addresses, explain approximate-area usage clearly, and enforce daytime public-venue defaults.",
            "Verification loophole risk: some non-students may retain school mailboxes. Mitigation: state active-student-only policy, allow review states, and give admins tools to remove misuse.",
            "Behavioral risk: some users may still prefer chat-first interaction. Mitigation: keep chat available immediately after the meetup suggestion and test whether the guided flow increases coordination rather than suppressing it.",
        ),
    ),
    Block("heading", level=1, text="Future Roadmap After MVP"),
    Block(
        "bullets",
        items=(
            "More advanced scheduling based on user availability rather than static daytime slot defaults.",
            "Richer school insights, campus-specific prompts, or same-school versus cross-school discovery controls.",
            "Premium features, referral loops, student-facing web, or broader social/community mechanics only after the core verified dating loop proves value.",
            "Smarter compatibility weighting, better venue personalization, and experimentation on how meetup suggestions influence outcomes.",
        ),
    ),
    Block("heading", level=1, text="Acceptance Criteria for the Next Implementation Agent"),
    Block(
        "bullets",
        items=(
            "The implementation plan must preserve the active-student-only eligibility model and approved-domain school mapping.",
            "The student product must be mobile-first, while admin tooling may be a separate internal web surface.",
            "The core end-to-end flow must be verify, profile, browse, match, meetup suggestion, then optional chat.",
            "Meetup generation must use approximate areas and radius preferences rather than exact address sharing or persistent live tracking.",
            "The MVP must exclude night meetups and non-curated venues.",
            "School compatibility must remain directional and threshold-gated, not a hard matching rule.",
            "Safety controls, moderation states, and admin venue curation are required parts of MVP rather than post-launch extras.",
            "Any technical design produced later may choose specific vendors or frameworks, but it must not change the product defaults documented here without an explicit product decision.",
        ),
    ),
)


def set_run_font(run, *, name: str = "Calibri", size: float | None = None, color=None, bold: bool | None = None):
    run.font.name = name
    run._element.rPr.rFonts.set(qn("w:ascii"), name)
    run._element.rPr.rFonts.set(qn("w:hAnsi"), name)
    if size is not None:
        run.font.size = Pt(size)
    if color is not None:
        run.font.color.rgb = color
    if bold is not None:
        run.bold = bold


def set_paragraph_border_bottom(paragraph) -> None:
    p_pr = paragraph._p.get_or_add_pPr()
    pbdr = p_pr.find(qn("w:pBdr"))
    if pbdr is None:
        pbdr = OxmlElement("w:pBdr")
        p_pr.append(pbdr)
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "6")
    bottom.set(qn("w:space"), "1")
    bottom.set(qn("w:color"), "C7D4E2")
    pbdr.append(bottom)


def configure_styles(doc: Document) -> None:
    normal = doc.styles["Normal"]
    normal.font.name = "Calibri"
    normal.font.size = Pt(11)
    normal.paragraph_format.space_after = Pt(6)
    normal.paragraph_format.line_spacing = 1.1

    title = doc.styles["Title"]
    title.font.name = "Calibri"
    title.font.size = Pt(23)
    title.font.bold = True
    title.font.color.rgb = BLACK
    title.paragraph_format.space_after = Pt(4)

    if "Subtitle" not in doc.styles:
        subtitle = doc.styles.add_style("Subtitle", WD_STYLE_TYPE.PARAGRAPH)
    else:
        subtitle = doc.styles["Subtitle"]
    subtitle.font.name = "Calibri"
    subtitle.font.size = Pt(13)
    subtitle.font.italic = False
    subtitle.font.color.rgb = MUTED
    subtitle.paragraph_format.space_after = Pt(14)

    for name, size, color, before, after in (
        ("Heading 1", 16, BLUE, 16, 8),
        ("Heading 2", 13, BLUE, 12, 6),
        ("Heading 3", 12, DARK_BLUE, 8, 4),
    ):
        style = doc.styles[name]
        style.font.name = "Calibri"
        style.font.size = Pt(size)
        style.font.bold = True
        style.font.color.rgb = color
        style.paragraph_format.space_before = Pt(before)
        style.paragraph_format.space_after = Pt(after)


def configure_page(doc: Document) -> None:
    section = doc.sections[0]
    section.start_type = WD_SECTION_START.NEW_PAGE
    section.top_margin = Inches(1)
    section.bottom_margin = Inches(1)
    section.left_margin = Inches(1)
    section.right_margin = Inches(1)
    section.header_distance = Inches(0.492)
    section.footer_distance = Inches(0.492)

    header_p = section.header.paragraphs[0]
    header_p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    header_p.paragraph_format.space_after = Pt(0)
    header_run = header_p.add_run("After Class | Product Requirements Document")
    set_run_font(header_run, size=9, color=MUTED)

    footer_p = section.footer.paragraphs[0]
    footer_p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    footer_p.paragraph_format.space_after = Pt(0)
    footer_run = footer_p.add_run("Build-ready MVP spec")
    set_run_font(footer_run, size=9, color=MUTED)


def add_metadata(doc: Document) -> None:
    for label, value in METADATA:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.line_spacing = 1.1
        label_run = p.add_run(f"{label}: ")
        set_run_font(label_run, size=11, color=BLACK, bold=True)
        value_run = p.add_run(value)
        set_run_font(value_run, size=11, color=BLACK)

    rule = doc.add_paragraph()
    rule.paragraph_format.space_before = Pt(8)
    rule.paragraph_format.space_after = Pt(12)
    set_paragraph_border_bottom(rule)


def add_docx(docx_path: Path) -> None:
    doc = Document()
    configure_styles(doc)
    configure_page(doc)

    intro = doc.add_paragraph()
    intro.alignment = WD_ALIGN_PARAGRAPH.LEFT
    intro.paragraph_format.space_after = Pt(2)
    run = intro.add_run("PRODUCT REQUIREMENTS DOCUMENT")
    set_run_font(run, size=11, color=MUTED, bold=True)

    title = doc.add_paragraph(TITLE, style="Title")
    title.alignment = WD_ALIGN_PARAGRAPH.LEFT

    subtitle = doc.add_paragraph(SUBTITLE, style="Subtitle")
    subtitle.alignment = WD_ALIGN_PARAGRAPH.LEFT

    add_metadata(doc)

    for block in BLOCKS:
        if block.kind == "heading":
            assert block.level is not None and block.text is not None
            doc.add_paragraph(block.text, style=f"Heading {block.level}")
        elif block.kind == "paragraph":
            assert block.text is not None
            doc.add_paragraph(block.text, style="Normal")
        elif block.kind == "bullets":
            assert block.items is not None
            for item in block.items:
                p = doc.add_paragraph(style="List Bullet")
                p.paragraph_format.space_after = Pt(8)
                p.paragraph_format.line_spacing = 1.167
                p.add_run(item)
        elif block.kind == "numbered":
            assert block.items is not None
            for item in block.items:
                p = doc.add_paragraph(style="List Number")
                p.paragraph_format.space_after = Pt(8)
                p.paragraph_format.line_spacing = 1.167
                p.add_run(item)
        else:
            raise ValueError(f"Unsupported block kind: {block.kind}")

    docx_path.parent.mkdir(parents=True, exist_ok=True)
    doc.save(docx_path)


def add_markdown(md_path: Path) -> None:
    lines: list[str] = [
        f"# {TITLE}",
        "",
        f"*{SUBTITLE}*",
        "",
    ]

    for label, value in METADATA:
        lines.append(f"- {label}: {value}")
    lines.extend(["", "---", ""])

    for block in BLOCKS:
        if block.kind == "heading":
            assert block.level is not None and block.text is not None
            lines.append(f"{'#' * (block.level + 1)} {block.text}")
            lines.append("")
        elif block.kind == "paragraph":
            assert block.text is not None
            lines.append(block.text)
            lines.append("")
        elif block.kind == "bullets":
            assert block.items is not None
            for item in block.items:
                lines.append(f"- {item}")
            lines.append("")
        elif block.kind == "numbered":
            assert block.items is not None
            for idx, item in enumerate(block.items, start=1):
                lines.append(f"{idx}. {item}")
            lines.append("")
        else:
            raise ValueError(f"Unsupported block kind: {block.kind}")

    md_path.parent.mkdir(parents=True, exist_ok=True)
    md_path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")


def add_pdf(pdf_path: Path) -> None:
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "AfterClassTitle",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=23,
        leading=28,
        textColor=colors.black,
        alignment=TA_LEFT,
        spaceAfter=4,
    )
    subtitle_style = ParagraphStyle(
        "AfterClassSubtitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=13,
        leading=16,
        textColor=colors.HexColor("#666666"),
        spaceAfter=14,
    )
    label_style = ParagraphStyle(
        "Label",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=13,
        textColor=colors.HexColor("#666666"),
        spaceAfter=2,
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=11,
        leading=14,
        textColor=colors.black,
        spaceAfter=6,
    )
    heading1 = ParagraphStyle(
        "H1",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=16,
        leading=20,
        textColor=colors.HexColor("#2E74B5"),
        spaceBefore=16,
        spaceAfter=8,
    )
    heading2 = ParagraphStyle(
        "H2",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=16,
        textColor=colors.HexColor("#2E74B5"),
        spaceBefore=12,
        spaceAfter=6,
    )
    heading3 = ParagraphStyle(
        "H3",
        parent=styles["Heading3"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=15,
        textColor=colors.HexColor("#1F4D78"),
        spaceBefore=8,
        spaceAfter=4,
    )
    bullet_style = ParagraphStyle(
        "BulletBody",
        parent=body_style,
        spaceAfter=0,
        leftIndent=0,
    )

    story = [
        Paragraph("PRODUCT REQUIREMENTS DOCUMENT", label_style),
        Paragraph(TITLE, title_style),
        Paragraph(SUBTITLE, subtitle_style),
    ]

    for label, value in METADATA:
        story.append(Paragraph(f"<b>{label}:</b> {value}", body_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#C7D4E2")))
    story.append(Spacer(1, 10))

    heading_styles = {1: heading1, 2: heading2, 3: heading3}

    for block in BLOCKS:
        if block.kind == "heading":
            assert block.level is not None and block.text is not None
            story.append(Paragraph(block.text, heading_styles[block.level]))
        elif block.kind == "paragraph":
            assert block.text is not None
            story.append(Paragraph(block.text, body_style))
        elif block.kind == "bullets":
            assert block.items is not None
            items = [ListItem(Paragraph(item, bullet_style)) for item in block.items]
            story.append(
                ListFlowable(
                    items,
                    bulletType="bullet",
                    start="circle",
                    leftIndent=18,
                    bulletFontName="Helvetica",
                    bulletFontSize=10,
                    spaceAfter=8,
                )
            )
            story.append(Spacer(1, 4))
        elif block.kind == "numbered":
            assert block.items is not None
            items = [ListItem(Paragraph(item, bullet_style)) for item in block.items]
            story.append(
                ListFlowable(
                    items,
                    bulletType="1",
                    leftIndent=18,
                    bulletFontName="Helvetica",
                    bulletFontSize=10,
                    spaceAfter=8,
                )
            )
            story.append(Spacer(1, 4))
        else:
            raise ValueError(f"Unsupported block kind: {block.kind}")

    pdf_path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=LETTER,
        leftMargin=1 * inch,
        rightMargin=1 * inch,
        topMargin=1 * inch,
        bottomMargin=1 * inch,
    )

    def on_page(canvas, _doc):
        canvas.saveState()
        canvas.setFont("Helvetica", 9)
        canvas.setFillColor(colors.HexColor("#666666"))
        canvas.drawString(_doc.leftMargin, LETTER[1] - 0.6 * inch, "After Class | Product Requirements Document")
        footer_text = f"Build-ready MVP spec | Page {_doc.page}"
        canvas.drawRightString(LETTER[0] - _doc.rightMargin, 0.55 * inch, footer_text)
        canvas.restoreState()

    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)


def main() -> None:
    parser = argparse.ArgumentParser(description="Build After Class PRD outputs.")
    parser.add_argument("--md", required=True, help="Path to the Markdown output.")
    parser.add_argument("--docx", required=True, help="Path to the DOCX output.")
    parser.add_argument("--pdf", help="Path to the PDF output.")
    args = parser.parse_args()

    md_path = Path(args.md)
    docx_path = Path(args.docx)

    add_markdown(md_path)
    add_docx(docx_path)
    if args.pdf:
        add_pdf(Path(args.pdf))


if __name__ == "__main__":
    main()
