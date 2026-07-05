# Ascendra

> **Learn. Build. Contribute. Earn.**

Ascendra is a next-generation learning ecosystem that transforms learners into builders, contributors, mentors, and professionals. Where traditional platforms optimize for course completion and certificates, Ascendra optimizes for **demonstrated value creation**.

---

## The Core Loop

```
Learn → Build → Contribute → Earn Reputation → Become Mentor → Earn Skill Coins → Create Opportunities → Teach Others
```

Learning is free and unlimited. Standing in the community and the ability to earn are derived entirely from what a user builds and gives back. **Education is a right; monetization is a service.**

---

## The Three-Currency Economy

Ascendra runs on three strictly separated currencies. Conflating them is the most common way reward economies fail.

| Currency | Purpose | Transferable | Withdrawable | Source | Can Decrease? |
|---|---|---|---|---|---|
| **XP** | Progression — *"How far along am I?"* | No | No | Learning + contribution activity | No |
| **Reputation** | Trust — *"Should others trust me?"* | No | No | Validated contribution only | Yes (misconduct) |
| **Skill Coins** | Value exchange — *"What value have I created?"* | Yes | Yes | Validated contribution only | Yes (spent/withdrawn) |

### The Cardinal Rule

> **Learning alone never generates Skill Coins. Only validated contribution generates Skill Coins.**

This is enforced structurally — consumption events flow only to the XP ledger. The Skill Coin mint path only accepts validated contribution events.

### Reward Reference

**XP**
| Action | XP |
|---|---|
| Lesson (Easy / Medium / Hard) | 10 / 25 / 50 |
| Project (Beginner / Intermediate / Advanced) | 100 / 300 / 1,000 |
| Daily / Weekly / Monthly Quest | 50 / 250 / 1,000 |

**Reputation & Skill Coins**
| Contribution | Reputation | Skill Coins |
|---|---|---|
| Accepted Answer | +15 | 1 |
| Project Review Approved | +20 | 3 |
| Mentorship Session Completed | +30 | 5–50 |
| Article Published | +50 | — |
| Spam Report Validated | +10 | — |
| Guild Event Winner | — | 25 |
| Bounty Completion | — | Variable |

**Reputation Penalties**
| Violation | Reputation |
|---|---|
| Spam | −50 |
| Abuse | −100 |
| Plagiarism | −250 |

### Reputation Tiers

| Level | Title | Reputation Required | Significance |
|---|---|---|---|
| 1 | Learner | 0 | Full access to free learning |
| 2 | Contributor | 100 | Recognized community member |
| 3 | Trusted Contributor | 500 | Greater visibility and influence |
| 4 | Mentor | 1,000 | Unlocks mentorship + Skill Coin rewards |
| 5 | Expert | 5,000 | Advanced content creation + guild leadership |
| 6 | Master | 10,000 | Highest trust and governance influence |

---

## System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                          CLIENT TIER                              │
│   Web (Next.js / TypeScript / Tailwind / shadcn/ui)              │
│   State: React Query (server cache) + Zustand (UI state)         │
└───────────────────────────────┬──────────────────────────────────┘
                                │  HTTPS / JSON / WebSocket
┌───────────────────────────────▼──────────────────────────────────┐
│                      EDGE & API GATEWAY                           │
│   CDN + WAF + TLS termination + rate limiting                    │
│   FastAPI BFF: auth, routing, aggregation, idempotency           │
└───────────────────────────────┬──────────────────────────────────┘
                                │  internal RPC + async events
┌───────────────────────────────▼──────────────────────────────────┐
│                         MICROSERVICES                             │
│                                                                   │
│  ┌─────────────┐  ┌──────────┐  ┌────────────┐  ┌───────────┐   │
│  │    Auth     │  │ Learning │  │ Assessment │  │ Community │   │
│  └─────────────┘  └──────────┘  └────────────┘  └───────────┘   │
│                                                                   │
│  ┌─────────────┐  ┌──────────┐  ┌────────────┐  ┌───────────┐   │
│  │    Guild    │  │  Mentor  │  │Marketplace │  │  Payment  │   │
│  └─────────────┘  └──────────┘  └────────────┘  └───────────┘   │
│                                                                   │
│  ┌─────────────┐  ┌──────────┐  ┌────────────┐  ┌───────────┐   │
│  │ Blockchain  │  │    AI    │  │Notification│  │ Analytics │   │
│  └─────────────┘  └──────────┘  └────────────┘  └───────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │              ECONOMY CORE (Crown Jewels)                    │ │
│  │     XP Ledger │ Reputation Ledger │ Skill Coin Ledger       │ │
│  └─────────────────────────────────────────────────────────────┘ │
└───────────────────────────────┬──────────────────────────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────────┐
│                         STORAGE LAYER                             │
│  PostgreSQL (system of record) │ Redis (cache / queues / locks)  │
│  Elasticsearch (search/feeds)  │ Cloudflare R2 (object store)    │
└───────────────────────────────┬──────────────────────────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────────┐
│                      EXTERNAL SERVICES                            │
│  OpenAI / Azure OpenAI (LLM)  │  Judge0 (code execution sandbox) │
│  Aptos + Move (blockchain)    │  Stripe / GCash / Maya (payments)│
└──────────────────────────────────────────────────────────────────┘
```

---

## Microservices

Each service owns a bounded context with its own database. No service reaches directly into another service's database — cross-context data flows through APIs or events only.

| Service | Responsibility | Key Events |
|---|---|---|
| **Authentication** | Identity, credentials, tokens, wallet binding | `user.registered`, `wallet.linked` |
| **Learning** | Courses, lessons, paths, enrollment, progress | `lesson.completed`, `course.completed` |
| **Assessment** | Code execution (Judge0), project review, rubrics | `assessment.passed`, `review.completed` |
| **Community** | Q&A, discussions, articles, votes, spam reports | `answer.accepted`, `article.published` |
| **Guild** | Teams, competitions, rankings, events | `guild.event_won`, `guild.ranking_updated` |
| **Mentor** | Matching, scheduling, sessions, rewards | `mentorship.session_completed` |
| **Marketplace** | Portfolios, bounties, freelance, escrow | `bounty.completed`, `portfolio.published` |
| **Payment** | Subscriptions, Skill Coin on/off-ramps (Stripe/GCash/Maya) | `payment.settled`, `withdrawal.completed` |
| **Blockchain** | Anchoring achievements/reputation/coins to Aptos | `achievement.anchored`, `reputation_proof.written` |
| **AI** | AI Mentor, Coach, Reviewer, Interviewer, roadmaps | `ai.review_generated`, `ai.roadmap_generated` |
| **Notification** | In-app, email, push, WebSocket fan-out | `notification.sent` |
| **Analytics** | Behavioral + economic events, funnel metrics | Aggregated metric snapshots |
| **Economy Core** | XP, Reputation, Skill Coin ledgers | `economy.xp.awarded`, `economy.skillcoin.minted` |

---

## Contribution Validation Pipeline

Contribution is the sole source of Reputation and Skill Coins. Every contribution passes through four stages before any reward is issued:

```
  ┌───────────┐    ┌────────────┐    ┌──────────────────┐    ┌──────────┐
  │  Capture  │───▶│ Validation │───▶│ Anti-Abuse       │───▶│  Reward  │
  │           │    │ (non-self) │    │ Screening        │    │          │
  │ Surface   │    │            │    │ Rate limits      │    │ Economy  │
  │ service   │    │ Asker /    │    │ Relationship     │    │ Core     │
  │ records   │    │ reviewer / │    │ checks           │    │ mints    │
  │ candidate │    │ system     │    │ Velocity/pattern │    │ idempo-  │
  │           │    │ confirms   │    │ anomaly detect   │    │ tently   │
  └───────────┘    └────────────┘    └──────────────────┘    └──────────┘
```

Self-validation is structurally impossible — an actor cannot be their own validator.

---

## Functional Modules

| Module | Backing Services | Core Flow |
|---|---|---|
| **Learning Engine** | Learning, Assessment, AI | Enroll → Learn → Pass Quiz → Complete Project → Earn XP |
| **Contribution Network** | Community, Economy Core | Ask → Answer → Accept → Earn Reputation + Skill Coins |
| **Guild System** | Guild, Economy Core | Form Guild → Compete → Win → Earn Skill Coins |
| **Mentor Marketplace** | Mentor, Payment, Economy Core | Request → Match → Session → Confirm → Reward |
| **Project Marketplace** | Marketplace, Payment, Economy Core | Post Bounty → Assign → Deliver → Validate → Release Escrow |
| **AI Ecosystem** | AI, Learning, Assessment | Ask → Grounded response (never gates fundamentals) |
| **Blockchain Layer** | Blockchain, Economy Core | Earn → Anchor NFT / Reputation Proof / Skill Coin on-chain |

---

## Technology Stack

| Layer | Technology | Role |
|---|---|---|
| **Frontend** | Next.js + TypeScript | SSR/SSG, routing, API integration |
| | Tailwind CSS + shadcn/ui | Styling and accessible component primitives |
| | React Query | Server state cache — all data fetched from API |
| | Zustand | UI state only — never copies server state |
| **Backend** | FastAPI (Python) | API Gateway/BFF and all microservices |
| **Database** | PostgreSQL | System of record — all ledgers and transactional state |
| | Redis | Cache, distributed locks, queues, pub/sub |
| | Elasticsearch | Search, feeds, leaderboards (derived read models) |
| | Cloudflare R2 | Object storage — media, artifacts, uploads |
| **External** | OpenAI / Azure OpenAI | LLM for AI Mentor, Coach, Reviewer, Interviewer |
| | Judge0 | Sandboxed code execution for automated assessment |
| | Aptos + Move | Blockchain — soulbound credentials, Skill Coin portability |
| | Stripe / GCash / Maya | Payment processing and local rails |

---

## Architectural Principles

1. **Bounded contexts + Database-per-service** — No shared schemas, no cross-service joins.
2. **Event-driven + Transactional Outbox** — State change and event land in the same transaction; no silent gaps.
3. **Idempotency everywhere** — Every economy operation carries an idempotency key. Same key → same effect exactly once.
4. **CQRS for read/write divergence** — Feeds, leaderboards, and search use Elasticsearch/Redis projections.
5. **Sagas for multi-service transactions** — Marketplace escrow, bounty completion, and withdrawal use compensating sagas.
6. **Fail safe, degrade gracefully** — Economy fails closed (rejects over corrupts). Learning surfaces fail open where safe.
7. **Economic integrity outranks availability** — A fast wrong answer in a real-value economy is worse than a brief delay.
8. **AI augments, never gates or mints** — AI output is always advisory. Economic consequences flow from deterministic rules only.
9. **Identity separated from economic record** — GDPR erasure is possible without rewriting the immutable ledger.
10. **Blockchain is a mirror, not the source of truth** — Off-chain ledgers are authoritative; Aptos provides ownership and verifiability.

---

## Key Sequence Flows

### Lesson Completion → XP Award
```
Client → Gateway → Learning Service
                        │
                        ├─ records completion in DB
                        └─ writes outbox event (same transaction)
                                │
                          [async via bus]
                                │
                         Economy Core
                                │
                         appends XP entry (idempotent)
                                │
                         emits economy.xp.awarded
                                │
                    ┌───────────┴───────────┐
               Notification            Analytics
```

### Accepted Answer → Reputation + Skill Coin
```
Community Service emits community.answer.accepted
        │
  [4-stage validation pipeline]
        │
  Economy Core
        ├─ appends +15 Reputation entry  (Reputation ledger)
        └─ appends +1 Skill Coin mint    (Skill Coin ledger)
                │
        emits economy.skillcoin.minted
                │
        Blockchain Service → schedules async Aptos anchoring
```

### Reputation Crossing a Tier → Capability Grant
```
Reputation entry lands in Economy Core
        │
  recomputes level → threshold crossed (e.g. 1,000)
        │
  emits economy.level.changed { new_level: 4 }
        │
  Mentor Service → grants mentoring capability automatically
  (no administrator involved)
```

---

## Blockchain Architecture

Three classes of records anchored on **Aptos + Move**:

| Record | Transferable | Purpose |
|---|---|---|
| **Achievement NFTs** | No (soulbound) | Milestone accomplishments owned by the learner's wallet |
| **Reputation Proofs** | No | Third-party verifiable attestation of tier |
| **Skill Coins** | Yes | On-chain portability of earned value |

Anchoring is always **asynchronous and idempotent**. The off-chain ledger is authoritative. A chain incident or congestion never blocks the core product — anchoring simply queues and catches up.

---

## User Roles

| Role | Obtained By | Key Capabilities |
|---|---|---|
| **Guest** | Default | Browse public content |
| **Learner** | Register | Access all courses, earn XP |
| **Builder** | Publish projects | Submit to competitions |
| **Mentor** | 1,000 Reputation (Level 4) | Review projects, teach, earn Skill Coins |
| **Expert** | 5,000 Reputation (Level 5) | Create advanced content, lead guilds |
| **Instructor** | Platform approval | Offer paid courses and mentorship |
| **Moderator** | Admin assigned | Manage community content |
| **Administrator** | Admin assigned | Platform configuration, economy governance |

Earned roles (Builder, Mentor, Expert) are granted **automatically** when a reputation threshold is crossed — no administrator action required.

---

## MVP Scope and Success Metrics

The MVP proves the core loop with a real but constrained economy.

**Ships in MVP:** Free learning, project workspaces + Judge0 assessment, Q&A + articles + spam reporting, XP + Reputation + constrained Skill Coin economy, roles through Mentor, AI Mentor + AI Reviewer, blockchain anchoring (achievements + reputation proofs).

**Success Targets:**

| Metric | Target |
|---|---|
| Users | 1,000 |
| Course completion rate | 60% |
| Contribution rate | 15% (most important) |
| Mentorship participation | 20% |
| Guild participation | 30% |
| Marketplace transactions | 50 / month |

The **contribution rate (15%)** is the single most important metric. If learners don't contribute, the thesis fails.

---

## Scaling Roadmap

```
MVP   →   V1    →   V2     →   V3
1K    →   10K   →   100K   →   1M+
                              Global Learning Economy
```

| Stage | Key Milestones |
|---|---|
| **MVP** | Core loop + constrained economy + AI Mentor/Reviewer |
| **V1** | Full mentor marketplace, guild competitions, bounty economy, full AI suite, Skill Coin withdrawals |
| **V2** | Community governance, regional expansion, partitioned ledgers, trust-and-safety automation |
| **V3** | Multi-region, global concurrent load, reputation + credentials portable and verifiable anywhere |

Across every stage: service boundaries stay fixed, economy correctness guarantees stay intact.

---

## Project Structure

```
Ascendra-project/
├── apps/
│   └── web/                    # Next.js frontend
│       ├── src/
│       │   ├── app/            # Next.js App Router pages
│       │   ├── components/
│       │   │   ├── home/       # Landing page sections
│       │   │   └── ui/         # Shared UI primitives
│       │   └── lib/            # Utilities
│       └── AGENTS.md           # Ascendra Architect agent rules
├── .claude/
│   └── agents/
│       └── MASTER_ARCHITECTURE.md   # Full architecture specification
└── README.md
```

---

## Economic Invariants (Must Hold at All Times)

1. Skill Coins are minted **only** by validated contribution events — learning never mints coins.
2. There is exactly one minting code path, gated by the contribution validation pipeline.
3. Reputation increases only through validated contribution — never purchasable, never in a payment flow.
4. XP, Reputation, and Skill Coins live in three **separate append-only ledgers** and never convert into one another.
5. All balances are derived from ledger history — no mutable balance total is authoritative.
6. Self-dealing is structurally blocked — a user cannot validate their own contribution for reward.
7. Off-chain ledgers are authoritative — blockchain is a mirror, no user operation blocks on a chain write.
8. Anchoring is idempotent — duplicate confirmations are recognized and ignored.
9. AI output **never** directly awards currency or gates progression.
10. Under failure, economic operations fail closed — they reject rather than risk an incorrect write.
11. Identity is stored separately from economic facts — GDPR erasure never requires rewriting the ledger.
12. Every economically meaningful state change is published via the transactional outbox — no silent gaps.

---

*Ascendra · Learn. Build. Contribute. Earn.*
