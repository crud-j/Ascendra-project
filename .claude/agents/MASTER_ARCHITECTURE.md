<div align="center">

# Ascendra

### Master Architecture Document

**Learn. Build. Contribute. Earn.**

---

**Document Type:** Foundational Architecture Specification (Part 1 of N)
**Version:** 2.0
**Status:** Draft for Engineering Review
**Author:** Founding Architecture Team
**Classification:** Internal — Confidential

</div>

---

## Document Control

| Field | Value |
|---|---|
| Document Title | Ascendra — Master Architecture Document |
| Document ID | ASC-ARCH-001 |
| Version | 2.0 |
| Status | Draft for Engineering Review |
| Owner | Chief Architect |
| Audience | Engineering, Product, Design, Security, Leadership |
| Supersedes | Master Architecture v1.0 |
| Review Cadence | Per major release; minimum quarterly |

### Version History

| Version | Date | Author | Summary of Changes |
|---|---|---|---|
| 1.0 | — | Founding Architecture | Initial high-level outline: vision, modules, economy, roles, formulas, scaling. |
| 2.0 | Current | Founding Architecture Team | Full expansion into a foundation specification: architectural principles, detailed service decomposition, data architecture, economy mechanics, blockchain and AI subsystems, security, observability, DevOps, and delivery roadmap. |

### Companion Documents (Planned)

This document is **Part 1** of a multi-part architecture series. It defines *what* the system is and *how its pieces relate*. Subsequent parts define implementation detail:

| Part | Title | Scope |
|---|---|---|
| **Part 1** | **Master Architecture (this document)** | System vision, principles, service decomposition, economy, cross-cutting concerns. |
| Part 2 | Database Schema | Entity-relationship models, table definitions, indexes, partitioning, migration strategy. |
| Part 3 | Backend Services | Per-service API contracts, internal logic, queue topics, sequence flows. |
| Part 4 | Smart Contracts | On-chain data structures, Move modules, minting/burning logic, audit scope. |
| Part 5 | AI Services | Prompt architecture, model routing, evaluation, guardrails, cost control. |
| Part 6 | Frontend Architecture | Component system, state management, routing, design tokens, accessibility. |
| Part 7 | DevOps & Infrastructure | Environments, IaC, pipelines, runbooks, disaster recovery. |
| Part 8 | Security & Compliance | Threat model, controls, data governance, regulatory posture. |

### How to Read This Document

Readers seeking a fast orientation should read Sections 1–3 (Executive Summary, Vision, Problem Statement) and Section 7 (System Architecture Overview). Engineers implementing a specific subsystem should read the relevant Module (Section 14) and Service (Section 11) descriptions alongside the cross-cutting sections on data, security, and observability. Product and economy stakeholders should focus on Sections 16–22 (roles, currencies, formulas, progression, gamification).

---

## Table of Contents

1. Executive Summary
2. Vision, Mission, and Guiding Philosophy
3. Problem Statement and Market Context
4. Platform Objectives
5. Glossary and Core Concepts
6. Architectural Goals and Quality Attributes
7. System Architecture Overview
8. Architectural Principles and Patterns
9. Technology Stack and Rationale
10. Frontend Architecture
11. API Gateway and Backend-for-Frontend
12. Microservices Decomposition
13. Inter-Service Communication
14. Functional Modules
15. Data Architecture and Storage Layer
16. User Roles and Access Control
17. The Core Economy
18. Experience Points (XP) System
19. Reputation System
20. Skill Coin System
21. Reputation Levels and Progression
22. Gamification and Engagement Design
23. Blockchain and Web3 Architecture
24. AI Ecosystem Architecture
25. Security Architecture
26. Privacy, Compliance, and Data Governance
27. Observability and Operations
28. DevOps, CI/CD, and Infrastructure
29. Scalability and Performance Engineering
30. Domain Event Catalog
31. Key Sequence Flows
32. Architecture Decision Records (ADRs)
33. MVP Scope and Success Metrics
34. Scaling Vision and Roadmap
35. Technical Principles
36. Risk Register and Mitigations
37. Testing and Quality Strategy
38. Appendices

---

## 1. Executive Summary

Ascendra is a next-generation learning ecosystem designed to transform learners into builders, contributors, mentors, and professionals. Where traditional educational platforms optimize for course completion and the issuance of certificates, Ascendra optimizes for *demonstrated value creation*. The platform is structured as a **contribution economy**: users earn reputation, opportunities, and income by producing artifacts and assistance that benefit the wider community.

The product thesis is simple to state and demanding to execute. Most online education ends at the moment of consumption. A learner finishes a video, passes a quiz, receives a certificate, and then faces the same labor-market friction they faced before: no portfolio, no network, no proof of applied skill, and no path from knowledge to income. Ascendra closes that gap by making *contribution itself* the unit of progress. Learning is free and unlimited; standing in the community and the ability to earn are derived from what a user builds and gives back.

The system is organized around a single reinforcing loop:

> **Learn → Build → Contribute → Earn Reputation → Become Mentor → Earn Skill Coins → Create Opportunities → Teach Others**

Each arrow in that loop is a product surface backed by one or more services. Learning is delivered by a structured curriculum engine. Building is supported by project workspaces, automated assessment, and portfolios. Contribution is captured through question-and-answer, peer review, and published knowledge. Reputation is a non-purchasable trust signal earned only through validated contribution. Mentorship unlocks at reputation thresholds and connects experienced users to learners. Skill Coins are the platform's tradable, withdrawable currency, minted exclusively by verified contribution and usable across a marketplace of bounties, mentorship, and rewards. Ownership of achievements and credentials is anchored on-chain, giving users portable, verifiable proof of their accomplishments that outlives the platform itself.

Three properties distinguish Ascendra architecturally. First, the **economy is a first-class subsystem**, not a loyalty-points afterthought — it has its own ledgers, invariants, anti-fraud controls, and auditability requirements that rival a payments system. Second, **trust is computed, not declared**: reputation and access are derived from a transparent, rules-based pipeline that resists gaming and cannot be bought. Third, the platform is **credibly decentralizable at the edges**: while the core runs as conventional cloud services for performance and cost, the value and credential layer is recorded on a public blockchain so that what users earn is genuinely theirs.

This document specifies the architecture required to deliver that thesis at MVP scale (1,000 users) while remaining coherent through to a global scale target (1,000,000+ users). It is deliberately opinionated about boundaries, data ownership, and economic invariants, because those decisions are expensive to reverse. It is deliberately flexible about implementation detail inside each service boundary, because those decisions should remain close to the teams that own them.

---

## 2. Vision, Mission, and Guiding Philosophy

### 2.1 Vision

A world in which anyone, regardless of background or financial means, can convert curiosity into competence, competence into contribution, and contribution into a livelihood — with the proof of that journey owned by the learner rather than locked inside an institution.

### 2.2 Mission

To build the infrastructure of a global learning economy: free education, project-based mastery, community-powered mentorship, and a transparent reputation-and-reward system that pays people for the value they create for others.

### 2.3 Guiding Philosophy

Ascendra is built on a small number of beliefs that shape every downstream decision. These are not marketing slogans; they are constraints that the architecture must honor.

**Education is a right, monetization is a service.** The knowledge itself — courses, lessons, challenges — is free forever. Revenue derives from *acceleration and exchange*: premium tooling, marketplace fees, and value-added services. No paywall ever stands between a user and the ability to learn.

**Value is proven, not claimed.** A certificate asserts that someone sat through material. A contribution demonstrates that someone produced something others found useful. Ascendra weights the latter. Every reputation point and every Skill Coin traces back to an event where a real human or a verifiable process judged that value was created.

**Trust cannot be purchased.** Reputation is non-transferable and earned-only. There is no path — direct or indirect — by which money converts to standing. This is an architectural invariant enforced at the ledger level, not a policy that can be quietly relaxed.

**Ownership belongs to the earner.** Achievements, credentials, and earned value are recorded so that they remain meaningful even if a user leaves the platform. The blockchain layer exists for this reason: portability and permanence of what users earn.

**The loop must close.** A platform that only produces consumers fails its own mission. Success is measured by how reliably learners become contributors, contributors become mentors, and mentors create opportunities that pull the next cohort upward.

These beliefs recur throughout the document as concrete requirements: non-transferability becomes a database and smart-contract constraint; "education is free" becomes an authorization rule that no learning endpoint may gate on payment; "value is proven" becomes the rule that no Skill Coin is minted without a corresponding validated contribution event.

---

## 3. Problem Statement and Market Context

### 3.1 The Completion Gap

Online learning has solved access to *content* and has largely failed to solve access to *outcomes*. Course catalogs are effectively infinite and often free, yet the median learner who completes a course is not measurably closer to employment, freelance income, or community standing. The artifact they receive — a certificate — is weakly correlated with capability and is trusted by almost no employer as a substitute for demonstrated work.

### 3.2 Five Structural Failures

The architecture is a response to five recurring failures of existing platforms:

1. **Consumption without production.** Learners watch and quiz but rarely build. Skill that is never applied decays and cannot be evidenced.
2. **No portable proof.** Credentials live inside a vendor's walled garden. They are not verifiable by third parties and disappear if the vendor does.
3. **No path to income.** There is no bridge from "I learned this" to "someone paid me for this." The learner must leave the platform and start from zero elsewhere.
4. **Mentorship is scarce and unstructured.** The people best positioned to help learners — those slightly ahead of them — have no incentive structure or tooling to do so at scale.
5. **Trust is centralized and opaque.** Where reputation systems exist, they are gameable, purchasable, or controlled entirely by the platform with no transparency or portability.

### 3.3 The Ascendra Response

Ascendra addresses each failure with a structural mechanism rather than a feature bolt-on. Production is made mandatory and rewarding through project-based learning and a contribution economy. Proof is made portable through on-chain credentials. Income is made native through Skill Coins and a marketplace. Mentorship is made scalable through reputation-gated roles and AI augmentation. Trust is made transparent through a transparent, rules-based reputation pipeline and public on-chain records.

### 3.4 Where the Architecture Must Be Careful

Two market realities impose hard constraints. First, the target user base includes learners in regions where low-cost access, local payment rails (such as GCash and Maya), and offline-tolerant experiences matter; the architecture cannot assume abundant bandwidth or first-world payment infrastructure. Second, an economy that pays real value attracts fraud from day one; anti-abuse cannot be a later phase. Both realities are treated as first-class architectural concerns rather than localization or trust-and-safety afterthoughts.

---

## 4. Platform Objectives

The objectives below restate and expand the founding goals. Each is paired with the architectural capability that makes it real, so that no objective remains a slogan without a system behind it.

### 4.1 Primary Objectives

**Free education for everyone.** The entire learning catalog is accessible without payment. *Architectural commitment:* learning-path endpoints never consult the billing system as an authorization input; entitlement to content is independent of payment state.

**Project-based learning.** Mastery is demonstrated by building, not by watching. *Architectural commitment:* projects are first-class entities with workspaces, automated assessment via a code-execution sandbox, and portfolio publication.

**Community-powered mentorship.** Learning is social and peer-driven. *Architectural commitment:* mentorship is a reputation-gated role with dedicated scheduling, session, and reward services.

**Reputation-driven trust.** Standing is earned through validated contribution. *Architectural commitment:* a dedicated reputation pipeline with append-only event logs and a non-transferable balance.

**Blockchain ownership.** Users own what they earn. *Architectural commitment:* achievements, reputation proofs, and Skill Coins are anchored on a public chain with off-chain indexing for performance.

**Contribution economy.** Giving value is the engine of progress. *Architectural commitment:* a Skill Coin ledger minted only by validated contribution events, never by consumption.

**Career acceleration.** The platform is a bridge to professional outcomes. *Architectural commitment:* portfolios, bounties, freelance opportunities, and verifiable credentials integrated into one identity.

### 4.2 Secondary Objectives

**AI-powered learning.** Augment, never gate. AI mentors, coaches, reviewers, and interviewers accelerate learners but never become a paywall on fundamentals.

**Personalized roadmaps.** Each learner receives an adaptive path informed by goals, performance, and gaps.

**Marketplace opportunities.** A venue where contribution converts to paid work — bounties, mentorship, freelance engagements.

**Guild collaboration.** Team-based learning and competition that turns solitary study into collective progress.

**Web3 credential ownership.** Credentials that are verifiable by anyone, anywhere, without the platform's permission.

### 4.3 Objective Prioritization for MVP

Not all objectives ship at once. The MVP prioritizes the spine of the loop — Learn, Build, Contribute, Earn Reputation — with a constrained Skill Coin economy and read-mostly blockchain anchoring. Mentorship marketplace, guild competitions, and the full AI suite are staged into V1 and V2. Section 33 defines the precise MVP scope and Section 34 the staging.

---

## 5. Glossary and Core Concepts

A shared vocabulary prevents expensive ambiguity. The following terms have precise meanings throughout Ascendra documentation and code.

| Term | Definition |
|---|---|
| **Contribution** | Any validated act that creates value for another user or the community: an accepted answer, an approved project review, a completed mentorship session, a published article, a validated spam report, or a completed bounty. Contributions are the *only* source of Skill Coins and the primary source of Reputation. |
| **Consumption** | Any act of learning for one's own benefit: completing a lesson, finishing a project, passing a quiz. Consumption earns XP but never Skill Coins. |
| **XP (Experience Points)** | A non-transferable, non-withdrawable progression currency. Measures activity and learning. Drives levels, unlocks, and rankings. |
| **Reputation** | A non-transferable, earned-only trust score. Gates roles and privileges (e.g., mentor eligibility, governance). Cannot be bought, transferred, or withdrawn. |
| **Skill Coin** | A tradable, withdrawable, blockchain-compatible currency. Minted only by validated contribution. Spent on bounties, mentorship, rewards, and the marketplace. |
| **Guild** | A team of users who learn, compete, and collaborate together. Guilds have rankings, events, and shared goals. |
| **Bounty** | A funded task posted by a user or the platform. Completing a bounty pays Skill Coins. |
| **Role** | A named bundle of capabilities (Guest, Learner, Builder, Mentor, Expert, Instructor, Moderator, Administrator). Roles are partly earned (via reputation) and partly assigned (via moderation/admin). |
| **Achievement NFT** | An on-chain, non-transferable token representing a meaningful accomplishment, owned by the user's wallet. |
| **Reputation Proof** | An on-chain attestation of a user's reputation tier at a point in time, enabling third-party verification. |
| **Contribution Event** | An immutable, append-only record describing a single contribution, its validator, and the rewards it generated. The atomic unit of the economy's audit trail. |
| **Validator** | The human or automated process that confirms a contribution is genuine (e.g., the asker who accepts an answer, the reviewer panel that approves a project review, the system that confirms a mentorship session occurred). |
| **Idempotency Key** | A unique token attached to economy-affecting operations to guarantee that retries never double-mint, double-spend, or double-award. |
| **Ledger** | An append-only, balance-deriving record. Ascendra maintains separate logical ledgers for XP, Reputation, and Skill Coins. |

### 5.1 The Three-Currency Mental Model

The single most important concept in Ascendra is the strict separation of three currencies with three different purposes and three different rule sets:

- **XP answers "how active and far along am I?"** It is cheap to earn, never leaves the system, and exists to motivate and to surface progress.
- **Reputation answers "how much should others trust me?"** It is earned only through contribution, can be lost through misconduct, and cannot be bought at any price.
- **Skill Coins answer "what value have I created that I can exchange?"** They are real, tradable value, minted scarcely and only against validated contribution.

Conflating these is the most common way reward economies fail. Ascendra keeps them in separate ledgers with separate invariants, and any feature that touches more than one must respect each currency's rules independently.

---

## 6. Architectural Goals and Quality Attributes

Before describing the system, this section names the quality attributes the architecture is optimized for, in priority order. When two goals conflict, the higher-priority one wins; these priorities are themselves an architectural decision.

| Priority | Quality Attribute | What It Means for Ascendra | Primary Tactics |
|---|---|---|---|
| 1 | **Economic Integrity** | Currencies are never double-minted, double-spent, or fabricated; balances always reconcile; the audit trail is complete. | Append-only ledgers, idempotency keys, transactional outbox, reconciliation jobs, separation of mint authority. |
| 2 | **Security & Abuse Resistance** | The platform resists fraud, account takeover, content abuse, and economic gaming. | Defense in depth, least privilege, anomaly detection, rate limiting, human-in-the-loop validation. |
| 3 | **Availability** | Learning and contribution surfaces stay up; the economy degrades gracefully rather than corrupting. | Stateless services, horizontal scaling, circuit breakers, queue-based decoupling, graceful degradation. |
| 4 | **Scalability** | The same architecture serves 1K and scales toward 1M+ users without a rewrite. | Microservices, partitioned data, caching, async processing, read replicas. |
| 5 | **Performance** | Interactive surfaces feel instant; expensive work happens asynchronously. | Edge caching, Redis, Elasticsearch for search, CDN for assets, background jobs. |
| 6 | **Evolvability** | Teams ship independently; boundaries change without cascading rewrites. | Clear service contracts, versioned APIs, event-driven decoupling, anti-corruption layers. |
| 7 | **Observability** | Operators can see, explain, and debug any economic or system event. | Structured logs, distributed tracing, metrics, audit dashboards, correlation IDs. |
| 8 | **Cost Efficiency** | Free education is sustainable; spend scales with revenue, not vanity. | Autoscaling, tiered storage, AI cost controls, judicious managed services. |

The ordering is deliberate and occasionally counterintuitive. **Economic integrity outranks availability**: if forced to choose, Ascendra would rather reject an economy operation than risk minting value incorrectly. A user can be told "try again in a moment"; a corrupted ledger is far more damaging and far harder to repair. This single priority decision propagates into many later design choices.

---

## 7. System Architecture Overview

Ascendra is a cloud-native, service-oriented system with a clear separation between a thin presentation tier, an aggregating gateway, a set of bounded-context microservices, a polyglot persistence layer, and a perimeter of external integrations. The blockchain and AI subsystems are treated as specialized service domains rather than as bolt-ons.

### 7.1 Layered View

```
┌──────────────────────────────────────────────────────────────────┐
│                          CLIENT TIER                               │
│   Web (Next.js / TypeScript / Tailwind / shadcn/ui)               │
│   State: React Query (server cache) + Zustand (UI state)          │
│   Future: Mobile (React Native), PWA offline support              │
└───────────────────────────────┬──────────────────────────────────┘
                                 │  HTTPS / JSON / WebSocket
┌───────────────────────────────▼──────────────────────────────────┐
│                      EDGE & API GATEWAY                            │
│   CDN + WAF + TLS termination + rate limiting                     │
│   API Gateway / BFF (FastAPI): auth, routing, aggregation,        │
│   request validation, response shaping, idempotency enforcement   │
└───────────────────────────────┬──────────────────────────────────┘
                                 │  internal RPC + async events
┌───────────────────────────────▼──────────────────────────────────┐
│                         MICROSERVICES                             │
│  Authentication │ Learning │ Assessment │ Community │ Guild       │
│  Mentor │ Marketplace │ Payment │ Blockchain │ AI │ Notification  │
│  Analytics                                                        │
│                                                                   │
│  Cross-cutting: Economy Core (XP / Reputation / Skill Coin        │
│  ledgers) is owned jointly and accessed through strict contracts. │
└───────────────────────────────┬──────────────────────────────────┘
                                 │
┌───────────────────────────────▼──────────────────────────────────┐
│                         STORAGE LAYER                             │
│   PostgreSQL (system of record)  │  Redis (cache / queues / locks)│
│   Elasticsearch (search / feeds) │  Cloudflare R2 (object store)  │
└───────────────────────────────┬──────────────────────────────────┘
                                 │
┌───────────────────────────────▼──────────────────────────────────┐
│                      EXTERNAL SERVICES                            │
│   OpenAI / Azure OpenAI (LLM)   │  Judge0 (code execution)        │
│   Aptos (blockchain)            │  Stripe / GCash / Maya (payment)│
└──────────────────────────────────────────────────────────────────┘
```

### 7.2 Request Lifecycle (Representative Flow)

To make the layering concrete, consider what happens when a learner submits a project for assessment:

1. The **client** sends an authenticated request to the **API Gateway**, including a JWT access token and an idempotency key for the submission.
2. The **Gateway** validates the token, applies rate limits, validates the request body, and routes to the **Assessment Service**.
3. The **Assessment Service** persists the submission in PostgreSQL, places the code in object storage (R2), and dispatches an execution job to **Judge0** through a queue.
4. When execution completes, Judge0 results are recorded; if the project passes, the Assessment Service emits a `project.completed` event.
5. The **Learning Service** consumes the event and awards XP via the **Economy Core** (XP ledger), using the original idempotency key to prevent duplicate awards.
6. If the completion also qualifies as a contribution (e.g., the project is published for others), a `contribution.created` event is emitted; the Economy Core evaluates it for Reputation and, if validated, Skill Coins.
7. The **Notification Service** informs the user; the **Analytics Service** records the funnel event; the **Blockchain Service** may queue an achievement anchor if a milestone was crossed.

This single example touches seven services and three ledgers, and it illustrates why economic integrity and idempotency are the top architectural concerns: the same logical action fans out into multiple reward-bearing side effects that must each happen exactly once.

### 7.3 Synchronous vs Asynchronous Boundaries

Ascendra draws a firm line between operations that must be synchronous (the user is waiting and needs an answer now) and operations that should be asynchronous (the user does not need to wait, and decoupling improves resilience). Reads and validations are synchronous. Reward fan-out, blockchain anchoring, notifications, analytics, and AI generation are asynchronous. This boundary is what allows the interactive experience to stay fast while the economy and integrations do heavier work in the background.

---

## 8. Architectural Principles and Patterns

These principles govern how services are designed and how they interact. They are binding defaults: a team may deviate, but deviation requires explicit justification recorded in an architecture decision record.

### 8.1 Bounded Contexts and Service Ownership

Each microservice owns a bounded context with a single, coherent responsibility and its own data. **No service reaches directly into another service's database.** Cross-context data is obtained through APIs or events. This rule is the backbone of independent evolvability; violating it recreates a distributed monolith with all the coupling of a monolith and all the latency of a network.

### 8.2 Database-per-Service

Every service owns its schema. Shared tables are forbidden. Where two contexts need the same logical entity (e.g., a `user`), each keeps the subset it needs, kept consistent through events. This trades some duplication for strong decoupling — a trade Ascendra accepts.

### 8.3 Event-Driven Choreography for Side Effects

Reward fan-out, notifications, indexing, analytics, and blockchain anchoring are driven by domain events rather than synchronous calls. A service that completes a meaningful action emits an event; interested services react. This decouples producers from consumers and lets the system absorb load spikes by buffering work in queues.

### 8.4 Transactional Outbox

Because a service must often both update its own database and emit an event, and because doing those in two systems risks inconsistency, Ascendra uses the **transactional outbox** pattern. The event is written to an outbox table in the *same* database transaction as the state change; a relay process then publishes outbox rows to the message bus. This guarantees that an event is emitted if and only if the state change committed.

### 8.5 Idempotency Everywhere It Matters

Every economy-affecting and externally-visible mutating operation accepts an idempotency key. The same key always yields the same effect exactly once, no matter how many times a client or queue retries. This is the single most important defense against double-minting and double-spending in a distributed system where retries are inevitable.

### 8.6 Sagas for Multi-Service Transactions

Operations that span services (e.g., spending Skill Coins on a marketplace purchase, which touches Payment, Marketplace, and the Skill Coin ledger) are coordinated as **sagas**: a sequence of local transactions with compensating actions for rollback. Ascendra favors choreographed sagas for simple flows and orchestrated sagas (a coordinator service) for complex, multi-step economic flows where a clear audit trail is required.

### 8.7 CQRS Where Read and Write Shapes Diverge

For domains where the write model and the read model differ sharply — feeds, leaderboards, search — Ascendra separates commands from queries. Writes update the system of record; read models are projected into Redis or Elasticsearch optimized for the query pattern. This keeps hot read paths fast without contorting the write model.

### 8.8 Stateless Services, Externalized State

Services hold no session state in memory. All state lives in PostgreSQL, Redis, or object storage. This makes services horizontally scalable and disposable — any instance can serve any request, and instances can be added or killed freely.

### 8.9 API Versioning and Backward Compatibility

Public and internal APIs are versioned. Breaking changes ship behind a new version; old versions are deprecated on a published schedule. Consumers are never broken by an unannounced change.

### 8.10 Fail Safe, Degrade Gracefully

When a dependency is unavailable, services degrade rather than corrupt. The economy in particular **fails closed**: if the ledger cannot be safely written, the operation is rejected and retried later, never approximated. Learning surfaces, by contrast, **fail open** where safe: if recommendations are down, the catalog still serves.

### 8.11 Twelve-Factor Alignment

Configuration is externalized to environment, dependencies are declared explicitly, builds and runs are separated, and logs are treated as event streams. This alignment keeps services portable across environments and friendly to container orchestration.

---

## 9. Technology Stack and Rationale

The stack inherits the founding document's choices and records *why* each was selected, since a foundation document must justify load-bearing decisions, not merely list them.

### 9.1 Frontend

| Technology | Role | Rationale |
|---|---|---|
| **Next.js** | React framework | Server-side rendering and static generation for fast first paint and SEO on public content; file-based routing; mature ecosystem; edge-friendly. |
| **TypeScript** | Language | Type safety across a large, multi-team codebase; fewer runtime errors; better refactoring. |
| **Tailwind CSS** | Styling | Utility-first speed; consistent design tokens; small production CSS. |
| **shadcn/ui** | Component primitives | Accessible, unstyled-by-default components the team owns and customizes rather than fights. |
| **React Query** | Server-state cache | Declarative caching, background refetch, and request deduplication for data fetched from the API. |
| **Zustand** | UI state | Lightweight client state for ephemeral UI concerns, kept separate from server state. |

The deliberate split between **React Query (server state)** and **Zustand (UI state)** is a core frontend principle: server-derived data and local interface state have different lifecycles and should never be conflated in one store.

### 9.2 Backend

| Technology | Role | Rationale |
|---|---|---|
| **FastAPI (Python)** | API Gateway and services | High-throughput async I/O; first-class typing and automatic OpenAPI; strong AI/ML ecosystem proximity for the AI services. |
| **PostgreSQL** | System of record | ACID guarantees essential for ledgers; rich indexing; JSONB for flexible fields; mature replication and partitioning. |
| **Redis** | Cache, queues, locks | Sub-millisecond reads for hot paths; pub/sub and streams for lightweight messaging; distributed locks and rate limiting. |
| **Elasticsearch** | Search and feeds | Full-text search over courses, questions, and users; aggregations for leaderboards and discovery. |
| **Cloudflare R2** | Object storage | S3-compatible, zero-egress-fee storage for media, project artifacts, and user uploads — important for cost at scale. |

### 9.3 External Services

| Service | Role | Rationale |
|---|---|---|
| **OpenAI / Azure OpenAI** | LLM provider | Best-in-class generation for AI mentor, reviewer, interviewer; Azure path provides enterprise controls and regional options. |
| **Judge0** | Code execution | Sandboxed, multi-language code execution for automated assessment without building an execution platform in-house. |
| **Aptos** | Blockchain | High-throughput L1 with the Move language, whose resource model is well suited to representing non-transferable credentials and scarce coins safely. |
| **Stripe** | Card payments | Global card processing for premium subscriptions and Skill Coin on-ramps. |
| **GCash / Maya** | Local payment rails | Essential for the Philippine and Southeast Asian market where cards are not the dominant rail. |

### 9.4 Why These Boundaries

The stack is chosen so that **the team builds its differentiators and buys its commodities**. Code execution (Judge0), LLM inference (OpenAI/Azure), payment processing (Stripe/GCash/Maya), and the blockchain L1 (Aptos) are commodities best consumed as services. The contribution economy, the reputation pipeline, the learning engine, and the way these compose are the differentiators, and those are built in-house with full control over data and invariants.

---

## 10. Frontend Architecture

The frontend is a Next.js application organized around feature modules that mirror the platform's functional domains. It is intentionally thin: business rules and economic logic live in services, never in the client. The client's responsibilities are presentation, interaction, optimistic UI, and orchestration of API calls.

### 10.1 Application Structure

The codebase is organized by feature rather than by file type. A `learning` feature folder contains its routes, components, hooks, and API clients together; the same holds for `community`, `guilds`, `marketplace`, `mentor`, and `profile`. Shared primitives (design system components, layout, auth context, the API client) live in a `shared` or `core` layer that features depend on but that depends on nothing feature-specific.

### 10.2 Rendering Strategy

Ascendra uses a mixed rendering strategy chosen per route by access pattern and freshness needs. Public, SEO-relevant pages (course catalog, public profiles, landing) are statically generated or incrementally regenerated for fast loads and discoverability. Authenticated, personalized pages (dashboard, workspace, feeds) are rendered with client-side data fetching against the API. This balances first-paint performance against personalization.

### 10.3 State Management Discipline

Two stores, two purposes. **Server state** — anything fetched from the API — is owned by React Query, which handles caching, staleness, background refetch, and request deduplication. **Client state** — open modals, form drafts, theme, ephemeral selections — is owned by Zustand. The architectural rule is that server data is never copied into Zustand and treated as a source of truth; the API, mediated by React Query, is the source of truth.

### 10.4 Optimistic Updates and the Economy

For responsiveness, certain low-risk actions update the UI optimistically (e.g., upvoting an answer). However, **economy-bearing outcomes are never assumed by the client**. The UI may show "submitting…" but it displays earned XP, Reputation, or Skill Coins only after the server confirms the ledger write. This prevents the dangerous illusion of rewards that did not actually mint.

### 10.5 Real-Time Surfaces

Notifications, live guild events, and presence use WebSocket connections managed through the Gateway. The client subscribes to channels scoped to the authenticated user and joined guilds; the Notification Service pushes events. Real-time is treated as an enhancement layered over a correct request/response baseline, so a dropped socket degrades to polling rather than breaking the experience.

### 10.6 Accessibility and Internationalization

Given the global, inclusive mission, accessibility (semantic markup, keyboard navigation, sufficient contrast, screen-reader support via the shadcn/ui primitives) and internationalization (externalized strings, locale-aware formatting, right-to-left readiness) are designed in from the start rather than retrofitted. Detailed standards live in Part 6.

---

## 11. API Gateway and Backend-for-Frontend

The API Gateway is the single entry point for clients. Built on FastAPI, it is responsible for concerns that should not be duplicated across every service.

### 11.1 Gateway Responsibilities

The Gateway authenticates every request by validating the JWT access token and attaching the resolved identity and roles to the request context. It enforces coarse rate limits per identity and per IP before requests reach services. It validates request shape and rejects malformed input early. It routes to the correct service and, for composite screens, aggregates responses from several services into a single payload the client can consume in one round trip. It enforces idempotency on mutating routes by recording idempotency keys and short-circuiting duplicates. It terminates and propagates correlation IDs so that a single user action can be traced across every downstream hop.

### 11.2 Backend-for-Frontend Pattern

Rather than forcing the web client to make many calls and stitch the results, the Gateway offers BFF endpoints tailored to specific screens. A dashboard request, for example, returns the user's progress, active guild summary, recent notifications, and recommended next steps in one shaped response. This reduces client complexity and round trips, which matters on constrained mobile networks. As mobile clients arrive, additional BFF surfaces can be tailored to their needs without changing the underlying services.

### 11.3 What the Gateway Must Not Do

The Gateway holds no business logic and owns no domain data. It does not compute rewards, mutate ledgers, or make domain decisions. It is a policy-and-composition layer. Keeping it thin prevents it from becoming a hidden monolith through which all logic must flow.

### 11.4 Security at the Edge

In front of the Gateway sits a CDN with a Web Application Firewall, TLS termination, and DDoS protection. Static assets and public, cacheable responses are served from the edge. The WAF filters common attack patterns before traffic reaches application code. This perimeter is the first layer of the defense-in-depth strategy detailed in Section 25.

---

## 12. Microservices Decomposition

Ascendra is composed of twelve services, each owning a bounded context. This section specifies each service's responsibility, the data it owns, the events it emits and consumes, and the key risks it must manage. Detailed API contracts live in Part 3; this is the architectural map.

### 12.1 Authentication Service

**Responsibility.** Identity, credentials, sessions, tokens, and the binding between a platform account and a blockchain wallet. It is the source of truth for *who a user is*, though not for *what they have earned*.

**Owns.** User accounts, credential hashes, OAuth identities, refresh-token records, sessions, wallet bindings, and role assignments at the identity level.

**Key behaviors.** Registration and login (email/password and OAuth), issuance of short-lived JWT access tokens and longer-lived refresh tokens, token rotation and revocation, multi-factor authentication, password reset, and account recovery. It mints the access token whose claims (subject, roles, token version) every other service trusts.

**Emits.** `user.registered`, `user.role_changed`, `wallet.linked`, `account.suspended`.

**Consumes.** `reputation.level_changed` (to update earned roles such as Mentor eligibility), `moderation.action` (to suspend or restrict).

**Risks.** Account takeover, credential stuffing, token theft. Mitigations include rate-limited login, breach-password screening, MFA, refresh-token rotation with reuse detection, and short access-token lifetimes.

### 12.2 Learning Service

**Responsibility.** The curriculum: courses, lessons, quizzes, challenges, learning paths, enrollment, and progress tracking. The home of the "Learn" arc of the core loop.

**Owns.** Course and lesson definitions, quiz banks, path/roadmap structures, enrollments, lesson-completion records, and per-user progress state.

**Key behaviors.** Serving the catalog, tracking lesson and quiz completion, generating and adapting personalized roadmaps (with input from the AI Service), and emitting completion events that drive XP. Critically, **all of its content-access endpoints are free** and never gate on payment.

**Emits.** `lesson.completed`, `quiz.passed`, `course.completed`, `path.progressed`.

**Consumes.** `assessment.passed` (project completions feed learning progress), `ai.roadmap_generated`.

**Risks.** Progress fraud (claiming completions not earned). Mitigated by server-side verification of completion criteria — the client never asserts a completion the server cannot independently confirm.

### 12.3 Assessment Service

**Responsibility.** Evaluating work: quiz grading, automated code assessment via Judge0, and orchestration of human/peer project review. The bridge between "Build" and proof of competence.

**Owns.** Submissions, test definitions and expected outcomes, execution results, rubric definitions, and review records.

**Key behaviors.** Accepting submissions, dispatching code to the Judge0 sandbox, capturing results, applying rubrics, and routing projects to peer/mentor review when human judgment is required. On a passing outcome it emits events that trigger XP and, when the work is contributed (e.g., a published, reviewable project), reputation and Skill Coin evaluation.

**Emits.** `assessment.passed`, `assessment.failed`, `review.requested`, `review.completed`.

**Consumes.** `submission.created`, `review.assigned`.

**Risks.** Sandbox escape and resource abuse during code execution; collusion in peer review. Mitigated by isolating execution in Judge0 with strict resource and network limits, and by reviewer reputation weighting and anti-collusion checks.

### 12.4 Community Service

**Responsibility.** The contribution surfaces: questions and answers, discussions, peer reviews of community content, and the knowledge base. This is where most contribution — and therefore most Reputation and many Skill Coins — originates.

**Owns.** Questions, answers, comments, discussion threads, votes, acceptance records, knowledge-base articles, and spam/abuse reports.

**Key behaviors.** Posting and answering questions, accepting answers, voting, publishing articles, and reporting spam. When an answer is accepted, an article is published, or a spam report is validated, it emits contribution events that the Economy Core evaluates for Reputation and Skill Coins.

**Emits.** `answer.accepted`, `article.published`, `spam_report.validated`, `content.flagged`.

**Consumes.** `moderation.action`, `reputation.level_changed` (to surface badges/standing).

**Risks.** Sockpuppet acceptance rings, low-quality answer spam, and reputation farming. Mitigated by the contribution-validation pipeline (Section 17.4), rate limits, and anomaly detection on acceptance and voting patterns.

### 12.5 Guild Service

**Responsibility.** Teams, competitions, rankings, and collaboration. Converts solitary learning into collective progress.

**Owns.** Guilds, memberships and roles within guilds, guild events and competitions, scores, and guild-level rankings.

**Key behaviors.** Creating and joining guilds, running events and competitions, computing standings, and distributing event rewards (including Skill Coins to event winners). It coordinates with the Economy Core to award the defined Guild Event Winner reward.

**Emits.** `guild.created`, `guild.event_started`, `guild.event_won`, `guild.ranking_updated`.

**Consumes.** `user.activity` signals used in scoring, `reputation.level_changed`.

**Risks.** Collusive competition farming. Mitigated by event integrity checks, reward caps, and anomaly detection on win patterns.

### 12.6 Mentor Service

**Responsibility.** The mentorship marketplace: matching, scheduling, sessions, and mentorship-specific rewards. Activates the "Become Mentor → Earn Skill Coins" arc.

**Owns.** Mentor profiles and availability, mentorship requests and matches, scheduled and completed sessions, and session feedback.

**Key behaviors.** Enforcing mentor eligibility (a reputation-gated role), matching learners to mentors, scheduling, confirming session completion, and triggering the mentorship reward (Reputation for a completed session and a Skill Coin payout in the defined range). Eligibility is enforced by consuming reputation-level events from the Economy Core, never by self-assertion.

**Emits.** `mentorship.requested`, `mentorship.session_completed`, `mentorship.feedback_submitted`.

**Consumes.** `reputation.level_changed` (gates Mentor role), `payment.settled` (for paid sessions).

**Risks.** Fake sessions to farm rewards. Mitigated by two-sided confirmation, feedback requirements, payout ranges tied to verified session attributes, and anomaly detection.

### 12.7 Marketplace Service

**Responsibility.** Portfolios, bounties, and freelance opportunities — the venue where contribution converts to paid work.

**Owns.** Portfolios, bounty postings and their funding/escrow state, applications and assignments, deliverables, and opportunity listings.

**Key behaviors.** Publishing portfolios, posting and funding bounties (Skill Coins held in escrow), assigning and completing bounties, and releasing escrowed Skill Coins on validated completion. Bounty completion is a contribution event with a variable Skill Coin reward.

**Emits.** `bounty.posted`, `bounty.assigned`, `bounty.completed`, `portfolio.published`.

**Consumes.** `skillcoin.escrow_held`, `skillcoin.escrow_released`, `review.completed`.

**Risks.** Non-delivery, disputes, and escrow abuse. Mitigated by escrow, milestone release, dispute resolution workflows, and reputation effects of dispute outcomes.

### 12.8 Payment Service

**Responsibility.** Fiat money movement: premium subscriptions, Skill Coin on-ramps/off-ramps, and integration with Stripe, GCash, and Maya. It is the boundary between the platform economy and the outside financial world.

**Owns.** Payment intents, transactions, subscription state, payout records, and provider reconciliation data. It explicitly does **not** own the Skill Coin ledger; it interacts with it through contracts.

**Key behaviors.** Processing subscription payments, handling Skill Coin purchase/withdrawal flows, reconciling with providers, and emitting settlement events. Withdrawals of Skill Coins to fiat are subject to compliance checks (Section 26).

**Emits.** `payment.settled`, `payment.failed`, `subscription.changed`, `withdrawal.completed`.

**Consumes.** `skillcoin.withdrawal_requested`.

**Risks.** Fraud, chargebacks, money-laundering exposure on withdrawals. Mitigated by provider risk tooling, KYC/AML on withdrawal paths, velocity limits, and clear separation from the on-platform ledger.

### 12.9 Blockchain Service

**Responsibility.** Anchoring achievements, reputation proofs, and Skill Coins on Aptos, and indexing on-chain state back into fast off-chain reads.

**Owns.** Wallet/account associations (mirrored from Auth), minting/anchoring job state, transaction submission and confirmation tracking, and an off-chain index of on-chain records.

**Key behaviors.** Minting Achievement NFTs, writing Reputation Proofs, and reflecting Skill Coin mint/burn on-chain, all asynchronously and idempotently. Because chains are eventually consistent and occasionally congested, it treats anchoring as a reliable background job with retries, never as a blocking step in the user's path.

**Emits.** `achievement.anchored`, `reputation_proof.written`, `skillcoin.onchain_settled`.

**Consumes.** `achievement.earned`, `reputation.level_changed`, `skillcoin.minted`, `skillcoin.burned`.

**Risks.** Chain congestion, key management, and reorg handling. Mitigated by an outbox-driven job queue, hardware-backed key custody, confirmation-depth waits, and reconciliation between ledger and chain.

### 12.10 AI Service

**Responsibility.** The AI ecosystem: AI Mentor, AI Coach, AI Reviewer, and AI Interviewer, plus roadmap personalization. A routing-and-guardrails layer over OpenAI/Azure OpenAI.

**Owns.** Prompt templates, conversation context windows, model-routing policy, evaluation results, and AI cost/usage accounting. It owns no economic authority.

**Key behaviors.** Generating mentorship guidance, code review feedback, mock interviews, and personalized roadmaps. It enforces guardrails (safety, scope, and the rule that AI never gates free fundamentals), routes requests to the cost-appropriate model, and caches where possible.

**Emits.** `ai.review_generated`, `ai.roadmap_generated`, `ai.interview_completed`.

**Consumes.** `submission.created` (for AI review), `user.goal_set` (for roadmaps).

**Risks.** Cost blowout, hallucination, prompt injection, and over-reliance. Mitigated by per-user budgets, model routing, output validation, retrieval grounding, and clear "AI-assisted" labeling.

### 12.11 Notification Service

**Responsibility.** Delivering the right message on the right channel: in-app, email, and push, plus real-time WebSocket events.

**Owns.** Notification templates, per-user channel preferences, delivery records, and the real-time fan-out fabric.

**Key behaviors.** Subscribing to domain events, applying user preferences and batching rules, and delivering notifications across channels with deduplication and quiet-hours respect.

**Emits.** `notification.sent`, `notification.failed`.

**Consumes.** A broad set of domain events from every service (e.g., `answer.accepted`, `mentorship.session_completed`, `bounty.completed`).

**Risks.** Notification fatigue and delivery failures. Mitigated by preference controls, batching/digesting, and per-channel retry with fallback.

### 12.12 Analytics Service

**Responsibility.** Capturing behavioral and economic events for product analytics, funnel measurement, and the MVP success metrics, while respecting privacy.

**Owns.** Event streams, aggregated metrics, cohort definitions, and dashboards' backing data.

**Key behaviors.** Ingesting events, computing the platform's success metrics (completion rate, mentorship participation, guild participation, contribution rate, marketplace transactions), and powering internal dashboards. It is read-optimized and never on the critical write path of the economy.

**Emits.** Aggregated metric snapshots; alerts on metric thresholds.

**Consumes.** Effectively all domain events, sampled or full depending on type.

**Risks.** Privacy leakage and metric distortion. Mitigated by data minimization, pseudonymization, and clear separation between operational ledgers and analytical copies.

### 12.13 The Economy Core

The three ledgers (XP, Reputation, Skill Coin) are the system's crown jewels and are described as a distinct architectural concern rather than folded into any single service. Logically, the Economy Core exposes a narrow, strongly-guarded contract: *award XP*, *adjust Reputation*, *mint/burn/transfer Skill Coins*, and *read balances/history*, each idempotent and append-only. Physically, it may be implemented as one service or a small cluster, but its authority is never diffused into the surface services that merely *request* economic operations by emitting validated contribution events. Section 17 specifies its rules in full.

---

## 13. Inter-Service Communication

Services interact through two channels with deliberately different roles.

### 13.1 Synchronous Communication

For request/response interactions where the caller needs an immediate answer — fetching a profile, validating a permission, reading a balance — services call each other over internal HTTP/JSON (or gRPC where strict contracts and performance justify it). Synchronous calls are kept shallow: a request should fan out to as few synchronous downstream calls as possible, because each adds latency and a failure mode. Deep synchronous call chains are an anti-pattern and are refactored toward events.

### 13.2 Asynchronous Communication

For side effects, fan-out, and anything the caller does not need to wait for, services communicate through a message bus carrying domain events. The producer emits an event and moves on; consumers process independently. This is the default for reward fan-out, notifications, indexing, analytics, and blockchain anchoring. Asynchronous messaging is what lets the system stay responsive and absorb spikes.

### 13.3 Event Schema and Governance

Every event has a versioned schema, a stable type name, a correlation ID, an idempotency key where relevant, a timestamp, and a producer identifier. Schemas are governed in a shared registry so that producers cannot silently break consumers. Events are designed to be **self-contained enough** that common consumers do not need a synchronous callback to act, while avoiding bloating events with data that will go stale.

### 13.4 Delivery Semantics

The bus provides at-least-once delivery. Because a message may therefore be delivered more than once, **every consumer is idempotent**: processing the same event twice produces the same result as processing it once. This is enforced through idempotency keys and dedup tables, and it is the asynchronous counterpart to the synchronous idempotency rule. Ordering is guaranteed only within a partition key (typically the user or entity ID), which is sufficient for the platform's needs.

### 13.5 Failure Handling

Failed message processing is retried with backoff. Messages that exhaust retries land in a dead-letter queue for inspection and manual or automated replay. Critically, a failure in a non-critical consumer (e.g., analytics) never blocks a critical one (e.g., the ledger). Consumers are isolated so that one slow or failing subscriber does not stall the others.

### 13.6 The Anti-Corruption Layer

When a service integrates an external system (Judge0, OpenAI, Aptos, payment providers), it wraps that system behind an anti-corruption layer that translates the external model into the platform's own model. This keeps external API quirks and breaking changes contained within one adapter rather than leaking across the codebase.

---

## 14. Functional Modules

The twelve services compose into seven user-facing functional modules. Modules are how product and users think about Ascendra; services are how engineering builds it. This section expands the founding document's module definitions into architectural responsibilities, mapping each module to its backing services.

### 14.1 Module 1 — Learning Engine

**User-facing purpose.** Free, structured, project-based learning: courses, lessons, quizzes, challenges, and projects, organized into personalized paths.

**Backing services.** Learning Service (curriculum and progress), Assessment Service (quiz grading and project assessment), AI Service (personalized roadmaps and coaching).

**Architectural responsibilities.** Serve the catalog with fast, cacheable reads; track progress server-side with fraud-resistant completion verification; adapt roadmaps using performance signals; and emit the completion events that drive XP. The Learning Engine is the top of the funnel and must scale read-heavy and stay free.

**Key flows.** Enroll → consume lesson → pass quiz → complete project → earn XP → progress path. Each step is server-verified before any reward is granted.

### 14.2 Module 2 — Contribution Network

**User-facing purpose.** Question-and-answer, peer reviews, discussions, and a community knowledge base — the surfaces where users create value for one another.

**Backing services.** Community Service (Q&A, discussions, knowledge base), Assessment Service (review orchestration), Economy Core (Reputation and Skill Coin rewards).

**Architectural responsibilities.** Capture contributions, route them through the validation pipeline, and convert validated contributions into Reputation and Skill Coins. The Contribution Network is the heart of the economy: it is where most non-financial value enters the system, so its anti-abuse posture is paramount.

**Key flows.** Ask → answer → accept → reward; write article → publish → reward; report spam → validate → reward.

### 14.3 Module 3 — Guild System

**User-facing purpose.** Teams, competitions, rankings, and collaboration that make learning social and motivating.

**Backing services.** Guild Service (teams, events, rankings), Analytics Service (scoring inputs), Economy Core (event rewards).

**Architectural responsibilities.** Manage team lifecycle, run fair competitions with integrity checks, compute rankings efficiently (a CQRS read model), and award Skill Coins to event winners within defined caps.

**Key flows.** Form guild → join event → compete → rank → winners earn Skill Coins.

### 14.4 Module 4 — Mentor Marketplace

**User-facing purpose.** Connect learners with mentors for mentorship, coaching, reviews, and tutoring.

**Backing services.** Mentor Service (matching, scheduling, sessions), Payment Service (paid sessions), Economy Core (Reputation and Skill Coin rewards), AI Service (AI mentor augmentation).

**Architectural responsibilities.** Enforce reputation-gated mentor eligibility, match supply and demand, manage scheduling and session lifecycle, and reward completed sessions. Distinguishes free peer mentorship (reputation-rewarded) from paid mentorship (fiat- or Skill-Coin-settled).

**Key flows.** Request mentorship → match → schedule → session → confirm → reward.

### 14.5 Module 5 — Project Marketplace

**User-facing purpose.** Portfolios, bounties, and freelance opportunities — the bridge from skill to income.

**Backing services.** Marketplace Service (portfolios, bounties, opportunities), Payment Service (fiat flows), Economy Core (Skill Coin escrow and payout), Blockchain Service (portfolio credential anchoring).

**Architectural responsibilities.** Publish verifiable portfolios, manage bounty funding and escrow, handle assignment and delivery, resolve disputes, and release rewards on validated completion. This module turns the platform's reputation and credential signals into real economic opportunity.

**Key flows.** Publish portfolio → post/fund bounty → assign → deliver → validate → release escrow.

### 14.6 Module 6 — AI Ecosystem

**User-facing purpose.** AI Mentor, AI Coach, AI Reviewer, and AI Interviewer — always-available augmentation that accelerates learning and contribution.

**Backing services.** AI Service (all AI personas and routing), Assessment Service (AI-assisted review), Learning Service (roadmaps).

**Architectural responsibilities.** Provide low-latency, cost-controlled, safe AI assistance; ground outputs in platform content; label AI assistance transparently; and ensure AI augments rather than gates free fundamentals. Detailed in Section 24.

**Key flows.** Ask AI mentor → grounded response; submit code → AI review feedback; request mock interview → AI interviewer → feedback report.

### 14.7 Module 7 — Blockchain Layer

**User-facing purpose.** Achievement NFTs, Reputation Proofs, and Skill Coins — user-owned, verifiable, portable records of accomplishment and value.

**Backing services.** Blockchain Service (anchoring and indexing), Economy Core (the off-chain authoritative ledgers it mirrors), Auth Service (wallet binding).

**Architectural responsibilities.** Anchor meaningful records on Aptos asynchronously and idempotently; maintain an off-chain index for fast reads; reconcile chain and ledger; and uphold the non-transferability of Reputation and Achievements on-chain. Detailed in Section 23.

**Key flows.** Earn achievement → anchor NFT; cross reputation tier → write proof; mint/burn Skill Coin → settle on-chain.

### 14.8 Module-to-Service Matrix

| Module | Primary Services | Supporting Services |
|---|---|---|
| Learning Engine | Learning, Assessment | AI, Notification, Analytics |
| Contribution Network | Community | Assessment, Economy Core, Notification, Analytics |
| Guild System | Guild | Economy Core, Analytics, Notification |
| Mentor Marketplace | Mentor | Payment, Economy Core, AI, Notification |
| Project Marketplace | Marketplace | Payment, Economy Core, Blockchain, Notification |
| AI Ecosystem | AI | Learning, Assessment |
| Blockchain Layer | Blockchain | Economy Core, Auth |

This matrix is a coordination map: a change to the Economy Core touches five modules, so its contract must be among the most stable in the system, while a change confined to the AI Service touches mainly two and can evolve faster.

---

## 15. Data Architecture and Storage Layer

Ascendra uses polyglot persistence: each storage technology is applied where its strengths fit, rather than forcing every workload into one database. This section defines what lives where and why. Detailed schemas are the subject of Part 2; here we establish ownership, patterns, and the rules that protect economic integrity.

### 15.1 Storage Technology Roles

**PostgreSQL — the system of record.** All authoritative, transactional state lives in PostgreSQL: accounts, courses, submissions, contributions, and above all the three economy ledgers. PostgreSQL is chosen for ledgers specifically because the economy demands ACID transactions, strong constraints, and reliable durability. Each service owns its own logical database/schema; there is no shared cross-service schema.

**Redis — speed and coordination.** Redis serves hot reads (cached profiles, session data, leaderboards), provides distributed locks (for guarding critical sections like escrow release), backs rate limiting, and carries lightweight queues and pub/sub. Redis holds nothing that cannot be reconstructed from the system of record; it is a performance and coordination layer, never the source of truth for durable economic state.

**Elasticsearch — search and discovery.** Full-text search across courses, questions, articles, and users, plus the aggregations behind feeds, discovery, and some leaderboards, are served by Elasticsearch. It is a derived read model populated from PostgreSQL via events, never written to directly as a source of truth.

**Cloudflare R2 — object storage.** Media (videos, images), project artifacts, user uploads, and generated assets live in R2, which is S3-compatible and avoids egress fees that would otherwise punish a media-heavy, global platform. PostgreSQL stores references and metadata; the bytes live in R2.

### 15.2 The Ledger Data Model (Principles)

The three ledgers share a common design discipline, even though each has currency-specific rules.

Every ledger is **append-only**: balances are derived from an immutable sequence of entries, not stored as a mutable number that is overwritten. An XP award, a reputation adjustment, or a Skill Coin mint is a new row, never an update to a running total. This gives a complete, tamper-evident audit trail and makes reconciliation straightforward.

Every economy-affecting entry carries an **idempotency key** tied to its originating event, so that a retried event cannot create a second entry. The combination of append-only entries and idempotency keys is what makes the economy safe under the at-least-once delivery and inevitable retries of a distributed system.

Balances are **materialized for reads** (a cached current balance per user per currency, kept in PostgreSQL and mirrored in Redis) but always **reconcilable** by replaying entries. A periodic reconciliation job recomputes balances from the entry log and alerts on any drift, catching bugs before they compound.

**Mint authority is separated** from spend surfaces. The services that detect contributions (Community, Mentor, Guild, Marketplace) do not themselves write to the Skill Coin ledger; they emit validated contribution events, and only the Economy Core, through its narrow contract, mints. This separation means a bug or compromise in a surface service cannot directly fabricate currency.

### 15.3 Data Domain Map (High Level)

| Domain | Owning Service | Primary Store | Notable Derived Stores |
|---|---|---|---|
| Identity & roles | Authentication | PostgreSQL | Redis (sessions) |
| Curriculum & progress | Learning | PostgreSQL | Elasticsearch (catalog search), Redis (progress cache) |
| Submissions & reviews | Assessment | PostgreSQL | R2 (artifacts) |
| Q&A, articles, reports | Community | PostgreSQL | Elasticsearch (search/feeds) |
| Guilds & events | Guild | PostgreSQL | Redis/Elasticsearch (rankings) |
| Mentorship | Mentor | PostgreSQL | Redis (availability cache) |
| Portfolios & bounties | Marketplace | PostgreSQL | Elasticsearch (discovery), R2 (deliverables) |
| Payments & subscriptions | Payment | PostgreSQL | — |
| On-chain index | Blockchain | PostgreSQL | Redis (read cache) |
| AI context & usage | AI | PostgreSQL | Redis (context/cost) |
| Notifications | Notification | PostgreSQL | Redis (real-time fan-out) |
| Analytics events | Analytics | Append-optimized store / warehouse | Dashboards |
| **XP / Reputation / Skill Coin ledgers** | **Economy Core** | **PostgreSQL (authoritative)** | **Redis (balance cache), Blockchain (mirror)** |

### 15.4 Consistency Model

Ascendra is **strongly consistent where it must be and eventually consistent where it can be**. Within a single service's database, operations are transactional. Across services, consistency is eventual and reconciled through events. The economy ledgers are the strict exception to eventual consistency tolerance: a Skill Coin spend and the corresponding balance decrement happen in one transaction, and cross-service economic flows (like marketplace escrow) use sagas with compensations to preserve invariants even though they span services.

### 15.5 Data Lifecycle, Partitioning, and Retention

High-volume tables (ledger entries, analytics events, notifications) are partitioned by time and/or user to keep indexes and queries efficient at scale. Cold data is moved to cheaper storage tiers on a retention schedule, with ledger entries retained for the long horizons that auditability and on-chain reconciliation require. Personal data retention follows the privacy policy in Section 26, including deletion and export workflows. Migrations are versioned and applied through a controlled pipeline (Part 7), with backward-compatible, expand-then-contract changes preferred so deploys never require downtime.

### 15.6 Backup and Recovery

PostgreSQL is continuously backed up with point-in-time recovery. Object storage is versioned. Recovery objectives — how much data the platform can afford to lose (RPO) and how quickly it must recover (RTO) — are defined per data class, with the economy ledgers held to the strictest objectives. The economy's append-only design materially aids recovery: replaying entries reconstructs balances deterministically.

---

## 16. User Roles and Access Control

Ascendra's roles are a hybrid of *earned standing* and *assigned authority*, which makes its access-control model richer than a simple static role list. This section defines the roles, how they are obtained, and how the system enforces them.

### 16.1 The Role Ladder

| Role | How Obtained | Core Capabilities |
|---|---|---|
| **Guest** | Default, unauthenticated | Browse public content (catalog, public profiles, public discussions). |
| **Learner** | Register an account | Access all courses, build projects, join guilds, ask questions, earn XP. |
| **Builder** | Demonstrate building (publish projects / enter competitions) | Publish projects, enter competitions, in addition to Learner capabilities. |
| **Mentor** | Reach the reputation threshold (Level 4, 1,000 Reputation) | Review projects, teach learners, conduct mentorship sessions, earn mentorship rewards. |
| **Expert** | Reach the expert reputation tier (Level 5, 5,000 Reputation) | Create advanced content, lead guilds, in addition to Mentor capabilities. |
| **Instructor** | Qualification + approval | Offer paid services (paid courses, paid mentorship), subject to platform terms. |
| **Moderator** | Assigned by administrators | Manage community content, action reports, enforce conduct rules. |
| **Administrator** | Assigned (highest authority) | Manage the platform, configure economy parameters, manage roles. |

### 16.2 Earned vs Assigned Roles

The distinction matters architecturally. **Earned roles** (Builder, Mentor, Expert) are granted automatically by the system when a user crosses a behavioral or reputation threshold; the Economy Core emits a level-change event, and the Authentication Service updates the user's effective roles. These cannot be granted by favor or purchased — consistent with the principle that trust is earned. **Assigned roles** (Instructor, Moderator, Administrator) require an explicit administrative action and an audit record, because they confer authority over others rather than merely reflecting personal accomplishment.

This hybrid means the role system is partly a *function of the economy*: reputation is not just a score, it is the key that unlocks the platform's most valuable roles. It also means the reputation pipeline's integrity is a security concern, not just a gamification concern — gaming reputation would mean gaming access.

### 16.3 Permission Model

Capabilities are expressed as fine-grained permissions (e.g., `project.publish`, `review.approve`, `mentorship.conduct`, `content.moderate`, `economy.configure`). Roles are bundles of permissions. The Gateway and services authorize each action against the user's effective permissions, derived from their roles, rather than checking role names directly. This indirection lets the platform adjust what a role can do without rewriting authorization checks throughout the codebase.

### 16.4 Enforcement Points

Authorization is enforced in depth. The Gateway performs coarse checks (is this user authenticated; does the token carry a role that could possibly perform this). Each service performs the authoritative fine-grained check against the specific resource and permission, because only the owning service knows the full context (e.g., that a user may review *this* project but not *that* one). Economy-affecting actions carry an additional layer: even an authorized user cannot, for instance, mint Skill Coins directly — the action must flow through a validated contribution event.

### 16.5 Role Transitions and Loss

Roles can be lost as well as gained. Reputation loss from misconduct (spam, abuse, plagiarism) can drop a user below a threshold and revoke an earned role; moderation actions can suspend assigned roles or restrict accounts. Every transition is an auditable event, and downstream services react (e.g., revoking Mentor capability immediately removes the ability to start new mentorship sessions).

---

## 17. The Core Economy

The economy is Ascendra's most consequential subsystem and the one whose correctness matters most. It comprises three currencies with strictly separated purposes, rules, and ledgers. This section establishes the economy's invariants and validation pipeline; the three sections that follow specify each currency in detail.

### 17.1 The Three Currencies at a Glance

| Currency | Purpose | Transferable | Withdrawable | Source | Lost? |
|---|---|---|---|---|---|
| **XP** | Progression | No | No | Consumption + contribution activity | No |
| **Reputation** | Trust | No | No | Validated contribution only | Yes (misconduct) |
| **Skill Coins** | Value exchange | Yes | Yes | Validated contribution only | Spent / withdrawn |

### 17.2 The Cardinal Rule

> **Learning alone never generates Skill Coins. Only contribution generates Skill Coins.**

This is the economy's defining invariant and the architectural reason XP and Skill Coins are separate ledgers with separate write paths. Consumption events (lesson completed, quiz passed, project finished for oneself) flow only to the XP ledger. Contribution events (accepted answer, approved review, completed mentorship, published article, validated report, won guild event, completed bounty) are the *only* events permitted to reach the Skill Coin mint path. No code path mints Skill Coins from a consumption event; this is enforced structurally, not merely by convention.

### 17.3 Economy Invariants

The following invariants hold at all times and are protected by ledger design, transactions, and reconciliation:

1. **Conservation.** Total Skill Coins minted equals total in circulation plus burned/withdrawn. Balances always reconcile to the entry log.
2. **No fabrication.** Every Skill Coin and Reputation point traces to a specific validated contribution event with a validator and an idempotency key.
3. **Non-transferability of XP and Reputation.** No operation moves XP or Reputation between users. There is no transfer endpoint; the capability does not exist.
4. **Reputation cannot be bought.** No payment or Skill Coin operation can increase Reputation, directly or indirectly. The Payment service has no contract that touches the Reputation ledger.
5. **Exactly-once rewards.** A single contribution yields its rewards exactly once, regardless of retries, duplicate events, or concurrent processing.
6. **Append-only auditability.** Every economic change is an immutable entry; balances are derived, never overwritten in place.

### 17.4 The Contribution Validation Pipeline

Because contribution is the sole source of Reputation and Skill Coins, the pipeline that decides whether a contribution is genuine is the economy's most security-sensitive component. It has four stages:

**Stage 1 — Capture.** A surface service (Community, Mentor, Guild, Marketplace, Assessment) records a candidate contribution and emits a `contribution.candidate` event with all context: actor, type, target, and the proposed validator.

**Stage 2 — Validation.** The contribution is confirmed by its appropriate validator. For an accepted answer, the validator is the question's asker. For an approved project review, it is the review outcome. For a mentorship session, it is two-sided confirmation that the session occurred. For a validated spam report, it is moderation confirmation. Validation transforms a candidate into a confirmed `contribution.created` event. Self-validation is structurally impossible — an actor cannot be their own validator.

**Stage 3 — Anti-Abuse Screening.** Before any reward is minted, the confirmed contribution passes anti-abuse checks: rate limits (how many of this contribution type the actor has earned recently), relationship checks (are actor and validator suspiciously linked, indicating collusion), velocity and pattern anomaly detection, and reward caps. Suspicious contributions are held for review rather than rewarded automatically.

**Stage 4 — Reward.** Cleared contributions reach the Economy Core, which idempotently writes the Reputation adjustment and, where applicable, mints Skill Coins, each as an append-only entry keyed to the contribution's idempotency key. The corresponding events then fan out to Notification, Analytics, and Blockchain.

This pipeline is why a contribution does not instantly become currency: the gap between capture and reward is where the platform protects the integrity of everything users earn.

### 17.5 Economy Configuration and Governance

Reward values (XP coefficients, reputation awards, Skill Coin amounts) are configuration owned by the Economy Core and changeable only by Administrators through an audited process, never by code deploys scattered across services. This centralization means the economy can be tuned without touching surface services and that every parameter change is recorded. Governance over economy parameters is itself reputation-influenced at higher maturity stages (Section 22), consistent with the principle that the community shapes the platform.

---

## 18. Experience Points (XP) System

XP is the progression currency. It is the most liberally awarded of the three because its only purpose is to motivate and to surface how far a learner has come; it carries no exchangeable value and therefore poses little fraud risk relative to Skill Coins.

### 18.1 Properties

XP is **non-transferable** and **non-withdrawable**. It only accumulates — it is never spent and (in the base design) never lost. It drives leveling, feature unlocks, and ranking.

### 18.2 XP Earning Formulas

**Lesson completion:**

```
XP = LessonDifficulty × 10
```

| Difficulty | Coefficient | XP Awarded |
|---|---|---|
| Easy | 1 | 10 XP |
| Medium | 2.5 | 25 XP |
| Hard | 5 | 50 XP |

**Project completion:**

```
XP = ProjectDifficulty × 100
```

| Difficulty | Coefficient | XP Awarded |
|---|---|---|
| Beginner | 1 | 100 XP |
| Intermediate | 3 | 300 XP |
| Advanced | 10 | 1,000 XP |

**Quests:**

| Quest | XP Awarded |
|---|---|
| Daily Quest | 50 XP |
| Weekly Quest | 250 XP |
| Monthly Quest | 1,000 XP |

### 18.3 Architectural Notes

XP awards are triggered by completion events emitted by the Learning and Assessment services and written to the XP ledger by the Economy Core. Even though XP is low-risk, awards still pass through the idempotent ledger path so that a duplicated `lesson.completed` event cannot double-award. The completion criteria themselves are verified server-side: a lesson is "completed" only when the server's own records (e.g., required interactions, passing quiz score) are satisfied, never because the client asserted completion. Quests are evaluated by a scheduled process that checks whether the day's/week's/month's criteria were met and awards once per period.

### 18.4 XP and Levels

XP accumulates into platform levels that gate feature unlocks and contribute to rankings. (Note: XP-driven *platform levels* are distinct from *reputation levels* in Section 21, which gate roles. The two ladders measure different things — activity versus trust — and must not be conflated.) Level thresholds and the curve are economy configuration; the curve is designed so early levels come quickly to hook new learners and later levels require sustained engagement.

---

## 19. Reputation System

Reputation is the trust currency. It answers how much the community should rely on a user, and it is the key that unlocks the platform's most valuable roles. It is therefore guarded far more strictly than XP: it is earned only through validated contribution and can be lost through misconduct.

### 19.1 Properties

Reputation is **non-transferable** and **earned-only**. There is no operation, direct or indirect, that converts money or Skill Coins into Reputation. It can decrease — misconduct carries reputation penalties — which makes it a living signal of standing rather than a monotonic score.

### 19.2 Positive Reputation Awards

| Contribution | Reputation |
|---|---|
| Accepted Answer | +15 |
| Project Review Approved | +20 |
| Mentorship Session Completed | +30 |
| Community Article Published | +50 |
| Spam Report Validated | +10 |

### 19.3 Negative Reputation Penalties

| Violation | Reputation |
|---|---|
| Spam | −50 |
| Abuse | −100 |
| Plagiarism | −250 |

The penalties are deliberately severe relative to the awards: a single plagiarism finding (−250) erases the reputation of many genuine contributions, reflecting the platform's stance that trust is hard to earn and easy to forfeit.

### 19.4 Architectural Notes

Every reputation change is an append-only entry keyed to its originating event — a validated contribution for awards, a confirmed moderation finding for penalties. Because reputation gates roles, the Economy Core emits `reputation.level_changed` whenever a user crosses a tier boundary in either direction, and the Authentication Service reacts by granting or revoking earned roles. This tight coupling between reputation and access is why the contribution validation pipeline (Section 17.4) is treated as security-critical: inflating reputation would inflate access.

Reputation reads are frequent (shown on profiles, used in matching and ranking), so the current reputation balance and tier are cached in Redis, while the authoritative value is always reconcilable from the PostgreSQL entry log.

### 19.5 Reputation and Governance

At higher platform maturity, reputation confers governance weight — a voice in community decisions and, eventually, in economy parameter governance. This is consistent with the principle that the community drives growth, and it makes reputation valuable beyond role unlocks. Because reputation can translate into governance influence, its non-purchasability is not merely a fairness nicety; it is what prevents governance capture by money.

---

## 20. Skill Coin System

Skill Coins are the value-exchange currency: tradable, withdrawable, and blockchain-compatible. They are the economic payoff of the contribution economy and the only currency that connects platform activity to real income. They are therefore minted scarcely, only against validated contribution, and guarded with the rigor of a payments system.

### 20.1 Properties

Skill Coins are **tradable**, **withdrawable**, and **blockchain-compatible**. They are minted only by validated contribution, spent on platform value exchange, and may be withdrawn to fiat (subject to compliance) or settled on-chain.

### 20.2 Skill Coin Earning

| Contribution | Skill Coins |
|---|---|
| Accepted Answer | 1 |
| Project Review | 3 |
| Mentorship Session | 5–50 (by session attributes) |
| Guild Event Winner | 25 |
| Bounty Completion | Variable (set by the bounty) |

The mentorship range (5–50) is resolved deterministically from verified session attributes — duration, complexity, and learner feedback — by a documented function in the Mentor Service, so that the same session always yields the same payout and the amount cannot be arbitrarily inflated. Bounty rewards are fixed at posting time and held in escrow, so the payout is known and funded before work begins.

### 20.3 Spending Skill Coins

Skill Coins are spent on bounties (funding work), mentorship (paying for sessions), rewards (platform goods and perks), and the marketplace broadly. Every spend is an append-only debit entry guarded by a balance check within a transaction, so a user can never spend coins they do not have, even under concurrent operations. Spends that span services (e.g., funding a bounty into escrow) use sagas with compensations.

### 20.4 The Mint Path Is Sacred

The single most important Skill Coin rule, restated for emphasis: **minting happens only through the Economy Core, only in response to a validated contribution event that has cleared anti-abuse screening, and only once per contribution.** No surface service holds mint authority. No consumption event reaches the mint path. Every mint is keyed to a contribution's idempotency key and recorded as an immutable entry. This is the architectural embodiment of "value is proven, not claimed."

### 20.5 On-Chain Settlement

Skill Coins are blockchain-compatible: their mint, burn, and (where applicable) movement are mirrored on Aptos asynchronously by the Blockchain Service, giving users genuine ownership of their earned value. The off-chain ledger remains authoritative for performance and for invariant enforcement; the chain provides ownership, portability, and verifiability. Section 23 details how the off-chain ledger and on-chain state are kept reconciled.

### 20.6 Withdrawal and Compliance

Withdrawing Skill Coins to fiat crosses the boundary into regulated financial territory and therefore triggers compliance controls (identity verification, anti-money-laundering screening, velocity limits) handled by the Payment Service in coordination with the Economy Core. Withdrawal is a saga: the ledger debit and the fiat payout must both succeed or both be compensated, and the whole flow is auditable end to end. Section 26 covers the compliance posture.

---

## 21. Reputation Levels and Progression

Reputation accumulates into six named tiers. These tiers are the rungs of the platform's trust ladder and the gates for its earned roles. The thresholds below are economy configuration and the canonical values for the platform.

| Level | Title | Reputation Required | Significance |
|---|---|---|---|
| 1 | Learner | 0 | Entry point; full access to free learning and basic contribution. |
| 2 | Contributor | 100 | Proven to give back; early standing in the community. |
| 3 | Trusted Contributor | 500 | Reliable, repeated value creation; greater visibility and weight. |
| 4 | Mentor | 1,000 | Unlocks the Mentor role and mentorship rewards. |
| 5 | Expert | 5,000 | Unlocks advanced content creation and guild leadership. |
| 6 | Master | 10,000 | The platform's highest standing; maximal trust and influence. |

### 21.1 The Shape of the Curve

The thresholds rise steeply — roughly fivefold to tenfold between upper tiers — so that early progression is attainable and motivating while the top tiers represent genuine, sustained, high-value contribution. Reaching Contributor (100) is achievable through a handful of accepted answers and a published article; reaching Master (10,000) requires the equivalent of hundreds of validated contributions, which cannot be faked at scale without tripping the anti-abuse pipeline.

### 21.2 Progression Mechanics

When a user's reputation crosses a tier boundary, the Economy Core emits `reputation.level_changed`. Downstream effects fan out: the Authentication Service grants the corresponding earned role (e.g., Mentor at Level 4), the Notification Service congratulates the user, the Blockchain Service may anchor a Reputation Proof, and the Community Service updates visible standing and badges. Because reputation can fall, the same event handles downward transitions, revoking roles when misconduct drops a user below a threshold.

### 21.3 Two Ladders, One Identity

It bears repeating that Ascendra has two distinct progression ladders. The **XP/level ladder** measures activity and gates feature unlocks and rankings. The **reputation/tier ladder** measures trust and gates roles and influence. A prolific learner can reach a high XP level while remaining at a low reputation tier if they consume but rarely contribute; conversely, a selective but generous contributor can reach a high reputation tier with modest XP. Keeping these orthogonal is intentional: it lets the platform reward learning and contribution as the different things they are.

### 21.4 Worked Example

Consider a user over their first months. They complete fifty lessons (mixed difficulty) and three projects, accumulating several thousand XP and climbing the XP-level ladder — but zero of this touches reputation, because consumption is not contribution. They then begin answering questions: twenty accepted answers (+15 each = +300 reputation) and publish four articles (+50 each = +200 reputation), reaching 500 reputation and the Trusted Contributor tier. They complete several mentorship-style reviews and, upon crossing 1,000 reputation, are automatically granted the Mentor role and can begin earning the 5–50 Skill Coin mentorship rewards. This trajectory — consume to learn, contribute to rise, contribute more to earn — is the core loop expressed in the economy.

---

## 22. Gamification and Engagement Design

Gamification in Ascendra is not decoration; it is the mechanism that drives the core loop and the platform's success metrics. The architecture supports it as a first-class concern integrated with the economy and analytics, while guarding against the dark patterns that gamification can invite.

### 22.1 The Engagement Loop

The platform's engagement loop maps directly onto the value loop. Learners are pulled in by free, well-structured content and quick early XP wins (the level curve front-loads early levels). They are nudged from consumption toward contribution by surfacing the reputation and Skill Coin rewards that only contribution unlocks. Contributors are retained by rising standing, role unlocks, and real income. Mentors and experts are retained by influence, earning, and the intrinsic reward of teaching. Each stage is designed to make the next stage visible and attractive.

### 22.2 Mechanics

The platform employs quests (daily, weekly, monthly, with the XP values defined in Section 18), streaks, leaderboards (individual and guild), badges and achievements (some anchored on-chain), levels and tiers, and competitions. These mechanics are powered by the Analytics Service (for tracking), the Economy Core (for rewards), and the Guild Service (for team competition), with leaderboards served from CQRS read models for performance.

### 22.3 Designing Against Dark Patterns

Because Ascendra pays real value, it is especially important that engagement mechanics not manipulate users into unhealthy behavior or degrade content quality. Several guardrails are architectural. Reward caps and diminishing returns prevent grinding low-value contributions for outsized gain. The contribution validation pipeline ensures quantity without quality earns nothing. Streak and quest design avoids punishing breaks harshly, so the platform encourages sustainable habits rather than compulsive ones. Notifications respect preferences and quiet hours rather than maximizing interruption. These are not merely policy choices; they are encoded in reward configuration and the validation pipeline.

### 22.4 Personalization

The AI Service personalizes the engagement experience — recommending next steps, tuning roadmaps to goals and gaps, and surfacing relevant contribution opportunities — so that the loop feels tailored rather than generic. Personalization is grounded in the user's actual progress and stated goals, and it augments rather than replaces the user's agency over their path.

### 22.5 Community Governance as Engagement

At maturity, reputation confers governance weight, turning the most engaged, trusted users into stewards of the platform. This is the deepest engagement mechanic: giving users genuine ownership of the community's direction. It also closes the loop philosophically — the platform succeeds when learners become professionals and professionals help create the next generation of learners, including by shaping the platform they learned on.

---

## 23. Blockchain and Web3 Architecture

The blockchain layer exists to give users genuine, portable ownership of what they earn. It is deliberately scoped: the chain records *ownership and proof*, while the off-chain system remains authoritative for performance, invariants, and the vast majority of reads and writes. This hybrid is the only responsible way to combine a fast, cost-effective product with real on-chain ownership.

### 23.1 What Goes On-Chain

Three classes of records are anchored on Aptos:

**Achievement NFTs** represent meaningful, milestone accomplishments and are owned by the user's wallet. They are non-transferable (soulbound), because an achievement that could be sold would mean nothing.

**Reputation Proofs** are attestations of a user's reputation tier, enabling third parties to verify standing without trusting the platform's API. They too are non-transferable.

**Skill Coins** are mirrored on-chain so that the platform's value currency has genuine on-chain existence and portability, consistent with its "blockchain-compatible" property.

### 23.2 Why Aptos and Move

Aptos's Move language uses a resource-oriented model in which assets are first-class, cannot be accidentally copied or discarded, and have explicit ownership and abilities. This is an unusually good fit for Ascendra's requirements: non-transferability (soulbound credentials) and scarce, conserved currency map naturally onto Move's resource abilities, making whole classes of bug — duplication, accidental transfer — representationally impossible rather than merely guarded against. Aptos's throughput also suits a platform that may anchor many records as it scales.

### 23.3 The Hybrid On-Chain/Off-Chain Model

The off-chain ledger (PostgreSQL, owned by the Economy Core) is the authoritative, low-latency source of truth that enforces invariants and serves reads. The chain is the ownership and verification layer. The Blockchain Service bridges them:

- When an achievement is earned, a reputation tier is crossed, or Skill Coins are minted or burned, the originating event lands in the Blockchain Service's outbox-driven job queue.
- The service submits the corresponding transaction to Aptos, tracks it to sufficient confirmation depth, and records the result.
- An indexer reflects on-chain state back into a fast off-chain read model, so user-facing reads of "your NFTs / your proofs" never hit the chain directly.

Anchoring is **asynchronous and idempotent**: the user's experience never blocks on chain latency, and a retried anchoring job never double-mints on-chain because each job is keyed to its originating event.

### 23.4 Reconciliation

Because two systems hold related state, a reconciliation process periodically compares the off-chain ledger against on-chain records and the indexer, alerting on any divergence. The off-chain ledger's append-only design makes this tractable: the chain should reflect exactly the sequence of mint/burn entries, and any drift is a detectable, investigable bug rather than silent corruption.

### 23.5 Key Management and Security

The platform's signing keys for minting and anchoring are held in hardware-backed custody with strict access controls and separation of duties; no single operator can unilaterally mint. User wallets are bound to accounts through the Authentication Service, with clear flows for linking and recovery. Smart-contract code is audited before mainnet deployment, and the contract scope is kept minimal to shrink the attack surface. The full on-chain data structures, Move modules, and minting/burning logic are specified in Part 4.

### 23.6 Failure and Congestion Handling

Chains can congest or reorganize. The Blockchain Service handles this by waiting for adequate confirmation depth before treating an anchor as final, retrying failed submissions with backoff, and never letting chain unavailability block the core product — anchoring simply queues until the chain is healthy. Because the off-chain ledger is authoritative, the product remains fully functional even during chain incidents; only the anchoring lags, then catches up.

---

## 24. AI Ecosystem Architecture

The AI Ecosystem augments learning and contribution through four personas — AI Mentor, AI Coach, AI Reviewer, and AI Interviewer — plus roadmap personalization. The AI Service is a routing-and-guardrails layer over OpenAI and Azure OpenAI; it holds no economic authority and never gates free fundamentals.

### 24.1 The Four Personas

**AI Mentor** answers learner questions conversationally, grounded in the platform's curriculum, and points learners toward relevant lessons, projects, and human mentors. It is an always-available first line of help, not a replacement for the human mentorship that earns reputation.

**AI Coach** provides motivational and strategic guidance: helping learners set goals, maintain momentum, and choose their next step. It works closely with roadmap personalization.

**AI Reviewer** gives fast, formative feedback on submitted work — code quality, correctness hints, and improvement suggestions — before or alongside human review. AI review accelerates iteration; it does not by itself confer the reputation that an approved *human* project review carries.

**AI Interviewer** runs mock interviews, posing questions, evaluating responses, and producing a feedback report, preparing learners for real professional interviews.

### 24.2 Architecture: Routing, Grounding, Guardrails

The AI Service is built around four responsibilities.

**Model routing.** Requests are routed to the cost-appropriate model: lighter models for simple or high-volume tasks, stronger models for complex reasoning or high-stakes feedback. Routing policy is configuration, allowing the platform to tune the cost/quality trade-off without code changes.

**Grounding.** Where accuracy matters, outputs are grounded in platform content (curriculum, the user's own work and progress) through retrieval, reducing hallucination and keeping guidance relevant to what the learner is actually doing.

**Guardrails.** Inputs and outputs pass through safety and scope checks: prompt-injection defenses, content-safety filtering, and scope enforcement (the AI stays within educational assistance). A hard guardrail enforces the platform principle that **AI never becomes a paywall on fundamentals** — AI features accelerate, but the free curriculum stands on its own without them.

**Cost control.** Per-user and per-feature budgets, caching of common responses, and routing together keep AI spend bounded and predictable, protecting the sustainability of free education.

### 24.3 Transparency and Labeling

AI-generated assistance is labeled as such. Users always know when they are interacting with AI versus a human mentor, and AI feedback is positioned as formative help rather than authoritative judgment. This transparency preserves the meaning of human contribution — the thing the economy actually rewards.

### 24.4 The AI/Economy Boundary

A firm architectural line separates AI assistance from economic reward. AI review can help a learner improve a project, but the reputation and Skill Coins for a *project review* are earned by the human reviewer who approves it, not generated by the AI. This boundary prevents the economy from being flooded with machine-generated "contributions" and keeps the platform's rewards anchored to genuine human value creation. Part 5 specifies prompt architecture, evaluation, and the full guardrail design.

### 24.5 Evaluation and Safety

AI outputs are continuously evaluated for quality, safety, and cost. Regression suites guard against degradation when prompts or models change; safety evaluations guard against harmful or off-scope outputs; cost dashboards guard the budget. Because AI behavior can drift as providers update models, evaluation is an ongoing operational discipline, not a one-time gate.

---

## 25. Security Architecture

Security is the second-highest architectural priority after economic integrity, and the two are deeply linked: much of the platform's security exists precisely to protect the economy. Ascendra applies defense in depth across the perimeter, the application, the data, and the operational layers.

### 25.1 Defense in Depth

Security is layered so that no single failure is catastrophic.

**Perimeter.** A CDN with WAF and DDoS protection, TLS everywhere, and edge rate limiting filter hostile traffic before it reaches application code.

**Gateway.** Authentication, coarse authorization, request validation, and idempotency enforcement happen at the single entry point, so these controls cannot be bypassed by reaching a service directly.

**Service.** Each service performs authoritative, fine-grained authorization against the specific resource and applies its own input validation, treating even internal callers as untrusted by default.

**Data.** Encryption at rest and in transit, least-privilege database credentials per service, and strict separation of the economy ledgers, whose write paths are the most tightly controlled in the system.

**Operations.** Secrets management, audited administrative actions, and separation of duties for the most sensitive operations (notably blockchain key custody and economy configuration).

### 25.2 Identity and Access

Authentication uses short-lived JWT access tokens and rotating refresh tokens with reuse detection, multi-factor authentication, breach-password screening, and rate-limited login to resist takeover and credential stuffing. Authorization is permission-based and enforced at multiple layers (Section 16.4). Service-to-service calls are mutually authenticated so a compromised component cannot freely impersonate others.

### 25.3 Protecting the Economy

Several controls exist specifically to protect economic integrity. Mint authority is centralized and separated from surface services, so no compromised feature service can fabricate currency. The contribution validation pipeline screens for collusion and gaming before any reward. Idempotency keys prevent replay-based double rewards. Anomaly detection watches for unusual earning, spending, and withdrawal patterns. Withdrawals carry KYC/AML controls. Administrative changes to economy configuration are audited and require elevated authority. Together these treat the economy with the seriousness of a financial system, because it is one.

### 25.4 Content and Abuse Safety

User-generated content (answers, articles, projects, profiles) passes through abuse and spam controls, with community reporting (itself a rewarded contribution) feeding moderation. Code execution is sandboxed in Judge0 with strict resource and network isolation to prevent sandbox escape and abuse. AI surfaces carry prompt-injection and content-safety guardrails. Moderation actions are auditable and have economic consequences (reputation penalties) for offenders.

### 25.5 Secure Development Lifecycle

Security is built into how the platform is built: dependency scanning, static and dynamic analysis in CI, secret-scanning, code review with security awareness, and smart-contract audits before mainnet deployment. Threat modeling is performed for new high-risk features, especially anything touching the economy, payments, or the chain. The full threat model and control catalog are the subject of Part 8.

### 25.6 Incident Response

The platform maintains an incident-response capability: detection through monitoring and anomaly alerts, defined severity levels and escalation paths, containment and remediation runbooks, and post-incident review. Economy-affecting incidents have the highest severity and dedicated playbooks, including the ability to pause specific economic operations (e.g., withdrawals) without taking down the whole platform, thanks to the decoupled architecture.

---

## 26. Privacy, Compliance, and Data Governance

Operating a global learning platform that pays real value and touches regulated financial flows imposes real privacy and compliance obligations. These are treated as architectural requirements, not legal afterthoughts.

### 26.1 Privacy by Design

The platform minimizes the personal data it collects, scopes access to it tightly, and gives users control. Personal data is segregated, encrypted, and access-logged. Analytics operates on pseudonymized data wherever possible, kept separate from the operational system of record. Data collection is purpose-bound: data gathered for one purpose is not silently repurposed.

### 26.2 User Rights

Users can access, export, and delete their personal data through defined workflows. Deletion is handled carefully where it intersects the economy and the chain: personal *identity* data can be erased, but the *economic record* (append-only ledger entries) and *on-chain anchors* are, by design, immutable. The architecture reconciles these by anchoring on-chain records to pseudonymous wallet addresses rather than personal identity, so a user's right to erasure can be honored without corrupting the economic audit trail or rewriting the chain. This separation between identity and economic record is a deliberate, load-bearing design decision.

### 26.3 Financial Compliance

The Skill Coin withdrawal path crosses into regulated territory. The Payment Service enforces identity verification (KYC), anti-money-laundering screening (AML), transaction monitoring, and velocity limits on flows that convert platform value to fiat. These controls are concentrated at the fiat boundary so that the on-platform experience stays frictionless while the regulated edge is properly governed. Compliance posture varies by jurisdiction, and the architecture supports jurisdiction-specific rules through configuration rather than forked code.

### 26.4 Regional Considerations

Given the platform's market, local realities shape compliance: local payment rails (GCash, Maya) bring their own requirements; regional data-protection regimes shape data handling; and cross-border value movement raises additional questions for withdrawals. The architecture keeps jurisdictional rules in configuration and isolates region-specific integrations behind anti-corruption layers, so expanding to a new region is an additive change rather than a rewrite.

### 26.5 Auditability as a Governance Tool

The same append-only, fully-traceable design that protects economic integrity also serves governance and compliance: every reward, penalty, spend, and withdrawal is explainable from immutable records, every administrative action is logged, and every on-chain anchor is reconcilable. This makes the platform auditable by design, which is both a compliance asset and a trust asset for users who want to know the economy is fair.

---

## 27. Observability and Operations

A distributed economy is only as trustworthy as operators' ability to see and explain it. Observability is therefore a first-class requirement, with special attention to economic transparency.

### 27.1 The Three Pillars

**Structured logging.** Every service emits structured, correlated logs. A correlation ID generated at the Gateway flows through every synchronous call and asynchronous event, so a single user action can be traced across all the services it touches. Economy-affecting operations log enough to fully reconstruct what happened and why.

**Metrics.** System metrics (latency, error rate, saturation) and business metrics (the MVP success metrics, economic throughput, AI cost) are collected and dashboarded. Service-level objectives are defined for critical paths, with the economy held to the strictest.

**Distributed tracing.** Traces span service boundaries, making latency and failure in deep flows (like the assessment→reward fan-out) visible and debuggable.

### 27.2 Economic Observability

Beyond standard observability, the economy gets dedicated visibility: dashboards for mint/burn/spend flows, reconciliation status (does the ledger match its entry log; does the chain match the ledger), anti-abuse signals (held contributions, anomaly alerts), and withdrawal pipeline health. An operator can answer "why does this user have this many Skill Coins?" by tracing immutable entries back to validated contributions. This is not a nice-to-have; it is how the platform proves its economy is fair and catches integrity bugs before they spread.

### 27.3 Alerting

Alerts are tiered by severity, with the highest reserved for economic-integrity signals (reconciliation drift, abnormal mint rates), security signals (anomalous access, takeover indicators), and availability of critical paths. Alerts are actionable and tied to runbooks, avoiding the fatigue of noisy, non-actionable noise.

### 27.4 Operational Runbooks

Common and critical operational procedures — pausing withdrawals, replaying dead-lettered events, rotating keys, handling a chain incident, responding to an abuse wave — are documented as runbooks. The decoupled architecture makes targeted operational responses possible: the platform can pause one economic operation without downing the whole system. Detailed runbooks live in Part 7.

---

## 28. DevOps, CI/CD, and Infrastructure

The delivery system is part of the architecture: how code reaches production shapes how safely and quickly the platform can evolve.

### 28.1 Environments

The platform maintains separated environments — local development, a shared integration/staging environment that mirrors production, and production — with configuration externalized per environment and no production secrets in lower environments. Promotion flows in one direction, with gates between stages.

### 28.2 Infrastructure as Code

Infrastructure is defined as code so that environments are reproducible, reviewable, and versioned. Provisioning, networking, data stores, and service deployment are all codified rather than configured by hand, which makes disaster recovery and environment parity tractable.

### 28.3 Continuous Integration

Every change runs through CI: build, unit and integration tests, linting and type checks, security scanning (dependencies, static analysis, secret scanning), and — for contract changes — schema and API-compatibility checks. The economy and other critical paths carry especially thorough test coverage, including idempotency and concurrency tests that assert no double-mint or double-spend under retries and races.

### 28.4 Continuous Delivery

Services deploy independently, consistent with their independent ownership. Deployments favor zero-downtime strategies (rolling or blue/green) and backward-compatible, expand-then-contract database migrations so that a deploy never requires downtime or risks breaking in-flight requests. Feature flags decouple deploy from release, letting risky features ship dark and enable gradually.

### 28.5 Containerization and Orchestration

Services are containerized and run under an orchestrator that handles scheduling, scaling, health checking, and self-healing. Statelessness (Section 8.8) makes horizontal scaling and rolling deployment straightforward — any instance can serve any request, and instances can be added or replaced freely.

### 28.6 Disaster Recovery

Backup, recovery objectives, and tested recovery procedures are defined per data class (Section 15.6), with the economy held to the strictest objectives. Recovery is rehearsed, not assumed; the append-only ledger design materially eases recovery because balances are deterministically reconstructable from entries. Full DevOps and DR detail is the subject of Part 7.

---

## 29. Scalability and Performance Engineering

The architecture is designed so the same fundamental shape serves the MVP's 1,000 users and scales toward the 1,000,000+ target without a rewrite. This is achieved by choosing patterns that scale horizontally from the start, even when MVP volumes would tolerate simpler approaches.

### 29.1 Horizontal Scalability

Stateless services scale by adding instances behind load balancing. Data stores scale through read replicas (for read-heavy workloads like the catalog and feeds), partitioning (for high-volume tables like ledger entries and analytics), and caching (Redis in front of hot reads). Asynchronous, queue-based processing absorbs spikes by buffering work rather than overwhelming services. None of these require architectural change to grow; they are dialed up as volume rises.

### 29.2 Read/Write Asymmetry

Ascendra is overwhelmingly read-heavy: many users browse the catalog, read answers, and view profiles for every user who contributes. The architecture exploits this with aggressive caching, CDN delivery of public content, read replicas, and CQRS read models (Elasticsearch and Redis) for search, feeds, and leaderboards. Write paths — especially the economy — are kept correct and transactional, and are scaled through partitioning and the decoupling of side effects into async processing.

### 29.3 Hot Paths and Their Tactics

| Hot Path | Scaling Tactic |
|---|---|
| Catalog & public content | CDN + static generation + read replicas |
| Search & discovery | Elasticsearch read models |
| Feeds & leaderboards | CQRS projections in Redis/Elasticsearch |
| Profile & balance reads | Redis caches over PostgreSQL |
| Reward fan-out | Async events + queues, processed off the critical path |
| Code execution | Judge0 as an external, independently scalable sandbox |
| AI generation | Model routing, caching, per-user budgets |
| Blockchain anchoring | Async job queue, never blocking the user |

### 29.4 Performance Budgets

Interactive surfaces carry performance budgets (fast first paint for public pages, responsive interactions for authenticated ones), enforced through edge delivery, caching, and keeping synchronous call chains shallow. Expensive work — rewards, anchoring, AI, analytics — is pushed off the interactive path into asynchronous processing, which is the central technique that keeps the experience fast while heavy work happens behind the scenes.

### 29.5 Graceful Degradation Under Load

Under extreme load, the platform sheds non-critical work before critical work: recommendations, some analytics, and AI features can degrade or queue while learning, contribution, and the economy stay correct. The economy specifically fails closed — it slows or rejects rather than risking incorrect writes — consistent with the priority ordering in Section 6.

---

## 30. Domain Event Catalog

Events are the connective tissue of Ascendra. Because services own their own databases and never reach into each other's tables, almost everything interesting that happens in the system is communicated as an event published to the message bus and consumed by whoever cares. This section catalogs the canonical domain events, their ownership, their payload contracts, and the consumers that depend on them. It is the single most important interoperability reference in the document: if two teams disagree about what a field means, this catalog is the arbiter.

### 30.1 Event Design Conventions

Every event in Ascendra follows the same envelope. The envelope carries metadata that is identical across all event types, while the `data` block carries the type-specific payload. Standardizing the envelope lets every consumer implement idempotency, tracing, and ordering once, rather than re-inventing it per event.

The envelope fields are: `event_id` (a UUID, globally unique, the idempotency key for consumers), `event_type` (a dotted name such as `learning.lesson.completed`), `event_version` (an integer schema version, incremented on breaking changes), `occurred_at` (an RFC 3339 timestamp set by the producer at the moment the fact became true), `producer` (the service name), `subject` (the primary entity the event is about, usually a user or resource id), `correlation_id` (propagated from the originating request for end-to-end tracing), and `data` (the typed payload).

Three rules govern payloads. First, events describe facts that already happened, named in the past tense; they are never commands. Second, payloads carry identifiers and the minimal denormalized fields a consumer needs, not whole aggregates — consumers that need more call the owning service's API. Third, schema evolution is additive: new optional fields may be added freely, but renaming or removing a field, or changing its meaning, requires a version bump and a transition period during which both versions are published.

### 30.2 Learning and Progression Events

These events originate in the Learning and Assessment services and describe progress through content. They are the trigger source for most XP awards, which is why the Economy Core is their most important consumer.

`learning.lesson.completed` is emitted by the Learning Service when a learner finishes a lesson. Its payload carries `user_id`, `lesson_id`, `course_id`, `difficulty` (Easy, Medium, Hard), and `first_completion` (a boolean distinguishing the first completion, which is XP-eligible, from repeats, which are not). The Economy Core consumes it to award lesson XP using the difficulty-times-ten formula; Analytics consumes it for completion-rate metrics; Notification consumes it for streak nudges.

`assessment.submission.graded` is emitted by the Assessment Service after Judge0 returns a verdict for a code submission. Its payload carries `user_id`, `challenge_id`, `verdict` (passed, failed, partial), `score`, and `attempt_number`. The Economy Core awards XP only on the first passing verdict; Analytics tracks attempt distributions; the Learning Service updates challenge progress.

`learning.project.completed` is emitted when a project is validated as complete. Its payload carries `user_id`, `project_id`, `difficulty` (Beginner, Intermediate, Advanced), and `first_completion`. The Economy Core awards project XP using the difficulty-times-one-hundred formula. Crucially, project completion awards XP but never Skill Coins — coins flow only from contribution, never from learning, and this event is the boundary where that rule is most tempting to violate and most firmly enforced.

`learning.quest.completed` covers daily, weekly, and monthly quests, carrying `user_id`, `quest_id`, and `cadence` (daily, weekly, monthly). The Economy Core maps cadence to the fixed quest XP values.

### 30.3 Contribution Events

Contribution events are the only legitimate source of Skill Coins, so their integrity is paramount. Each one passes through the four-stage contribution validation pipeline before any economic consequence is applied; the events below represent contributions that have already cleared validation.

`community.answer.accepted` is emitted by the Community Service when a question's author marks an answer as accepted. Its payload carries `answer_id`, `question_id`, `author_id` (the answerer, who earns), `accepter_id`, and `topic`. The Economy Core awards the answerer reputation and a Skill Coin; it explicitly checks that `author_id` and `accepter_id` differ to block self-acceptance.

`community.review.approved` is emitted when a project review is approved as helpful. Its payload carries `review_id`, `project_id`, `reviewer_id`, and `outcome`. The Economy Core awards the reviewer reputation and Skill Coins.

`mentorship.session.completed` is emitted by the Mentor Service when both parties confirm a session occurred. Its payload carries `session_id`, `mentor_id`, `mentee_id`, `duration_minutes`, and `confirmed_by_both` (a boolean that must be true). The Economy Core awards the mentor reputation and a variable Skill Coin amount within the session band; the dual-confirmation requirement is what makes the event trustworthy enough to mint coins.

`community.article.published` carries `article_id`, `author_id`, and `review_state`; it awards reputation for accepted knowledge-base contributions. `community.spam_report.validated` carries `report_id`, `reporter_id`, and `target_id`; it awards a small reputation amount when a moderator confirms a report, and is paired with penalty events when reports concern policy violations.

### 30.4 Economy Events

Economy events are emitted by the Economy Core itself after it has durably written to a ledger. They are the system's record that value changed hands, and they are deliberately separated from the triggering contribution events so that the act of earning is distinct from the fact that triggered it.

`economy.xp.awarded` carries `user_id`, `amount`, `source_event_id`, `source_type`, and `new_balance`. `economy.reputation.changed` carries `user_id`, `delta` (which may be negative for penalties), `reason`, `source_event_id`, and `new_balance`. `economy.skillcoin.minted` carries `user_id`, `amount`, `source_event_id`, `contribution_type`, and `new_balance`. Each of these is consumed by Notification (to tell the user), Analytics (to track economic flows), and the Blockchain Service (which listens to `economy.skillcoin.minted` to schedule asynchronous anchoring).

`economy.level.changed` is emitted when a reputation change crosses a level threshold, carrying `user_id`, `old_level`, `new_level`, and `direction`. It is the trigger for role and capability changes — for example, crossing into Level 4 (Mentor) is what makes the Mentor Service grant mentoring capability. This is how earned progression translates into expanded permissions without any manual administration.

### 30.5 Blockchain and Marketplace Events

`blockchain.anchor.requested` and `blockchain.anchor.confirmed` bracket the asynchronous anchoring flow. The first carries `user_id`, `ledger_entry_id`, and `payload_hash`; the second adds `transaction_hash` and `block_height` once the Aptos transaction is final. Off-chain records are authoritative throughout; the confirmation event merely records that the on-chain mirror caught up. Because anchoring is idempotent and retried, consumers must tolerate duplicate confirmations.

`marketplace.bounty.posted`, `marketplace.bounty.claimed`, and `marketplace.bounty.completed` track the bounty lifecycle. Completion carries `bounty_id`, `poster_id`, `solver_id`, and `reward_amount`, and triggers an escrow release through the Payment Service alongside a Skill Coin award through the Economy Core. `payment.transaction.settled` carries `transaction_id`, `user_id`, `provider` (Stripe, GCash, Maya), `amount`, and `currency`, closing the loop on real-money flows.

### 30.6 Event Ownership Matrix

Each event has exactly one producing service, which owns its schema. The table below fixes ownership so that schema changes always have a clear owner and consumers always know whom to coordinate with.

| Event | Producer | Primary Consumers |
|---|---|---|
| learning.lesson.completed | Learning | Economy, Analytics, Notification |
| assessment.submission.graded | Assessment | Economy, Learning, Analytics |
| learning.project.completed | Learning | Economy, Analytics |
| learning.quest.completed | Learning | Economy, Notification |
| community.answer.accepted | Community | Economy, Analytics, Notification |
| community.review.approved | Community | Economy, Analytics |
| mentorship.session.completed | Mentor | Economy, Analytics, Notification |
| community.article.published | Community | Economy, Analytics |
| economy.xp.awarded | Economy | Notification, Analytics |
| economy.reputation.changed | Economy | Notification, Analytics |
| economy.skillcoin.minted | Economy | Blockchain, Notification, Analytics |
| economy.level.changed | Economy | Mentor, Guild, Notification |
| blockchain.anchor.confirmed | Blockchain | Analytics, Notification |
| marketplace.bounty.completed | Marketplace | Payment, Economy, Analytics |
| payment.transaction.settled | Payment | Economy, Analytics, Notification |

---

## 31. Key Sequence Flows

The previous sections described structure; this one describes motion. Each flow below traces a single user-meaningful operation across service boundaries, showing the order of calls, the events emitted, and — most importantly — where the boundaries between synchronous and asynchronous work fall. These flows are the reference implementation teams should consult when wiring a feature, because they encode the hard-won decisions about what must happen inline versus what is safely pushed to the background.

### 31.1 Lesson Completion and XP Award

This is the most frequent write in the system and the template for every reward flow. The learner finishes a lesson in the frontend, which calls the API Gateway, which routes to the Learning Service. The Learning Service records completion in its own database and, in the same local transaction, writes a `learning.lesson.completed` event to its transactional outbox. The synchronous path ends here: the learner immediately sees the lesson marked complete. They do not wait for XP.

A relay process publishes the outboxed event to the bus. The Economy Core consumes it, checks the `event_id` against its processed-events table for idempotency, and — if unseen — appends an XP entry to the XP ledger and emits `economy.xp.awarded`. Notification consumes that to update the learner's XP total in near-real-time. The separation matters: completion is durable the instant the learner acts, while the reward settles a beat later through a path that can retry safely. If the Economy Core is momentarily down, completions still succeed and XP catches up when it recovers — the economy fails closed without blocking learning.

### 31.2 Accepted Answer — Reputation and Skill Coin Minting

This flow is where the cardinal economic rule lives. A question author accepts an answer; the Community Service records the acceptance and outboxes `community.answer.accepted`. Before any economic consequence, the contribution passes the four-stage validation pipeline: authenticity (the answer exists and the accepter is the question's author), eligibility (the answerer is not the accepter — no self-dealing), rate-and-anomaly checks (the answerer is not accepting their own answers through sock-puppets at an implausible rate), and policy (the content is not flagged plagiarized).

Only after validation does the Economy Core act, and it does two distinct things in a defined order. It appends a reputation entry (+15) to the reputation ledger, and it appends a mint entry (1 Skill Coin) to the Skill Coin ledger. These are separate ledgers with separate invariants: reputation is non-transferable and earned-only, while the Skill Coin is a real, withdrawable asset. The Economy Core emits both `economy.reputation.changed` and `economy.skillcoin.minted`. The Blockchain Service consumes the latter and schedules anchoring. At no point does learning enter this flow — the coin exists because a contribution was validated, which is the rule the entire economy is built to protect.

### 31.3 Reputation Crossing a Level Threshold Grants Capability

When the reputation entry from the previous flow lands, the Economy Core recomputes the user's level. If the new balance crosses a threshold — say from 999 to 1,014, crossing 1,000 — it emits `economy.level.changed` with `new_level: 4`. The Mentor Service consumes this and grants mentoring capability; the user can now be booked as a mentor. No administrator touched anything. This is the structural expression of "roles are earned, not assigned": capability is a pure function of the reputation ledger, and the ledger only moves through validated contribution. It is also why reputation cannot be bought — there is no code path that increments reputation except validated contribution events, so there is nothing to purchase.

### 31.4 Skill Coin Anchoring to the Blockchain

Anchoring is deliberately asynchronous and idempotent. When `economy.skillcoin.minted` is consumed, the Blockchain Service emits `blockchain.anchor.requested` with a hash of the ledger entry. A worker submits an Aptos transaction recording the hash. The off-chain ledger is authoritative the entire time; the chain is a tamper-evident mirror. When the transaction finalizes, the worker emits `blockchain.anchor.confirmed` with the transaction hash and block height, which the Blockchain Service records against the ledger entry.

Two failure modes are designed for explicitly. If the chain is slow or unreachable, coins are fully usable off-chain and anchoring backlogs harmlessly. If a retry causes a duplicate submission, the idempotency key on the ledger entry ensures the second confirmation is recognized as redundant and ignored. This is the practical payoff of the hybrid model: the user's economy never depends on block times, yet ownership is independently verifiable once anchored.

### 31.5 Bounty Completion With Escrow Release

A poster funds a bounty, which the Payment Service holds in escrow. A solver claims and submits work; on approval, the Marketplace Service emits `marketplace.bounty.completed`. Two consequences fan out: the Payment Service releases escrow to the solver (real money, settled through Stripe, GCash, or Maya, ending in `payment.transaction.settled`), and the Economy Core mints the bounty's Skill Coin reward. The money movement and the coin mint are independent — a failure in one must not silently complete the other — so each is driven by its own consumer of the completion event, each idempotent, each independently retryable. Reconciliation reports cross-check that every completed bounty has both a settlement and a mint, surfacing any divergence for operator review.

### 31.6 GDPR Erasure Against an Immutable Ledger

This flow reconciles two requirements that appear contradictory: the right to erasure and an append-only economic record. The resolution, established in the data architecture, is that identity is stored separately from economic facts. When an erasure request is honored, the Authentication and profile services delete or anonymize personal data, while the economic ledgers retain entries keyed to a pseudonymous subject identifier with no personal data attached. The aggregate integrity of the economy is preserved — balances still reconcile — while the person is no longer identifiable. The anchored hashes on-chain likewise contain no personal data, only ledger-entry digests, so erasure never requires the impossible act of rewriting the chain.

---

## 32. Architecture Decision Records (ADRs)

The sections above describe what Ascendra is. This section records why, in the specific form of Architecture Decision Records. An ADR captures a single significant decision: its context, the choice made, the alternatives weighed, and the consequences accepted. They are recorded because the most expensive mistakes in a system like this come from silently reversing a load-bearing decision without remembering why it was made. Each ADR below is numbered, dated to the founding architecture, and stated in the present tense as an active commitment.

### ADR-001: Separate Append-Only Ledgers per Currency

**Context.** Ascendra has three currencies with fundamentally different properties: XP (non-transferable progression), reputation (non-transferable trust), and Skill Coins (a transferable, withdrawable asset). A single balances table would be simpler to build.

**Decision.** Each currency is recorded in its own append-only ledger. Balances are derived from ledger history, not stored as mutable totals. The three ledgers are never merged.

**Alternatives considered.** A unified mutable balance table per user was rejected because it makes the three currencies look interchangeable and invites code that transfers between them. A single shared ledger was rejected because the currencies have different invariants that are easier to enforce when physically separated.

**Consequences.** We accept more storage and the need to derive balances (mitigated by snapshots). We gain a complete, auditable history, structural prevention of cross-currency leakage, and the ability to reconstruct any balance at any past moment — essential for an economy where coins have real value.

### ADR-002: Contribution Is the Sole Source of Skill Coins

**Context.** Skill Coins have real-world value. The strongest possible pressure on any such system is to find additional ways to mint the valuable asset — for engagement, for retention, for promotions.

**Decision.** Skill Coins are minted only by validated contribution events. Learning never mints coins. There is exactly one code path to minting, and it is gated by the contribution validation pipeline.

**Alternatives considered.** Awarding coins for learning milestones was rejected because it converts the platform's free educational core into a money printer and destroys the link between coins and value created for others. Discretionary administrative minting was rejected because it creates an unauditable inflation vector.

**Consequences.** We accept that some engagement mechanics cannot use coins and must use XP instead. We gain an economy whose money supply is always traceable to a specific validated act of value creation, which is the foundation of the coin's trustworthiness.

### ADR-003: Reputation Is Non-Purchasable by Construction

**Context.** Reputation gates trust-bearing capabilities such as mentoring and moderation. If reputation could be bought, those capabilities would be for sale.

**Decision.** There is no code path that increases reputation except validated contribution events. Reputation is not a product, cannot be granted by administrators in the normal course, and is structurally absent from all payment flows.

**Alternatives considered.** Allowing reputation boosts as a premium feature was rejected as fundamentally corrosive to trust. Manual administrative grants were limited to exceptional, audited correction only.

**Consequences.** We forgo a potential revenue line. We gain a trust signal that means what it says, because the only way to obtain it is to have done the work.

### ADR-004: Hybrid On-Chain / Off-Chain Economy

**Context.** Blockchain provides verifiable ownership but is slow, can be unavailable, and is costly to write. The economy must be fast and always available.

**Decision.** Off-chain ledgers are authoritative for all balances and operations. The blockchain is a tamper-evident mirror, updated by asynchronous, idempotent anchoring. No user-facing operation blocks on a chain write.

**Alternatives considered.** A fully on-chain economy was rejected on latency, cost, and availability grounds. A purely off-chain economy was rejected because it forgoes independent verifiability of ownership, which is a product promise.

**Consequences.** We accept eventual consistency between ledger and chain and the engineering of idempotent anchoring. We gain a fast, available economy with independently verifiable ownership once anchored — the best of both models for our constraints.

### ADR-005: Database per Service

**Context.** Twelve services must evolve independently without coordinating schema changes or contending on shared tables.

**Decision.** Each service owns its database exclusively. No service reads another's tables. All cross-service data flows through APIs and events.

**Alternatives considered.** A shared database was rejected because it couples deployment, creates hidden contention, and erodes service boundaries until the system becomes a distributed monolith.

**Consequences.** We accept data denormalization across services and the loss of cross-service foreign keys and joins, replaced by events and API composition. We gain genuine independent evolvability and clear ownership.

### ADR-006: Transactional Outbox for Reliable Event Publishing

**Context.** A service must update its database and publish an event as one atomic fact. Doing them as two separate operations risks one succeeding and the other failing, corrupting the economy.

**Decision.** Services write the event into an outbox table inside the same local transaction as the state change. A separate relay reliably publishes outboxed events to the bus.

**Alternatives considered.** Publishing directly to the bus inside request handling was rejected because a crash between commit and publish loses the event. Distributed transactions across database and broker were rejected as operationally heavy and poorly supported.

**Consequences.** We accept at-least-once delivery and therefore require idempotent consumers. We gain a guarantee that no state change is ever silently unaccompanied by its event.

### ADR-007: Identity Separated From Economic Record

**Context.** GDPR grants a right to erasure. The economic ledgers are append-only and must never be rewritten. These appear to conflict.

**Decision.** Personal identity is stored separately from economic facts. Ledger entries reference a pseudonymous subject id carrying no personal data. Erasure deletes identity while the economy retains anonymized, still-reconciling entries.

**Alternatives considered.** Storing personal data in ledger entries was rejected because it makes erasure require rewriting an immutable record. Refusing erasure was rejected as non-compliant and wrong.

**Consequences.** We accept an extra indirection between people and their economic history. We gain simultaneous compliance with erasure and ledger immutability — a reconciliation that would otherwise be impossible.

### ADR-008: AI Augments but Never Gates or Mints

**Context.** AI personas (Mentor, Coach, Reviewer, Interviewer) are powerful but probabilistic and occasionally wrong.

**Decision.** AI output is always advisory. It never directly awards XP, reputation, or Skill Coins, and never gates progression on its own authority. Economic and access consequences always flow from deterministic rules and validated human-or-system contribution events.

**Alternatives considered.** Letting an AI reviewer approve contributions for reward was rejected because it places a probabilistic component on the economy's critical path, creating an exploitable and unauditable minting vector.

**Consequences.** We accept that AI accelerates rather than decides, and that some flows keep a deterministic or human checkpoint. We gain an economy whose integrity never depends on model behavior.

### ADR-009: Aptos and Move for the Blockchain Layer

**Context.** The anchoring layer needs a chain with a resource-oriented model suited to representing owned assets safely and predictable execution costs.

**Decision.** Ascendra anchors to Aptos, using Move for on-chain logic.

**Alternatives considered.** General-purpose EVM chains were weighed; Move's resource model, which makes assets first-class and harder to accidentally duplicate or drop, better fits an ownership-anchoring use case where correctness of asset representation is paramount.

**Consequences.** We accept a smaller ecosystem than the most established alternatives and the need for Move expertise. We gain a safety-oriented asset model aligned with the hybrid economy's correctness requirements. Because the chain is only a mirror, this decision is also less risky to revisit than it would be in a chain-authoritative design.

### ADR-010: Economic Integrity Outranks Availability

**Context.** Quality attributes conflict under stress. The system must know, in advance, which one wins.

**Decision.** Economic integrity is the highest-priority quality attribute, above availability. Under failure or extreme load, economic operations fail closed — they slow or reject rather than risk an incorrect write.

**Alternatives considered.** Prioritizing availability for economic writes was rejected because a fast wrong answer in an economy with a withdrawable asset is far more damaging than a brief delay.

**Consequences.** We accept that economic actions can be momentarily unavailable during incidents. We gain an economy that is never wrong, which for a system holding real value is the only acceptable trade.

---

## 33. MVP Scope and Success Metrics

The MVP proves the core loop with a real but constrained economy. It deliberately defers breadth in favor of validating that learners will contribute and that contribution produces value worth earning.

### 33.1 MVP Scope

The MVP delivers the spine of the loop: free learning (Learning Engine), building and assessment (project workspaces + Judge0 + basic review), contribution (Q&A, articles, spam reporting), and the economy (XP, Reputation, and a constrained Skill Coin mint against validated contributions). Roles through Mentor are active. Blockchain anchoring runs read-mostly (achievements and reputation proofs), with full Skill Coin on-chain settlement and withdrawals staged carefully behind compliance readiness. A focused subset of the AI suite (AI Mentor and AI Reviewer) ships to accelerate the loop. Guild competitions, the full mentor marketplace, the project marketplace's bounty economy, and the complete AI suite are staged into V1.

### 33.2 Success Metrics

The MVP is measured against concrete targets that test whether the loop works:

| Metric | Target |
|---|---|
| Users | 1,000 |
| Course completion rate | 60% |
| Mentorship participation | 20% |
| Guild participation | 30% |
| Contribution rate | 15% |
| Marketplace transactions | 50 per month |

### 33.3 What Each Metric Tests

**Completion rate (60%)** tests whether the learning experience is engaging enough to finish — the foundation of everything downstream. **Contribution rate (15%)** is the single most important metric, because contribution is the engine of the entire economy; if learners do not contribute, the thesis fails. **Mentorship (20%)** and **guild (30%) participation** test whether the social layers that drive retention and the upper loop are working. **Marketplace transactions (50/month)** tests whether contribution actually converts to exchanged value. Together these metrics instrument the core loop end to end, and the Analytics Service is built to compute them from day one.

### 33.4 Instrumentation

Every metric is derived from events the platform already emits for the economy and engagement, so measurement is a natural byproduct of the architecture rather than a separate tracking effort. This tight coupling between what the platform does and what it measures means the team can see, early and clearly, whether the loop is closing.

---

## 34. Scaling Vision and Roadmap

Ascendra is designed to grow through distinct stages, each roughly an order of magnitude larger than the last, with the architecture's fundamentals holding throughout.

```
MVP  →  V1  →  V2  →  V3
1K   →  10K  →  100K →  1M+
                       Global Learning Economy
```

### 34.1 MVP — 1,000 Users

Prove the core loop and the constrained economy. Validate that learners contribute and that contribution produces earnable value. Establish the economic-integrity, security, and observability foundations that everything later depends on. Keep scope narrow and the loop tight.

### 34.2 V1 — 10,000 Users

Broaden the loop. Activate the full mentor marketplace, guild competitions, and the project marketplace's bounty economy. Expand the AI suite to all four personas. Mature Skill Coin on-chain settlement and open compliant withdrawal paths. Harden anti-abuse as the economy's real-money stakes rise with scale.

### 34.3 V2 — 100,000 Users

Scale and deepen. Push the horizontal-scaling tactics (partitioning, replicas, caching, CQRS) to their stride. Introduce community governance weighted by reputation. Expand regional payment and compliance coverage. Invest heavily in trust-and-safety automation as content and economic volume grow.

### 34.4 V3 — 1,000,000+ Users

A global learning economy. The platform operates at scale as self-sustaining infrastructure connecting learners, contributors, mentors, and opportunities worldwide, with reputation and credentials portable and verifiable anywhere. The loop runs at population scale: each cohort of learners becoming the next cohort's contributors and mentors.

### 34.5 What Stays Constant

Across every stage, the load-bearing decisions hold: separated currencies with append-only ledgers, contribution as the sole source of Reputation and Skill Coins, economic integrity above availability, trust that cannot be bought, free education, and user-owned credentials. These are the things this document fixes precisely because they are expensive to change later; the rest is allowed to evolve.

---

## 35. Technical Principles

The founding technical principles are restated here as the durable commitments that govern all engineering decisions, each now connected to the architecture that enforces it.

1. **Education remains free forever.** Learning endpoints never gate on payment; entitlement to content is independent of billing state.
2. **Premium features accelerate progress.** Revenue comes from acceleration and exchange, never from access to fundamentals.
3. **Contribution creates value.** Contribution is the sole source of Skill Coins and the primary source of Reputation, enforced by the validation pipeline and separated mint authority.
4. **Reputation cannot be bought.** No payment or coin operation can touch the Reputation ledger; non-purchasability is a structural invariant.
5. **Skill Coins reward verified contributions.** Every mint is keyed to a validated contribution event that cleared anti-abuse screening, recorded as an immutable entry.
6. **Blockchain records ownership.** Achievements, reputation proofs, and Skill Coins are anchored on-chain so users own what they earn, with off-chain authority for performance.
7. **AI enhances learning.** AI augments and accelerates but never gates fundamentals and never generates economic reward on its own.
8. **Community drives growth.** Reputation confers standing and, at maturity, governance, making the most trusted users stewards of the platform.

> The platform succeeds when learners become professionals and professionals help create the next generation of learners.

---

## 36. Risk Register and Mitigations

A foundation document names its major risks so that mitigations are designed in rather than discovered late.

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| 1 | Economic gaming / reputation farming | Corrupts trust and devalues currency | Contribution validation pipeline, anti-abuse screening, reward caps, anomaly detection, severe misconduct penalties. |
| 2 | Double-mint / double-spend under retries | Currency fabrication or loss | Append-only ledgers, idempotency keys everywhere, transactional outbox, reconciliation jobs. |
| 3 | Account takeover | Fraud, theft of earned value | MFA, refresh-token rotation with reuse detection, breach-password screening, rate limiting. |
| 4 | Withdrawal fraud / AML exposure | Legal and financial risk | KYC/AML at the fiat boundary, velocity limits, transaction monitoring, withdrawal sagas. |
| 5 | Chain congestion / failure | Delayed anchoring | Off-chain authority, async anchoring with retries, confirmation-depth waits; product unaffected. |
| 6 | Smart-contract vulnerability | Loss of on-chain assets | Minimal contract scope, Move's resource safety, pre-mainnet audits, key custody with separation of duties. |
| 7 | AI cost blowout / hallucination | Sustainability and quality | Model routing, budgets, caching, grounding, output validation, evaluation suites. |
| 8 | Sandbox escape in code execution | Security breach | Judge0 isolation, strict resource/network limits, anti-corruption boundary. |
| 9 | Content abuse / spam | Quality and safety degradation | Community reporting (rewarded), moderation, validation pipeline, reputation penalties. |
| 10 | Distributed-monolith coupling | Lost evolvability | Bounded contexts, database-per-service, event-driven decoupling, stable Economy Core contract. |
| 11 | Privacy/erasure vs immutable records | Compliance conflict | Identity/economic-record separation; on-chain anchors keyed to pseudonymous wallets. |
| 12 | Low contribution rate | Thesis failure | Engagement design that surfaces contribution rewards; early measurement via the 15% metric. |

---

## 37. Testing and Quality Strategy

A system whose central promise is economic integrity cannot treat testing as an afterthought. This section defines how Ascendra establishes confidence that the invariants in Appendix I actually hold — not once, but continuously as twelve services evolve independently. The strategy is layered: each layer catches a different class of defect, and the economy receives disproportionate attention because it is the most expensive thing to get wrong.

### 37.1 The Testing Pyramid, Weighted Toward Invariants

Ascendra follows a conventional testing pyramid — many fast unit tests, fewer integration tests, fewer still end-to-end tests — but tilts the investment toward the economic core. A bug in a recommendation carousel is a nuisance; a bug that mints a Skill Coin from a learning event is a breach of the platform's foundational promise. Test density therefore tracks blast radius, not lines of code. The Economy Core, the contribution validation pipeline, and the ledgers carry the highest coverage requirements in the codebase, including property-based tests that assert invariants hold across large randomized input spaces rather than just hand-picked cases.

### 37.2 Unit and Property Testing of Economic Rules

The deterministic rules — XP formulas, reputation deltas, level thresholds, Skill Coin amounts — are pure functions and are tested as such. Beyond example-based cases, the economy uses property-based testing to assert universal statements: that no sequence of learning events ever produces a Skill Coin, that reputation is monotonic under contribution and only decreases through explicit penalty events, that a derived balance always equals the sum of its ledger entries, and that self-dealing inputs are always rejected. These properties are the executable form of the invariants checklist, and a failure in any of them blocks the build.

### 37.3 Contract Testing Between Services

Because services communicate through APIs and events rather than shared tables, the contracts between them are where integration defects hide. Ascendra uses consumer-driven contract tests: each consumer declares the shape it expects from an event or endpoint, and the producer's build verifies it still satisfies every declared expectation. This catches the most dangerous class of distributed defect — a producer making a change that is locally valid but silently breaks a downstream consumer — at build time rather than in production. The event envelope's versioning rules from Section 30 are enforced here: a breaking change without a version bump fails the producer's contract suite.

### 37.4 Integration and End-to-End Flows

The sequence flows in Section 31 double as the specification for end-to-end tests. Each flow — lesson completion to XP award, accepted answer to coin mint, reputation crossing to capability grant, bounty completion to escrow release — has an automated test that exercises the real services across the bus and asserts both the user-visible outcome and the ledger state. These tests deliberately include the asynchronous settling: they assert not only that the learner sees completion immediately, but that the reward arrives correctly a beat later, and that it arrives exactly once even when the triggering event is delivered more than once.

### 37.5 Idempotency and Failure-Injection Testing

At-least-once delivery means duplicate events are not an edge case but an expectation. Every consumer of an economic event is tested by deliberately redelivering the same event and asserting the ledger moves exactly once. Failure injection extends this: tests kill the Economy Core mid-flow and assert that learning still succeeds and rewards reconcile on recovery; they stall the blockchain and assert coins remain usable while anchoring backlogs; they sever the message bus and assert the transactional outbox replays without loss. These drills verify the "fails closed" and "off-chain authoritative" decisions behave as designed under real fault conditions rather than only on paper.

### 37.6 Reconciliation as Continuous Verification

Some guarantees are best checked in production, continuously. Reconciliation jobs recompute balances from ledger history and compare them to cached totals; they verify every minted coin has a validated source event; they cross-check that every completed bounty has both a settlement and a mint; they confirm anchored hashes match their ledger entries. Divergence raises an operator alert rather than silently self-correcting, because in an economy a silent correction can mask the very fraud the reconciliation exists to detect. Reconciliation is the safety net beneath all the pre-production testing: even if a defect escapes every earlier layer, it surfaces here as a measurable discrepancy.

### 37.7 Quality Gates in the Pipeline

These practices are enforced, not aspirational. The CI pipeline blocks a merge that drops economic-path coverage below threshold, that breaks a consumer contract, that fails a property test, or that violates a performance budget. The result is that the invariants in Appendix I are defended by automation at every stage from a developer's first commit to continuous production reconciliation — which is the only way a guarantee survives contact with a growing team and a growing system.

---

## 38. Appendices

### Appendix A — Consolidated Economy Reference

**XP awards.** Lesson = difficulty × 10 (Easy 10, Medium 25, Hard 50). Project = difficulty × 100 (Beginner 100, Intermediate 300, Advanced 1,000). Quests: Daily 50, Weekly 250, Monthly 1,000.

**Reputation awards.** Accepted Answer +15, Project Review Approved +20, Mentorship Session Completed +30, Community Article Published +50, Spam Report Validated +10. Penalties: Spam −50, Abuse −100, Plagiarism −250.

**Skill Coin awards.** Accepted Answer 1, Project Review 3, Mentorship Session 5–50, Guild Event Winner 25, Bounty Completion variable. Rule: contribution only; consumption never mints.

**Reputation tiers.** L1 Learner 0, L2 Contributor 100, L3 Trusted Contributor 500, L4 Mentor 1,000, L5 Expert 5,000, L6 Master 10,000.

### Appendix B — Service Index

Authentication, Learning, Assessment, Community, Guild, Mentor, Marketplace, Payment, Blockchain, AI, Notification, Analytics — plus the Economy Core (XP, Reputation, Skill Coin ledgers) as a distinct, jointly-owned authority.

### Appendix C — Module Index

Learning Engine, Contribution Network, Guild System, Mentor Marketplace, Project Marketplace, AI Ecosystem, Blockchain Layer.

### Appendix D — Role Index

Guest, Learner, Builder, Mentor, Expert, Instructor, Moderator, Administrator — earned (Builder, Mentor, Expert) and assigned (Instructor, Moderator, Administrator).

### Appendix E — Key Architectural Decisions (Summary)

1. Economic integrity outranks availability; the economy fails closed.
2. Three separated currencies with append-only ledgers and distinct rules.
3. Contribution is the sole source of Skill Coins and primary source of Reputation.
4. Reputation is non-purchasable by structural invariant, not policy.
5. Database-per-service; no cross-service database access.
6. Event-driven side effects with transactional outbox and idempotent consumers.
7. Hybrid blockchain: off-chain authoritative ledger, on-chain ownership, async anchoring.
8. AI augments but never gates fundamentals or mints reward.
9. Identity and economic record are separated to reconcile privacy with immutability.
10. The same horizontally-scalable architecture serves MVP through global scale.

### Appendix F — Forward References to Companion Documents

| Topic | See |
|---|---|
| Table definitions, indexes, partitioning | Part 2 — Database Schema |
| Per-service API contracts and flows | Part 3 — Backend Services |
| Move modules, mint/burn logic, audit scope | Part 4 — Smart Contracts |
| Prompt architecture, model routing, guardrails | Part 5 — AI Services |
| Component system, state, design tokens | Part 6 — Frontend Architecture |
| Environments, IaC, pipelines, DR runbooks | Part 7 — DevOps & Infrastructure |
| Threat model, controls, data governance | Part 8 — Security & Compliance |

### Appendix G — Non-Functional Requirements Matrix

This matrix consolidates the quality attributes from Section 6 into concrete, checkable requirements. It exists so that every later part of the series can be tested against a single agreed list rather than re-deriving expectations.

| # | Attribute | Requirement | How It Is Verified |
|---|---|---|---|
| NFR-1 | Economic Integrity | Every Skill Coin in existence traces to exactly one validated contribution event | Ledger reconciliation reports; mint-without-source alerts |
| NFR-2 | Economic Integrity | No balance is ever derived from a mutable total; all balances reconstruct from ledger history | Periodic recompute-and-compare audits |
| NFR-3 | Security | No reputation increment exists outside validated contribution paths | Static analysis of write paths; code-review gate |
| NFR-4 | Security | All cross-service calls are authenticated and authorized at the gateway and the service | Contract tests; penetration testing |
| NFR-5 | Availability | Learning and contribution remain available when the economy is degraded | Chaos drills disabling the Economy Core |
| NFR-6 | Availability | The economy fails closed, never producing an incorrect write under load | Load tests asserting reject-over-corrupt behavior |
| NFR-7 | Scalability | Architecture supports the MVP-to-V3 path (1K → 1M+) without boundary redesign | Capacity modeling (Appendix H) |
| NFR-8 | Performance | Public pages paint fast; authenticated interactions stay responsive; heavy work is async | Performance budgets in CI |
| NFR-9 | Evolvability | Any single service can change its schema without coordinating with others | Database-per-service audit; no cross-service table access |
| NFR-10 | Observability | Every economic write is traceable end-to-end via correlation id | Trace-coverage checks on economy flows |

### Appendix H — Capacity and Scaling Reference

This table pairs each scaling stage with the architectural moves that carry the platform to the next. It is a planning reference, not a commitment to specific infrastructure, which is detailed in Part 7.

| Stage | Users | Dominant Load | Primary Scaling Moves |
|---|---|---|---|
| MVP | 1,000 | Lesson completions, early contributions | Single-region deployment; vertical headroom; read replicas for hot reads |
| V1 | 10,000 | Contribution volume, mentorship sessions | Horizontal scaling of stateless services; cache expansion; queue-backed reward processing |
| V2 | 100,000 | Economy throughput, search, analytics | Partitioned ledgers with snapshots; dedicated search and analytics paths; anchoring batched |
| V3 | 1,000,000+ | Global concurrent load across all loops | Multi-region; data locality; sharded high-volume domains; sustained async-first processing |

Across every stage two things stay constant: the service boundaries do not move, and the economy's correctness guarantees do not weaken. Scaling adds capacity behind stable contracts rather than reshaping them — the property that makes the roadmap executable without rewrites.

### Appendix I — Economic Invariants Checklist

These are the invariants that must hold at all times and that every later part of the series, every code review, and every audit should check against. They are gathered here as a single authoritative list because they are the decisions most expensive to get wrong.

1. Skill Coins are minted only by validated contribution events; learning never mints coins.
2. There is exactly one minting code path, and it is gated by the contribution validation pipeline.
3. Reputation increases only through validated contribution; it is never purchasable and never appears in a payment flow.
4. XP, reputation, and Skill Coins live in three separate append-only ledgers and never convert into one another.
5. All balances are derived from ledger history; no mutable balance total is authoritative.
6. Self-dealing is structurally blocked: a user cannot accept their own answer or confirm their own mentorship for reward.
7. Off-chain ledgers are authoritative; the blockchain is a mirror, and no user operation blocks on a chain write.
8. Anchoring is idempotent; duplicate confirmations are recognized and ignored.
9. AI output never directly awards currency or gates progression; economic consequences are always deterministic.
10. Under failure or extreme load, economic operations fail closed — they reject or slow rather than risk an incorrect write.
11. Identity is stored separately from economic facts, so erasure is possible without rewriting an immutable ledger.
12. Every state change that has economic meaning is published as an event via the transactional outbox; no economic state change is ever silently unaccompanied by its event.


### Appendix J — Open Questions and Assumptions for Parts 2–8

A foundation document earns its keep partly by being honest about what it has *not* yet decided. The choices below are deliberately deferred to later parts, where they can be made with more detail and less risk. Recording them here prevents two failure modes: silently assuming a question is settled when it is not, and re-litigating a question that was in fact intentionally left open. Each item names the open question, the working assumption Part 1 proceeds under, and the part that will resolve it.

**Ledger snapshotting cadence.** Balances derive from append-only history, which grows without bound. The working assumption is that periodic snapshots bound reconstruction cost. The exact cadence, snapshot format, and verification procedure are resolved in Part 2 (Database Schema), where the ledger tables and their partitioning are specified.

**Skill Coin withdrawal mechanics.** Coins are withdrawable, but the precise on-ramp and off-ramp — custody model, withdrawal thresholds, fees, and the boundary between off-chain balance and on-chain asset at the moment of withdrawal — are deferred. Part 4 (Smart Contracts) defines the Move modules and the mint/withdraw boundary; Part 8 (Security & Compliance) defines the regulatory and anti-abuse controls around it.

**Mentorship Skill Coin band.** A completed session awards a variable amount within a defined band. The factors that position an award within that band — session length, mentee outcome signals, mentor level — are an economic-design question deferred to Part 3 (Backend Services), where the Mentor Service's reward logic is specified.

**Contribution validation thresholds.** The four-stage pipeline is defined structurally in Part 1, but the concrete thresholds for the rate-and-anomaly stage — what rate is "implausible," what pattern trips a sock-puppet check — are intentionally left to Part 3, because they require real behavioral data to set responsibly and will be tuned over time.

**AI grounding sources and routing.** Section 24 establishes that AI augments but never gates or mints, and that output is grounded and guarded. The specific retrieval sources, model-routing policy, and guardrail implementation are deferred to Part 5 (AI Services).

**Search and analytics data paths.** Elasticsearch and the analytics pipeline are named in the stack, but their indexing strategy, freshness guarantees, and the boundary between operational and analytical data stores are deferred to Parts 2 and 7.

**Multi-region data locality.** The scaling vision reaches multi-region at V3. The data-residency model, replication topology, and how the authoritative off-chain ledgers behave across regions are deferred to Part 7 (DevOps & Infrastructure), since they do not affect the MVP and would be premature to fix now.

**Payment provider routing.** Stripe, GCash, and Maya are named, but the logic that routes a given transaction to a given provider — by geography, amount, or currency — and the reconciliation between provider settlement and internal records is deferred to Part 3 and Part 8.

In every case the Part 1 commitment is the *boundary*, not the *fill*: the service that owns the decision, the invariant the decision must respect, and the event or contract through which its outcome becomes visible are fixed here. What remains open is the detail inside that boundary — exactly the kind of choice that is cheap to change later and therefore correct to defer.


---

<div align="center">

**End of Part 1 — Master Architecture**

*Ascendra · Learn. Build. Contribute. Earn.*

</div>
