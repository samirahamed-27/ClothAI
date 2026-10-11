import React from 'react';
import { Link } from 'react-router-dom';
import FashionCard from '../components/FashionCard';
import './AtelierPage.css';

export default function AtelierPage({ onShowToast }) {
  return (
    <div className="atelier-page-wrapper" id="page-atelier">
      {/* Editorial Header */}
      <header className="page-editorial-header">
        <div className="header-badge-row">
          <span className="atelier-season-badge">AUTUMN / WINTER 2026</span>
          <span className="atelier-live-dot">Curated Today</span>
        </div>
        <h1 className="atelier-heading">Atelier</h1>
        <p className="atelier-subheading">
          Where architectural drape meets tactile luxury. Daily proportion studies for the modern wardrobe.
        </p>

        {/* Quick Style Guide navigation pill */}
        <div className="atelier-styleguide-banner">
          <div className="banner-text-group">
            <span className="banner-title">Design System & Living Style Guide</span>
            <span className="banner-sub">Inspect CSS tokens, colors, and specimen</span>
          </div>
          <Link to="/style-guide" className="banner-link-btn" id="link-styleguide">
            Explore Tokens →
          </Link>
        </div>
      </header>

      {/* Hero Showcase Card */}
      <section className="atelier-section">
        <div className="section-header-compact">
          <span className="section-eyebrow">Look 01 • Master Silhouette</span>
          <h2 className="section-title-sm">The Double-Faced Trench</h2>
        </div>

        <FashionCard
          title="The Atelier Drape Trench"
          subtitle="Autumn / Winter Minimalist Silhouette"
          price="$485"
          tag="Master Silhouette"
          tagVariant="nile"
          material="100% Belgian Double-Faced Cashmere"
          quote="“Proportion is the quiet language of modern tailoring.”"
          sizes={['XS', 'S', 'M', 'L']}
          onAddToCart={(item) => onShowToast && onShowToast(`Added to Armoire: ${item}`)}
        />
      </section>

      {/* Secondary Curations */}
      <section className="atelier-section">
        <div className="section-header-compact">
          <span className="section-eyebrow">Look 02 • Volume & Structure</span>
          <h2 className="section-title-sm">Pleated Slate Trouser</h2>
        </div>

        <FashionCard
          title="Pleated Slate Wide Trousers"
          subtitle="Spring / Summer Structured Weave"
          price="$290"
          tag="Atelier Edition"
          tagVariant="olive"
          material="Organic Belgian Linen & Silk Blend"
          quote="“Effortless volume anchored with clean architectural lines.”"
          sizes={['28', '30', '32', '34']}
          onAddToCart={(item) => onShowToast && onShowToast(`Added to Armoire: ${item}`)}
        />
      </section>

      {/* Philosophy Quote */}
      <footer className="atelier-footer-quote">
        <blockquote className="atelier-quote">
          “Fashion changes, but style endures.”
          <cite>— Coco Chanel</cite>
        </blockquote>
      </footer>
    </div>
  );
}
