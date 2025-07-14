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
    setPopularMovieList(data.results || []);
    
  } catch (error) {
    console.error(`Failed fetching movies: ${error}`);
    setErrorMessage('Failed fetching movies, try again later');
    setPopularMovieList([]); // Clear on failure
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
     <h1 className='text-8xl mt-50'>MOVIE LIBRARY</h1>
     <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
      <p>categories</p>
     <h3>POPULAR</h3>
     <section className='popularMovies'>
     {isLoading && <p>loading movies . . .</p>}
     
      {isLoading ? (
                    <p className = 'text-white'>Loading . . .</p>
                    ): errorMessage ? (
                    <p className='text-red-500'>{errorMessage}</p>
                    ): (
                        <PopularSlider movies={popularMovieList} />

                    )}
                    </section>
     

     <h3>RECOMENDATION</h3>
     <p>some sort of recomendation</p>
    </>
  )
}

export default App
