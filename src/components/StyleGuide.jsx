import React, { useState } from 'react';
import ColorSwatch from './ColorSwatch';
import Button from './Button';
import FashionCard from './FashionCard';
import './StyleGuide.css';

export default function StyleGuide({ onShowToast }) {
  const [activeTab, setActiveTab] = useState('all');
  const [activeThemeColor, setActiveThemeColor] = useState('nile-blue');

  // Brand Color Palette data
  const colorPairs = [
    {
      name: 'Nile Blue',
      role: 'Primary Brand Color',
      description: 'Sophisticated nautical depth for hero actions, badges & primary accents.',
      textColorOnPrimary: '#FAF7F2',
      primary: { hex: '#2F6F7E', varName: '--color-nile-blue' },
      tint: { hex: '#D3E4E8', varName: '--color-nile-blue-pastel' },
    },
    {
      name: 'Deep Slate Olive',
      role: 'Secondary Brand Color',
      description: 'Earthy architectural anchor for typography, structural cards & borders.',
      textColorOnPrimary: '#FAF7F2',
      primary: { hex: '#4B5443', varName: '--color-deep-slate-olive' },
      tint: { hex: '#DCE0D0', varName: '--color-deep-slate-olive-pastel' },
    },
    {
      name: 'Light Brown Drab',
      role: 'Neutral Tailoring Tone',
      description: 'Subtle linen warmth for dividers, secondary borders & quiet captions.',
      textColorOnPrimary: '#FAF7F2',
      primary: { hex: '#B49C7E', varName: '--color-light-brown-drab' },
      tint: { hex: '#EBE1D4', varName: '--color-light-brown-drab-pastel' },
    },
    {
      name: 'Raw Sienna',
      role: 'Accent Brand Color',
      description: 'Rich terracotta warmth for callouts, favorites, badges & highlights.',
      textColorOnPrimary: '#FFFFFF',
      primary: { hex: '#C9803F', varName: '--color-raw-sienna' },
      tint: { hex: '#F3DFCB', varName: '--color-raw-sienna-pastel' },
    },
  ];

  const handleCopyHex = (hex, label) => {
    navigator.clipboard?.writeText(hex).then(
      () => onShowToast(`Copied ${label} (${hex}) to clipboard!`),
      () => onShowToast(`Selected ${hex}`)
    );
  };

  const navTabs = [
    { id: 'all', label: 'All Specs' },
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'cards', label: 'Fashion Cards' },
  ];

  return (
    <div className="style-guide-wrapper" id="drape-style-guide">
      {/* -------------------------------------------------------------------
          Editorial Header & Masthead
          ------------------------------------------------------------------- */}
      <header className="guide-masthead">
        <div className="masthead-badge">
          <span className="masthead-edition">COLLECTION 01 • MOBILE DESIGN SYSTEM</span>
        </div>
        <h1 className="masthead-brand-title">Drape</h1>
        <p className="masthead-tagline">
          Tactile luxury design tokens, typography, and mobile-first fashion architecture.
        </p>

        <div className="masthead-canvas-badge">
          <span className="canvas-dot"></span>
          <span>Background: <strong>#FAF7F2</strong> (Warm Linen Off-White)</span>
        </div>

        {/* Navigation filter pills */}
        <nav className="guide-filter-tabs" aria-label="Style guide sections">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`filter-pill ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* -------------------------------------------------------------------
          SECTION 1: COLOR PALETTE
          ------------------------------------------------------------------- */}
      {(activeTab === 'all' || activeTab === 'colors') && (
        <section className="guide-section" id="section-colors">
          <div className="section-title-bar">
            <span className="section-step">01</span>
            <div className="section-title-wrap">
              <h2 className="section-title">Color Architecture</h2>
              <p className="section-desc">
                4 Primary tones paired with custom pastel tints. Tap any swatch to copy its hex value.
              </p>
            </div>
          </div>

          <div className="color-swatches-grid">
            {colorPairs.map((pair) => (
              <ColorSwatch
                key={pair.name}
                colorPair={pair}
                onCopyHex={handleCopyHex}
              />
            ))}
          </div>

          {/* Background Canvas Card */}
          <div className="canvas-spec-card">
            <div className="canvas-spec-color" style={{ backgroundColor: '#FAF7F2' }}></div>
            <div className="canvas-spec-details">
              <h4>Off-White Background Canvas</h4>
              <p>Default mobile app backdrop with zero glare and tactile linen softness.</p>
              <code>--color-bg: #FAF7F2;</code>
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------
          SECTION 2: TYPOGRAPHY SYSTEM
          ------------------------------------------------------------------- */}
      {(activeTab === 'all' || activeTab === 'typography') && (
        <section className="guide-section" id="section-typography">
          <div className="section-title-bar">
            <span className="section-step">02</span>
            <div className="section-title-wrap">
              <h2 className="section-title">Typography System</h2>
              <p className="section-desc">
                <strong>Cormorant Garamond (italic 400/600)</strong> for headings & quotes; <strong>Jost</strong> for clean body legibility.
              </p>
            </div>
          </div>

          {/* Cormorant Garamond Specimen */}
          <div className="typography-specimen-box">
            <div className="specimen-header">
              <span className="specimen-font-name">Cormorant Garamond</span>
              <span className="specimen-tag">Headings & Quotes</span>
            </div>

            <div className="specimen-item">
              <div className="specimen-meta">Display / Title • Italic 600 • 44px</div>
              <h1 className="heading-display">Editorial Silhouette</h1>
            </div>

            <div className="specimen-item">
              <div className="specimen-meta">Heading 1 • Italic 600 • 36px</div>
              <h2 className="heading-h1">The Architectural Drape</h2>
            </div>

            <div className="specimen-item">
              <div className="specimen-meta">Heading 2 • Italic 400 • 30px</div>
              <h3 className="heading-h2">Tactile Double-Faced Wool</h3>
            </div>

            <div className="specimen-item">
              <div className="specimen-meta">Heading 3 • Italic 600 • 24px</div>
              <h4 className="heading-h3">Handcrafted In The Milan Atelier</h4>
            </div>

            {/* Editorial Quote Demo */}
            <div className="specimen-item quote-item">
              <div className="specimen-meta">Editorial Quote • Italic 400 • 20px</div>
              <blockquote className="editorial-quote-block">
                <span className="quote-glyph">“</span>
                Fashion is architecture: it is a matter of proportions. True elegance is when the silhouette breathes.
                <cite className="quote-author">— Drape Atelier Note, Autumn 2026</cite>
              </blockquote>
            </div>
          </div>

          {/* Jost Specimen */}
          <div className="typography-specimen-box jost-box">
            <div className="specimen-header">
              <span className="specimen-font-name">Jost</span>
              <span className="specimen-tag">Body & Interface</span>
            </div>

            <div className="specimen-item">
              <div className="specimen-meta">Body Large • Regular (400) • 18px</div>
              <p className="jost-body-lg">
                Drape explores the delicate tension between structured tailoring and fluid textile movement.
              </p>
            </div>

            <div className="specimen-item">
              <div className="specimen-meta">Body Base • Regular (400) • 16px</div>
              <p className="jost-body-base">
                Crafted with organic fibers ethically sourced from heritage Italian mills, our garments are measured down to the millimeter for fluid contouring.
              </p>
            </div>

            <div className="specimen-item">
              <div className="specimen-meta">Caption & Tags • Medium (500) • Uppercase 12px</div>
              <p className="editorial-caption">
                PROPORTION • TEXTURE • HERITAGE WEAVE • SUSTAINABLE
              </p>
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------
          SECTION 3: SPACING, RADIUS & SHADOWS
          ------------------------------------------------------------------- */}
      {(activeTab === 'all' || activeTab === 'buttons') && (
        <section className="guide-section" id="section-tokens">
          <div className="section-title-bar">
            <span className="section-step">03</span>
            <div className="section-title-wrap">
              <h2 className="section-title">Tokens: Radius & Shadow</h2>
              <p className="section-desc">
                Soft 16px border-radius standard paired with subtle luxury shadow depth.
              </p>
            </div>
          </div>

          {/* Radius demo cards */}
          <div className="token-demos-grid">
            <div className="token-card radius-token-card">
              <div className="radius-visual-box">
                <span className="radius-badge">16px Radius</span>
              </div>
              <div className="token-info">
                <strong>--radius-soft: 16px</strong>
                <span>Primary soft curvature used across cards, modals & inputs.</span>
              </div>
            </div>

            <div className="token-card shadow-token-card">
              <div className="shadow-visual-box">
                <span>Subtle Depth</span>
              </div>
              <div className="token-info">
                <strong>--shadow-subtle</strong>
                <span>Organic ambient shadow with Nile Blue & Olive tints.</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------
          SECTION 4: BUTTONS & UI CONTROLS
          ------------------------------------------------------------------- */}
      {(activeTab === 'all' || activeTab === 'buttons') && (
        <section className="guide-section" id="section-buttons">
          <div className="section-title-bar">
            <span className="section-step">04</span>
            <div className="section-title-wrap">
              <h2 className="section-title">Button Components</h2>
              <p className="section-desc">
                Sample buttons using the 16px soft radius, tactile hover lifts, and palette colors.
              </p>
            </div>
          </div>

          <div className="buttons-showcase-card">
            <div className="button-group-row">
              <div className="button-demo-item">
                <span className="btn-demo-label">Primary (Nile Blue #2F6F7E)</span>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => onShowToast('Clicked Nile Blue Primary button')}
                >
                  Confirm Order
                </Button>
              </div>

              <div className="button-demo-item">
                <span className="btn-demo-label">Olive (Deep Slate #4B5443)</span>
                <Button
                  variant="olive"
                  size="md"
                  fullWidth
                  onClick={() => onShowToast('Clicked Deep Slate Olive button')}
                >
                  Explore Collection
                </Button>
              </div>

              <div className="button-demo-item">
                <span className="btn-demo-label">Accent (Raw Sienna #C9803F)</span>
                <Button
                  variant="accent"
                  size="md"
                  fullWidth
                  onClick={() => onShowToast('Clicked Raw Sienna Accent button')}
                >
                  Book Private Fitting
                </Button>
              </div>
            </div>

            {/* Pastel Tint Buttons */}
            <div className="button-tint-row">
              <div className="button-demo-item">
                <span className="btn-demo-label">Pastel Tint Primary (#D3E4E8)</span>
                <Button
                  variant="tint-primary"
                  size="sm"
                  fullWidth
                  onClick={() => onShowToast('Clicked Nile Pastel button')}
                >
                  Filter By Fabric
                </Button>
              </div>

              <div className="button-demo-item">
                <span className="btn-demo-label">Pastel Tint Accent (#F3DFCB)</span>
                <Button
                  variant="tint-accent"
                  size="sm"
                  fullWidth
                  onClick={() => onShowToast('Clicked Sienna Pastel button')}
                >
                  Seasonal Lookbook
                </Button>
              </div>
            </div>

            {/* Outline & Pill variants */}
            <div className="button-misc-row">
              <Button
                variant="outline"
                size="md"
                onClick={() => onShowToast('Clicked Outline button')}
              >
                Outline Button
              </Button>

              <Button
                variant="primary"
                radius="pill"
                size="md"
                onClick={() => onShowToast('Clicked Pill button')}
              >
                Pill Shaped
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------
          SECTION 5: SAMPLE FASHION CARDS
          ------------------------------------------------------------------- */}
      {(activeTab === 'all' || activeTab === 'cards') && (
        <section className="guide-section" id="section-cards">
          <div className="section-title-bar">
            <span className="section-step">05</span>
            <div className="section-title-wrap">
              <h2 className="section-title">Sample Fashion Cards</h2>
              <p className="section-desc">
                Living mobile fashion cards demonstrating soft 16px radius, subtle shadow, typography, and interactive controls.
              </p>
            </div>
          </div>

          <div className="cards-stack">
            {/* Card 1: Nile Blue / Cashmere */}
            <FashionCard
              title="The Atelier Drape Trench"
              subtitle="Autumn / Winter Minimalist Silhouette"
              price="$485"
              tag="Atelier Edition"
              tagVariant="nile"
              material="100% Belgian Double-Faced Cashmere"
              quote="“Proportion is the quiet language of modern tailoring.”"
              sizes={['XS', 'S', 'M', 'L']}
              onAddToCart={(item) => onShowToast(`Added to Wardrobe: ${item}`)}
            />

            {/* Card 2: Deep Slate Olive / Linen */}
            <FashionCard
              title="Pleated Slate Wide Trousers"
              subtitle="Spring / Summer Structured Weave"
              price="$290"
              tag="New Arrival"
              tagVariant="olive"
              material="Organic Belgian Linen & Silk Blend"
              quote="“Effortless volume anchored with clean architectural lines.”"
              sizes={['28', '30', '32', '34']}
              onAddToCart={(item) => onShowToast(`Added to Wardrobe: ${item}`)}
            />
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------
          SECTION 6: INTERACTIVE COLOR LAB
          ------------------------------------------------------------------- */}
      {activeTab === 'all' && (
        <section className="guide-section" id="section-lab">
          <div className="interactive-lab-card">
            <div className="lab-header">
              <span className="lab-badge">Interactive Test</span>
              <h3 className="lab-title">Design System Playground</h3>
              <p className="lab-desc">
                Select a primary color to test dynamic accent harmony:
              </p>
            </div>

            <div className="theme-selector-pills">
              {[
                { id: 'nile-blue', name: 'Nile Blue', hex: '#2F6F7E' },
                { id: 'deep-slate-olive', name: 'Slate Olive', hex: '#4B5443' },
                { id: 'light-brown-drab', name: 'Brown Drab', hex: '#B49C7E' },
                { id: 'raw-sienna', name: 'Raw Sienna', hex: '#C9803F' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`theme-pill ${activeThemeColor === c.id ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveThemeColor(c.id);
                    onShowToast(`Activated ${c.name} palette`);
                  }}
                  style={{ '--pill-color': c.hex }}
                >
                  <span className="pill-dot" style={{ backgroundColor: c.hex }}></span>
                  {c.name}
                </button>
              ))}
            </div>

            <div className="lab-preview-box" style={{ borderColor: colorPairs.find(p => p.primary.varName.includes(activeThemeColor))?.primary.hex }}>
              <div
                className="lab-accent-ribbon"
                style={{ backgroundColor: colorPairs.find(p => p.primary.varName.includes(activeThemeColor))?.primary.hex }}
              >
                <span>Active Accent: {activeThemeColor}</span>
              </div>
              <p className="lab-sample-text">
                "Simplicity is the keynote of all true elegance."
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Guide Footer */}
      <footer className="guide-footer">
        <p className="footer-logo">DRAPE</p>
        <p className="footer-notes">Design system tokens & mobile specifications built with React + Vite.</p>
      </footer>
    </div>
  );
}
