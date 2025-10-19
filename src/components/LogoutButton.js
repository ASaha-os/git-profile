// src/components/LogoutButton.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = ({ className = "" }) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    console.log("Logging out...");
    logout({ 
      logoutParams: { 
        returnTo: window.location.origin 
      } 
    });
  };

  return (
    <button 
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${className}`}
      onClick={handleLogout}
      type="button"
      style={{ cursor: 'pointer' }}
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16,17 21,12 16,7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
      Logout
    </button>
  );
};

export default LogoutButton;