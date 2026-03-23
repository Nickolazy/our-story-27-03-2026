import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function mountMeetingAnimation(
  scope: RefObject<HTMLElement | null>,
  refs: {
    boy: RefObject<HTMLElement | null>;
    girl: RefObject<HTMLElement | null>;
    heart: RefObject<HTMLElement | null>;
    date: RefObject<HTMLElement | null>;
    burst: RefObject<HTMLElement | null>;
  },
) {
  const mm = gsap.matchMedia();

  // Если отключены анимации (Accessibility)
  mm.add('(prefers-reduced-motion: reduce)', () => {
    if (!scope.current) return;
    gsap.set([refs.boy.current, refs.girl.current], {
      opacity: 1,
      xPercent: 0,
      scale: 1,
      rotation: 0
    });
    gsap.set(refs.heart.current, { opacity: 1, scale: 1 });
    gsap.set(refs.date.current, { opacity: 1, y: 0 });
    if (refs.burst.current) {
      gsap.set(refs.burst.current, { opacity: 0, scale: 0 });
    }
  });

  // ПОЕХАЛИ! Реализуем магию интерактива
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const el = scope.current;
    if (!el) return;

    const boy = refs.boy.current;
    const girl = refs.girl.current;
    const heart = refs.heart.current;
    const dateEl = refs.date.current;
    const burst = refs.burst.current;

    if (!boy || !girl || !heart || !dateEl) return;

    // --- 1. НАЧАЛЬНОЕ СОСТОЯНИЕ (До скролла) ---
    // Коля и Маша очень далеко, невидимы и повернуты
    gsap.set(boy, { xPercent: -180, opacity: 0, rotation: -15, scale: 0.8, willChange: 'transform' });
    gsap.set(girl, { xPercent: 180, opacity: 0, rotation: 15, scale: 0.8, willChange: 'transform' });
    gsap.set(heart, { scale: 0, opacity: 0, willChange: 'transform' });
    gsap.set(dateEl, { opacity: 0, y: 30 }); // Дальше снизу
    if (burst) gsap.set(burst, { scale: 0, opacity: 0 });

    // --- 2. ЭФФЕКТ "ПАРЕНИЯ" (Бесконечная анимация) ---
    // Пока они не скроллят, аватарки плавно качаются, как в невесомости
    const floatingAnims = [
      gsap.to(boy, { y: 15, rotation: 5, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' }),
      gsap.to(girl, { y: -15, rotation: -5, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 })
    ];

    // --- 3. СЦЕНА ВСТРЕЧИ (Привязанная к скроллу) ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=150%', // Достаточно скролла для эффекта "притяжения"
        pin: true,
        scrub: 1.2, // Мягкая и вязкая интерполяция
        invalidateOnRefresh: true,
        onEnter: () => {
          // Убиваем парение, когда заходим в секцию скролла, чтобы не мешало
          floatingAnims.forEach(anim => anim.kill());
        },
        onLeaveBack: () => {
          // Восстанавливаем парение, если скроллим обратно вверх
          // (это сложно, но для цельности истории нужно)
          // Проще: не восстанавливаем, история идет только вперед.
        }
      }
    });

    // Шаг 1: Коля и Маша появляются и начинают сближаться
    tl.to([boy, girl], { opacity: 1, scale: 1, rotation: 0, ease: 'none' }, 0)
      .to(boy, { xPercent: -15, ease: 'power2.in' }, 0.1) // Разгон (гравитация)
      .to(girl, { xPercent: 15, ease: 'power2.in' }, 0.1)

      // Шаг 2: Момент "Х" - они почти соприкоснулись.
      // Добавим легкое "замедление перед поцелуем" (anticipation)
      .to([boy, girl], { xPercent: 0, ease: 'power3.out', duration: 0.2 }, 0.43)

      // Шаг 3: ВЗРЫВ! Появляется сердце с мощным "отскоком"
      .to(heart, { scale: 1.1, opacity: 1, ease: 'back.out(1.8)', duration: 0.3 }, 0.46)
      // И сразу чуть уменьшаем до нормы
      .to(heart, { scale: 1, ease: 'power1.out' }, 0.6);

    // Шаг 4: Вспышка (burst) становится сочнее
    if (burst) {
      tl.to(burst, { scale: 2, opacity: 1, ease: 'power2.out', duration: 0.3 }, 0.47)
        .to(burst, { opacity: 0, scale: 2.8, ease: 'power2.in', duration: 0.4 }, 0.65);
    }

    // Шаг 5: Дата и текст всплывают не просто так, а с "отскоком"
    tl.to(dateEl, {
      opacity: 1,
      y: 0,
      ease: 'back.out(1.5)', // Мягкий отскок
      duration: 0.5
    }, 0.6);

    // Очистка при размонтировании
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      floatingAnims.forEach(anim => anim.kill());
    };
  });

  return () => {
    mm.revert();
  };
}
