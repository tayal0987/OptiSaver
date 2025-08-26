import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
   <div className="flex flex-wrap justify-center gap-6 md:gap-32 py-3 border-2 border-blue-500 rounded-2xl">
  <NavLink
    to="/"
    className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white hover:text-blue-500"
  >
    Home
  </NavLink>

  <NavLink
    to="/pastes"
    className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white hover:text-blue-500"
  >
    Paste
  </NavLink>
</div>

  )
}

export default Navbar
