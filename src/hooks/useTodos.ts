import { useEffect, useState } from "react";
import { createTodo, type Todo, type WeekdayKey } from "../domain/todo";
import { loadTodos, saveTodos } from "../services/todoStorage";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTodos((current) => [createTodo(trimmed), ...current]);
  };

  const moveTodo = (taskId: string, day: WeekdayKey | null) => {
    setTodos((current) =>
      current.map((t) => (t.id === taskId ? { ...t, day } : t))
    );
  };

  const toggleCompleted = (taskId: string) => {
    setTodos((current) =>
      current.map((t) =>
        t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  const deleteTodo = (taskId: string) => {
    setTodos((current) => current.filter((t) => t.id !== taskId));
  };

  return { todos, addTodo, moveTodo, toggleCompleted, deleteTodo };
}
