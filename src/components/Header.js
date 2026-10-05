import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}
    >
      <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
        Mini Movie Manager
      </h2>
      <button
        onClick={toggleTheme}
        type="button"
        style={{
          cursor: 'pointer',
          padding: '6px 14px',
          borderRadius: '4px',
          border: isDark ? '1px solid #555' : '1px solid #ccc',
          background: isDark ? '#2c2c2c' : '#ffffff',
          color: isDark ? '#ffffff' : '#333333',
          fontSize: '13px',
          fontWeight: '500',
        }}
      >
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
}
