import React, { useState } from 'react';
import Button from './Button';
import './FashionCard.css';

export default function FashionCard({
  title = 'The Atelier Drape Trench',
  subtitle = 'Autumn / Winter Minimalist Silhouette',
  price = '$485',
  tag = 'Limited Edition',
  tagVariant = 'nile', // 'nile' | 'sienna' | 'olive'
  material = '100% Belgian Double-Faced Cashmere',
  quote = '“Proportion is the quiet language of modern tailoring.”',
  sizes = ['XS', 'S', 'M', 'L'],
  onAddToCart,
}) {
  const [selectedSize, setSelectedSize] = useState('S');
  const [isLiked, setIsLiked] = useState(false);

  return (
    <article className="fashion-card" id="sample-fashion-card">
      {/* Visual Showcase / Garment Art Banner */}
      <div className="card-media-wrapper">
        {/* Dynamic Pastel Tag */}
        <span className={`fashion-tag tag-${tagVariant}`}>
          {tag}
        </span>

        {/* Favorite Heart Button */}
        <button
          type="button"
          className={`favorite-btn ${isLiked ? 'is-active' : ''}`}
          onClick={() => setIsLiked(!isLiked)}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? '#C9803F' : 'none'} stroke={isLiked ? '#C9803F' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        {/* Tactile Editorial Fashion Silhouette SVG Artwork */}
        <div className="fashion-illustration-container" aria-hidden="true">
          <svg viewBox="0 0 320 200" fill="none" className="fashion-silhouette-svg">
            <defs>
              <linearGradient id="fabricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2F6F7E" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#4B5443" stopOpacity="0.12" />
              </linearGradient>
              <linearGradient id="accentGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C9803F" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#B49C7E" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Background architectural arches */}
            <path d="M60 200V80C60 40 100 20 160 20C220 20 260 40 260 80V200" stroke="#B49C7E" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <ellipse cx="160" cy="110" rx="90" ry="60" fill="url(#fabricGradient)" />
            <circle cx="210" cy="70" r="38" fill="url(#accentGradient)" />

            {/* Coat Line Art Silhouette */}
            <path d="M148 40L140 68L120 74L105 130L125 185H195L215 130L200 74L180 68L172 40" stroke="#2F6F7E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Lapel details */}
            <path d="M140 68L160 115L180 68" stroke="#2F6F7E" strokeWidth="1.4" />
            <path d="M160 115V185" stroke="#4B5443" strokeWidth="1.4" />
            {/* Belt tie drape */}
            <path d="M130 118H190M155 118L145 160M165 118L158 152" stroke="#C9803F" strokeWidth="1.8" strokeLinecap="round" />
            {/* Collar */}
            <path d="M148 40C152 46 168 46 172 40" stroke="#2F6F7E" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="card-media-caption">
          <span>Look 04 • Edition 2026</span>
          <span className="stock-dot">In Atelier</span>
        </div>
      </div>

      {/* Editorial Content Body */}
      <div className="card-content">
        <div className="card-header-row">
          <div>
            <p className="card-subtitle">{subtitle}</p>
            <h3 className="card-title">{title}</h3>
          </div>
          <span className="card-price">{price}</span>
        </div>

        {/* Editorial Garment Quote in Cormorant Garamond */}
        <blockquote className="card-quote">
          {quote}
        </blockquote>

        <p className="card-material">
          <span className="material-bullet">•</span> {material}
        </p>

        {/* Interactive Size Selector */}
        <div className="size-selector-group">
          <span className="size-label">Select Proportion:</span>
          <div className="size-options" role="radiogroup" aria-label="Available sizes">
            {sizes.map((size) => (
              <button
                type="button"
                key={size}
                className={`size-pill ${selectedSize === size ? 'is-selected' : ''}`}
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="card-actions">
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => onAddToCart && onAddToCart(`${title} (${selectedSize})`)}
            iconRight={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            }
          >
            Curate To Wardrobe
          </Button>
        </div>
      </div>
    </article>
  );
}
