import React, { useState, useContext } from 'react';
import movieflixIcon from "../images/movieflix-icon.png";
import movieflix from "../images/movieflix.png";
import searchIcon from "../images/search-icon.png";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import { UserContext } from './UserContext';

const Header = ( { onSubmit, setSearchKey } ) => {

  const [searchValue, setSearchValue] = useState("");
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchValue);
    setSearchKey(searchValue)
  };

  const handleLogoClick = () => {
    setSearchKey("");
    setSearchValue("");
    onSubmit("");
    let searchInput = document.getElementById("search-input");
    searchInput.value = "";
    navigate('/home');
  };

  return (
    <header className="header container">
      <div className="header__logo-box" onClick={ handleLogoClick }>
        <img src={movieflixIcon} alt="logo" className="header__logo" />
        <img src={movieflix} alt="logo" className="header__logo" />
      </div>
      <form className="header__search" onSubmit={ handleSubmit }>
        <input id='search-input' type="text" className="header__search__input" placeholder="Search" onChange={(e) => {
          setSearchValue(e.target.value)
        }}/>
        <button type="submit" className="header__search__btn">
          <img src={searchIcon} alt="search icon" className="header__search__icon" />
        </button>
      </form>

      <div className='flex'>
        <h3 className='header__user-box'>{(user !== null) ? user.name : ''}</h3>
        <Navbar />
      </div>
      
    </header>
  )
}

export default Header