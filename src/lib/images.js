// Cosmic serves every uploaded media file through imgix, which can resize on
// the fly. Without this the grid downloads the ORIGINAL upload (often 3-8 MB
// phone photos) for a ~300px tile.
const THUMB_PARAMS = 'w=600&h=600&fit=crop&auto=format,compression';
const FULL_PARAMS = 'w=2000&auto=format,compression';

const withParams = (media, params) => {
  if (!media) return '';
  if (!media.imgix_url) return media.url || ''; // fallback: original file
  const sep = media.imgix_url.includes('?') ? '&' : '?';
  return `${media.imgix_url}${sep}${params}`;
};

// small square used in the grid
export const thumbUrl = (item) => withParams(item.metadata?.img, THUMB_PARAMS);
// larger version used in the lightbox
export const fullUrl = (item) => withParams(item.metadata?.img, FULL_PARAMS);