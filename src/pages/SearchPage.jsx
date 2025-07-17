import { useState, useEffect } from 'react';
import MovieCards from '../components/MovieCards';

const SearchPage = ({ searchTerm }) => {
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

  const fetchSearchMoviesAndTV = async (query) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Movie search endpoint
      const movieEndpoint = `${API_URL}/search/movie?include_adult=false&query=${encodeURIComponent(query)}`;

      // TV search endpoint
      const tvEndpoint = `${API_URL}/search/tv?include_adult=false&query=${encodeURIComponent(query)}`;

      // Fetch movies and TV in parallel
      const [movieResponse, tvResponse] = await Promise.all([
        fetch(movieEndpoint, API_OPTIONS),
        fetch(tvEndpoint, API_OPTIONS),
      ]);

      if (!movieResponse.ok || !tvResponse.ok) {
        throw new Error('Failed to fetch movies or TV shows');
      }

      const movieData = await movieResponse.json();
      const tvData = await tvResponse.json();

      // Combine results, add a type field to distinguish
      const combinedResults = [
        ...(movieData.results || []).map(item => ({ ...item, media_type: 'movie' })),
        ...(tvData.results || []).map(item => ({ ...item, media_type: 'tv' })),
      ];

      if (combinedResults.length === 0) {
        setErrorMessage('No results found');
        setSearchList([]);
        return;
      }

      setSearchList(combinedResults);
    } catch (error) {
      console.error('Failed fetching movies and TV shows:', error);
      setErrorMessage('Failed fetching movies and TV shows, try again later');
      setSearchList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchSearchMoviesAndTV(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4 text-white">SEARCH RESULTS</h3>

      {isLoading && <p className="text-white">Loading . . .</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {searchList.length > 0 && (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {searchList.map((item) => (
            
            <MovieCards key={`${item.media_type}-${item.id}`} movie={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
