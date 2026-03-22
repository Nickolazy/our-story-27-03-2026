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
  const [exitDir, setExitDir] = useState<number | null>(null);

  const advance = useCallback((dir: 'left' | 'right') => {
    setExitDir(dir === 'left' ? -1 : 1);

    setTimeout(() => {
      setIndex((i) => Math.min(i + 1, REASONS.length - 1));
      setExitDir(null);
    }, 300);
  }, []);

  const { dragX, handlers } = useSwipe({ onSwipe: advance, threshold: 100 });
  const depth = Math.min(REASONS.length - index, 3);

  // Если карточки закончились
  if (index >= REASONS.length - 1 && exitDir === null) {
    return (
      <section className="flex min-h-[50svh] w-full flex-col items-center justify-center px-4 py-32">
        <h2 className="text-center font-serif text-[2rem] text-primary">Это еще не всё...</h2>
        <p className="mt-4 text-primary/70 animate-bounce">Скролль дальше 👇</p>
      </section>
    );
  }

  return (
    <section className="flex min-h-[80svh] w-full flex-col px-4 py-24 overflow-hidden" aria-label="Причины">
      <h2 className="mb-8 text-center font-serif text-[2rem] leading-tight text-primary">
        Почему ты особенная
      </h2>
      <div className="relative mx-auto flex h-[400px] w-full max-w-sm flex-1 items-center justify-center">
        <div
          className="relative h-72 w-full touch-pan-y select-none"
          style={{ touchAction: 'pan-y' }}
          {...handlers}
        >
          {/* Инструкция поверх первой карточки (пока не свайпнул) */}
          {index === 0 && exitDir === null && dragX === 0 && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none opacity-60 animate-pulse">
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Смахни в сторону</span>
              <span className="text-lg mt-1">↔️</span>
            </div>
          )}

          {Array.from({ length: depth }).map((_, stackI) => {
            const cardIndex = index + stackI;
            if (cardIndex >= REASONS.length) return null;

            const isTop = stackI === 0;
            const isExiting = isTop && exitDir !== null;

            const xPos = isExiting ? exitDir * window.innerWidth : (isTop ? dragX : 0);
            const rotation = isExiting ? exitDir * 20 : (isTop ? dragX * 0.05 : 0);
            const scale = isExiting ? 1 : 1 - stackI * 0.05;
            const yOffset = isExiting ? 0 : stackI * 12;

            return (
              <div
                key={cardIndex}
                /* bg-white решает проблему просвечивания. Никакого backdrop-blur! */
                className="absolute inset-x-0 top-0 flex h-full items-center justify-center rounded-3xl border border-accent/20 bg-white p-8 shadow-xl transition-transform"
                style={{
                  transform: `translate3d(${xPos}px, ${yOffset}px, 0) rotate(${rotation}deg) scale(${scale})`,
                  zIndex: 10 - stackI,
                  opacity: isExiting ? 0 : 1, // Нижние карточки тоже непрозрачные, но масштабированы
                  transitionDuration: isTop && dragX !== 0 && !isExiting ? '0ms' : '300ms',
                }}
              >
                <p className="text-center font-serif text-[1.35rem] leading-relaxed text-primary">
                  {REASONS[cardIndex]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
