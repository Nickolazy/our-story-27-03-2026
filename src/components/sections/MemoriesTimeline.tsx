import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { PolaroidCard, type PolaroidMemory } from '../ui/PolaroidCard';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  memories: PolaroidMemory[];
};

export default function MemoriesTimeline({ memories }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const wraps = root.current?.querySelectorAll('[data-polaroid]');
        wraps?.forEach((node) => {
          gsap.set(node, { opacity: 1, y: 0 });
        });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const wraps = root.current?.querySelectorAll<HTMLElement>('[data-polaroid]');
        if (!wraps?.length) return;

        const animations = Array.from(wraps).map((wrap) =>
          gsap.fromTo(
            wrap,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: wrap,
                start: 'top 90%',
                end: 'top 60%',
                scrub: 0.8,
              },
            },
          ),
        );

        return () => {
          animations.forEach((a) => {
            a.scrollTrigger?.kill();
            a.kill();
          });
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: root, dependencies: [memories.length] },
  );

  return (
    <section
      ref={root}
      className="flex w-full flex-col gap-16 px-4 py-32"
      aria-label="Галерея воспоминаний"
    >
      <h2 className="text-center font-serif text-[2rem] leading-tight text-primary">
        Давай вспомним наши самые яркие моменты
      </h2>
      {memories.map((memory) => (
        <div key={`${memory.date}-${memory.caption}`} data-polaroid className="will-change-transform">
          <PolaroidCard memory={memory} />
        </div>
      ))}
    </section>
  );
}
