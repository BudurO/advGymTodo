import type { Todo, Weekday } from "../domain/todo";
import { TaskCard } from "./TaskCard";

export function DayColumn({
  day,
  todos,
  onToggle,
  onDelete,
}: {
  day: Weekday;
  todos: Todo[];
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}) {
  const doneCount = todos.filter((t) => t.isCompleted).length;

  return (
    <div className="flex h-full min-h-40 flex-col rounded-2xl border border-pink-200 bg-white/80 p-3 shadow-sm">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <div>
          <p className="text-sm font-extrabold tracking-wide text-pink-700">
            {day.short}
          </p>
          <p className="text-xs text-pink-400">{day.label}</p>
        </div>
        {todos.length > 0 && (
          <span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-semibold text-pink-600">
            {doneCount}/{todos.length}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {todos.length > 0 ? (
          todos.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="m-auto text-xs text-pink-200">Drop a task here</p>
        )}
      </div>
    </div>
  );
}
