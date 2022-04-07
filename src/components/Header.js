import React from 'react'
import movieflixIcon from "../images/movieflix-icon.png";
import movieflix from "../images/movieflix.png";
import searchIcon from "../images/search-icon.png";

const Header = () => {
  return (
    <header className="header container">
      <div className="header__logo-box">
        <img src={movieflixIcon} alt="logo" className="header__logo" />
        <img src={movieflix} alt="logo" className="header__logo" />
      </div>
      <form className="header__search">
        <input type="text" className="header__search__input" placeholder="Search" />
        <button type="submit" className="header__search__btn">
          <img src={searchIcon} alt="search icon" className="header__search__icon" />
        </button>
      </form>
{/*       <nav className="header__nav">
        <ul className="header__nav__menu">
          <li className="header__nav__menu__item">
            <a href="#" className="header__nav__menu__item__link">
              Movies
            </a>
          </li>
          <li className="header__nav__menu__item">
            <a href="#" className="header__nav__menu__item__link">
              TV Shows
            </a>
          </li>
          <li className="header__nav__menu__item">
            <a href="#" className="header__nav__menu__item__link">
              My List
            </a>
          </li>
          <li className="header__nav__menu__item">
            <a href="#" className="header__nav__menu__item__link">
              Account
            </a>
          </li>
        </ul>
      </nav> */}
      
    </header>
  )
}

export default Header