export type PolaroidMemory = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  date: string;
  dateLabel: string;
};

type Props = {
  memory: PolaroidMemory;
  className?: string;
};

export function PolaroidCard({ memory, className = '' }: Props) {
  return (
    <article
      className={`polaroid-card rounded-sm bg-white p-3 pb-6 shadow-xl ring-1 ring-black/5 ${className}`}
    >
      <div className="overflow-hidden rounded-sm bg-base">
        <img
          src={memory.src}
          width={memory.width}
          height={memory.height}
          alt={memory.alt}
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="mt-3 font-serif text-[1.25rem] leading-snug text-primary">
        {memory.caption}
      </p>
      <time
        dateTime={memory.date}
        className="mt-1 block text-[0.75rem] uppercase tracking-widest text-accent"
      >
        {memory.dateLabel}
      </time>
    </article>
  );
}
