import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function JourneyPath() {
  const section = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const sectionEl = section.current;
    const pathEl = pathRef.current;
    if (!sectionEl || !pathEl) return;

    // Вычисляем реальную длину SVG-линии
    const length = pathEl.getTotalLength();

    // Устанавливаем начальное состояние (линия "спрятана")
    gsap.set(pathEl, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Рисуем линию при скролле
    gsap.to(pathEl, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: 1,
      },
    });
  }, { scope: section });

  return (
    <section ref={section} className="relative w-full py-32" aria-label="Путь вместе">
      <h2 className="mb-16 text-center font-serif text-[2rem] leading-tight text-primary">
        Наш путь
      </h2>

      <div className="relative mx-auto flex h-[800px] w-full max-w-md items-center justify-center">

        <svg
          className="absolute left-1/2 top-0 block h-full w-[200px] -translate-x-1/2 text-accent drop-shadow-md"
          viewBox="0 0 200 800"
          preserveAspectRatio="xMidYMin meet"
        >
          {/* Полупрозрачная "рельса" (весь путь сразу) */}
          <path
            d="M 100 0 C 180 150, 20 250, 100 400 C 180 550, 20 650, 100 800"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="opacity-20"
          />
          {/* Основная линия, которая рисуется */}
          <path
            ref={pathRef}
            d="M 100 0 C 180 150, 20 250, 100 400 C 180 550, 20 650, 100 800"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        {/* Остановки (Milestones). Позиционируем абсолютно поверх кривой */}
        <div className="absolute top-[10%] left-[65%] z-10 flex h-12 w-12 items-center justify-center rounded-full bg-surface text-xl shadow-md backdrop-blur-md border border-accent/30 hover:scale-110 transition-transform">
          👀
        </div>
        <div className="absolute top-[50%] left-[35%] z-10 flex h-12 w-12 items-center justify-center rounded-full bg-surface text-xl shadow-md backdrop-blur-md border border-accent/30 hover:scale-110 transition-transform">
          ✈️
        </div>
        <div className="absolute top-[85%] left-[50%] z-10 flex h-12 w-12 items-center justify-center rounded-full bg-surface text-xl shadow-md backdrop-blur-md border border-accent/30 hover:scale-110 transition-transform">
          💍
        </div>

      </div>
    </section>
  );
}
