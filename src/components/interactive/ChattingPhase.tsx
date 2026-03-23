import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function ChattingPhase() {
  const containerRef = useRef<HTMLElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const bubbles = bubblesRef.current?.children;
    if (!container || !bubbles) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        bubbles,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.8,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: container,
            start: 'bottom bottom',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="flex min-h-[100svh] w-full flex-col items-center justify-center px-4 relative py-24"
      aria-label="Этап общения"
    >
      <div className="text-center mb-16 z-10 w-full max-w-md">
        <h2 className="font-serif text-[1.75rem] leading-tight text-primary mb-4">
          Как всё начиналось...
        </h2>
        <p className="font-sans text-primary/80 leading-relaxed text-[1.05rem]">
          Сутками болтали обо всём на свете, смеялись и были уверены, что мы «просто друзья».
        </p>
      </div>

      <div className="relative w-full max-w-md h-[300px] flex items-center justify-between mt-4">

        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className="animate-[float_4s_ease-in-out_infinite]">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-surface shadow-xl backdrop-blur-md">
              <span className="text-4xl">👨</span>
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className="animate-[float_4s_ease-in-out_infinite_1s]">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-surface shadow-xl backdrop-blur-md">
              <span className="text-4xl">👩</span>
            </div>
          </div>
        </div>

        <div ref={bubblesRef} className="absolute inset-0 flex flex-col items-center justify-center gap-5 pointer-events-none z-20">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-3 md:px-5 md:py-3 rounded-2xl rounded-bl-none shadow-sm border border-accent/20 text-sm text-primary/90 mr-8 md:mr-12 transform -rotate-2 max-w-[190px] md:max-w-xs leading-snug transform-gpu will-change-transform">
            Привет! Ты писюшка?
          </div>
          <div className="bg-accent/10 backdrop-blur-sm px-4 py-3 md:px-5 md:py-3 rounded-2xl rounded-br-none shadow-sm border border-accent/30 text-sm text-primary/90 ml-12 md:ml-16 transform rotate-2 max-w-[190px] md:max-w-xs leading-snug transform-gpu will-change-transform">
            Да, писюшка. А ты?
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-4 py-3 md:px-5 md:py-3 rounded-2xl rounded-bl-none shadow-sm border border-accent/20 text-sm text-primary/90 mr-4 md:mr-8 transform -rotate-1 max-w-[190px] md:max-w-xs leading-snug transform-gpu will-change-transform">
            Я тоже писюшка.
          </div>
        </div>

      </div>
    </section>
  );
}
