
import {useEffect, useState} from 'react';
import PopularSlider
 from '../components/PopularSlider';

const DiscoverPage = () => {

    const [movies, setMovies] = useState([])
    const [tv, setTv] = useState([])
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const API_URL = 'https://api.themoviedb.org/3';



    
    useEffect(() => {
        const fetchPopularMovies = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/discover/movie?sort_by=popularity.desc`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`,
            },
            });
            const data = await res.json();
            setMovies(data.results || []);
        } catch (err) {
            setErrorMessage('Failed to fetch popular movies.');
        } finally {
            setIsLoading(false);
        }
        };

        fetchPopularMovies();
    }, []);

        
    useEffect(() => {
        const fetchPopularTv = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/discover/tv?sort_by=popularity.desc`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`,
            },
            });
            const data = await res.json();
            setTv(data.results || []);
        } catch (err) {
            setErrorMessage('Failed to fetch popular tv.');
        } finally {
            setIsLoading(false);
        }
        };

        fetchPopularTv();
    }, []);


  return (
    <div>
    <section className="popularMovies">
      <h2>Popular Movies</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        
        <PopularSlider movies={movies} />
        
      )}
    </section>
     <section className="popularMovies">
      <h2>Popular Tv</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        
        <PopularSlider movies={tv} />
        
      )}
    </section>
    </div>
  );
}
export default DiscoverPage
