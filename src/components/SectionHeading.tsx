type Props = {
  id: string;
  index: number;
  title: string;
};

/** Section title with a decorative mono index (hidden from assistive tech). */
export function SectionHeading({ id, index, title }: Props) {
  return (
    <h2 id={id} className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
      <span aria-hidden="true" className="mr-3 font-mono text-base text-neon-pink glow-pink">
        {String(index).padStart(2, "0")}.
      </span>
      {title}
    </h2>
  );
}
