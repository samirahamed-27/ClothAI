import React, { useState, useEffect } from 'react';
import './PhoneFrame.css';

export default function PhoneFrame({ children, isDeviceBezel, onToggleBezel, isScrollLocked = false }) {
  // Dynamic mobile clock that updates with local time
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };

    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`phone-chassis ${isDeviceBezel ? 'with-bezel' : 'seamless'}`} id="drape-phone-chassis">
      {/* Smartphone Hardware Elements (Desktop Bezel Mode) */}
      {isDeviceBezel && (
        <div className="phone-hardware-notch">
          <button
            type="button"
            className="dynamic-island"
            onClick={onToggleBezel}
            title="Click Dynamic Island to toggle seamless view"
            aria-label="Toggle seamless view"
          >
            <div className="sensor-camera"></div>
            <div className="sensor-mic"></div>
          </button>
        </div>
      )}

      {/* Simulated Mobile Status Bar */}
      <header className="mobile-status-bar" aria-label="Mobile Status Bar">
        <span className="status-time" id="status-clock">{currentTime}</span>
        <div className="status-indicators">
          {/* Signal bars */}
          <svg className="status-icon" width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
            <rect x="0.5" y="8" width="2.5" height="3.5" rx="0.5" />
            <rect x="4.5" y="5.5" width="2.5" height="6" rx="0.5" />
            <rect x="8.5" y="3" width="2.5" height="8.5" rx="0.5" />
            <rect x="12.5" y="0.5" width="2.5" height="11" rx="0.5" />
          </svg>
          {/* 5G Badge */}
          <span className="network-badge">5G</span>
          {/* Battery */}
          <svg className="status-icon" width="24" height="12" viewBox="0 0 24 12" fill="currentColor" aria-hidden="true">
            <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
            <rect x="2" y="2" width="14" height="8" rx="1.5" />
            <path d="M22 4C22.5 4.5 22.8 5.2 22.8 6C22.8 6.8 22.5 7.5 22 8V4Z" fill="currentColor" />
          </svg>
        </div>
      </header>

      {/* Main Mobile App Viewport (Constrained to max-width 430px) */}
      <main className={`mobile-screen-content ${isScrollLocked ? 'scroll-locked' : ''}`} id="mobile-viewport">
        {children}
      </main>

      {/* Simulated iOS Home Indicator Bar */}
      <footer className="mobile-home-indicator-zone" aria-hidden="true">
        <div className="home-indicator-pill"></div>
      </footer>
    </div>
  );
}
