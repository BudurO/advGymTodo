import { Draggable } from "@/components/dnd/Draggable";
import type { Todo } from "../types";
import { taskDragId } from "../utils/dragIds";

export function TaskCard({
  task,
  onToggle,
  onDelete,
}: {
  task: Todo;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}) {
  return (
    <Draggable id={taskDragId(task.id)}>
      <div
        className={`group flex items-center gap-2 rounded-xl border px-3 py-2 shadow-sm transition ${
          task.isCompleted
            ? "border-green-300 bg-green-50"
            : "border-pink-200 bg-pink-50 hover:border-pink-300"
        }`}
      >
        <button
          type="button"
          aria-label={
            task.isCompleted ? "Mark as not completed" : "Mark as completed"
          }
          onClick={() => onToggle(task.id)}
          className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition ${
            task.isCompleted
              ? "border-green-500 bg-green-500 text-white"
              : "border-pink-400 bg-white text-transparent hover:text-pink-300"
          }`}
        >
          ✓
        </button>
        <p
          className={`min-w-0 flex-1 break-words text-sm font-semibold ${
            task.isCompleted
              ? "text-green-700 line-through opacity-70"
              : "text-pink-900"
          }`}
        >
          {task.title}
        </p>
        <button
          type="button"
          aria-label="Delete task"
          onClick={() => onDelete(task.id)}
          className="ml-auto shrink-0 rounded-md bg-pink-600 px-1.5 py-0.5 text-xs font-bold text-white shadow-sm transition hover:bg-pink-700 active:scale-95"
        >
          ✕
        </button>
      </div>
    </Draggable>
  );
}
