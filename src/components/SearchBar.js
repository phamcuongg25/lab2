import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function SearchBar({ searchTerm, onSearchChange }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{ marginBottom: '12px' }}>
      <input
        type="text"
        placeholder="Nhập tên phim để tìm kiếm..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '9px 12px',
          fontSize: '14px',
          borderRadius: '4px',
          border: isDark ? '1px solid #555' : '1px solid #ccc',
          background: isDark ? '#252525' : '#ffffff',
          color: isDark ? '#ffffff' : '#000000',
          outline: 'none',
        }}
      />
    </div>
  );
}
