import { useEffect, useState } from 'react';
import FilterBar from './FilterBar';
import { CATEGORIES } from '@/lib/i18n';
import { thumbUrl, fullUrl } from '@/lib/images';

const EAGER_COUNT = 8; // first tiles load immediately, the rest lazy-load
const SKELETON_COUNT = 8; // placeholder tiles while Cosmic responds
const PRELOAD_PER_CATEGORY = 12; // thumbnails warmed up for the other filters

// One grid tile: grey placeholder, image fades in once it has loaded.
function GalleryTile({ item, index, onSelect }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="gallery__cell">
      <button type="button" className="gallery__item" onClick={() => onSelect(fullUrl(item))}>
        <img
          className={`gallery__image ${loaded ? 'is-loaded' : ''}`}
          src={thumbUrl(item)}
          alt={item.title || ''}
          loading={index < EAGER_COUNT ? 'eager' : 'lazy'}
          fetchPriority={index < 4 ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
      </button>
    </div>
  );
}

// `itemsByCategory` = { tattoos: [...], illustrations: [...], ... } (Cosmic objects)
export default function Gallery({ t, itemsByCategory, loading, onSelectImage }) {
  const [activeFilter, setActiveFilter] = useState(CATEGORIES[0]);

  const items = (itemsByCategory[activeFilter] || []).filter((item) => thumbUrl(item));

  // Once the data is here, quietly download the first thumbnails of every
  // category while the browser is idle, so switching filters is instant.
  useEffect(() => {
    if (loading) return;

    const warmUp = () => {
      CATEGORIES.forEach((category) => {
        (itemsByCategory[category] || []).slice(0, PRELOAD_PER_CATEGORY).forEach((item) => {
          const url = thumbUrl(item);
          if (url) new Image().src = url;
        });
      });
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(warmUp, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(warmUp, 1000);
    return () => clearTimeout(id);
  }, [loading, itemsByCategory]);

  return (
    // GALLERY
    <section className="section gallery" id="gallery">
      <div className="container">
        {/* GALLERY HEADER */}
        <div className="gallery__header">
          <h2 className="section-title">{t.gallery.title}</h2>
          <FilterBar
            t={t}
            active={activeFilter}
            onChange={setActiveFilter}
            label={t.gallery.filterLabel}
          />
        </div>

        {/* GALLERY GRID */}
        {loading ? (
          <div className="gallery__grid" aria-hidden="true">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div key={i} className="gallery__cell">
                <div className="gallery__item gallery__item--skeleton" />
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="gallery__grid">
            {items.map((item, index) => (
              <GalleryTile key={item._id} item={item} index={index} onSelect={onSelectImage} />
            ))}
          </div>
        ) : (
          <p className="gallery__empty">{t.gallery.empty}</p>
        )}
      </div>
    </section>
  );
}