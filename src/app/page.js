'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { createBucketClient } from '@cosmicjs/sdk';
import { CATEGORIES, DEFAULT_LANG, translations } from '@/lib/i18n';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Lightbox from '@/components/Lightbox';
import FeedbackOverlay from '@/components/FeedbackOverlay';
import './page.css';

const emptyGallery = () => Object.fromEntries(CATEGORIES.map((c) => [c, []]));
const TAG_FIELDS = ['tag', 'tags', 'category', 'type'];

const getTags = (item) => {
  const meta = item.metadata || {};
  return TAG_FIELDS.flatMap((field) => {
    const v = meta[field];
    if (Array.isArray(v)) return v.flatMap((x) => (x && typeof x === 'object' ? [x.key, x.value, x.title] : [x]));
    if (v && typeof v === 'object') return [v.key, v.value, v.title]; // select-dropdown values
    return [v];
  })
    .filter(Boolean)
    .map((v) => String(v).trim().toLowerCase());
};

const splitIllustrations = (objects) => {
  const out = { illustrations: [], covers: [], cartoons: [] };
  objects.forEach((item) => {
    const tags = getTags(item);
    if (tags.some((t) => t.startsWith('cover'))) out.covers.push(item);
    else if (tags.some((t) => t.startsWith('cartoon'))) out.cartoons.push(item);
    else out.illustrations.push(item);
  });
  return out;
};

export default function Home() {
  // LANGUAGE
  const [lang, setLang] = useState(DEFAULT_LANG);
  const t = translations[lang];

  // FEEDBACK OVERLAY
  const [isFeedbackOverlayOpen, setIsFeedbackOverlayOpen] = useState(false);
  // ZOOM IMAGES
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  // COSMIC BUCKETS
  const [reviews, setReviews] = useState([]);
  // { tattoos: [...], illustrations: [...], covers: [...], cartoons: [...] }
  const [gallery, setGallery] = useState(emptyGallery);
  const [galleryLoading, setGalleryLoading] = useState(true);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // FETCH FROM COSMIC
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_COSMIC_BUCKET || !process.env.NEXT_PUBLIC_COSMIC_READ_KEY) {
      console.error(
        'Cosmic env vars missing: set NEXT_PUBLIC_COSMIC_BUCKET and NEXT_PUBLIC_COSMIC_READ_KEY in .env.local and restart the dev server.'
      );
    }

    const cosmic = createBucketClient({
      bucketSlug: process.env.NEXT_PUBLIC_COSMIC_BUCKET,
      readKey: process.env.NEXT_PUBLIC_COSMIC_READ_KEY,
    });

    let cancelled = false;

    // Fetches every object of a Cosmic object type (returns [] on error)
    const fetchType = async (type) => {
      try {
        const res = await cosmic.objects.find({ type });
        return res.objects || [];
      } catch (err) {
        console.error(`Error fetching ${type}:`, err);
        return [];
      }
    };

    // FETCH REVIEWS
    fetchType('reviews').then((objects) => {
      if (!cancelled) setReviews(objects);
    });

    // FETCH TATTOOS + ILLUSTRATIONS (covers & cartoons are tagged illustrations)
    Promise.all([fetchType('tattoos'), fetchType('illustrations')]).then(([tattoos, illustrations]) => {
      if (cancelled) return;
      setGallery({ tattoos, ...splitIllustrations(illustrations) });
      setGalleryLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // LIGHTBOX
  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    setZoomed(false);
  }, []);

  const openLightbox = (url) => {
    setSelectedImage(url);
    setZoomed(false);
  };

  return (
    <div className="page">
      {/* HEADER */}
      <Header lang={lang} onLangChange={setLang} t={t} />

      {/* HERO */}
      <Hero />

      {/* MARQUEE (infinite horizontal scroll) */}
      <Marquee t={t} />

      {/* NAVBAR (sticky) */}
      <Navbar t={t} lang={lang} onLangChange={setLang} />

      {/* MAIN CONTENT */}
      <main className="page__main">
        <About t={t} />
        <Gallery t={t} itemsByCategory={gallery} loading={galleryLoading} onSelectImage={openLightbox} />
        <Reviews t={t} reviews={reviews} onAddReview={() => setIsFeedbackOverlayOpen(true)} />
      </main>

      {/* LIGHTBOX */}
      <Lightbox
        t={t}
        image={selectedImage}
        zoomed={zoomed}
        onToggleZoom={() => setZoomed((z) => !z)}
        onClose={closeLightbox}
      />

      {/* FEEDBACK OVERLAY */}
      <FeedbackOverlay
        t={t}
        open={isFeedbackOverlayOpen}
        onClose={() => setIsFeedbackOverlayOpen(false)}
      />
    </div>
  );
}