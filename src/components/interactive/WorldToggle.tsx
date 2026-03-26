import { useState } from 'react';

export default function WorldToggle() {
  const [withYou, setWithYou] = useState(true);

  return (
    <>
      <div
        className="fixed inset-0 z-[999] pointer-events-none transition-all duration-1000"
        style={{
          backdropFilter: withYou ? 'grayscale(0%)' : 'grayscale(100%) brightness(0.85)',
          opacity: withYou ? 0 : 1,
        }}
      />

      <section className="py-32 flex flex-col items-center justify-center text-center px-4 relative z-10" aria-label="Переключатель мира">
        <h2 className="font-serif text-[1.75rem] text-primary mb-8 transition-colors duration-1000">
          Посмотри на мой мир
          <br />
          <span className={`font-serif text-[2.25rem] ${withYou ? 'text-accent' : 'text-primary/50'}`}>
            {withYou ? 'С тобой' : 'Без тебя'}
          </span>
        </h2>

        <button
          onClick={() => setWithYou(!withYou)}
          className={`relative w-28 h-12 rounded-full transition-all duration-700 shadow-inner border-2 cursor-pointer ${
            withYou ? 'bg-accent/30 border-accent/50' : 'bg-gray-300 border-gray-400'
          }`}
          aria-label="Переключить мир"
        >
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-md transition-all duration-700 flex items-center justify-center text-xl ${
              withYou ? 'left-[calc(100%-4px)] -translate-x-full bg-white' : 'left-[4px] translate-x-0 bg-gray-100'
            }`}
          >
            <span className={`transition-transform duration-700 ${withYou ? 'rotate-0 scale-100' : '-rotate-180 scale-90'}`}>
              {withYou ? (
                <span>❤️</span>
              ) : (
                <span className="inline-block rotate-180">🌧️</span>
              )}
            </span>
          </div>
        </button>

        <p className="mt-8 text-sm text-primary/60 max-w-[250px]">
          {withYou
            ? 'Попробуй выключить на пару секунд...'
            : 'Видишь? Без тебя всё становится серым. Включай обратно!'}
        </p>
      </section>
    </>
  );
}
