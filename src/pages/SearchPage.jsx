import { useState, useEffect } from 'react';
import MovieCards from '../components/MovieCards';

const SearchPage = ({ searchTerm, filter }) => {
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

  const fetchSearchMoviesAndTV = async (query, filter) => {
  setIsLoading(true);
  setErrorMessage('');

  try {
    const fetches = [];

    //movie endpoint
    if (filter === 'movie' || filter === '') {
      const movieEndpoint = `${API_URL}/search/movie?include_adult=false&query=${encodeURIComponent(query)}`;
      fetches.push(fetch(movieEndpoint, API_OPTIONS).then(res => res.json()).then(data =>
        (data.results || []).map(item => ({ ...item, media_type: 'movie' }))
      ));
    }

    //tv endpoint
    if (filter === 'tv' || filter === '') {
      const tvEndpoint = `${API_URL}/search/tv?include_adult=false&query=${encodeURIComponent(query)}`;
      fetches.push(fetch(tvEndpoint, API_OPTIONS).then(res => res.json()).then(data =>
        (data.results || []).map(item => ({ ...item, media_type: 'tv' }))
      ));
    }

    const results = await Promise.all(fetches);
    const combinedResults = results.flat();

    if (combinedResults.length === 0) {
      setErrorMessage('No results found');
      setSearchList([]);
    } else {
      setSearchList(combinedResults);
    }

  } catch (error) {
    console.error('Failed fetching search results:', error);
    setErrorMessage('Failed fetching movies and TV shows, try again later');
    setSearchList([]);
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchSearchMoviesAndTV(searchTerm, filter);
      console.log(filter)
    }
  }, [searchTerm, filter]);

  return (
    <div className="p-4 Movies">
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
