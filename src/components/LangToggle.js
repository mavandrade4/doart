import { LANGS } from '@/lib/i18n';

// "EN | PT" switch. Used in the Header and in the Navbar.
export default function LangToggle({ lang, onChange, className = '' }) {
  return (
    <div className={`lang-toggle ${className}`} role="group" aria-label="Language">
      {LANGS.map((code, i) => (
        <span key={code} className="lang-toggle__entry">
          {i > 0 && <span className="lang-toggle__divider" aria-hidden="true">|</span>}
          <button
            type="button"
            className={`lang-toggle__option ${lang === code ? 'is-active' : ''}`}
            aria-pressed={lang === code}
            onClick={() => onChange(code)}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
