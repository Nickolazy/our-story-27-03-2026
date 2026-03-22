import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const PATH =
  'M 32 24 C 32 160 220 240 32 360 C -156 480 32 560 32 720';

export default function JourneyPath() {
  const section = useRef<HTMLElement>(null);
  const path = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const pathEl = path.current;
      const sectionEl = section.current;
      if (!pathEl || !sectionEl) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const len = pathEl.getTotalLength();
        gsap.set(pathEl, {
          strokeDasharray: len,
          strokeDashoffset: 0,
        });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const len = pathEl.getTotalLength();
        gsap.set(pathEl, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });

        const anim = gsap.to(pathEl, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: true,
          },
        });

        return () => {
          anim.scrollTrigger?.kill();
          anim.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className="relative w-full px-4 py-32"
      aria-label="Путь вместе"
    >
      <h2 className="mb-12 text-center font-serif text-[2rem] leading-tight text-primary">
        Наш путь
      </h2>
      <div className="relative mx-auto max-w-md">
        <svg
          className="mx-auto block h-[720px] w-16 text-accent"
          viewBox="0 0 64 800"
          preserveAspectRatio="xMidYMin meet"
          aria-hidden="true"
        >
          <path
            ref={path}
            d={PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute left-1/2 top-[15%] flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-surface text-xs shadow backdrop-blur-md">
          ★
        </div>
        <div className="absolute left-1/2 top-[45%] flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-surface text-xs shadow backdrop-blur-md">
          ♥
        </div>
        <div className="absolute left-1/2 top-[75%] flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-surface text-xs shadow backdrop-blur-md">
          ✦
        </div>
      </div>
    </section>
  );
}
