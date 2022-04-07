import React from 'react'
import { useNavigate } from 'react-router-dom';
import MovieGenre from './MovieGenre';
import starIcon from '../images/star.png';
import starIconEmpty from '../images/star-empty.png';


const HeroContent = ( { movie, genres } ) => {

  const navigate = useNavigate();

  const renderStars = () => {
    const stars = [];
    let starCount = Math.floor(movie.vote_average / 2);

    for (let i = 0; i < 5; i++) {
      stars.push(<img src={ (starCount > i) ? starIcon : starIconEmpty} alt="star icon" key={i}></img>);
    }
    return stars;
  };

  return (
    <div className="hero__content container">
      <div className="hero__content__movie-genre-list">
        {movie.genre_ids.map( id => 
          <MovieGenre key={id} genre={ genres[id] }/>
        )}
      </div>

      <div className="hero__content__movie-rating">
          {renderStars()}
      </div>

      <div className="hero__content__movie-title">
        <h1>{movie.title}</h1>
      </div>

      <div className="hero__content__movie-overview">
        <p>{movie.overview}</p>
      </div>

      <div className="hero__content__btn">
        <button className="btn btn__watch-now" onClick={() => navigate('/home')}>Watch Now</button> 
      </div>
    </div>
  )
}

export default HeroContent