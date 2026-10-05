import React, { useState, useMemo } from 'react';
import './App.css';
import { useTheme } from './context/ThemeContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { movies as initialMovies } from './data/movies';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';

function App() {
  const { isDark, backgroundColor, color } = useTheme();

  // state tim
  const [searchTerm, setSearchTerm] = useState('');

  // state loc gene
  const [selectedGenre, setSelectedGenre] = useState('');

  // state sort
  const [sortOrder, setSortOrder] = useState('default');

  // state danh sach yeu thich
  const [favorites, setFavorites] = useLocalStorage('favorite_movies', []);

  // state chi yeu thich
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // state chon xem chi tiet
  const [selectedMovie, setSelectedMovie] = useState(null);

  // lay phim tu data
  const genres = useMemo(() => {
    return Array.from(new Set(initialMovies.map((m) => m.genre)));
  }, []);

  // them/xoa khoi yeu thich
  const handleToggleFavorite = (movieId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(movieId)) {
        return prevFavorites.filter((id) => id !== movieId);
      } else {
        return [...prevFavorites, movieId];
      }
    });
  };

  // loc, sap xep
  const displayedMovies = useMemo(() => {
    let result = [...initialMovies];

    // loc theo tu khoa
    if (searchTerm.trim() !== '') {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(term)
      );
    }

    // loc genre
    if (selectedGenre) {
      result = result.filter((movie) => movie.genre === selectedGenre);
    }

    // loc phim yeu thich
    if (showOnlyFavorites) {
      result = result.filter((movie) => favorites.includes(movie.id));
    }

    // sort
    if (sortOrder === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOrder === 'rating-asc') {
      result.sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [searchTerm, selectedGenre, sortOrder, showOnlyFavorites, favorites]);

  return (
    <div
      style={{
        backgroundColor,
        color,
        minHeight: '100vh',
        padding: '40px 16px',
        boxSizing: 'border-box',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        transition: 'background-color 0.2s ease, color 0.2s ease',
      }}
    >
      <div
        style={{
          maxWidth: '580px',
          margin: '0 auto',
        }}
      >
        {/* header */}
        <Header />

        {/* search */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* dropdown */}
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />

        {/* dong stat */}
        <div
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '15px',
            margin: '20px 0 25px 0',
            userSelect: 'none',
          }}
        >
          <span>Tổng: {initialMovies.length}</span>
          <span style={{ margin: '0 10px', color: isDark ? '#666' : '#999', fontWeight: 'normal' }}>
            |
          </span>
          <span>Đang hiển thị: {displayedMovies.length}</span>
          <span style={{ margin: '0 10px', color: isDark ? '#666' : '#999', fontWeight: 'normal' }}>
            |
          </span>
          <span
            onClick={() => setShowOnlyFavorites((prev) => !prev)}
            style={{
              cursor: 'pointer',
              color: showOnlyFavorites ? '#060606' : isDark ? '#fffdfd' : '#080808',
              textDecoration: showOnlyFavorites ? 'underline' : 'none',
            }}
            title="Nhấp để chỉ xem phim yêu thích"
          >
            Yêu thích: {favorites.length}
          </span>
        </div>

        {/* list phim */}
        <MovieList
          movies={displayedMovies}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectMovie={setSelectedMovie}
        />

        {/* modal 
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isFavorite={selectedMovie ? favorites.includes(selectedMovie.id) : false}
          onToggleFavorite={handleToggleFavorite}
        />*/}
      </div>
    </div>
  );
}

export default App;
