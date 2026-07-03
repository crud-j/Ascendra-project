/**
 * Data Web Worker — runs sort, filter, and search operations in a background
 * thread so large lists of courses, bounties, guilds, and mentors never stall
 * the main thread while the user is scrolling or typing.
 */
import type { DataWorkerRequest, DataWorkerResponse, SortDirection } from "./types";

function sortItems(
  items: Record<string, unknown>[],
  field: string,
  direction: SortDirection
): Record<string, unknown>[] {
  return [...items].sort((a, b) => {
    const av = a[field];
    const bv = b[field];

    if (typeof av === "number" && typeof bv === "number") {
      return direction === "asc" ? av - bv : bv - av;
    }

    const as = String(av ?? "").toLowerCase();
    const bs = String(bv ?? "").toLowerCase();
    const cmp = as.localeCompare(bs);
    return direction === "asc" ? cmp : -cmp;
  });
}

function searchItems(
  items: Record<string, unknown>[],
  query: string,
  fields: string[]
): Record<string, unknown>[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  return items.filter((item) =>
    fields.some((field) => {
      const val = item[field];
      if (Array.isArray(val)) {
        return val.some((v) => String(v).toLowerCase().includes(q));
      }
      return String(val ?? "").toLowerCase().includes(q);
    })
  );
}

function filterItems(
  items: Record<string, unknown>[],
  filters: Record<string, unknown>
): Record<string, unknown>[] {
  return items.filter((item) =>
    Object.entries(filters).every(([key, value]) => {
      if (value === undefined || value === null || value === "") return true;
      const itemVal = item[key];
      if (Array.isArray(itemVal)) return itemVal.includes(value);
      return itemVal === value;
    })
  );
}

self.addEventListener("message", (e: MessageEvent<DataWorkerRequest>) => {
  const req = e.data;

  if (req.type === "SORT") {
    const { items, field, direction } = req.payload;
    const response: DataWorkerResponse = {
      id: req.id,
      type: "SORT_RESULT",
      payload: { items: sortItems(items, field, direction) },
    };
    self.postMessage(response);
    return;
  }

  if (req.type === "SEARCH") {
    const { items, query, fields } = req.payload;
    const found = searchItems(items, query, fields);
    const response: DataWorkerResponse = {
      id: req.id,
      type: "SEARCH_RESULT",
      payload: { items: found, total: found.length },
    };
    self.postMessage(response);
    return;
  }

  if (req.type === "FILTER") {
    const { items, filters } = req.payload;
    const response: DataWorkerResponse = {
      id: req.id,
      type: "FILTER_RESULT",
      payload: { items: filterItems(items, filters) },
    };
    self.postMessage(response);
    return;
  }

  if (req.type === "SORT_AND_SEARCH") {
    const { items, query, searchFields, sortField, sortDirection } = req.payload;
    const searched = searchItems(items, query, searchFields);
    const sorted = sortItems(searched, sortField, sortDirection);
    const response: DataWorkerResponse = {
      id: req.id,
      type: "SORT_AND_SEARCH_RESULT",
      payload: { items: sorted, total: sorted.length },
    };
    self.postMessage(response);
  }
});
