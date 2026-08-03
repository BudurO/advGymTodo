import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";

export function Droppable({
  id,
  children,
  className,
}: {
  id: string;
  children?: ReactNode;
  className?: string;
}) {
  const { ref, isDropTarget } = useDroppable({ id });

  return (
    <div
      ref={ref}
      className={className}
      style={
        isDropTarget
          ? {
              boxShadow: "0 0 0 3px #ec4899",
              backgroundColor: "rgba(236, 72, 153, 0.08)",
              borderRadius: "1rem",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
