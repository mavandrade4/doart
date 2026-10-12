import { useEffect } from 'react';

// Click the backdrop / × / Esc to close, click the image to zoom.
export default function Lightbox({ image, zoomed, onToggleZoom, onClose, t }) {
  useEffect(() => {
    if (!image) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [image, onClose]);

  if (!image) return null;

  return (
    // LIGHTBOX
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <img
        src={image}
        alt=""
        className={`lightbox__image ${zoomed ? 'is-zoomed' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleZoom();
        }}
      />
      <button type="button" className="lightbox__close" aria-label={t.lightbox.close} onClick={onClose}>
        ×
      </button>
    </div>
  );
}
