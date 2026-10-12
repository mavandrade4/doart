// Modal form for leaving a review (same fields as before; still not wired to a backend).
export default function FeedbackOverlay({ open, onClose, t }) {
  if (!open) return null;

  return (
    // FEEDBACK OVERLAY
    <div className="overlay" onClick={onClose}>
      <div className="overlay__content" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="overlay__header">
          <h3 className="overlay__title">{t.feedback.title}</h3>
          <button type="button" className="overlay__close" aria-label={t.feedback.cancel} onClick={onClose}>
            ×
          </button>
        </div>

        <form className="overlay__form">
          <input type="text" id="name" placeholder={t.feedback.name} className="overlay__input" />
          <select id="rating" className="overlay__input" defaultValue="5">
            <option value="5">★★★★★ (5/5)</option>
            <option value="4">★★★★☆ (4/5)</option>
            <option value="3">★★★☆☆ (3/5)</option>
            <option value="2">★★☆☆☆ (2/5)</option>
            <option value="1">★☆☆☆☆ (1/5)</option>
          </select>
          <textarea id="comment" placeholder={t.feedback.comment} rows={4} className="overlay__input overlay__textarea" />
          <div className="overlay__actions">
            <button type="button" className="overlay__button" onClick={onClose}>
              {t.feedback.cancel}
            </button>
            <button type="submit" className="overlay__button overlay__button--primary">
              {t.feedback.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
