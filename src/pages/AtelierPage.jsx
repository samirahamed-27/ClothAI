import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QuoteCarousel from '../components/QuoteCarousel';
import OutfitCapture from '../components/OutfitCapture';
import RecentLooksGrid from '../components/RecentLooksGrid';
import './AtelierPage.css';

/**
 * Initial curated looks stored in React state.
 * These use authentic editorial photography so the experience looks stunning on initial load.
 */
const INITIAL_SAVED_LOOKS = [
  {
    id: 101,
    image: '/looks/trench-silhouette.jpg',
    title: 'Double-Faced Trench Silhouette',
    tag: 'Tailoring',
    date: '09:15',
    formattedDate: 'Today, 9:15 AM',
  },
  {
    id: 102,
    image: '/looks/slate-knit.jpg',
    title: 'Slate Blazer & Raw Sienna Knit',
    tag: 'Layers',
    date: 'Yesterday',
    formattedDate: 'Yesterday, 4:20 PM',
  },
];

export default function AtelierPage({ onShowToast }) {
  // Store saved looks in React state as requested
  const [savedLooks, setSavedLooks] = useState(INITIAL_SAVED_LOOKS);

  // Formatted date for editorial header (initialized once to satisfy purity rules)
  const [todayDateString] = useState(() =>
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    })
  );

  const handleSaveLook = (newLook) => {
    setSavedLooks((prev) => [newLook, ...prev]);
  };

  const handleDeleteLook = (lookId) => {
    setSavedLooks((prev) => prev.filter((item) => item.id !== lookId));
  };

  return (
    <div className="atelier-page-wrapper" id="page-atelier">
      {/* 1. TOP SECTION: Horizontally swipeable carousel of fashion quote cards (auto-advances every 6s) */}
      <section className="atelier-top-quote-section" aria-label="Fashion quotes carousel">
        <QuoteCarousel />
      </section>

      {/* 2. GREETING HEADING: in italic ("Today's look") */}
      <header className="atelier-greeting-block">
        <div className="greeting-meta-row">
          <span className="greeting-date-pill">{todayDateString}</span>
          <span className="greeting-capsule-tag">A/W 2026 CAPSULE</span>
        </div>
        <h1 className="atelier-greeting-heading">Today's look</h1>
        <p className="atelier-greeting-sub">
          Where architectural drape meets tactile luxury. Document and curate your daily silhouette.
        </p>
      </header>

      {/* 3. MAIN SECTION: Large rounded "Capture your outfit" card & Preview Frame */}
      <main className="atelier-main-capture-section">
        <OutfitCapture
          onSaveLook={handleSaveLook}
          onShowToast={onShowToast}
        />
      </main>

      {/* 4. RECENT LOOKS: Small grid under capture card titled "Recent looks" */}
      <section className="atelier-recent-looks-section">
        <RecentLooksGrid
          looks={savedLooks}
          onDeleteLook={handleDeleteLook}
          onShowToast={onShowToast}
        />
      </section>

      {/* Editorial Navigation Footer */}
      <footer className="atelier-bottom-actions">
        <div className="atelier-styleguide-banner">
          <div className="banner-text-group">
            <span className="banner-title">Design System & Living Style Guide</span>
            <span className="banner-sub">Inspect CSS tokens, colors, and specimen</span>
          </div>
          <Link to="/style-guide" className="banner-link-btn" id="link-styleguide">
            Inspect Tokens →
          </Link>
        </div>
      </footer>
    </div>
  );
}
