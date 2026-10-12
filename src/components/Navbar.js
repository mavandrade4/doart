import LangToggle from './LangToggle';

// Sticky navigation bar. Links scroll to the section ids below.
export default function Navbar({ t, lang, onLangChange }) {
  return (
    // NAVBAR (sticky)
    <nav className="navbar" aria-label="Main">
      <div className="navbar__inner">
        <div className="navbar__links">
          <a className="navbar__link" href="#about">{t.nav.about}</a>
          <a className="navbar__link" href="#gallery">{t.nav.gallery}</a>
          <a className="navbar__link" href="#reviews">{t.nav.reviews}</a>
        </div>
        <div className="navbar__lang">
          <LangToggle lang={lang} onChange={onLangChange} className="lang-toggle--nav" />
        </div>
      </div>
    </nav>
  );
}
