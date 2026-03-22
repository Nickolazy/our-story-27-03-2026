import { useId, useState } from 'react';

export default function FinalLetter() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section
      className="flex min-h-[100svh] w-full flex-col items-center justify-center px-4 py-32"
      aria-label="Письмо"
    >
      <div className="w-full max-w-md">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="relative w-full rounded-2xl border border-accent/50 bg-surface p-10 text-left shadow-xl backdrop-blur-md transition-transform active:scale-95"
        >
          <span className="block text-center font-serif text-[2rem] text-primary">
            Для тебя
          </span>
          <span className="mt-4 block text-center text-sm text-primary/80">
            {open ? 'Нажми, чтобы закрыть' : 'Нажми, чтобы открыть конверт'}
          </span>
          <span
            className="pointer-events-none mt-8 block text-center text-5xl transition-transform duration-300"
            style={{
              transform: open ? 'rotateX(12deg) translate3d(0, -8px, 0)' : 'none',
            }}
            aria-hidden="true"
          >
            ✉️
          </span>
        </button>

        {open ? (
          <div
            id={panelId}
            role="region"
            aria-label="Текст письма"
            className="letter-reveal mt-8 rounded-2xl border border-accent/30 bg-base/90 p-8 shadow-inner"
          >
            <p className="font-serif text-[1.25rem] leading-relaxed text-primary">
              Спасибо, что ты рядом. Это письмо — лишь малая часть того, что я хочу сказать тебе
              лично. Готовься к сюрпризу.
            </p>
            <button
              type="button"
              className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-base font-medium text-white transition-transform active:scale-95"
              onClick={() => {
                setOpen(false);
              }}
            >
              Забронировать наш вечер
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
