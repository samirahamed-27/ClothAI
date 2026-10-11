import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

export default function BottomNav() {
  const navItems = [
    {
      to: '/',
      label: 'Atelier',
      id: 'tab-atelier',
      icon: (
        // Thin-line Architectural Atelier / Hanger Icon
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {/* Hanger Hook & Triangle */}
          <path d="M12 4C13.1 4 14 4.9 14 6C14 7.2 12 8.5 12 10" />
          <path d="M2.5 17L12 10L21.5 17C21.8 17.2 22 17.6 22 18C22 18.6 21.6 19 21 19H3C2.4 19 2 18.6 2 18C2 17.6 2.2 17.2 2.5 17Z" />
          <line x1="12" y1="10" x2="12" y2="19" strokeDasharray="1.5 1.5" opacity="0.6" />
        </svg>
      ),
    },
    {
      to: '/armoire',
      label: 'Armoire',
      id: 'tab-armoire',
      icon: (
        // Thin-line Wardrobe / Arched Armoire Doors Icon
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {/* Arched Cabinet Frame */}
          <path d="M4 21V7C4 4.8 5.8 3 8 3H16C18.2 3 20 4.8 20 7V21" />
          <line x1="3" y1="21" x2="21" y2="21" />
          {/* Armoire Door Split */}
          <line x1="12" y1="3" x2="12" y2="21" />
          {/* Door Knobs */}
          <circle cx="10" cy="12" r="0.8" fill="currentColor" />
          <circle cx="14" cy="12" r="0.8" fill="currentColor" />
          {/* Bottom Drawer Line */}
          <line x1="4" y1="17" x2="20" y2="17" opacity="0.5" />
        </svg>
      ),
    },
    {
      to: '/salon',
      label: 'Salon',
      id: 'tab-salon',
      icon: (
        // Thin-line Salon Conversation & Muse Dialogue Icon
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {/* Primary Speech Thought Silhouette */}
          <path d="M20 12C20 7.6 16.4 4 12 4C7.6 4 4 7.6 4 12C4 13.6 4.5 15.1 5.3 16.4L4.5 20L8.3 19.1C9.4 19.7 10.7 20 12 20C16.4 20 20 16.4 20 12Z" />
          {/* Interior Dialogue Accent Dots */}
          <circle cx="9" cy="12" r="1" fill="currentColor" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          <circle cx="15" cy="12" r="1" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="drape-bottom-nav" aria-label="Main Navigation">
      <div className="nav-tabs-container">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            id={item.id}
            end={item.to === '/'}
            className={({ isActive }) =>
              `nav-tab-item ${isActive ? 'is-active' : 'is-inactive'}`
            }
          >
            {({ isActive }) => (
              <>
                <span className="nav-tab-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="nav-tab-label">{item.label}</span>
                {/* Short Raw Sienna Underline Indicator */}
                <span
                  className={`nav-active-underline ${isActive ? 'is-visible' : ''}`}
                  aria-hidden="true"
                />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
