import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const SERIOUS_STATS = [
  { value: '730', label: 'дней, с тех пор как всё началось' },
  { value: '17 520', label: 'часов разговоров обо всём на свете' },
  { value: '63 072 000', label: 'секунд, за которые я ни разу не пожалел' },
];

const FUNNY_STATS = [
  { value: '15 000', label: 'рилсов с индусами и собачками' },
  { value: '4 592', label: 'раз произнесено слово «писюшка»' },
  { value: '365', label: 'ночей беспощадной борьбы за одеяло (после которой я сплю без него)' },
  { value: '24', label: 'напоминания от Алисы, что «Коля кукольдик»' },
];

const FINAL_STAT = { value: '1', label: 'самая большая любовь на свете' };

export default function TimeStats() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = gsap.utils.toArray('.animate-stat');

      items.forEach((item) => {
        gsap.fromTo(
          item as Element,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item as Element,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="w-full py-32 px-6 flex flex-col items-center justify-center min-h-[100svh]"
      aria-label="Статистика любви"
    >
      <div className="max-w-md w-full flex flex-col gap-16 items-center">
        <h2 className="animate-stat text-center font-sans font-medium text-sm uppercase tracking-[0.3em] text-accent mb-4 will-change-transform">
          Это много или мало?
        </h2>

        {SERIOUS_STATS.map((stat, index) => (
          <div key={`serious-${index}`} className="animate-stat flex flex-col items-center text-center will-change-transform w-full">
            <span className="font-serif text-[3.5rem] leading-none text-accent mb-2 drop-shadow-sm">
              {stat.value}
            </span>
            <span className="font-sans text-lg text-primary/80 leading-relaxed">
              {stat.label}
            </span>
            {index !== SERIOUS_STATS.length - 1 && (
              <div className="w-12 h-[1px] bg-accent/30 mt-16" />
            )}
          </div>
        ))}

        <div className="animate-stat flex items-center justify-center gap-6 my-4 w-full will-change-transform">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-accent/40" />
          <span className="font-serif text-[1.5rem] italic text-primary/60">
            А также...
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-accent/40" />
        </div>

        {FUNNY_STATS.map((stat, index) => (
          <div key={`funny-${index}`} className="animate-stat flex flex-col items-center text-center will-change-transform w-full">
            <span className="font-serif text-[3.5rem] leading-none text-accent mb-2 drop-shadow-sm">
              {stat.value}
            </span>
            <span className="font-sans text-lg text-primary/80 leading-relaxed max-w-[280px]">
              {stat.label}
            </span>
            <div className="w-12 h-[1px] bg-accent/30 mt-16" />
          </div>
        ))}

        <div className="animate-stat flex items-center justify-center gap-6 my-4 w-full will-change-transform">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-accent/40" />
          <span className="font-serif text-[1.5rem] italic text-primary/60">
            И конечно же...
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-accent/40" />
        </div>

        <div className="animate-stat flex flex-col items-center text-center will-change-transform w-full mt-8">
          <span className="font-serif text-[5rem] leading-none text-accent mb-4 drop-shadow-md transform scale-110">
            {FINAL_STAT.value}
          </span>
          <span className="font-serif text-2xl text-primary font-medium tracking-wide">
            {FINAL_STAT.label}
          </span>
        </div>
      </div>
    </section>
  );
}
