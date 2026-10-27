import { useEffect, useState } from "react";
import {
  deleteTodoRow,
  fetchTodos,
  insertTodos,
  updateTodoCompleted,
  updateTodoDay,
} from "../api/todos";
import type { Todo, WeekdayKey } from "../types";
import { clearLocalTodos, loadLocalTodos } from "../utils/localTodos";
import { createTodo } from "../utils/todo";

export function useTodos(userId: string) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reportError = (e: unknown) =>
    setError(e instanceof Error ? e.message : "Could not sync with the server");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        let remote = await fetchTodos();

        // One-time migration: move tasks saved in this browser (from the
        // old localStorage version) into the database.
        const local = loadLocalTodos();
        if (remote.length === 0 && local.length > 0) {
          await insertTodos(userId, local);
          remote = local;
        }
        clearLocalTodos();

        if (!cancelled) setTodos(remote);
      } catch (e) {
        if (!cancelled) reportError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Each action updates the UI immediately, then persists to the database.
  const addTodo = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const todo = createTodo(trimmed);
    setTodos((current) => [todo, ...current]);
    insertTodos(userId, [todo]).catch(reportError);
  };

  const moveTodo = (taskId: string, day: WeekdayKey | null) => {
    setTodos((current) =>
      current.map((t) => (t.id === taskId ? { ...t, day } : t))
    );
    updateTodoDay(taskId, day).catch(reportError);
  };

  const toggleCompleted = (taskId: string) => {
    const task = todos.find((t) => t.id === taskId);
    if (!task) return;
    setTodos((current) =>
      current.map((t) =>
        t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
    updateTodoCompleted(taskId, !task.isCompleted).catch(reportError);
  };

  const deleteTodo = (taskId: string) => {
    setTodos((current) => current.filter((t) => t.id !== taskId));
    deleteTodoRow(taskId).catch(reportError);
  };

  return { todos, loading, error, addTodo, moveTodo, toggleCompleted, deleteTodo };
}
