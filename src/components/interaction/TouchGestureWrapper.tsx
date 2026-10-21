import type { ReactNode } from "react";
import { motion, type PanInfo } from "framer-motion";

export interface TouchGestureWrapperProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

export default function TouchGestureWrapper({
  children,
  onSwipeLeft,
  onSwipeRight,
  className = "",
}: TouchGestureWrapperProps) {
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 75;
    const velocityThreshold = 350;

    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      onSwipeLeft?.();
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      onSwipeRight?.();
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className={`touch-pan-y cursor-grab active:cursor-grabbing ${className}`}
    >
      {children}
    </motion.div>
  );
}
