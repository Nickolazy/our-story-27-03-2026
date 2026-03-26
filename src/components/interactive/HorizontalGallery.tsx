import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { PolaroidCard, type PolaroidMemory } from '../ui/PolaroidCard';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  photos: PolaroidMemory[];
};

export default function HorizontalGallery({ photos }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const scrollWrapper = scrollWrapperRef.current;
    if (!container || !scrollWrapper) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const getScrollAmount = () => {
        const wrapperWidth = scrollWrapper.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(wrapperWidth - viewportWidth + 48);
      };

      gsap.to(scrollWrapper, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollWrapper.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [photos.length] }); // Обновляем логику, если количество фоток изменится

  return (
    <section
      ref={containerRef}
      className="relative flex h-[100svh] w-full flex-col justify-center overflow-hidden bg-base"
      aria-label="Горизонтальный альбом"
    >
      {/* Заголовок плавно "висит" над галереей */}
      <h2 className="absolute left-0 top-16 z-20 w-full text-center font-serif text-[2rem] leading-tight text-primary drop-shadow-sm pointer-events-none">
        Наш вайб
      </h2>

      <div
        ref={scrollWrapperRef}
        className="mt-12 flex h-auto w-max items-center gap-6 px-6 py-12 will-change-transform"
      >
        {photos.map((photo, idx) => {
          const rotation = idx % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[3deg]';
          const offsetY = idx % 2 === 0 ? '-translate-y-4' : 'translate-y-4';

          return (
            <div
              key={`horiz-${idx}`}
              className={`w-[75vw] max-w-[320px] shrink-0 transform-gpu transition-all duration-500 hover:z-10 hover:scale-[1.02] hover:rotate-0 hover:translate-y-0 ${rotation} ${offsetY}`}
            >
              <PolaroidCard memory={photo} />
            </div>
          );
        })}
      </div>

      {/* Подсказка для скролла */}
      <div className="absolute bottom-12 left-0 z-20 w-full text-center text-primary/40 text-sm animate-pulse pointer-events-none">
        Листай дальше →
      </div>
    </section>
  );
}
