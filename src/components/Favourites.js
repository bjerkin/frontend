import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { MOVIE_API_URL, REACT_APP_MOVIE_API_KEY } from "../config";
import MovieCard from "./MovieCard";
import Header from "./Header";

const Favourites = ({ genres }) => {

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const checkMovieOnTheList = (id) => {
    if (id === null) return false;

    let isOnTheList = false;

    isOnTheList = movies.find((movie) => movie.id === id);

    return isOnTheList;
  };

  const fetchFavouriteMovies = async () => {
    // To be continued
    //check DB with userID and get favourite movieIds
    //
    let movieIds = [399566, 634649];
    setMovies([]);

    for (let i = 0; i < movieIds.length; i++) {
      const { data: result } = await axios.get(`${MOVIE_API_URL}movie/${movieIds[i]}`, {
        params: {
          api_key: REACT_APP_MOVIE_API_KEY,
        },
      });

      result.isFavourite = true;

      if (!checkMovieOnTheList(result.id)) {
        movies.push(result);
      }
      //console.log(result);
    }
    setMovies(movies);
  };

  const renderMovies = () => {
    return movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
  };

  const filterMovies = (searchKey) => {

    if (searchKey === "") {
      fetchFavouriteMovies();
      return;
    }

    let filteredMovies = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchKey.toLowerCase());
    });

    setMovies(filteredMovies);
  };

  //BUG UseEffect running twice
  useEffect(() => {
    fetchFavouriteMovies();
  }, []);

  return (
    <div className="page-background">
      <Header className="hero__header container" onSubmit={filterMovies} setSearchKey={setSearchKey} />
      {
        <div className="heading__search-results">
          <h1>{searchKey ? `Favourites Search Results: ${searchKey}` : "Favourites:"}</h1>
          <div className="heading__search-results-line" />
        </div>
      }
      <div className="movie-list">{renderMovies()}</div>
    </div>
  );
};

export default Favourites;