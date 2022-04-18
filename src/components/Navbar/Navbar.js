import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { MdLogout } from 'react-icons/md'
import { SidebarData } from './SidebarData'
import { UserContext } from '../UserContext'


function Navbar() {

  const [sidebar, setSidebar] = useState(false);
  const { setUser } = useContext(UserContext);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  }

  const logout = () => {
    setUser(null);
  }

  return (
    <>
      <div className='navbar'>
        <Link to='#' className='menu-bars' onClick={ () => toggleSidebar() }>
          <FaBars color={ 'white' }/>
        </Link>
      </div>
      <nav className={ sidebar ? 'nav-menu active' : 'nav-menu' }>
        <ul className='nav-menu-items'>

          <li className='nav-text' onClick={ () => toggleSidebar() }>
            <Link to='#'>
              <AiOutlineClose />
            </Link>
          </li>

          {SidebarData.map((item, index) => (
            <li key={ index } className={ item.cName }>
              <Link to={ item.path }>
                { item.icon }
              </Link>
            </li>
          ))}

          <li className='nav-text' onClick={ () => logout() }>
            <Link to='/'>
              <MdLogout />
            </Link>
          </li>

        </ul>
      </nav>
    </>

  )
}

export default Navbar