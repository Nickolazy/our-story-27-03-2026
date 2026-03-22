import { useCallback, useRef, useState } from 'react';

export type SwipeDirection = 'left' | 'right';

type Options = {
  onSwipe: (direction: SwipeDirection) => void;
  threshold?: number;
};

export function useSwipe({ onSwipe, threshold = 72 }: Options) {
  const [dragX, setDragX] = useState(0);
  const start = useRef({ x: 0, y: 0 });
  const tracking = useRef(false);

  const resetDrag = useCallback(() => {
    setDragX(0);
    tracking.current = false;
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    tracking.current = true;
    start.current = { x: e.clientX, y: e.clientY };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!tracking.current) return;
    const dx = e.clientX - start.current.x;
    setDragX(dx);
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!tracking.current) return;
      const dx = e.clientX - start.current.x;
      const dy = e.clientY - start.current.y;
      tracking.current = false;
      setDragX(0);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      if (Math.abs(dx) <= Math.abs(dy)) return;
      if (dx > threshold) onSwipe('right');
      else if (dx < -threshold) onSwipe('left');
    },
    [onSwipe, threshold],
  );

  return {
    dragX,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onPointerLeave: resetDrag,
    },
  };
}
