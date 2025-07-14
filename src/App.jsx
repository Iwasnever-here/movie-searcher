import { useState, useEffect} from 'react'
import './App.css'
import Search from './components/Search'
import MovieCards from './components/MovieCards'

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
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //getting the movies
  const fetchPopularMovies = async (query = '') => {
  setIsLoading(true);
  setErrorMessage('');

  try {
    const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    setMovieList(data.results || []);
    console.log(data.results)
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

  return (
    <>
     <h1 className='text-8xl mt-50'>MOVIE FINDER</h1>
     <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
      <p>categories</p>
      <p>type input</p>
     <h3>POPULAR</h3>
     <section className='allMovies'>
     {isLoading && <p>loading movies . . .</p>}
     
      {isLoading ? (
                    <p className = 'text-white'>Loading . . .</p>
                    ): errorMessage ? (
                    <p className='text-red-500'>{errorMessage}</p>
                    ): (
                        <ul>
                            {movieList.map((movie) => (
                                // when mapping you must have a unique key
                                <MovieCards key = {movie.id} movie = {movie} />
                            ))}
                        </ul>
                    )}
                    </section>
     

     <h3>RECOMENDATION</h3>
     <p>some sort of recomendation</p>
    </>
  )
}

export default App
