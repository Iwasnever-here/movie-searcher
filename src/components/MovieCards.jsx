import React from 'react'
import { FaStar } from "react-icons/fa";

const MovieCards = ({movie}) => {
  return (
    <div className='card' onClick={() => console.log(movie.title)}>
  
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : 'no'
        }
        alt={movie.title}
      />
      <div className='content'>
        <p className='year'>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>

      <div className='rating'>
        <FaStar />
        <p>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
      </div>
      
    </div>

    </div>

  )
}

export default MovieCards
