import { useState, useCallback, useRef } from 'react';

export default function HoldToReveal() {
  const [isHeld, setIsHeld] = useState(false);
  // Используем useRef, чтобы хранить ID нашего таймера
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startHold = useCallback(() => {
    // Запускаем таймер на 350мс. Если палец не убрали - показываем текст.
    timerRef.current = setTimeout(() => {
      setIsHeld(true);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 350);
  }, []);

  const stopHold = useCallback(() => {
    // Если палец убрали ИЛИ начали скроллить до истечения 350мс — отменяем таймер
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsHeld(false);
  }, []);

  return (
    <section className="min-h-[70svh] flex flex-col items-center justify-center px-6 text-center" aria-label="Скрытое послание">
      <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-8 animate-pulse">
        {isHeld ? 'Держи...' : 'Зажми текст пальцем'}
      </h2>

      <div
        // ВАЖНО: Я убрал класс 'touch-none', чтобы карточка не блокировала скролл страницы!
        className="relative cursor-pointer select-none p-8 md:p-12 border border-accent/30 rounded-3xl bg-surface shadow-xl transition-transform duration-300 w-full max-w-sm"
        style={{
          transform: isHeld ? 'scale(0.96)' : 'scale(1)',
          // Отключаем системное меню лупы и копирования на iOS Safari
          WebkitTouchCallout: 'none'
        }}
        onPointerDown={startHold}
        onPointerUp={stopHold}
        onPointerLeave={stopHold}
        // onPointerCancel срабатывает автоматически, когда браузер понимает, что начался скролл
        onPointerCancel={stopHold}
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
