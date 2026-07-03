"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Thrown when a worker is terminated during normal component unmount.
 * Consumers can catch and ignore this to avoid spurious runtime errors.
 */
export class WorkerTerminatedError extends Error {
  constructor() {
    super("Worker terminated");
    this.name = "WorkerTerminatedError";
  }
}

type PendingResolver = {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
};

/**
 * Generic Web Worker hook.
 *
 * Spawns one worker per hook instance, wires up promise-based request/response
 * matching via a shared `id` field, and terminates the worker on unmount.
 *
 * Usage:
 *   const send = useWebWorker<MyRequest, MyResponse>(() =>
 *     new Worker(new URL('../workers/my.worker.ts', import.meta.url))
 *   );
 *   const result = await send({ id: crypto.randomUUID(), type: 'DO_THING', payload: ... });
 */
export function useWebWorker<
  TRequest extends { id: string },
  TResponse extends { id: string },
>(workerFactory: () => Worker) {
  const factoryRef = useRef(workerFactory);
  const workerRef = useRef<Worker | null>(null);
  const pendingRef = useRef<Map<string, PendingResolver>>(new Map());

  useEffect(() => {
    const worker = factoryRef.current();
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent<TResponse>) => {
      const pending = pendingRef.current.get(e.data.id);
      if (pending) {
        pending.resolve(e.data);
        pendingRef.current.delete(e.data.id);
      }
    };

    worker.onerror = (e: ErrorEvent) => {
      pendingRef.current.forEach(({ reject }) =>
        reject(new Error(e.message ?? "Worker error"))
      );
      pendingRef.current.clear();
    };

    return () => {
      worker.terminate();
      workerRef.current = null;
      pendingRef.current.forEach(({ reject }) =>
        reject(new WorkerTerminatedError())
      );
      pendingRef.current.clear();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const send = useCallback(<R extends TResponse>(request: TRequest): Promise<R> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        reject(new Error("Worker not ready"));
        return;
      }
      pendingRef.current.set(request.id, {
        resolve: resolve as (v: unknown) => void,
        reject,
      });
      workerRef.current.postMessage(request);
    });
  }, []);

  return send;
}

/** Stable ID generator for worker request correlation. */
export function workerId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}
