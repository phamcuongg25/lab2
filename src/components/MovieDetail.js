import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function MovieDetail({
  movie,
  onClose,
  isFavorite,
  onToggleFavorite,
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!movie) return null;

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1050,
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`modal-content ${
            isDark ? 'bg-dark text-light border-secondary' : 'bg-white text-dark'
          }`}
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: isDark
              ? '0 10px 30px rgba(0,0,0,0.8)'
              : '0 10px 30px rgba(0,0,0,0.15)',
          }}
        >
          {/* Header */}
          <div
            className={`modal-header ${
              isDark ? 'border-secondary' : 'border-light-subtle'
            }`}
          >
            <div className="d-flex align-items-center gap-2">
              <h5 className="modal-title fw-bold m-0">{movie.title}</h5>
              <span className="badge bg-primary rounded-pill px-3 py-1">
                {movie.genre}
              </span>
            </div>
            <button
              type="button"
              className={`btn-close ${isDark ? 'btn-close-white' : ''}`}
              aria-label="Close"
              onClick={onClose}
            />
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            <div className="row g-3 mb-3">
              <div className="col-sm-6 col-md-3">
                <div
                  className={`p-3 rounded-3 text-center ${
                    isDark ? 'bg-secondary bg-opacity-25' : 'bg-light'
                  }`}
                >
                  <div className="small text-muted mb-1">⭐ Đánh giá</div>
                  <div className="fw-bold fs-5 text-warning">{movie.rating} / 10</div>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div
                  className={`p-3 rounded-3 text-center ${
                    isDark ? 'bg-secondary bg-opacity-25' : 'bg-light'
                  }`}
                >
                  <div className="small text-muted mb-1">📅 Năm</div>
                  <div className="fw-bold fs-5">{movie.year}</div>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div
                  className={`p-3 rounded-3 text-center ${
                    isDark ? 'bg-secondary bg-opacity-25' : 'bg-light'
                  }`}
                >
                  <div className="small text-muted mb-1">⏱️ Thời lượng</div>
                  <div className="fw-bold fs-5">{movie.duration} phút</div>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div
                  className={`p-3 rounded-3 text-center ${
                    isDark ? 'bg-secondary bg-opacity-25' : 'bg-light'
                  }`}
                >
                  <div className="small text-muted mb-1">🎬 Đạo diễn</div>
                  <div className="fw-bold small mt-1">{movie.director}</div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <h6 className="fw-bold mb-2">📖 Nội dung phim</h6>
              <p
                className={`${isDark ? 'text-light-emphasis' : 'text-secondary'}`}
                style={{ lineHeight: '1.7', fontSize: '15px' }}
              >
                {movie.description}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            className={`modal-footer ${
              isDark ? 'border-secondary' : 'border-light-subtle'
            } d-flex justify-content-between`}
          >
            <button
              type="button"
              className={`btn ${
                isFavorite ? 'btn-danger' : 'btn-outline-danger'
              } d-flex align-items-center gap-2`}
              onClick={() => onToggleFavorite(movie.id)}
            >
              <span>{isFavorite ? '💔' : '❤️'}</span>
              <span>{isFavorite ? 'Bỏ thích' : 'Yêu thích'}</span>
            </button>

            <button
              type="button"
              className={`btn ${isDark ? 'btn-secondary' : 'btn-outline-secondary'}`}
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
