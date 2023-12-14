import './FilterBar.scss';

import { useFilterMoviesContext } from '../../context/FilterMoviesContext';

const genres = [
    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 10762, name: "Kids" },
    { id: 9648, name: "Mystery" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" },
];

const FilterBarTv = () => {
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
      <button onClick={() => switchMode('ontheair')}>on the air</button>
      <button onClick={() => switchMode('airingtoday')}>airing today</button>
      <button onClick={() => switchMode('toprated')}>top rated</button>
    </div>
  );
};

export default FilterBarTv;
