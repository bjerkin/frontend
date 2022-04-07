import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MOVIE_IMAGE_BASE_URL, MOVIE_API_URL, REACT_APP_MOVIE_API_KEY } from '../config';
import MovieCard from './MovieCard';
import HeroContent from './HeroContent';
import Header from './Header';


const Home = () => {

  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]);

  const fetchGenres = async () => {
    const response = await axios.get(`${MOVIE_API_URL}genre/movie/list?api_key=${REACT_APP_MOVIE_API_KEY}&language=en-US`);
    
    setGenres( response.data.genres );

    const genreMap = response.data.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});

    //console.log( genreMap );
    setGenres( genreMap );
  };
  
  const fetchMovies = async ( searchKey ) => {

    let moviePath = searchKey ? 'search' : 'discover';

    const {data: {results}}= await axios.get(`${MOVIE_API_URL}${moviePath}/movie`, {
      params: {
        api_key: REACT_APP_MOVIE_API_KEY,
        query: searchKey
      }
    });

    for (let i = 0; i < results.length; i++) {
      results[i].isFavourite = false;
    }

    //console.log(results);
    setMovies(results);
    setSelectedMovie(results[0]);
  };
  
  const renderMovies = () => {
    return movies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ));
  };

  useEffect(() => {

    fetchGenres();
    fetchMovies();

  }, []);

  return (
    <div className='home'>
      <Header className="hero__header container" onSubmit={fetchMovies} />
      {selectedMovie ? (
        <div className="hero" style={{backgroundImage: `linear-gradient(269.96deg, rgba(29, 29, 29, 0) 0.04%, rgba(29, 29, 29, 0.8) 99.5%), url('${MOVIE_IMAGE_BASE_URL}w1280${selectedMovie.backdrop_path}')`}}>
          <HeroContent movie={selectedMovie} genres={genres}/>

          <div className='container'>
            <h1>Trending</h1>
          </div>
        </div>
      ) : null }
      <div className='movie-list'>
        {renderMovies()}
      </div>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  )
};

export default Home;