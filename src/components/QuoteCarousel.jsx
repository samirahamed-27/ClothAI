import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fashionQuotes } from '../quotes';
import './QuoteCarousel.css';

/**
 * 5 curated pastel tints derived from the Drape design tokens,
 * ensuring adjacent cards have distinct luxury pastel aesthetics.
 */
const PASTEL_TINTS = [
  {
    bg: '#D3E4E8', // Nile Blue pastel
    border: 'rgba(47, 111, 126, 0.32)',
    text: '#1C4A54',
    author: '#2F6F7E',
    tagBg: 'rgba(47, 111, 126, 0.12)',
    badgeText: '#2F6F7E',
  },
  {
    bg: '#DCE0D0', // Deep Slate Olive pastel
    border: 'rgba(75, 84, 67, 0.32)',
    text: '#2D3528',
    author: '#4B5443',
    tagBg: 'rgba(75, 84, 67, 0.14)',
    badgeText: '#4B5443',
  },
  {
    bg: '#EBE1D4', // Light Brown Drab pastel
    border: 'rgba(180, 156, 126, 0.42)',
    text: '#4F3D2A',
    author: '#7E6852',
    tagBg: 'rgba(180, 156, 126, 0.22)',
    badgeText: '#6D563D',
  },
  {
    bg: '#F3DFCB', // Raw Sienna pastel
    border: 'rgba(201, 128, 63, 0.34)',
    text: '#6A3710',
    author: '#9B5A24',
    tagBg: 'rgba(201, 128, 63, 0.16)',
    badgeText: '#9B5A24',
  },
  {
    bg: '#E7E3DC', // Belgian Warm Linen pastel
    border: 'rgba(110, 105, 94, 0.3)',
    text: '#34312A',
    author: '#5C574B',
    tagBg: 'rgba(110, 105, 94, 0.14)',
    badgeText: '#5C574B',
  },
];

export default function QuoteCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const currentXRef = useRef(0);
  const isHorizontalSwipeRef = useRef(false);
  const containerRef = useRef(null);
  const autoAdvanceTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);

  const quotes = fashionQuotes;
  const total = quotes.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance every 6 seconds as specified
  useEffect(() => {
    if (isPaused || isDragging) return;

    autoAdvanceTimerRef.current = setInterval(() => {
      goToNext();
    }, 6000);

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current);
      }
    };
  }, [isPaused, isDragging, goToNext, currentIndex]);

  // Clean up any pending resume timers on unmount
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current);
      }
    };
  }, []);

  const scheduleResume = () => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  // Handle Touch Events (Mobile swipe with vertical scroll disambiguation)
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    currentXRef.current = e.touches[0].clientX;
    isHorizontalSwipeRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const diffX = e.touches[0].clientX - startXRef.current;
    const diffY = e.touches[0].clientY - startYRef.current;

    // Disambiguate horizontal swipe from vertical page scroll
    if (!isHorizontalSwipeRef.current) {
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 8) {
        isHorizontalSwipeRef.current = true;
      } else if (Math.abs(diffY) > 8) {
        // Vertical page scroll detected; don't hijack scroll
        return;
      }
    }

    if (isHorizontalSwipeRef.current) {
      currentXRef.current = e.touches[0].clientX;
      setDragOffset(diffX * 0.7);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const diff = currentXRef.current - startXRef.current;
    const wasHorizontal = isHorizontalSwipeRef.current;
    setIsDragging(false);
    setDragOffset(0);
    isHorizontalSwipeRef.current = false;

    if (wasHorizontal) {
      if (diff < -40) {
        goToNext();
      } else if (diff > 40) {
        goToPrev();
      }
    }

    scheduleResume();
  };

  // Handle Mouse Drag (Desktop swipe)
  const handleMouseDown = (e) => {
    setIsPaused(true);
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    currentXRef.current = e.clientX;
    const diff = currentXRef.current - startXRef.current;
    setDragOffset(diff * 0.6);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const diff = currentXRef.current - startXRef.current;
    setIsDragging(false);
    setDragOffset(0);

    if (diff < -40) {
      goToNext();
    } else if (diff > 40) {
      goToPrev();
    }

    scheduleResume();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
    setIsPaused(false);
  };

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === 'ArrowLeft') {
      goToPrev();
    }
  };

  return (
    <section
      className="quotes-carousel-section"
      aria-label="Fashion quotes carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => !isDragging && setIsPaused(false)}
    >
      <div className="carousel-eyebrow-row">
        <span className="carousel-eyebrow-label">DAILY EDITORIAL WISDOM</span>
        <span className="carousel-progress-pill">
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Viewport container */}
      <div
        className="quotes-carousel-viewport"
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        aria-roledescription="carousel"
        aria-live="polite"
      >
        <div
          className="quotes-carousel-track"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {quotes.map((item, index) => {
            const tint = PASTEL_TINTS[index % PASTEL_TINTS.length];
            const isActive = index === currentIndex;

            return (
              <article
                key={item.id}
                className={`quote-card ${isActive ? 'is-active' : ''}`}
                style={{
                  backgroundColor: tint.bg,
                  borderColor: tint.border,
                  color: tint.text,
                }}
                aria-hidden={!isActive}
              >
                <div className="quote-card-header">
                  <span
                    className="quote-card-pill"
                    style={{ backgroundColor: tint.tagBg, color: tint.badgeText }}
                  >
                    Atelier Note
                  </span>
                  <span className="quote-glyph" aria-hidden="true">“</span>
                </div>

                <blockquote className="quote-card-text">
                  {item.quote}
                </blockquote>

                <footer className="quote-card-footer">
                  <cite
                    className="quote-card-author"
                    style={{ color: tint.author }}
                  >
                    — {item.author}
                  </cite>
                  {item.context && (
                    <span className="quote-card-context">
                      {item.context}
                    </span>
                  )}
                </footer>
              </article>
            );
          })}
        </div>

        {/* Carousel Arrow Controls */}
        <button
          type="button"
          className="carousel-nav-btn prev-btn"
          onClick={goToPrev}
          aria-label="Previous fashion quote"
          title="Previous quote"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          type="button"
          className="carousel-nav-btn next-btn"
          onClick={goToNext}
          aria-label="Next fashion quote"
          title="Next quote"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Progress & Pagination Dots */}
      <div className="carousel-pagination" role="tablist" aria-label="Quote carousel slide selector">
        {quotes.map((q, idx) => (
          <button
            key={q.id}
            type="button"
            role="tab"
            className={`pagination-dot ${idx === currentIndex ? 'is-active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to quote ${idx + 1} by ${q.author}`}
            aria-selected={idx === currentIndex}
          />
        ))}
      </div>
    </section>
  );
}
