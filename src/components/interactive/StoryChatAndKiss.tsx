import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import kolya from '../../assets/avatars/kolya.png'
import masha from '../../assets/avatars/masha.png'

gsap.registerPlugin(ScrollTrigger);

export default function StoryChatAndKiss() {
  const containerRef = useRef<HTMLElement>(null);

  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  const boyRef = useRef<HTMLDivElement>(null);
  const girlRef = useRef<HTMLDivElement>(null);

  const boyInnerRef = useRef<HTMLDivElement>(null);
  const girlInnerRef = useRef<HTMLDivElement>(null);

  const bubblesRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const bubbles = bubblesRef.current?.children;

      gsap.set(heartRef.current, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });
      gsap.set(burstRef.current, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });

      const floatBoy = gsap.to(boyInnerRef.current, { y: -15, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      const floatGirl = gsap.to(girlInnerRef.current, { y: -15, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });

      gsap.fromTo(
        bubbles,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
        }
      });

      tl.to({}, { duration: 1.5 })

        .to([bubblesRef.current, text1Ref.current], { opacity: 0, y: -20, duration: 0.5 })

        .to(text2Ref.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')

        .to([boyInnerRef.current, girlInnerRef.current], {
          y: 0,
          duration: 0.5,
          onStart: () => { floatBoy.pause(); floatGirl.pause(); },
          onReverseComplete: () => { floatBoy.play(); floatGirl.play(); }
        }, '-=0.5')
        .to(boyRef.current, { left: '50%', xPercent: -50, ease: 'power2.inOut', duration: 1 }, '-=0.5')
        .to(girlRef.current, { right: '50%', xPercent: 50, ease: 'power2.inOut', duration: 1 }, '-=1')

        .to(heartRef.current, { scale: 1.1, opacity: 1, ease: 'back.out(1.8)', duration: 0.3 }, '+=0.1')
        .to(heartRef.current, { scale: 1, ease: 'power1.out', duration: 0.2 })
        .to(burstRef.current, { scale: 2, opacity: 1, ease: 'power2.out', duration: 0.3 }, '-=0.5')
        .to(burstRef.current, { opacity: 0, scale: 2.8, ease: 'power2.in', duration: 0.4 }, '-=0.2')

        .to(dateRef.current, { opacity: 1, y: 0, ease: 'back.out(1.5)', duration: 0.5 }, '-=0.1');
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="flex h-[100svh] w-full flex-col items-center justify-center px-4 relative bg-base overflow-hidden"
      aria-label="Наша история"
    >
      <div className="relative h-32 w-full max-w-md z-10">
        <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center text-center">
          <h2 className="font-serif text-[1.75rem] md:text-[2rem] leading-tight text-primary mb-3">
            Как всё начиналось...
          </h2>
          <p className="font-sans text-primary/80 leading-relaxed text-[1rem]">
            Сутками болтали обо всём на свете, смеялись и были уверены, что мы «просто друзья».
          </p>
        </div>

        <div ref={text2Ref} className="absolute inset-0 flex flex-col items-center text-center opacity-0 translate-y-4">
          <h2 className="font-serif text-[1.75rem] md:text-[2rem] leading-tight text-primary mb-3">
            От долгих переписок...
          </h2>
          <p className="font-sans text-primary/80 leading-relaxed text-[1rem]">
            ...до того самого поцелуя.
          </p>
        </div>
      </div>

      <div className="relative w-full max-w-md h-[300px] mt-4">

        <div ref={boyRef} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 will-change-[left,transform]">
          <div ref={boyInnerRef}>
            <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center overflow-hidden rounded-full border-[3px] md:border-4 border-white bg-surface shadow-xl backdrop-blur-md">
              {/* <span className="text-3xl md:text-4xl">👨</span> */}
              <img src={kolya.src} alt="kolya" className="w-full object-cover" />
            </div>
          </div>
        </div>

        <div ref={girlRef} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 will-change-[right,transform]">
          <div ref={girlInnerRef}>
            <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center overflow-hidden rounded-full border-[3px] md:border-4 border-white bg-surface shadow-xl backdrop-blur-md">
              {/* <span className="text-3xl md:text-4xl">👩</span> */}
              <img src={masha.src} alt="kolya" className="w-full object-cover" />
            </div>
          </div>
        </div>

        <div ref={heartRef} className="absolute left-1/2 top-1/2 z-20 text-[5rem] md:text-[6rem] drop-shadow-lg pointer-events-none">❤️</div>
        <div ref={burstRef} className="absolute left-1/2 top-1/2 z-[12] text-5xl pointer-events-none">✨</div>

        <div ref={bubblesRef} className="absolute inset-0 flex flex-col items-center justify-center gap-5 pointer-events-none z-20">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-3 md:px-5 md:py-3 rounded-2xl rounded-bl-none shadow-sm border border-accent/20 text-sm text-primary/90 mr-8 md:mr-12 transform -rotate-2 max-w-[190px] md:max-w-xs transform-gpu will-change-transform opacity-0">
            Привет! Ты писюшка?
          </div>
          <div className="bg-accent/10 backdrop-blur-sm px-4 py-3 md:px-5 md:py-3 rounded-2xl rounded-br-none shadow-sm border border-accent/30 text-sm text-primary/90 ml-12 md:ml-16 transform rotate-2 max-w-[190px] md:max-w-xs transform-gpu will-change-transform opacity-0">
            Да, писюшка. А ты?
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-4 py-3 md:px-5 md:py-3 rounded-2xl rounded-bl-none shadow-sm border border-accent/20 text-sm text-primary/90 mr-4 md:mr-8 transform -rotate-1 max-w-[190px] md:max-w-xs transform-gpu will-change-transform opacity-0">
            Я тоже писюшка.
          </div>
        </div>
      </div>

      <div ref={dateRef} className="absolute bottom-12 w-full flex flex-col items-center justify-center opacity-0 translate-y-4">
        <p className="font-serif text-[1.25rem] text-primary/80">И вот мы уже</p>
        <time dateTime="2024-03-22" className="font-serif text-[2.5rem] md:text-[3rem] text-accent drop-shadow-sm">
          2 года вместе
        </time>
      </div>
    </section>
  );
}
