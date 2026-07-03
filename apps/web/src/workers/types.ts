/**
 * Shared message type contracts for all Web Workers.
 * Each request carries an `id` so the main thread can match responses to callers.
 */

export type RequestId = string;

// ---------------------------------------------------------------------------
// Markdown Worker — parse markdown to a JSON AST off the main thread
// ---------------------------------------------------------------------------

export type InlineNode =
  | { type: "text"; text: string }
  | { type: "code"; text: string }
  | { type: "bold"; text: string }
  | { type: "em";   text: string };

export type MarkdownNode =
  | { type: "heading"; level: 1 | 2 | 3; inline: InlineNode[] }
  | { type: "paragraph"; inline: InlineNode[] }
  | { type: "codeblock"; lang: string; code: string }
  | { type: "list"; items: InlineNode[][] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "spacer" };

export type MarkdownWorkerRequest = {
  id: RequestId;
  type: "PARSE_MARKDOWN";
  payload: { markdown: string };
};

export type MarkdownWorkerResponse = {
  id: RequestId;
  type: "PARSE_MARKDOWN_RESULT";
  payload: { nodes: MarkdownNode[] };
};

// ---------------------------------------------------------------------------
// Economy Worker
// ---------------------------------------------------------------------------

export type EconomyWorkerRequest =
  | {
      id: RequestId;
      type: "FORMAT_SNAPSHOT";
      payload: {
        total_xp: number;
        total_reputation: number;
        skill_coin_balance: number;
        reputation_level: number;
        xp_to_next_level: number | null;
      };
    }
  | {
      id: RequestId;
      type: "FORMAT_COMPACT_BATCH";
      payload: { values: number[] };
    };

export type EconomyWorkerResponse =
  | {
      id: RequestId;
      type: "FORMAT_SNAPSHOT_RESULT";
      payload: {
        xp_formatted: string;
        rep_formatted: string;
        sc_formatted: string;
        tier_color: string;
        xp_progress_label: string;
        xp_progress_percent: number;
      };
    }
  | {
      id: RequestId;
      type: "FORMAT_COMPACT_BATCH_RESULT";
      payload: { formatted: string[] };
    };

// ---------------------------------------------------------------------------
// Data Worker
// ---------------------------------------------------------------------------

export type SortDirection = "asc" | "desc";

export type DataWorkerRequest =
  | {
      id: RequestId;
      type: "SORT";
      payload: {
        items: Record<string, unknown>[];
        field: string;
        direction: SortDirection;
      };
    }
  | {
      id: RequestId;
      type: "SEARCH";
      payload: {
        items: Record<string, unknown>[];
        query: string;
        fields: string[];
      };
    }
  | {
      id: RequestId;
      type: "FILTER";
      payload: {
        items: Record<string, unknown>[];
        filters: Record<string, unknown>;
      };
    }
  | {
      id: RequestId;
      type: "SORT_AND_SEARCH";
      payload: {
        items: Record<string, unknown>[];
        query: string;
        searchFields: string[];
        sortField: string;
        sortDirection: SortDirection;
      };
    };

export type DataWorkerResponse =
  | {
      id: RequestId;
      type: "SORT_RESULT";
      payload: { items: Record<string, unknown>[] };
    }
  | {
      id: RequestId;
      type: "SEARCH_RESULT";
      payload: { items: Record<string, unknown>[]; total: number };
    }
  | {
      id: RequestId;
      type: "FILTER_RESULT";
      payload: { items: Record<string, unknown>[] };
    }
  | {
      id: RequestId;
      type: "SORT_AND_SEARCH_RESULT";
      payload: { items: Record<string, unknown>[]; total: number };
    };
