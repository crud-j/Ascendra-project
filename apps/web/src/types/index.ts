/**
 * Shared TypeScript types for Ascendra frontend.
 *
 * These types mirror the backend Pydantic schemas. When a backend schema
 * changes, update the corresponding type here and fix any TypeScript errors
 * to catch regressions at compile time.
 */

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export interface User {
  id: string;
  email: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  wallet_address: string | null;
  is_active: boolean;
  is_verified: boolean;
  role: "guest" | "learner" | "instructor" | "moderator" | "administrator";
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  expires_in: number;
}

// ---------------------------------------------------------------------------
// Economy (Three-Currency Model)
// ---------------------------------------------------------------------------

/**
 * Full economy snapshot for the economy bar.
 * Balances are derived from ledger sums — never from a mutable total.
 * See Economy Core's BalanceService.
 */
export interface EconomySnapshot {
  user_id: string;
  total_xp: number;
  total_reputation: number;
  skill_coin_balance: number;
  reputation_level: 1 | 2 | 3 | 4 | 5 | 6;
  reputation_title:
    | "Learner"
    | "Contributor"
    | "Trusted Contributor"
    | "Mentor"
    | "Expert"
    | "Master";
  xp_to_next_level: number | null;
}

export const REPUTATION_TIERS: Record<
  number,
  { title: string; min_reputation: number; color: string }
> = {
  1: { title: "Learner", min_reputation: 0, color: "text-slate-500" },
  2: { title: "Contributor", min_reputation: 100, color: "text-blue-500" },
  3: { title: "Trusted Contributor", min_reputation: 500, color: "text-green-500" },
  4: { title: "Mentor", min_reputation: 1000, color: "text-purple-500" },
  5: { title: "Expert", min_reputation: 5000, color: "text-orange-500" },
  6: { title: "Master", min_reputation: 10000, color: "text-yellow-500" },
};

// ---------------------------------------------------------------------------
// Learning
// ---------------------------------------------------------------------------

export type Difficulty = "easy" | "medium" | "hard";
export type CourseDifficulty = "beginner" | "intermediate" | "advanced";
export type QuestType = "daily" | "weekly" | "monthly";

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: CourseDifficulty;
  thumbnail_url: string | null;
  lesson_count: number;
  estimated_hours: number;
  is_enrolled: boolean;
  progress_percent: number;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  difficulty: Difficulty;
  xp_eligible: number;
  is_completed: boolean;
  order: number;
}

// ---------------------------------------------------------------------------
// Community
// ---------------------------------------------------------------------------

export interface Question {
  id: string;
  title: string;
  body: string;
  author_id: string;
  author_username: string;
  tags: string[];
  vote_count: number;
  answer_count: number;
  has_accepted_answer: boolean;
  created_at: string;
}

export interface Answer {
  id: string;
  question_id: string;
  body: string;
  author_id: string;
  author_username: string;
  vote_count: number;
  is_accepted: boolean;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Guild
// ---------------------------------------------------------------------------

export interface Guild {
  id: string;
  name: string;
  description: string;
  member_count: number;
  badge_url: string | null;
  is_member: boolean;
}

// ---------------------------------------------------------------------------
// Mentor
// ---------------------------------------------------------------------------

export interface MentorProfile {
  user_id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  reputation_level: number;
  reputation_title: string;
  specializations: string[];
  session_rate_coins: number;
  rating: number;
  session_count: number;
}

export interface MentorSession {
  id: string;
  mentor_id: string;
  mentee_id: string;
  scheduled_at: string;
  duration_minutes: number;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  skill_coins_earned: number | null;
}

// ---------------------------------------------------------------------------
// Marketplace
// ---------------------------------------------------------------------------

export interface Bounty {
  id: string;
  title: string;
  description: string;
  skill_coin_reward: number;
  posted_by_id: string;
  posted_by_username: string;
  status: "open" | "in_progress" | "completed" | "cancelled";
  deadline: string | null;
  tags: string[];
  created_at: string;
}

// ---------------------------------------------------------------------------
// API Response wrappers
// ---------------------------------------------------------------------------

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  has_next: boolean;
}

export interface ApiError {
  detail: string;
  status_code?: number;
}
