import { CATEGORIES } from '@/lib/i18n';

// "+ tattoos + illustrations + covers + cartoons". The active one is black,
// the others grey. Shared by the Gallery and Reviews sections.
export default function FilterBar({ t, active, onChange, label, children }) {
  return (
    // FILTER BAR
    <div className="filter-bar">
      <div className="filter-bar__options" role="group" aria-label={label}>
        {CATEGORIES.map((category) => (
          <span key={category} className="filter-bar__entry">
            <span className="filter-bar__plus" aria-hidden="true">+</span>
            <button
              type="button"
              className={`filter-bar__option ${active === category ? 'is-active' : ''}`}
              aria-pressed={active === category}
              onClick={() => onChange(category)}
            >
              {t.categories[category]}
            </button>
          </span>
        ))}
      </div>
      {/* FILTER BAR EXTRA (optional slot, right side) */}
      {children && <div className="filter-bar__extra">{children}</div>}
    </div>
  );
}
