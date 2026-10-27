const TASK_DRAG_PREFIX = "drg-";

export const UNASSIGNED_DROP_ID = "tasks";

export const taskDragId = (taskId: string) => `${TASK_DRAG_PREFIX}${taskId}`;

/** Returns the task id if the drag source is a task, otherwise null. */
export function parseTaskDragId(sourceId: string): string | null {
  return sourceId.startsWith(TASK_DRAG_PREFIX)
    ? sourceId.slice(TASK_DRAG_PREFIX.length)
    : null;
}
