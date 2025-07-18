import { useEffect, useState } from 'react';
import PopularSlider from '../components/PopularSlider';

const DiscoverPage = () => {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [crimeTv, setCrimeTv] = useState([]);
  const [sciFiContent, setSciFiContent] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_URL = 'https://api.themoviedb.org/3';

  const GENRES = {
    horror: 27,
    crime: 80,
    scifi: 878,
  };
  const fetchMedia = async (type, setData, setErrorMessage, setIsLoading, genreId = null) => {

    setIsLoading(true);
    setErrorMessage('');

    try {
      let url = `${API_URL}/discover/${type}?sort_by=popularity.desc`;
      if (genreId) url += `&with_genres=${genreId}`;

      const res = await fetch(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      const data = await res.json();
     
      setData(data.results ?? []);
      
    } catch (error) {
      setErrorMessage('Failed to load content :(');
    } finally {
      setIsLoading(false);
    }
  };


  // get all movie data on load
  useEffect(() => {
    fetchMedia('movie', setMovies, setErrorMessage, setIsLoading);
    fetchMedia('tv', setTv, setErrorMessage, setIsLoading);
    fetchMedia('movie', setHorrorMovies, setErrorMessage, setIsLoading, GENRES.horror);
    fetchMedia('tv', setCrimeTv, setErrorMessage, setIsLoading, GENRES.crime);
    fetchMedia('movie', setSciFiContent, setErrorMessage, setIsLoading, GENRES.scifi);
  }, []);

  return (
    <div>
      <section className="popular">
        <h2>Popular Movies</h2>
        {isLoading ? <p>Loading...</p> : errorMessage ? <p>{errorMessage}</p> : <PopularSlider movies={movies} />}
      </section>

      <section className="popular">
        <h2>Popular Shows</h2>
        {isLoading ? <p>Loading...</p> : errorMessage ? <p>{errorMessage}</p> : <PopularSlider movies={tv} />}
      </section>

      <section className="popular">
        <h2>Popular Horror Movies</h2>
        {isLoading ? <p>Loading...</p> : errorMessage ? <p>{errorMessage}</p> : <PopularSlider movies={horrorMovies} />}
      </section>

      <section className="popular">
        <h2>Popular Crime TV Shows</h2>
        {isLoading ? <p>Loading...</p> : errorMessage ? <p>{errorMessage}</p> : <PopularSlider movies={crimeTv} />}
      </section>

      <section className="popular">
        <h2>Popular Sci‑Fi Movies</h2>
        {isLoading ? <p>Loading...</p> : errorMessage ? <p>{errorMessage}</p> : <PopularSlider movies={sciFiContent} />}
      </section>
    </div>
  );
};

export default DiscoverPage;
