import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PhoneFrame from './components/PhoneFrame';
import AppShell from './components/AppShell';
import AtelierPage from './pages/AtelierPage';
import ArmoirePage from './pages/ArmoirePage';
import SalonPage from './pages/SalonPage';
import StyleGuidePage from './pages/StyleGuidePage';
import SplashScreen from './components/SplashScreen';
import './App.css';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashKey, setSplashKey] = useState(0);
  const [isDeviceBezel, setIsDeviceBezel] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeoutRef = useRef(null);

  const showToast = (message) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handleReplaySplash = () => {
    setSplashKey((k) => k + 1);
    setShowSplash(true);
  };

  return (
    <BrowserRouter>
      <div className="desktop-preview-container" id="app-root-container">
        {/* Desktop Helper Banner (Displayed on wide screens above phone) */}
        <header className="desktop-meta-bar" aria-label="Desktop preview settings">
          <div className="desktop-badge">
            <span className="desktop-badge-dot"></span>
            <span>Drape App • 430px Mobile Viewport</span>
          </div>
          <div className="desktop-meta-actions">
            <button
              type="button"
              className="desktop-action-btn splash-replay-btn"
              onClick={handleReplaySplash}
              title="Replay opening splash screen with a new random fashion quote"
              aria-label="Replay splash screen"
            >
              Replay Splash
            </button>
            <button
              type="button"
              className="desktop-toggle-btn"
              onClick={() => setIsDeviceBezel(!isDeviceBezel)}
              aria-label="Toggle smartphone hardware bezel frame"
            >
              {isDeviceBezel ? 'Seamless View' : 'Phone Chassis'}
            </button>
          </div>
        </header>

        {/* Mobile-first centered phone frame (430px max width) */}
        <PhoneFrame
          isDeviceBezel={isDeviceBezel}
          onToggleBezel={() => setIsDeviceBezel(!isDeviceBezel)}
          isScrollLocked={showSplash}
        >
          {/* Splash screen shown when app opens */}
          {showSplash && (
            <SplashScreen
              key={splashKey}
              holdDurationMs={2500}
              onFinish={() => setShowSplash(false)}
            />
          )}

          {/* Router Outlet inside AppShell with Fixed BottomNav */}
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<AtelierPage onShowToast={showToast} />} />
              <Route path="armoire" element={<ArmoirePage onShowToast={showToast} />} />
              <Route path="salon" element={<SalonPage onShowToast={showToast} />} />
              <Route
                path="style-guide"
                element={
                  <StyleGuidePage
                    onShowToast={showToast}
                    onReplaySplash={handleReplaySplash}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
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
    </BrowserRouter>
  );
}
