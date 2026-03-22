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

  mm.add('(prefers-reduced-motion: reduce)', () => {
    if (!scope.current) return;
    gsap.set([refs.boy.current, refs.girl.current], {
      opacity: 1,
      xPercent: 0,
      scale: 1,
    });
    gsap.set(refs.heart.current, { opacity: 1, scale: 1 });
    gsap.set(refs.date.current, { opacity: 1, y: 0 });
    if (refs.burst.current) {
      gsap.set(refs.burst.current, { opacity: 0, scale: 0 });
    }
  });

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const el = scope.current;
    if (!el) return;

    const boy = refs.boy.current;
    const girl = refs.girl.current;
    const heart = refs.heart.current;
    const dateEl = refs.date.current;
    const burst = refs.burst.current;

    if (!boy || !girl || !heart || !dateEl) return;

    gsap.set(boy, { xPercent: -120, opacity: 1 });
    gsap.set(girl, { xPercent: 120, opacity: 1 });
    gsap.set(heart, { scale: 0, opacity: 0 });
    gsap.set(dateEl, { opacity: 0, y: 16 });
    if (burst) gsap.set(burst, { scale: 0, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=200%',
        scrub: 1.5,
        pin: true,
      }
    });

    tl.to(boy, { xPercent: 0, ease: 'none' }, 0)
      .to(girl, { xPercent: 0, ease: 'none' }, 0)
      .to(heart, { scale: 1, opacity: 1, ease: 'back.out(1.4)' }, 0.45)
      .to(dateEl, { opacity: 1, y: 0, ease: 'power2.out' }, 0.55);

    if (burst) {
      tl.to(burst, { scale: 1.2, opacity: 1, ease: 'power2.out' }, 0.48).to(
        burst,
        { opacity: 0, scale: 1.8, ease: 'power2.in' },
        0.62,
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  });

  return () => {
    mm.revert();
  };
}
