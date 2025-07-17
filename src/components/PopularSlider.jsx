// components/PopularSlider.jsx
import React from "react";
import Slider from "react-slick";
import MovieCards from "./MovieCards";

const PopularSlider = ({ movies }) => {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2 }
      }
    ]
  };

  return (
    <div className="mx-2">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-3">
            <MovieCards movie={movie} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularSlider;
