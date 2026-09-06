import { DragDropProvider } from "@dnd-kit/react";
import {
  isWeekdayKey,
  WEEKDAYS,
  type Todo,
  type WeekdayKey,
} from "../domain/todo";
import { DayColumn } from "./DayColumn";
import { TaskCard } from "./TaskCard";
import { Droppable } from "./dnd/Droppable";
import { parseTaskDragId, UNASSIGNED_DROP_ID } from "./dnd/ids";

export function TodoBoard({
  todos,
  onMove,
  onToggle,
  onDelete,
}: {
  todos: Todo[];
  onMove: (taskId: string, day: WeekdayKey | null) => void;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}) {
  const unassignedTasks = todos.filter((t) => t.day === null);

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { source, target } = event.operation;
        if (!source || !target) return;

        const taskId = parseTaskDragId(String(source.id));
        if (!taskId) return;

        const targetId = String(target.id);
        let nextDay: WeekdayKey | null = null;
        if (targetId !== UNASSIGNED_DROP_ID) {
          if (!isWeekdayKey(targetId)) return;
          nextDay = targetId;
        }

        onMove(taskId, nextDay);
      }}
    >
      <section>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-pink-500">
          Unassigned tasks
        </h2>
        <Droppable
          id={UNASSIGNED_DROP_ID}
          className="flex min-h-24 flex-wrap items-start gap-2 rounded-2xl border-2 border-dashed border-pink-300 bg-white/70 p-3 shadow-sm transition"
        >
          {unassignedTasks.length > 0 ? (
            unassignedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))
          ) : (
            <p className="self-center p-2 text-sm text-pink-300">
              No unassigned tasks — add one above or drag one back here
            </p>
          )}
        </Droppable>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-pink-500">
          Weekly plan
        </h2>
        <div className="grid grid-cols-1 gap-3  lg:grid-cols-2">
          {WEEKDAYS.map((day) => {
            const dayTasks = todos.filter((t) => t.day === day.day);
            return (
              <Droppable
                id={day.day}
                key={day.day}
                className="min-h-40 rounded-2xl transition"
              >
                <DayColumn
                  day={day}
                  todos={dayTasks}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              </Droppable>
            );
          })}
        </div>
      </section>
    </DragDropProvider>
  );
}
