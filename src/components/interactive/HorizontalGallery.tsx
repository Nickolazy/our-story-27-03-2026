import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const PHOTOS = [
  '📸 Фото 1', '📸 Фото 2', '📸 Фото 3',
  '📸 Фото 4', '📸 Фото 5', '📸 Фото 6'
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const scrollWrapper = scrollWrapperRef.current;
    if (!container || !scrollWrapper) return;

    // Используем matchMedia для безопасной инициализации
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Чтобы не лагало, анимируем не пиксели, а проценты сдвига
      gsap.to(scrollWrapper, {
        x: () => -(scrollWrapper.scrollWidth - window.innerWidth + 48), // 48 - это padding
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=200%', // Даем 2 экрана высоты на прокрутку галереи (плавнее)
          pin: true,
          scrub: 1, // Мягкая интерполяция
          invalidateOnRefresh: true, // Пересчет при ресайзе/появлении адресной строки
        },
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-[100svh] w-full flex flex-col justify-center overflow-hidden bg-base relative" aria-label="Альбом">
      <h2 className="absolute top-16 left-0 w-full text-center font-serif text-[2rem] text-primary z-10 drop-shadow-sm">
        Каждый миг с тобой
      </h2>

      {/* will-change-transform - ОЧЕНЬ ВАЖНО для 60FPS на телефоне */}
      <div
        ref={scrollWrapperRef}
        className="flex gap-6 px-6 items-center h-[60vh] mt-10 w-max will-change-transform"
      >
        {PHOTOS.map((photo, i) => (
          <div
            key={i}
            className={`w-[75vw] max-w-[300px] aspect-[4/5] shrink-0 rounded-2xl bg-white shadow-xl border border-accent/20 p-3 transform transition-transform hover:scale-105 ${i % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[2deg]'}`}
          >
            <div className="w-full h-full bg-rose-50 rounded-xl flex items-center justify-center text-primary/50 overflow-hidden relative">
              {/* Замени на <img src={...} class="w-full h-full object-cover" /> */}
              {photo}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
