import React, { useState } from 'react';
import './SalonPage.css';

export default function SalonPage({ onShowToast }) {
  const [likedDiscussions, setLikedDiscussions] = useState({});

  const discussions = [
    {
      id: 1,
      topic: 'Tailoring Dialogue',
      title: 'On the quiet architecture of double-faced Belgian wool',
      contributor: 'Elena V. • Milan',
      likes: 24,
      replies: 7,
      quote: '“When the seam is concealed by hand, the coat moves as if sculpted from a single breath of fabric.”',
      tag: 'Textile Craft',
      tint: '#D3E4E8',
      accent: '#2F6F7E',
    },
    {
      id: 2,
      topic: 'Proportion Study',
      title: 'Why oversized silhouettes require stricter vertical discipline',
      contributor: 'Marcus T. • Paris',
      likes: 41,
      replies: 12,
      quote: '“Without shoulder tension, volume is just bagginess. True drape requires an architectural anchor.”',
      tag: 'Silhouette',
      tint: '#DCE0D0',
      accent: '#4B5443',
    },
    {
      id: 3,
      topic: 'Color Architecture',
      title: 'Pairing terracotta Raw Sienna with muted Nile Blue',
      contributor: 'Clara S. • Tokyo',
      likes: 19,
      replies: 5,
      quote: '“The warm mineral heat of Sienna grounds the cold depth of Nile Blue like earth meets water.”',
      tag: 'Palette Harmony',
      tint: '#F3DFCB',
      accent: '#C9803F',
    },
  ];

  const handleLike = (id) => {
    setLikedDiscussions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    if (onShowToast) {
      onShowToast(likedDiscussions[id] ? 'Removed endorsement' : 'Endorsed salon conversation');
    }
  };

  return (
    <div className="salon-page-wrapper" id="page-salon">
      {/* Editorial Header */}
      <header className="page-editorial-header">
        <div className="header-badge-row">
          <span className="salon-active-badge">SALON DISCOURSE • LIVE</span>
          <span className="salon-users-stat">36 Atelier Muses</span>
        </div>
        <h1 className="salon-heading">Salon</h1>
        <p className="salon-subheading">
          A tranquil salon for sartorial philosophy, proportion critiques, and textile dialogues.
        </p>

        {/* Prompt Card */}
        <div className="salon-prompt-card">
          <span className="prompt-label">This Week's Salon Theme:</span>
          <h4 className="prompt-title">“Is timelessness an illusion or an engineering feat?”</h4>
          <button
            type="button"
            className="prompt-contribute-btn"
            onClick={() => onShowToast && onShowToast('Compose salon reflection')}
          >
            ✦ Share Your Reflection
          </button>
        </div>
      </header>

      {/* Discussions Feed */}
      <div className="salon-feed">
        {discussions.map((d) => {
          const isLiked = likedDiscussions[d.id];
          return (
            <article key={d.id} className="salon-card">
              <div className="salon-card-header">
                <div className="salon-badge-group">
                  <span
                    className="salon-topic-tag"
                    style={{ backgroundColor: d.tint, color: d.accent }}
                  >
                    {d.tag}
                  </span>
                  <span className="salon-contributor">{d.contributor}</span>
                </div>
              </div>

              <h3 className="salon-card-title">{d.title}</h3>

              <blockquote className="salon-card-quote">
                {d.quote}
              </blockquote>

              <div className="salon-card-footer">
                <div className="salon-engagement">
                  <button
                    type="button"
                    className={`salon-like-btn ${isLiked ? 'is-liked' : ''}`}
                    onClick={() => handleLike(d.id)}
                    aria-label="Endorse discussion"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? '#C9803F' : 'none'} stroke={isLiked ? '#C9803F' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>{d.likes + (isLiked ? 1 : 0)}</span>
                  </button>

                  <span className="salon-replies-count">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>{d.replies} reflections</span>
                  </span>
                </div>

                <button
                  type="button"
                  className="salon-join-btn"
                  onClick={() => onShowToast && onShowToast(`Joined thread: "${d.title}"`)}
                >
                  Join Dialogue →
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
