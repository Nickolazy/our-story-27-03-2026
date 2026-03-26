import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import spotlightRevealPhoto from '../../assets/love.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function SpotlightReveal() {
  const containerRef = useRef<HTMLElement>(null);
  const photoWrapperRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const photo = photoWrapperRef.current;
    const t1 = text1Ref.current;
    const t2 = text2Ref.current;

    if (!container || !photo || !t1 || !t2) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Плавно убираем туман и приближаем фото к нормальному размеру
      tl.to(photo, {
        filter: 'blur(0px) brightness(0.9)', // Оставляем легкое затемнение для читаемости текста
        scale: 1,
        ease: 'none',
      }, 0)

      // Прячем первый текст
      .to(t1, {
        opacity: 0,
        y: -30,
        scale: 0.95,
        ease: 'power2.inOut',
      }, 0.1)

      // Красиво выводим второй текст на фоне чистого фото
      .fromTo(t2,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, ease: 'power2.out' },
        0.5
      );
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center relative"
      aria-label="Рассеивание тумана"
    >
      {/* Обертка для фото с начальным "туманным" состоянием */}
      <div
        ref={photoWrapperRef}
        className="absolute inset-0 z-0 h-full w-full transform-gpu will-change-[filter,transform]"
        style={{
          filter: 'blur(24px) brightness(0.3)',
          transform: 'scale(1.15)'
        }}
      >
        {/* Само фото (теперь оно гарантированно заполняет весь экран без искажений) */}
        <img
          src={spotlightRevealPhoto.src}
          alt="Наше фото"
          className="w-full h-full object-cover object-center block"
        />

        {/* Кинематографичная виньетка: темнее сверху и снизу, светлее в центре */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/80 pointer-events-none" />
      </div>

      {/* Контейнер для текстов */}
      <div className="relative z-10 p-6 text-center w-full max-w-sm mx-auto flex items-center justify-center">

        <h2
          ref={text1Ref}
          className="text-[2.25rem] md:text-[2.5rem] px-2.5 font-serif text-white/90 leading-tight tracking-wide will-change-transform absolute drop-shadow-lg"
        >
          Знаешь, до встречи с тобой<br/>всё было как в тумане...
        </h2>

        <div
          ref={text2Ref}
          className="absolute w-full px-4 opacity-0 will-change-[opacity,transform]"
        >
          <div className="bg-black/40 backface-hidden backdrop-blur-md transform-gpu border border-white/20 rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            <h2 className="text-[2rem] md:text-[2.25rem] font-serif text-white leading-tight tracking-wide drop-shadow-md">
              ...Но ты принесла свет в мою жизнь ✨
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
}
