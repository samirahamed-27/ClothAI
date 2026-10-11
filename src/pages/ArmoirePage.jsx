import React, { useState } from 'react';
import './ArmoirePage.css';

export default function ArmoirePage({ onShowToast }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Capsule (8)' },
    { id: 'outerwear', label: 'Coats' },
    { id: 'tailoring', label: 'Tailoring' },
    { id: 'knits', label: 'Knits' },
    { id: 'silks', label: 'Silks' },
  ];

  const wardrobeItems = [
    {
      id: 1,
      category: 'outerwear',
      name: 'Double-Faced Cashmere Trench',
      tone: 'Nile Blue #2F6F7E',
      fabric: '100% Belgian Cashmere',
      proportion: 'Longline Drape • Size S',
      accentColor: '#2F6F7E',
      tintColor: '#D3E4E8',
    },
    {
      id: 2,
      category: 'tailoring',
      name: 'Structured Pleated Trouser',
      tone: 'Deep Slate Olive #4B5443',
      fabric: 'Belgian Linen Blend',
      proportion: 'High-Rise Wide Leg • Size 28',
      accentColor: '#4B5443',
      tintColor: '#DCE0D0',
    },
    {
      id: 3,
      category: 'knits',
      name: 'Ribbed Raw Silk Knit Collar',
      tone: 'Raw Sienna #C9803F',
      fabric: '70% Mulberry Silk, 30% Cashmere',
      proportion: 'Relaxed Contour • Size M',
      accentColor: '#C9803F',
      tintColor: '#F3DFCB',
    },
    {
      id: 4,
      category: 'tailoring',
      name: 'Oversized Atelier Blazer',
      tone: 'Light Brown Drab #B49C7E',
      fabric: 'Heritage Italian Wool Gabardine',
      proportion: 'Architectural Shoulder • Size S',
      accentColor: '#B49C7E',
      tintColor: '#EBE1D4',
    },
  ];

  const filteredItems = selectedCategory === 'all'
    ? wardrobeItems
    : wardrobeItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="armoire-page-wrapper" id="page-armoire">
      {/* Editorial Header */}
      <header className="page-editorial-header">
        <div className="header-badge-row">
          <span className="armoire-capsule-badge">CAPSULE 01 • CURATED ARCHIVE</span>
          <span className="armoire-stat-text">4 Silhouettes</span>
        </div>
        <h1 className="armoire-heading">Armoire</h1>
        <p className="armoire-subheading">
          Your personal wardrobe architecture. Mindfully curated garments measured for fluid proportions.
        </p>

        {/* Category Pills */}
        <div className="armoire-category-tabs" role="tablist" aria-label="Wardrobe categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`category-pill ${selectedCategory === cat.id ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Wardrobe Grid */}
      <div className="armoire-grid">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="armoire-card"
            style={{ '--item-accent': item.accentColor, '--item-tint': item.tintColor }}
          >
            <div className="armoire-card-swatch-bar">
              <span className="swatch-color-dot" style={{ backgroundColor: item.accentColor }}></span>
              <span className="swatch-color-name">{item.tone}</span>
            </div>

            <div className="armoire-card-body">
              <h3 className="armoire-card-title">{item.name}</h3>
              <p className="armoire-card-fabric">{item.fabric}</p>
              <div className="armoire-card-meta">
                <span className="armoire-proportion-tag">{item.proportion}</span>
              </div>
            </div>

            <button
              type="button"
              className="armoire-card-action"
              onClick={() => onShowToast && onShowToast(`Styled: ${item.name}`)}
            >
              Style Silhouette →
            </button>
          </article>
        ))}

        {/* Empty Placeholder Slot to Curate New Item */}
        <button
          type="button"
          className="armoire-add-card"
          onClick={() => onShowToast && onShowToast('Add garment from Atelier')}
          aria-label="Curate new garment"
        >
          <div className="add-icon-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <span className="add-title">Curate New Silhouette</span>
          <span className="add-subtitle">Import look from Atelier archive</span>
        </button>
      </div>
    </div>
  );
}
