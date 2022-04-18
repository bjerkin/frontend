import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Favourites from "./components/Favourites";
import { UserContext } from "./components/UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { MOVIE_API_URL, REACT_APP_MOVIE_API_KEY } from "./config";

function App() {
  const [genres, setGenres] = useState([]);
  const [user, setUser] = useState(null);

  const fetchGenres = async () => {
    const response = await axios.get(
      `${MOVIE_API_URL}genre/movie/list?api_key=${REACT_APP_MOVIE_API_KEY}&language=en-US`
    );

    setGenres(response.data.genres);

    const genreMap = response.data.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});

    setGenres(genreMap);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home genres={genres} />} />
            <Route path="/favourites" element={<Favourites genres={genres} />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
