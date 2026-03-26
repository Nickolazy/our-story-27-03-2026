import { useState, useRef, useEffect } from 'react';

export default function VinylPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  return (
    <section className="min-h-[100svh] py-24 px-6 flex flex-col items-center justify-center relative w-full overflow-hidden">

      {/* Кликабельная зона пластинки */}
      <div className="relative cursor-pointer group" onClick={togglePlay}>

        {/* Сама пластинка. Если играет — крутится бесконечно! */}
        <div
          className={`w-64 h-64 md:w-72 md:h-72 rounded-full bg-[#111] shadow-2xl border-4 border-[#222] flex items-center justify-center relative transition-transform duration-500 ease-out group-hover:scale-105 ${
            isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
          }`}
        >
          {/* Канавки винила (Grooves) */}
          <div className="absolute inset-2 rounded-full border border-[#333] opacity-50" />
          <div className="absolute inset-6 rounded-full border border-[#333] opacity-40" />
          <div className="absolute inset-12 rounded-full border border-[#333] opacity-30" />
          <div className="absolute inset-16 rounded-full border border-[#333] opacity-20" />

          {/* Центральная наклейка (Лейбл) */}
          <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center relative z-10 shadow-inner">
            {/* Отверстие в центре */}
            <div className="w-4 h-4 bg-white/90 rounded-full absolute shadow-inner" />
            {/* Текст или иконка вокруг */}
            <span className="text-white text-3xl opacity-90 drop-shadow-md" style={{ transform: 'translateY(-18px)' }}>
              ❤️
            </span>
          </div>
        </div>

        {/* Плавающая иконка Play (исчезает, когда играет) */}
        <div
          className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-accent text-2xl transition-all duration-500 ${
            isPlaying ? 'opacity-0 scale-50 translate-y-4' : 'opacity-100 scale-100'
          }`}
        >
          ▶️
        </div>
      </div>

      <p className="mt-12 text-center text-sm uppercase tracking-widest text-primary/60 max-w-[250px] animate-pulse">
        {isPlaying ? 'Наслаждайся...' : 'Нажми, чтобы включить'}
      </p>

      {/* НЕ ЗАБУДЬ ПОЛОЖИТЬ ФАЙЛ 'our-song.mp3' В ПАПКУ /public */}
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}/my-love.mp3`} preload="metadata" />
    </section>
  );
}
