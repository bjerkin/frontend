import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import './Navbar.css'

function Navbar() {

  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
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
{/*                 <span>{ item.title }</span> */}
              </Link>
            </li>
          ))}

        </ul>
      </nav>
    </>

  )
}

export default Navbar