import { useState, useCallback } from 'react';

export default function HoldToReveal() {
  const [isHeld, setIsHeld] = useState(false);

  const startHold = useCallback(() => {
    setIsHeld(true);
    // Легкая вибрация на Android при касании
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, []);

  const stopHold = useCallback(() => {
    setIsHeld(false);
  }, []);

  return (
    <section className="min-h-[70svh] flex flex-col items-center justify-center px-6 text-center" aria-label="Скрытое послание">
      <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-8 animate-pulse">
        {isHeld ? 'Держи...' : 'Зажми текст пальцем'}
      </h2>

      <div
        className="relative cursor-pointer select-none p-8 md:p-12 border border-accent/30 rounded-3xl bg-surface shadow-xl transition-transform duration-300 w-full max-w-sm touch-none"
        style={{ transform: isHeld ? 'scale(0.96)' : 'scale(1)' }}
        onPointerDown={startHold}
        onPointerUp={stopHold}
        onPointerLeave={stopHold}
        onPointerCancel={stopHold}
        // Отключаем контекстное меню (чтобы на телефоне не вылезало меню "Скопировать")
        onContextMenu={(e) => e.preventDefault()}
      >
        <p
          className={`font-serif text-[1.5rem] leading-relaxed transition-all duration-700 ${
            isHeld
              ? 'blur-none opacity-100 text-primary'
              : 'blur-md opacity-40 text-primary/50'
          }`}
        >
          "Ты — лучшее, что случалось со мной. Моя поддержка, мой свет и мой самый близкий человек. Спасибо за каждый день."
        </p>
      </div>
    </section>
  );
}
