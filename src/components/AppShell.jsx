import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import './AppShell.css';

export default function AppShell() {
  const location = useLocation();

  return (
    <div className="drape-app-shell" id="drape-app-shell">
      {/* Scrollable Viewport Content Area with Page Fade Transitions */}
      <div key={location.pathname} className="app-page-transition-wrapper">
        <Outlet />
      </div>

      {/* Fixed Bottom Navigation Bar ("Chin" Look with Safe-Area Padding) */}
      <BottomNav />
    </div>
  );
}
