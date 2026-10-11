import React from 'react';
import { Link } from 'react-router-dom';
import StyleGuide from '../components/StyleGuide';
import './StyleGuidePage.css';

export default function StyleGuidePage({ onShowToast, onReplaySplash }) {
  return (
    <div className="styleguide-page-container" id="page-styleguide">
      {/* Return navigation bar */}
      <div className="styleguide-top-bar">
        <Link to="/" className="styleguide-back-link">
          ← Back to Atelier
        </Link>
        <span className="styleguide-badge-pill">Living Design System</span>
      </div>

      <StyleGuide onShowToast={onShowToast} onReplaySplash={onReplaySplash} />
    </div>
  );
}
