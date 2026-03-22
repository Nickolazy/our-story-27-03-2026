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
      className="relative w-full py-24"
      aria-label="Как мы встретились"
    >
      <div className="flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-4">
        <div className="relative flex h-[min(70dvh,520px)] w-full max-w-md items-center justify-center">
          <div
            ref={boy}
            className="absolute z-10 flex h-20 w-20 select-none items-center justify-center rounded-full bg-surface text-5xl shadow-lg backdrop-blur-md"
            aria-hidden="true"
          >
            <span>👨</span>
          </div>
          <div
            ref={girl}
            className="absolute z-10 flex h-20 w-20 select-none items-center justify-center rounded-full bg-surface text-5xl shadow-lg backdrop-blur-md"
            aria-hidden="true"
          >
            <span>👩</span>
          </div>
          <div
            ref={heart}
            className="pointer-events-none absolute z-20 text-6xl"
            aria-hidden="true"
          >
            ❤️
          </div>
          <div
            ref={burst}
            className="pointer-events-none absolute z-[12] text-4xl opacity-0"
            aria-hidden="true"
          >
            ✨
          </div>
        </div>
        <time
          ref={date}
          dateTime="2024-03-22"
          className="font-serif text-[2rem] text-primary opacity-0"
        >
          2 года вместе
        </time>
      </div>
    </section>
  );
}
