import { CATEGORIES } from '@/lib/i18n';

const REPEATS_PER_GROUP = 6;

// Infinite horizontal scroll. The track holds two identical groups and is
// animated by -50%, so the loop is seamless. Purely decorative -> aria-hidden.
export default function Marquee({ t }) {
  const group = Array.from({ length: REPEATS_PER_GROUP }).flatMap((_, round) =>
    CATEGORIES.map((category) => (
      <span key={`${round}-${category}`} className="marquee__item">
        {t.categories[category]} +
      </span>
    ))
  );

  return (
    // MARQUEE
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <div className="marquee__group">{group}</div>
        <div className="marquee__group">{group}</div>
      </div>
    </div>
  );
}
