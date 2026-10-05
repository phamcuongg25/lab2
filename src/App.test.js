import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

describe('Mini Movie Manager App', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('renders header, theme toggle, search bar, dropdowns, and stats', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    // Header & Theme
    expect(screen.getByText(/Mini Movie Manager/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dark|Light/i })).toBeInTheDocument();

    // Search input
    const searchInput = screen.getByPlaceholderText(/Nhập tên phim để tìm kiếm/i);
    expect(searchInput).toBeInTheDocument();

    // Dropdowns
    expect(screen.getByLabelText(/Thể loại/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sắp xếp theo đánh giá/i)).toBeInTheDocument();

    // Stats
    expect(screen.getByText('Tổng số phim')).toBeInTheDocument();
    expect(screen.getByText('Đang hiển thị')).toBeInTheDocument();
    expect(screen.getByText('Yêu thích')).toBeInTheDocument();

    // Initial movies
    expect(screen.getByText(/Interstellar/i)).toBeInTheDocument();
    expect(screen.getByText(/Spirited Away/i)).toBeInTheDocument();
  });

  test('filters movies by title search', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    const searchInput = screen.getByPlaceholderText(/Nhập tên phim để tìm kiếm/i);
    fireEvent.change(searchInput, { target: { value: 'Interstellar' } });

    expect(screen.getByText(/Interstellar/i)).toBeInTheDocument();
    expect(screen.queryByText(/Spirited Away/i)).not.toBeInTheDocument();
  });

  test('filters movies by genre dropdown', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    const genreSelect = screen.getByLabelText(/Thể loại/i);
    fireEvent.change(genreSelect, { target: { value: 'Animation' } });

    expect(screen.getByText(/Spirited Away/i)).toBeInTheDocument();
    expect(screen.queryByText(/Interstellar/i)).not.toBeInTheDocument();
  });

  test('adds and removes movie from favorites', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    // Get favorite buttons on cards
    const favoriteButtons = screen.getAllByRole('button', { name: /Yêu thích/i });
    expect(favoriteButtons.length).toBeGreaterThan(0);

    // Click to add first movie to favorites
    fireEvent.click(favoriteButtons[0]);

    // Now button text should become "Bỏ thích"
    expect(screen.getByRole('button', { name: /Bỏ thích/i })).toBeInTheDocument();

    // Click "Bỏ thích" to remove
    fireEvent.click(screen.getByRole('button', { name: /Bỏ thích/i }));

    // Button should revert to "Yêu thích"
    expect(screen.queryByRole('button', { name: /Bỏ thích/i })).not.toBeInTheDocument();
  });

  test('opens and closes movie detail modal', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    const detailButtons = screen.getAllByRole('button', { name: /Chi tiết/i });
    fireEvent.click(detailButtons[0]);

    expect(screen.getByText(/Nội dung phim/i)).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /Đóng/i });
    fireEvent.click(closeButton);

    expect(screen.queryByText(/Nội dung phim/i)).not.toBeInTheDocument();
  });
});
