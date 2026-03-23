import { useLayoutEffect, useRef } from 'react';
import { mountMeetingAnimation } from '../../hooks/useMeetingAnimation';

export default function MeetingAnimation() {
  const scope = useRef<HTMLElement>(null);
  const boy = useRef<HTMLDivElement>(null);
  const girl = useRef<HTMLDivElement>(null);
  const heart = useRef<HTMLDivElement>(null);
  const burst = useRef<HTMLDivElement>(null);
  const date = useRef<HTMLTimeElement>(null);

  useLayoutEffect(() => {
    return mountMeetingAnimation(scope, {
      boy,
      girl,
      heart,
      date,
      burst,
    });
  }, []);

  return (
    <section
      ref={scope}
      className="relative w-full"
      aria-label="Как мы встретились"
    >
      <div className="flex min-h-[100svh] w-full flex-col items-center justify-between overflow-hidden px-4 py-16">

        {/* ВЕРХ: Развитие истории */}
        <div className="mt-4 text-center">
          <h2 className="font-serif text-[2rem] leading-tight text-primary mb-3">
            От долгих переписок...
          </h2>
          <p className="font-sans text-primary/70 max-w-[280px] mx-auto leading-relaxed">
            Сутками болтали обо всём на свете, уверенные, что мы просто классные друзья.
          </p>
        </div>

        {/* ЦЕНТР: Анимация сближения */}
        <div className="relative flex w-full max-w-md flex-1 items-center justify-center">

          {/* КОЛЯ */}
          <div ref={boy} className="absolute z-10 flex flex-col items-center will-change-transform">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-surface shadow-xl backdrop-blur-md">
              <span className="text-5xl">👨</span>
            </div>
            {/* Имена можно вернуть, когда вставишь реальные фото */}
          </div>

          {/* МАША */}
          <div ref={girl} className="absolute z-10 flex flex-col items-center will-change-transform">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-surface shadow-xl backdrop-blur-md">
              <span className="text-5xl">👩</span>
            </div>
          </div>

          <div
            ref={heart}
            className="pointer-events-none absolute z-20 text-[5rem] drop-shadow-lg"
            aria-hidden="true"
          >
            ❤️
          </div>
          <div
            ref={burst}
            className="pointer-events-none absolute z-[12] text-5xl opacity-0"
            aria-hidden="true"
          >
            ✨
          </div>
        </div>

        {/* НИЗ: Развязка истории (всплывает вместе с датой) */}
        <div
          ref={date}
          className="flex flex-col items-center opacity-0 mb-4 will-change-[opacity,transform]"
        >
          <p className="font-serif text-[1.25rem] text-primary/80 mb-2">
            ...до того самого поцелуя. И вот уже:
          </p>
          <time
            dateTime="2024-03-22"
            className="font-serif text-[2.5rem] text-accent drop-shadow-sm"
          >
            2 года вместе
          </time>
        </div>

      </div>
    </section>
  );
}
