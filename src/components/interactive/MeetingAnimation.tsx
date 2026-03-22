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
      {/* Убрали py-24, добавили py-12 и justify-between для идеального распределения по высоте экрана */}
      <div className="flex min-h-[100svh] w-full flex-col items-center justify-between overflow-hidden px-4 py-16">

        {/* ВЕРХ: Заголовок */}
        <h2 className="text-center font-serif text-[2rem] leading-tight text-primary mt-4">
          История нашего знакомства
        </h2>

        {/* ЦЕНТР: Анимация */}
        <div className="relative flex w-full max-w-md flex-1 items-center justify-center">

          {/* КОЛЯ */}
          <div ref={boy} className="absolute z-10 flex flex-col items-center will-change-transform">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-surface shadow-xl backdrop-blur-md">
              {/* <img src="/kolya.jpg" alt="Коля" className="h-full w-full object-cover" /> */}
              <span className="text-5xl">👨</span>
            </div>
            {/* <span className="mt-3 font-serif text-xl font-medium text-primary bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm border border-white/40">
              Коля
            </span> */}
          </div>

          {/* МАША */}
          <div ref={girl} className="absolute z-10 flex flex-col items-center will-change-transform">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-surface shadow-xl backdrop-blur-md">
              {/* <img src="/masha.jpg" alt="Маша" className="h-full w-full object-cover" /> */}
              <span className="text-5xl">👩</span>
            </div>
            {/* <span className="mt-3 font-serif text-xl font-medium text-primary bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm border border-white/40">
              Маша
            </span> */}
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

        <time
          ref={date}
          dateTime="2024-03-22"
          className="font-serif text-[2.5rem] text-accent opacity-0 mb-4 drop-shadow-sm will-change-[opacity,transform]"
        >
          2 года вместе
        </time>
      </div>
    </section>
  );
}
