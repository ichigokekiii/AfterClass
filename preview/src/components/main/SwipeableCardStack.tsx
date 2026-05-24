import { useCallback, useEffect, useRef, useState } from 'react';

import { DiscoveryCard } from '@/components/main/DiscoveryCard';
import type { DiscoveryProfile, SwipeAdvance, SwipeDirection } from '@/constants/discovery';

const SWIPE_THRESHOLD = 88;
const DRAG_START_THRESHOLD = 8;
const ROTATION_FACTOR = 0.06;
const EXIT_OFFSET = 520;

type SwipeableCardStackProps = {
  profiles: DiscoveryProfile[];
  detailOpen?: boolean;
  advanceSignal?: number;
  onSwipe?: (profile: DiscoveryProfile, direction: SwipeDirection) => SwipeAdvance | void;
  onReset?: () => void;
  onProfileTap?: (profile: DiscoveryProfile) => void;
};

type PointerSnapshot = {
  x: number;
  y: number;
  time: number;
};

export function SwipeableCardStack({
  profiles,
  detailOpen = false,
  advanceSignal = 0,
  onSwipe,
  onReset,
  onProfileTap,
}: SwipeableCardStackProps) {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [exitX, setExitX] = useState(0);

  const pointerStart = useRef<PointerSnapshot | null>(null);
  const dragStarted = useRef(false);
  const lastAdvanceSignal = useRef(advanceSignal);

  useEffect(() => {
    if (advanceSignal > lastAdvanceSignal.current) {
      setIndex((value) => value + 1);
      lastAdvanceSignal.current = advanceSignal;
    }
  }, [advanceSignal]);

  const current = profiles[index];
  const next = profiles[index + 1];
  const isEmpty = index >= profiles.length;

  const resetDrag = useCallback(() => {
    setDragX(0);
    setIsDragging(false);
    dragStarted.current = false;
    pointerStart.current = null;
  }, []);

  const commitSwipe = useCallback(
    (direction: SwipeDirection) => {
      if (!current || isAnimatingOut) {
        return;
      }

      const targetX = direction === 'like' ? EXIT_OFFSET : -EXIT_OFFSET;
      setIsAnimatingOut(true);
      setExitX(targetX);
      setDragX(targetX);

      const advance = onSwipe?.(current, direction);

      window.setTimeout(() => {
        if (advance !== 'hold') {
          setIndex((value) => value + 1);
        }
        setIsAnimatingOut(false);
        setExitX(0);
        resetDrag();
      }, 220);
    },
    [current, isAnimatingOut, onSwipe, resetDrag],
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isAnimatingOut || detailOpen) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    pointerStart.current = { x: event.clientX, y: event.clientY, time: Date.now() };
    dragStarted.current = false;
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerStart.current || isAnimatingOut || detailOpen) {
      return;
    }

    const deltaX = event.clientX - pointerStart.current.x;
    const deltaY = event.clientY - pointerStart.current.y;

    if (!dragStarted.current) {
      if (Math.abs(deltaX) < DRAG_START_THRESHOLD && Math.abs(deltaY) < DRAG_START_THRESHOLD) {
        return;
      }

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        pointerStart.current = null;
        setIsDragging(false);
        return;
      }

      dragStarted.current = true;
    }

    setDragX(deltaX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerStart.current) {
      resetDrag();
      return;
    }

    const deltaX = event.clientX - pointerStart.current.x;
    const deltaY = event.clientY - pointerStart.current.y;
    const elapsed = Date.now() - pointerStart.current.time;
    const moved = Math.hypot(deltaX, deltaY);

    if (!dragStarted.current && moved < DRAG_START_THRESHOLD && elapsed < 350 && current) {
      onProfileTap?.(current);
      resetDrag();
      return;
    }

    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      commitSwipe(deltaX > 0 ? 'like' : 'pass');
      return;
    }

    resetDrag();
  };

  const handlePointerCancel = () => {
    resetDrag();
  };

  if (isEmpty) {
    return (
      <div className="swipe-stack swipe-stack--empty">
        <p className="swipe-stack__empty-title">You are caught up</p>
        <p className="swipe-stack__empty-body">No more profiles in this preview deck.</p>
        {onReset ? (
          <button type="button" className="swipe-stack__reset" onClick={onReset}>
            Reset deck
          </button>
        ) : null}
      </div>
    );
  }

  const activeTransform = isAnimatingOut
    ? `translateX(${exitX}px) rotate(${exitX * ROTATION_FACTOR}deg)`
    : `translateX(${dragX}px) rotate(${dragX * ROTATION_FACTOR}deg)`;

  const likeOpacity = Math.min(Math.max(dragX / SWIPE_THRESHOLD, 0), 1);
  const passOpacity = Math.min(Math.max(-dragX / SWIPE_THRESHOLD, 0), 1);

  return (
    <div className="swipe-stack" aria-live="polite">
      {next ? (
        <div className="swipe-stack__card swipe-stack__card--behind" aria-hidden="true">
          <DiscoveryCard profile={next} />
        </div>
      ) : null}

      {current ? (
        <div
          className={`swipe-stack__card swipe-stack__card--active${isDragging || isAnimatingOut ? ' swipe-stack__card--dragging' : ''}`}
          style={{ transform: activeTransform }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}>
          <DiscoveryCard profile={current} />

          <div
            className="swipe-stack__stamp swipe-stack__stamp--like"
            style={{ opacity: likeOpacity }}
            aria-hidden="true">
            LIKE
          </div>
          <div
            className="swipe-stack__stamp swipe-stack__stamp--pass"
            style={{ opacity: passOpacity }}
            aria-hidden="true">
            PASS
          </div>
        </div>
      ) : null}
    </div>
  );
}
