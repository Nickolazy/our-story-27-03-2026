import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '730', label: 'дней, с тех пор как всё началось' },
  { value: '17 520', label: 'часов разговоров обо всём на свете' },
  { value: '63 072 000', label: 'секунд, за которые я ни разу не пожалел' },
  { value: '730', label: 'утр, когда я просыпался счастливым' },
  { value: '1', label: 'самая большая любовь' },
];

export default function TimeStats() {
  const sectionRef = useRef<HTMLElement>(null);
  // Массив ссылок на каждую строчку, чтобы анимировать их по очереди
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      itemsRef.current.forEach((item) => {
        if (!item) return;

        // Каждая цифра плавно всплывает снизу, когда доходит до середины экрана
        gsap.fromTo(
          item,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%', // Начинаем анимацию, когда элемент на 85% высоты экрана
              end: 'top 50%',
              scrub: 1, // Привязываем к скроллу для эффекта "вытягивания"
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
      className="w-full py-24 px-6 flex flex-col items-center justify-center min-h-[100svh]"
      aria-label="Статистика любви"
    >
      <div className="max-w-md w-full flex flex-col gap-16">
        <h2 className="text-center font-sans text-sm uppercase tracking-[0.3em] text-accent/80 mb-4">
          2 года — это много или мало?
        </h2>

        {STATS.map((stat, index) => (
          <div
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className="flex flex-col items-center text-center will-change-transform"
          >
            {/* Огромная цифра */}
            <span className="font-serif text-[3.5rem] leading-none text-accent mb-2 drop-shadow-sm">
              {stat.value}
            </span>
            {/* Подпись */}
            <span className="font-sans text-lg text-primary/80 leading-relaxed">
              {stat.label}
            </span>

            {/* Декоративная линия между блоками (кроме последнего) */}
            {index !== STATS.length - 1 && (
              <div className="w-12 h-[1px] bg-accent/30 mt-16" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
