import React from 'react'

const MovieCards = ({movie}) => {
  return (
    <div className='card'>
  
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : 'no'
        }
        alt={movie.title}
      />
      <h2>Rating     |      year        |     genre      |      watched?  </h2>
    </div>
    
  )
}

export default MovieCards
