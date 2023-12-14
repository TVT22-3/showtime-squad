// path: showtime-squad_frontend/src/components/ui/NavBar.jsx
import './FilterBar.scss';

import { useFilterMoviesContext } from '../../context/FilterMoviesContext';

const genres = [
  { id: 28, name: "action" },
  { id: 12, name: "adventure" },
  { id: 16, name: "animation" },
  { id: 35, name: "comedy" },
  { id: 80, name: "crime" },
  { id: 99, name: "documentary" },
  { id: 18, name: "drama" },
  { id: 10751, name: "family" },
  { id: 14, name: "fantasy" },
  { id: 36, name: "history" },
  { id: 27, name: "horror" },
  { id: 10402, name: "music" },
  { id: 9648, name: "mystery" },
  { id: 10749, name: "romance" },
  { id: 878, name: "science fiction" },
  { id: 10770, name: "tv movie" },
  { id: 53, name: "thriller" },
  { id: 10752, name: "war" },
  { id: 37, name: "western" }
];

const FilterBar = () => {
  const { switchMode } = useFilterMoviesContext();

  const handleGenreClick = (genre) => {
    switchMode('genre', { id: genre.id, name: genre.name });
  };

  return (
    <div id="filter-bar">

      {/* Dropdown for genres */}
      <div className="dropdown">
        <span className="dropbtn">genres 🞃</span>
        <div className="dropdown-content">
          {genres.map(genre => (
            <button key={genre.id} onClick={() => handleGenreClick(genre)}>
              {genre.name}
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => switchMode('popular')}>popular</button>
      <button onClick={() => switchMode('nowplaying')}>now playing</button>
      <button onClick={() => switchMode('upcoming')}>upcoming</button>
      <button onClick={() => switchMode('toprated')}>top rated</button>
    </div>
  );
};

export default FilterBar;

