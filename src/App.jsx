import { useState, useEffect} from 'react'
import './App.css'
import Search from './components/Search'
import MovieCards from './components/MovieCards'
import Slider from 'react-slick'
import PopularSlider from './components/PopularSlider'

function App() {

  //API HANDLING 
  const API_BASE_URL = 'https://api.themoviedb.org/3'
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY
  

  const API_OPTIONS ={
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    },
}

  const [errorMessage, setErrorMessage] = useState('');
  const [popularMovieList, setPopularMovieList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //getting the movies
  const fetchPopularMovies = async () => {
  setIsLoading(true);
  setErrorMessage('');

  try {
    const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    setPopularMovieList(data.results || []);
    
  } catch (error) {
    console.error(`Failed fetching movies: ${error}`);
    setErrorMessage('Failed fetching movies, try again later');
    setPopularMovieList([]); // Clear on failure
  } finally {
    setIsLoading(false);
  }
};

const fetchSearchMovies = async (query) => {
  setIsLoading(true);
  setErrorMessage('');

  try {
    const endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;
    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json(); // <-- this was in the wrong place

    if (data.results.length === 0) {
      setErrorMessage('No results found');
      setMovieList([]);
      return;
    }

    setMovieList(data.results || []);

    // Optional: handle search analytics or stats
    // if (query && data.results.length > 0){
    //     await updateSearchCount(query, data.results[0]);
    // }

  } catch (error) {
    console.error(`Failed fetching movies: ${error}`);
    setErrorMessage('Failed fetching movies, try again later');
    setMovieList([]); // Clear on failure
  } finally {
    setIsLoading(false);
  }
};



  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPopularMovies()
  },[])

  
  const handleSearch = () => {
    if (searchTerm.trim() === '') return;

    fetchSearchMovies(searchTerm);
    setPopularMovieList([]);  // Clear popular movies when searching
  };


return (
  <>
    <h1 className='text-8xl mt-50'>MOVIE LIBRARY</h1>

    <Search
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handleSearch={handleSearch}
    />

    <p>categories</p>

    {popularMovieList.length > 0 && (
      <>
        <h1>DISCOVER</h1>
        <h3>POPULAR MOVIES</h3>
        <section className='popularMovies'>
          {isLoading ? (
            <p className='text-white'>Loading . . .</p>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <PopularSlider movies={popularMovieList} />
          )}
        </section>
      </>
    )}

    {movieList.length > 0 && (
      <>
        <h3>SEARCH RESULTS</h3>
        {isLoading ? (
          <p className='text-white'>Loading . . .</p>
        ) : errorMessage ? (
          <p className='text-red-500'>{errorMessage}</p>
        ) : (
          <ul>
            {movieList.map((movie) => (
              <MovieCards key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </>
    )}

    {movieList.length === 0 && popularMovieList.length === 0 && !isLoading && (
      <p className='text-gray-500'>No movies to show. Try searching for something!</p>
    )}
  </>
);

  
}

export default App
