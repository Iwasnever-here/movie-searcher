import { useState, useEffect } from 'react';
import MovieCards from '../components/MovieCards';


const SearchPage = ({ searchTerm, setSearchTerm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchList, setSearchList] = useState([]);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_URL = 'https://api.themoviedb.org/3';

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const fetchSearchMovies = async (query) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = `${API_URL}/search/movie?query=${encodeURIComponent(query)}`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setErrorMessage('No results found');
        setSearchList([]);
        return;
      }

      setSearchList(data.results);
    } catch (error) {
      console.error('Failed fetching movies:', error);
      setErrorMessage('Failed fetching movies, try again later');
      setSearchList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;
    fetchSearchMovies(searchTerm);
  };

 useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchSearchMovies(searchTerm);
    }
  }, [searchTerm]);


  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4 text-white">SEARCH RESULTS</h3>

      {isLoading && <p className="text-white">Loading . . .</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {searchList.length > 0 && (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {searchList.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
