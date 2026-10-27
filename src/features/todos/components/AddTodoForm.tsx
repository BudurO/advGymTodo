import { useState } from "react";

export function AddTodoForm({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState("");

  return (
    <form
      className="flex flex-wrap items-center justify-center gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title);
        setTitle("");
      }}
    >
      <label htmlFor="todo" className="sr-only">
        New task
      </label>
      <input
        id="todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-11 w-full max-w-sm rounded-xl border border-pink-300 bg-white px-4 shadow-sm outline-none transition placeholder:text-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
        placeholder="e.g. Leg day, 30 min cardio…"
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={!title.trim()}
        className="h-11 rounded-xl bg-pink-600 px-5 font-semibold text-white shadow-sm transition hover:bg-pink-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Add task
      </button>
    </form>
  );
}
