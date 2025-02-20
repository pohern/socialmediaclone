import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from '../context/auth'


function NavBar() {
  const { user, logout } = useContext(AuthContext)
  const pathname = window.location.pathname
  const path = pathname === '/' ? 'home' : pathname.substr(1)

  const [activeItem, setActiveItem] = useState(path);


  const handleItemClick = (event, { name }) => setActiveItem(name);

  const navBar = user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name={user.username}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='logout'
          active={activeItem === "login"}
          onClick={logout}
        />
      </Menu.Menu>
    </Menu>
  ) : (
  <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='register'
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
      </Menu.Menu>
    </Menu>)
  return (
    navBar
  );
}

export default NavBar;
