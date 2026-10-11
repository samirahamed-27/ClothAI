import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getRandomFashionQuote } from '../data/quotes';
import './SplashScreen.css';

/**
 * SplashScreen Component for Drape
 *
 * @param {Function} onFinish - Callback fired when splash finishes or is dismissed
 * @param {number} holdDurationMs - Duration to hold the quote before auto-dismiss (default: 2500ms)
 */
export default function SplashScreen({ onFinish, holdDurationMs = 2500 }) {
  const [selectedQuote] = useState(() => getRandomFashionQuote());
  const [isFadingOut, setIsFadingOut] = useState(false);
  const finishTimerRef = useRef(null);
  const fadeOutTimerRef = useRef(null);
  const isFadingOutRef = useRef(false);

  const triggerFadeOut = useCallback(() => {
    if (isFadingOutRef.current) return;
    isFadingOutRef.current = true;
    setIsFadingOut(true);

    if (finishTimerRef.current) {
      clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }

    // Allow fade-out transition (450ms) to complete before unmounting
    fadeOutTimerRef.current = setTimeout(() => {
      if (onFinish) onFinish();
    }, 450);
  }, [onFinish]);

  // Trigger auto-dismiss after hold duration + fade-in
  useEffect(() => {
    const totalTimeBeforeFadeOut = 500 + holdDurationMs;

    finishTimerRef.current = setTimeout(() => {
      triggerFadeOut();
    }, totalTimeBeforeFadeOut);

    return () => {
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
      if (fadeOutTimerRef.current) clearTimeout(fadeOutTimerRef.current);
    };
  }, [holdDurationMs, triggerFadeOut]);

  const handleSkip = () => {
    triggerFadeOut();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
      triggerFadeOut();
    }
  };

  return (
    <aside
      className={`drape-splash-screen ${isFadingOut ? 'is-fading-out' : 'is-visible'}`}
      onClick={handleSkip}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Welcome to Drape"
      tabIndex={0}
      id="drape-splash-screen"
    >
      {/* Editorial Watermark / Brand Header */}
      <div className="splash-header-brand">
        <span className="splash-monogram">D</span>
        <span className="splash-brand-text">DRAPE</span>
        <span className="splash-edition-tag">COLLECTION 01</span>
      </div>

      {/* Centered Editorial Quote Showcase */}
      <div className="splash-quote-container">
        <div className="splash-quote-glyph" aria-hidden="true">“</div>

        <blockquote className="splash-quote-text">
          {selectedQuote.quote}
        </blockquote>

        {/* Thin Raw Sienna Animated Loading Line */}
        <div className="splash-line-wrapper" aria-hidden="true">
          <div
            className="splash-sienna-line"
            style={{ animationDuration: `${holdDurationMs}ms` }}
          />
        </div>

        {/* Author in small Jost uppercase with wide letter spacing */}
        <p className="splash-author-text">
          {selectedQuote.author}
        </p>

        {selectedQuote.context && (
          <p className="splash-context-text">
            {selectedQuote.context}
          </p>
        )}
      </div>

      {/* Tap to skip hint at bottom */}
      <footer className="splash-footer-hint">
        <span className="splash-skip-pill">Tap anywhere to enter</span>
      </footer>
    </aside>
  );
}
