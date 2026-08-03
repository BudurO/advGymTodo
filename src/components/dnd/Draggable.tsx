import { useDraggable } from "@dnd-kit/react";
import type { ReactNode } from "react";

export function Draggable({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const { ref, isDragging } = useDraggable({ id });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
      }}
    >
      {children}
    </div>
  );
}
