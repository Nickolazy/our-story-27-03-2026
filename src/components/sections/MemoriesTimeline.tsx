import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { PolaroidCard, type PolaroidMemory } from '../ui/PolaroidCard';

gsap.registerPlugin(ScrollTrigger);

export type MemoryChapter = {
  id: string;
  title: string;
  subtitle?: string;
  photos: (PolaroidMemory & { rotate?: string })[];
};

type Props = {
  chapters: MemoryChapter[];
};

export default function MemoriesTimeline({ chapters }: Props) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray('.scrapbook-card');

      gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });

      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            duration: 0.8,
            overwrite: true,
          });
        },
      });
    });

    return () => mm.revert();
  }, { scope: rootRef });

  return (
    <section
      ref={rootRef}
      className="flex w-full flex-col px-4 py-24 bg-base"
      aria-label="Наш альбом"
    >
      <div className="w-full max-w-lg mx-auto mb-10 text-center">
        <h2 className="font-serif text-[2.5rem] leading-tight text-primary drop-shadow-sm">
          Главы нашей истории
        </h2>
        <p className="mt-4 font-sans text-primary/70">
          Каждый миг с тобой — мой самый любимый.
        </p>
      </div>

      <div className="flex flex-col gap-16 w-full max-w-2xl mx-auto">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="relative w-full flex flex-col">

            {/* Липкий заголовок главы */}
            <div className="sticky top-4 z-30 mb-12 flex flex-col items-center md:items-start pointer-events-none">
              <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-accent/20 transform rotate-[-1deg]">
                <h3 className="font-serif text-2xl text-primary m-0">
                  {chapter.title}
                </h3>
                {chapter.subtitle && (
                  <span className="font-sans text-sm text-accent tracking-wide uppercase mt-1 block">
                    {chapter.subtitle}
                  </span>
                )}
              </div>
            </div>

            {/* Сетка фотографий */}
            <div className="columns-1 md:columns-2 gap-6 space-y-8 w-full px-2 md:px-0">
              {chapter.photos.map((photo, idx) => {
                const rotation = photo.rotate || (idx % 2 === 0 ? '-2deg' : '2deg');

                return (
                  <div
                    key={`${chapter.id}-photo-${idx}`}
                    className="scrapbook-card break-inside-avoid relative transform-gpu will-change-[opacity,transform]"
                    style={{ transform: `rotate(${rotation})` }}
                  >
                    <PolaroidCard memory={photo} />
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
