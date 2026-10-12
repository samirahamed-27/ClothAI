import React, { useState, useEffect } from 'react';
import './RecentLooksGrid.css';

/**
 * RecentLooksGrid Component
 *
 * Displays saved outfit looks in a compact, polished editorial grid.
 * Supports look inspection modal, keyboard dismissal (Escape), and state deletion.
 */
export default function RecentLooksGrid({ looks = [], onDeleteLook, onShowToast }) {
  const [selectedLook, setSelectedLook] = useState(null);
  const [likedLooks, setLikedLooks] = useState({});

  // Close inspection modal on Escape key
  useEffect(() => {
    if (!selectedLook) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedLook(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLook]);

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setLikedLooks((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (onShowToast) {
        onShowToast(next[id] ? 'Added to favorites' : 'Removed from favorites');
      }
      return next;
    });
  };

  const handleDelete = (e, id, title) => {
    e.stopPropagation();
    if (onDeleteLook) {
      onDeleteLook(id);
    }
    if (selectedLook && selectedLook.id === id) {
      setSelectedLook(null);
    }
    if (onShowToast) {
      onShowToast(`Removed: ${title}`);
    }
  };

  const handleCardClick = (e, look) => {
    // Avoid triggering card view if an internal button was clicked
    if (e.target.closest('button')) {
      return;
    }
    setSelectedLook(look);
  };

  return (
    <section className="recent-looks-section" aria-label="Recent outfit looks">
      <div className="recent-looks-header">
        <div className="recent-title-group">
          <span className="recent-eyebrow">CURATED SILHOUETTES</span>
          <h2 className="recent-heading">Recent looks</h2>
        </div>
        <span className="recent-count-badge">
          {looks.length} {looks.length === 1 ? 'Look' : 'Looks'}
        </span>
      </div>

      {looks.length === 0 ? (
        <div className="recent-looks-empty">
          <div className="empty-silhouette-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          <p className="empty-title">No looks saved yet</p>
          <p className="empty-sub">
            Capture your outfit above to begin archiving your daily wardrobe silhouettes.
          </p>
        </div>
      ) : (
        <div className="recent-looks-grid">
          {looks.map((look) => {
            const isLiked = !!likedLooks[look.id];

            return (
              <article
                key={look.id}
                className="recent-look-card"
                onClick={(e) => handleCardClick(e, look)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedLook(look);
                  }
                }}
                aria-label={`View details for ${look.title}`}
              >
                {/* Image Container with 3:4 Aspect Ratio */}
                <div className="look-image-wrapper">
                  <img
                    src={look.image}
                    alt={look.title || 'Outfit look'}
                    className="look-thumb-img"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="look-gradient-scrim" />

                  {/* Action Badges on Card */}
                  <div className="look-card-top-row">
                    <span className="look-tag-pill">
                      {look.tag || 'Daily'}
                    </span>
                    <button
                      type="button"
                      className={`look-like-btn ${isLiked ? 'is-liked' : ''}`}
                      onClick={(e) => toggleLike(e, look.id)}
                      aria-label={isLiked ? 'Unlike look' : 'Favorite look'}
                      title={isLiked ? 'Unlike look' : 'Favorite look'}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill={isLiked ? '#C9803F' : 'none'} stroke={isLiked ? '#C9803F' : 'currentColor'} strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="look-card-bottom-info">
                    <h3 className="look-card-title">{look.title}</h3>
                    <span className="look-card-date">
                      {look.formattedDate || look.date}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Look Inspection Modal */}
      {selectedLook && (
        <div
          className="look-modal-overlay"
          onClick={() => setSelectedLook(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-look-title"
        >
          <div
            className="look-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-header-meta">
                <span className="modal-badge">{selectedLook.tag || 'Silhouette'}</span>
                <span className="modal-date">{selectedLook.formattedDate || selectedLook.date}</span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedLook(null)}
                aria-label="Close look view"
              >
                ✕
              </button>
            </div>

            <div className="modal-photo-frame">
              <img
                src={selectedLook.image}
                alt={selectedLook.title}
                className="modal-large-img"
              />
            </div>

            <div className="modal-details">
              <h3 id="modal-look-title" className="modal-title">
                {selectedLook.title}
              </h3>
              <p className="modal-caption">
                Captured and curated in the Atelier archive.
              </p>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-action-btn btn-delete"
                  onClick={(e) => handleDelete(e, selectedLook.id, selectedLook.title)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Remove Look
                </button>

                <button
                  type="button"
                  className="modal-action-btn btn-close"
                  onClick={() => setSelectedLook(null)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
