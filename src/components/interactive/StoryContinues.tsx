import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function StoryContinues() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const lines = Array.from(content.children);

      gsap.fromTo(
        lines,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 1.2, // Медленное, томящее появление
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
          },
        }
      );
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="flex min-h-[100svh] w-full flex-col items-center justify-center px-6 py-32 relative"
      aria-label="Финал"
    >
      <div ref={contentRef} className="w-full max-w-md flex flex-col items-center text-center">

        <p className="font-serif text-[1.25rem] leading-relaxed text-primary mb-8">
          В этой истории пока написаны<br/>только две главы.
        </p>

        <p className="font-serif text-[1.25rem] leading-relaxed text-primary mb-16">
          Но впереди у нас — целая жизнь.
        </p>

        <div className="mb-16">
          <div className="text-4xl animate-pulse drop-shadow-md">
            ❤️
          </div>
        </div>

        <div className="bg-surface/50 backdrop-blur-sm border border-accent/20 rounded-2xl p-6 w-full shadow-lg">
          <p className="font-sans text-[1.1rem] text-primary/90">
            Я безумно тебя люблю.<br/>
            <span className="font-medium text-accent mt-2 block">
              Спасибо, что делаешь меня счастливым. С нашей датой, любимая!
            </span>
          </p>
        </div>
        
        <div className="absolute bottom-0 right-0">
          <p className="font-serif text-[1rem] text-right leading-relaxed text-primary px-2">
            С любовью, твой сладкий Коля<br />27.03.2026
          </p>
        </div>
      </div>
    </section>
  );
}
