import React, { useState, useRef } from 'react';
import './OutfitCapture.css';

/**
 * OutfitCapture Component
 *
 * Requirements:
 * - Large rounded "Capture your outfit" card
 * - Camera icon
 * - Dashed Light Brown Drab border (#B49C7E)
 * - Pastel Nile Blue background (#D3E4E8)
 * - Tapping opens phone camera via <input type="file" accept="image/*" capture="environment">
 * - After photo is taken, shows preview in polished frame with "Retake" and "Save look" buttons
 */
export default function OutfitCapture({ onSaveLook, onShowToast }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [lookTitle, setLookTitle] = useState('');
  const [selectedTag, setSelectedTag] = useState('Daily Silhouette');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const tags = ['Daily Silhouette', 'Tailoring', 'Cashmere Layers', 'Minimalist', 'Weekend'];

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      if (onShowToast) onShowToast('Please select a valid image file');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      if (onShowToast) onShowToast('Image file exceeds 25MB limit');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target.result);
      if (!lookTitle) {
        setLookTitle('Look • ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      }
      if (onShowToast) {
        onShowToast('Silhouette captured. Ready to review & save.');
      }
    };
    reader.onerror = () => {
      if (onShowToast) onShowToast('Failed to load image');
    };
    reader.readAsDataURL(file);
  };

  // Card click triggers the hidden camera input unless clicking a specific button
  const handleCardClick = (e) => {
    if (e.target.closest('button')) {
      return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Drag & drop support
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  // Retake photo action: resets preview and prompts camera
  const handleRetake = () => {
    const input = fileInputRef.current;
    setPreviewImage(null);
    setLookTitle('');
    if (input) {
      input.value = '';
      input.click();
    }
  };

  // Cancel / Back to capture without opening camera
  const handleCancelPreview = () => {
    setPreviewImage(null);
    setLookTitle('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Save look action
  const handleSaveLook = () => {
    if (!previewImage) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLook = {
      id: Date.now(),
      image: previewImage,
      title: lookTitle.trim() || 'Daily Look',
      tag: selectedTag,
      date: timeString,
      formattedDate: 'Today, ' + timeString,
    };

    if (onSaveLook) {
      onSaveLook(newLook);
    }

    if (onShowToast) {
      onShowToast(`Saved: ${newLook.title}`);
    }

    // Reset preview
    setPreviewImage(null);
    setLookTitle('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Quick helper to test with sample photo (for desktop browser verification)
  const handleUseDemoPhoto = (e) => {
    e.stopPropagation();
    setPreviewImage('/looks/trench-silhouette.jpg');
    setLookTitle('The Atelier Drape Trench');
    if (onShowToast) onShowToast('Editorial demo silhouette loaded');
  };

  return (
    <div className="outfit-capture-wrapper" id="outfit-capture-zone">
      {/* Hidden camera / file input with environment capture */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="capture-file-input"
        id="outfit-camera-input"
        aria-label="Capture outfit photo with camera"
      />

      {!previewImage ? (
        /* ====================================================================
           1. CAPTURE CARD (Empty State)
           - Large rounded
           - Camera icon
           - Dashed Light Brown Drab border (#B49C7E)
           - Pastel Nile Blue background (#D3E4E8)
           ==================================================================== */
        <div
          tabIndex={0}
          className={`capture-card ${isDragOver ? 'is-drag-over' : ''}`}
          onClick={handleCardClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick(e);
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          aria-label="Capture your outfit. Tap to open camera or drop photo."
          id="btn-capture-outfit"
        >
          {/* Top Decorative Header */}
          <div className="capture-card-badge-row">
            <span className="capture-lens-badge">STUDIO CAMERA</span>
            <span className="capture-ratio-badge">PORTRAIT 3:4</span>
          </div>

          {/* Central Camera Icon & Visual Beacon */}
          <div className="capture-icon-beacon" aria-hidden="true">
            <div className="camera-icon-circle">
              {/* Luxury Camera SVG Icon */}
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="camera-svg-icon"
              >
                {/* Camera Body */}
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                {/* Lens */}
                <circle cx="12" cy="13" r="4" strokeWidth="1.8" />
                {/* Lens Flare Ring */}
                <circle cx="12" cy="13" r="1.5" fill="currentColor" opacity="0.3" />
                {/* Flash/Sensor indicator */}
                <line x1="18.5" y1="9.5" x2="18.51" y2="9.5" strokeWidth="2.5" />
              </svg>
            </div>
            <div className="camera-pulse-ring" />
          </div>

          {/* Card Headings */}
          <div className="capture-text-group">
            <h2 className="capture-title">Capture your outfit</h2>
            <p className="capture-subtitle">
              Tap to open phone camera or upload today’s silhouette
            </p>
          </div>

          {/* Bottom Action Hint & Desktop Demo Link */}
          <div className="capture-card-actions">
            <button
              type="button"
              className="capture-cta-pill"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Open phone camera"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 8 12 12 14 14" />
              </svg>
              Open Camera
            </button>

            <button
              type="button"
              className="demo-sample-link"
              onClick={handleUseDemoPhoto}
              title="Test with an editorial sample photo"
            >
              Demo Look
            </button>
          </div>
        </div>
      ) : (
        /* ====================================================================
           2. PREVIEW STATE (Polished Frame)
           - Polished frame with photo
           - "Retake" button
           - "Save look" button
           ==================================================================== */
        <article className="polished-preview-frame" id="outfit-preview-frame">
          {/* Frame Top Header */}
          <div className="preview-frame-header">
            <div className="preview-status-indicator">
              <span className="live-preview-dot" />
              <span className="preview-label">LOOK PREVIEW</span>
            </div>
            <button
              type="button"
              className="preview-close-btn"
              onClick={handleCancelPreview}
              aria-label="Discard preview"
              title="Discard preview"
            >
              ✕
            </button>
          </div>

          {/* The Editorial Matting / Picture Frame */}
          <div className="photo-matte-container">
            <div className="photo-frame-bevel">
              <img
                src={previewImage}
                alt="Captured outfit preview"
                className="preview-photo-img"
              />
              <div className="photo-corner-accent top-left" />
              <div className="photo-corner-accent top-right" />
              <div className="photo-corner-accent bottom-left" />
              <div className="photo-corner-accent bottom-right" />
            </div>
          </div>

          {/* Look Annotation / Details */}
          <div className="preview-details-form">
            <div className="input-group">
              <label htmlFor="look-title-input" className="input-label">
                SILHOUETTE TITLE
              </label>
              <input
                id="look-title-input"
                type="text"
                className="look-title-field"
                placeholder="Name today’s outfit (e.g. Autumn Wool Silhouette)"
                value={lookTitle}
                onChange={(e) => setLookTitle(e.target.value)}
              />
            </div>

            {/* Tags Pill selector */}
            <div className="tag-selector-row">
              {tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`tag-pill ${selectedTag === t ? 'is-selected' : ''}`}
                  onClick={() => setSelectedTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons: Retake and Save Look */}
          <div className="preview-actions-row">
            <button
              type="button"
              className="preview-btn btn-retake"
              onClick={handleRetake}
              id="btn-retake-photo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 4v6h6" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              Retake
            </button>

            <button
              type="button"
              className="preview-btn btn-save-look"
              onClick={handleSaveLook}
              id="btn-save-look"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Save Look
            </button>
          </div>
        </article>
      )}
    </div>
  );
}
