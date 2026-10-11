import React, { useState } from 'react';
import PhoneFrame from './components/PhoneFrame';
import StyleGuide from './components/StyleGuide';
import './App.css';

export default function App() {
  const [isDeviceBezel, setIsDeviceBezel] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastTimeoutId, setToastTimeoutId] = useState(null);

  const showToast = (message) => {
    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }
    setToastMessage(message);
    const id = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    setToastTimeoutId(id);
  };

  return (
    <div className="desktop-preview-container" id="app-root-container">
      {/* Desktop Helper Banner (Displayed on wide screens above phone) */}
      <header className="desktop-meta-bar" aria-label="Desktop preview settings">
        <div className="desktop-badge">
          <span className="desktop-badge-dot"></span>
          <span>Drape App • 430px Mobile Viewport</span>
        </div>
        <button
          type="button"
          className="desktop-toggle-btn"
          onClick={() => setIsDeviceBezel(!isDeviceBezel)}
          aria-label="Toggle smartphone hardware bezel frame"
        >
          {isDeviceBezel ? 'Switch to Seamless View' : 'Switch to Phone Chassis'}
        </button>
      </header>

      {/* Mobile-first centered phone frame (430px max width) */}
      <PhoneFrame
        isDeviceBezel={isDeviceBezel}
        onToggleBezel={() => setIsDeviceBezel(!isDeviceBezel)}
      >
        <StyleGuide onShowToast={showToast} />
      </PhoneFrame>

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <aside className="drape-toast" role="status" aria-live="polite">
          <div className="toast-content">
            <span className="toast-dot"></span>
            <span>{toastMessage}</span>
          </div>
        </aside>
      )}
    </div>
  );
}
