export default function Marquee({ words }: { words: string[] }) {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="relative -rotate-2 overflow-hidden border-y border-white/10 bg-bone py-4 text-ink">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl font-extrabold uppercase md:text-4xl">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w} <span className="text-pink-deep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
