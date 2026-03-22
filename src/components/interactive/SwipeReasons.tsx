import { useCallback, useState } from 'react';
import { useSwipe } from '../../hooks/useSwipe';

const REASONS = [
  'Ты умеешь смеяться так, что мир становится тише.',
  'С тобой можно молчать и не чувствовать пустоты.',
  'Ты вдохновляешь меня становиться лучше.',
  'Твоя доброта — редкая и настоящая.',
  'Я выбираю нас каждый день.',
];

export default function SwipeReasons() {
  const [index, setIndex] = useState(0);

  const advance = useCallback((dir: 'left' | 'right') => {
    setIndex((i) => {
      if (dir === 'left') return Math.min(i + 1, REASONS.length - 1);
      return Math.max(i - 1, 0);
    });
  }, []);

  const { dragX, handlers } = useSwipe({
    onSwipe: advance,
  });

  const depth = Math.min(REASONS.length - index, 3);

  return (
    <section
      className="flex min-h-[100dvh] w-full flex-col px-4 py-32"
      aria-label="Причины"
    >
      <h2 className="mb-8 text-center font-serif text-[2rem] leading-tight text-primary">
        Почему ты для меня особенная
      </h2>
      <p className="mb-6 text-center text-sm text-primary/70">
        Проведи влево или вправо, чтобы читать дальше.
      </p>
      <div className="relative mx-auto flex min-h-[55dvh] w-full max-w-md flex-1 items-center justify-center overscroll-y-contain">
        <div
          className="relative h-72 w-full max-w-sm touch-none select-none"
          style={{ touchAction: 'none' }}
          {...handlers}
        >
          {Array.from({ length: depth }).map((_, stackI) => {
            const cardIndex = index + stackI;
            if (cardIndex >= REASONS.length) return null;
            const isTop = stackI === 0;
            const offset = stackI * 8;
            const text = REASONS[cardIndex];
            return (
              <div
                key={cardIndex}
                className="absolute inset-x-0 top-0 rounded-2xl border border-accent/40 bg-surface p-8 shadow-lg backdrop-blur-md"
                style={{
                  transform: isTop
                    ? `translate3d(${dragX}px, ${offset}px, 0) rotate(${dragX * 0.04}deg)`
                    : `translate3d(0, ${offset}px, 0) scale(${1 - stackI * 0.03})`,
                  zIndex: 10 - stackI,
                  opacity: 1 - stackI * 0.12,
                }}
              >
                <p className="text-center font-serif text-[1.35rem] leading-snug text-primary">
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
