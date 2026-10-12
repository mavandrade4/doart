export default function About({ t }) {
  return (
    // ABOUT
    <section className="section about" id="about">
      <div className="about__inner">
        {/* ABOUT MASCOT */}
        <div className="about__mascot">
          <img className="about__mascot-image" src="/logo.png" alt="Duarte's cartoon mascot" />
        </div>

        {/* ABOUT TEXT */}
        <div className="about__text">
          <p className="about__paragraph">{t.aboutText}</p>
        </div>
      </div>
    </section>
  );
}
