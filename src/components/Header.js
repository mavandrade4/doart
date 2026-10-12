import LangToggle from './LangToggle';

export default function Header({ lang, onLangChange , t}) {
  return (
    // HEADER: brand title (left) + language toggle (right)
    <header className="site-header">
      <div className="site-header__brand">
        <h1 className="site-header__title">
          <span className="site-header__name">
            Duarte
            <br />
            Nunes
          </span>
          <span className="site-header__presents">{t.headerText}</span>
        </h1>
      </div>

      <div className="site-header__lang">
        <LangToggle lang={lang} onChange={onLangChange} className="lang-toggle--header" />
      </div>
    </header>
  );
}
