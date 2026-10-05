import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function GenreFilter({
  genres = [],
  selectedGenre,
  onGenreChange,
  sortOrder,
  onSortChange,
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const selectStyle = {
    width: '100%',
    padding: '8px 10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: isDark ? '1px solid #555' : '1px solid #ccc',
    background: isDark ? '#252525' : '#ffffff',
    color: isDark ? '#ffffff' : '#000000',
    outline: 'none',
    boxSizing: 'border-box',
    cursor: 'pointer',
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
      }}
    >
      <div style={{ flex: 1 }}>
        <select
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          style={selectStyle}
        >
          <option value="">Tất cả thể loại</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div style={{ flex: 1 }}>
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          style={selectStyle}
        >
          <option value="default">Sắp xếp: Mặc định</option>
          <option value="rating-desc">Đánh giá: Cao đến thấp</option>
          <option value="rating-asc">Đánh giá: Thấp đến cao</option>
        </select>
      </div>
    </div>
  );
}
