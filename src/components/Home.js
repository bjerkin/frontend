import React from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MOVIE_IMAGE_BASE_URL, MOVIE_API_URL, REACT_APP_MOVIE_API_KEY, API_URL } from '../config';
import MovieCard from './MovieCard';
import HeroContent from './HeroContent';
import Header from './Header';
import { UserContext } from './UserContext';
import { useNavigate } from "react-router-dom";

import Pagination from '@mui/material/Pagination';


const Home = ({ genres }) => {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();


  const fetchMovies = async ( searchKey, pageNumber=1 ) => {    

    let moviePath = searchKey ? 'search' : 'discover';
    const {data: {results, total_pages}}= await axios.get(`${MOVIE_API_URL}${moviePath}/movie`, {
      params:{
        api_key: REACT_APP_MOVIE_API_KEY,
        query: searchKey,
        page: pageNumber
      }
    });

    
    setTotalPages( (total_pages <= 500) ? total_pages : 500 ); //max page is 500 for free account

    for (let i = 0; i < results.length; i++) {
      //to be added - check if movie is in favourites
      results[i].isFavourite = false;
    }

    //console.log(results);
    setMovies(results);
    setSelectedMovie(results[0]);
  };
  
  const loadPage = ( pageNumber ) => {

    fetchMovies( searchKey, pageNumber);

  };

  const renderMovies = () => {
    return movies.map( movie => (
      <MovieCard key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} />
    ));
  };

  useEffect(() => {

    fetchMovies();

  }, []);

  return (
    <div className='page-background'>
      { (user === '') ? navigate('/') : null }
      <Header className="hero__header container" onSubmit={fetchMovies} setSearchKey={setSearchKey} />
      {
        ( searchKey ) ? (
          <div className='heading__search-results'>
            <h1>Search Results: {searchKey}</h1>
            <div className='heading__search-results-line'/>
          </div>
        ) : (
          // Show hero content if there is no search input
          ( selectedMovie) ? (
            <div className="hero" style={{backgroundImage: `linear-gradient(269.96deg, rgba(29, 29, 29, 0) 0.04%, rgba(29, 29, 29, 0.8) 99.5%), url('${MOVIE_IMAGE_BASE_URL}w1280${selectedMovie.backdrop_path}')`}}>
              <HeroContent movie={selectedMovie} genres={genres}/>

              <div className='container'>
                <h1>Trending</h1>
              </div>
            </div>
          ) : null 
        ) 
      }
      <div className='movie-list'>
        {renderMovies()}
      </div>

      <div className='pagination'>
        <Pagination count={totalPages} color="primary" onChange={ ( event, page ) => loadPage(page) } />
      </div>
    
    </div>
  )
};

export default Home;