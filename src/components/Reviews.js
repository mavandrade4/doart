import { useEffect, useMemo, useState } from 'react';
import FilterBar from './FilterBar';
import { CATEGORIES } from '@/lib/i18n';

// Two columns on desktop, one on mobile. Reviews are dealt round-robin
// (1 left, 2 right, 3 left...) so the wall reads left-to-right like the design.
function useColumnCount() {
  const [count, setCount] = useState(2);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 700px)');
    const update = () => setCount(query.matches ? 1 : 2);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return count;
}

export default function Reviews({ t, reviews, onAddReview }) {
  const [activeFilter, setActiveFilter] = useState(CATEGORIES[0]);
  const columnCount = useColumnCount();

  // A review with no `category` in Cosmic shows under every filter.
  const visible = useMemo(
    () => reviews.filter((r) => !r.metadata?.category || r.metadata.category === activeFilter),
    [reviews, activeFilter]
  );

  const columns = useMemo(() => {
    const cols = Array.from({ length: columnCount }, () => []);
    visible.forEach((review, i) => cols[i % columnCount].push(review));
    return cols;
  }, [visible, columnCount]);

  return (
    // REVIEWS
    <section className="section reviews" id="reviews">
      <div className="container">
        {/* REVIEWS HEADER */}
        <div className="reviews__header">
          <h2 className="section-title">{t.reviews.title}</h2>
          <FilterBar
            t={t}
            active={activeFilter}
            onChange={setActiveFilter}
            label={t.reviews.filterLabel}
          >
            <button type="button" className="reviews__add" onClick={onAddReview}>
              + {t.reviews.add}
            </button>
          </FilterBar>
        </div>

        {/* REVIEWS WALL */}
        {visible.length > 0 ? (
          <div className="reviews__columns">
            {columns.map((column, c) => (
              <div key={c} className="reviews__column">
                {column.map((review) => {
                  const rating = Math.max(0, Math.min(5, Number(review.metadata?.rating) || 0));
                  return (
                    // REVIEW CARD
                    <article key={review._id} className="review-card">
                      <div
                        className="review-card__stars"
                        role="img"
                        aria-label={`${rating} / 5`}
                      >
                        {'★'.repeat(rating)}
                        <span className="review-card__stars-empty">{'★'.repeat(5 - rating)}</span>
                      </div>
                      <p className="review-card__comment">{review.metadata?.description}</p>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <p className="reviews__empty">{t.reviews.empty}</p>
        )}
      </div>
    </section>
  );
}
