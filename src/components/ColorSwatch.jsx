import React from 'react';
import './ColorSwatch.css';

export default function ColorSwatch({ colorPair, onCopyHex }) {
  const { name, role, primary, tint, textColorOnPrimary, description } = colorPair;

  return (
    <article className="color-pair-card" id={`color-pair-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="color-card-header">
        <div className="color-title-group">
          <h4 className="color-name">{name}</h4>
          <span className="color-role-tag">{role}</span>
        </div>
        <p className="color-description">{description}</p>
      </div>

      <div className="swatches-split-view">
        {/* Primary Color Swatch */}
        <button
          type="button"
          className="swatch-panel primary-swatch"
          style={{ backgroundColor: primary.hex, color: textColorOnPrimary || '#FAF7F2' }}
          onClick={() => onCopyHex(primary.hex, `${name} Primary`)}
          title={`Click to copy ${primary.hex}`}
          aria-label={`Copy ${name} primary hex code ${primary.hex}`}
        >
          <div className="swatch-label-badge">Primary</div>
          <div className="swatch-meta">
            <span className="swatch-hex">{primary.hex}</span>
            <span className="swatch-variable">{primary.varName}</span>
          </div>
          <span className="swatch-copy-hint">Tap to copy</span>
        </button>

        {/* Paired Pastel Tint Swatch */}
        <button
          type="button"
          className="swatch-panel tint-swatch"
          style={{ backgroundColor: tint.hex, color: '#212520' }}
          onClick={() => onCopyHex(tint.hex, `${name} Pastel Tint`)}
          title={`Click to copy ${tint.hex}`}
          aria-label={`Copy ${name} pastel tint hex code ${tint.hex}`}
        >
          <div className="swatch-label-badge tint-badge">Pastel Tint</div>
          <div className="swatch-meta">
            <span className="swatch-hex">{tint.hex}</span>
            <span className="swatch-variable">{tint.varName}</span>
          </div>
          <span className="swatch-copy-hint">Tap to copy</span>
        </button>
      </div>
    </article>
  );
}
