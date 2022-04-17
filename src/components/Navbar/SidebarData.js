import React from "react";
import { AiFillHome } from 'react-icons/ai'
import { MdFavorite } from 'react-icons/md'


export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "Favourites",
    path: "/favourites",
    icon: <MdFavorite />,
    cName: "nav-text"
  }
]