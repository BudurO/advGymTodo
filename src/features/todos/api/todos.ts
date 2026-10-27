import { supabase } from "@/lib/supabase";
import type { Todo, WeekdayKey } from "../types";
import { isWeekdayKey } from "../utils/todo";

type TodoRow = {
  id: string;
  title: string;
  day: string | null;
  is_completed: boolean;
};

const toTodo = (row: TodoRow): Todo => ({
  id: row.id,
  title: row.title,
  day: row.day && isWeekdayKey(row.day) ? row.day : null,
  isCompleted: row.is_completed,
});

export async function fetchTodos(): Promise<Todo[]> {
  const { data, error } = await supabase
    .from("todos")
    .select("id, title, day, is_completed")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as TodoRow[]).map(toTodo);
}

export async function insertTodos(userId: string, todos: Todo[]) {
  const { error } = await supabase.from("todos").insert(
    todos.map((t) => ({
      id: t.id,
      user_id: userId,
      title: t.title,
      day: t.day,
      is_completed: t.isCompleted,
    }))
  );
  if (error) throw error;
}

export async function updateTodoDay(taskId: string, day: WeekdayKey | null) {
  const { error } = await supabase.from("todos").update({ day }).eq("id", taskId);
  if (error) throw error;
}

export async function updateTodoCompleted(taskId: string, isCompleted: boolean) {
  const { error } = await supabase
    .from("todos")
    .update({ is_completed: isCompleted })
    .eq("id", taskId);
  if (error) throw error;
}

export async function deleteTodoRow(taskId: string) {
  const { error } = await supabase.from("todos").delete().eq("id", taskId);
  if (error) throw error;
}
