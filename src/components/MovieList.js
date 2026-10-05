import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function MovieList({
  movies = [],
  favorites = [],
  onToggleFavorite,
  onSelectMovie,
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!movies || movies.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '30px 10px',
          color: isDark ? '#888' : '#777',
          fontSize: '14px',
        }}
      >
        Không tìm thấy phim nào phù hợp.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {movies.map((movie) => {
        const isFavorite = favorites.includes(movie.id);

        const btnStyle = {
          padding: '4px 10px',
          fontSize: '13px',
          borderRadius: '4px',
          border: isDark ? '1px solid #555' : '1px solid #ccc',
          background: isDark ? '#2c2c2c' : '#ffffff',
          color: isDark ? '#ffffff' : '#333333',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        };

        const favBtnStyle = isFavorite
          ? {
              ...btnStyle,
              border: isDark ? '1px solid #dc3545' : '1px solid #dc3545',
              background: isDark ? '#4a151b' : '#fff5f5',
              color: '#dc3545',
              fontWeight: '500',
            }
          : btnStyle;

        return (
          <div
            key={movie.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '11px 4px',
              borderBottom: isDark ? '1px solid #2d2d2d' : '1px solid #eeeeee',
              gap: '12px',
            }}
          >
            {/* Tên phim | Thể loại | Năm | Rate */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <span style={{ fontWeight: '600' }}>{movie.title}</span>
              <span style={{ color: isDark ? '#666' : '#bbb' }}>|</span>
              <span style={{ color: isDark ? '#fffdfd' : '#555' }}>{movie.genre}</span>
              <span style={{ color: isDark ? '#fffdfd' : '#bbb' }}>|</span>
              <span style={{ color: isDark ? '#fffdfd' : '#555' }}>{movie.year}</span>
              <span style={{ color: isDark ? '#fffdfd' : '#bbb' }}>|</span>
              <span style={{color: isDark ? '#fffdfd' : '#000000'}}>Rate: {movie.rating}</span>
            </div>

            {/* chi tie /yeu thich */}
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => onSelectMovie(movie)}
                style={btnStyle}
              >
                Chi tiết
              </button>

              <button
                type="button"
                onClick={() => onToggleFavorite(movie.id)}
                style={favBtnStyle}
              >
                {isFavorite ? 'Bỏ thích' : 'Yêu thích'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
