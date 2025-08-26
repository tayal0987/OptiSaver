import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex justify-center gap-32 py-3 border-2 border-blue-500 rounded-2xl">
      <NavLink
        to="/"
        className="text-3xl text-white hover:text-blue-500"
      >
        Home
      </NavLink>

      <NavLink
        to="/pastes"
        className="text-3xl text-white hover:text-blue-500"
      >
        Paste
      </NavLink>
    </div>
  )
}

export default Navbar
