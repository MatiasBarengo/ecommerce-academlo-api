import React, { useState } from 'react';
import './styles/dropdownMenu.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DropdownMenu = () =>
{

  const [ menu, setMenu ] = useState( false )

  const { user } = useSelector( state => state )

  const handleMenu = () =>
  {
    setMenu( !menu )
  }

  return (
    <div className='dropdown-container'>
      <i onClick={ handleMenu } className="fa-solid fa-bars"></i>
      {
        menu ? (
          <div className='menu-container'>
            <Link onClick={ handleMenu } className='menu-link' to={ '/login' }>
              <i className="fa-solid fa-right-to-bracket"></i>
              <span>Login</span>
            </Link>
            <Link to={ user ? '/profile' : '/login' } onClick={ handleMenu } className='menu-link'>
              <i className="fa-solid fa-user"></i>
              <span>Profile</span>
            </Link>
            <Link to={ user ? '/purchases' : '/login' } onClick={ handleMenu } className='menu-link'>
              <i className="fa-solid fa-bag-shopping"></i>
              <span>My Purchases</span>
            </Link>
            <Link to={ user ? '/cart' : 'login' } onClick={ handleMenu } className='menu-link'>
              <i className="fa-solid fa-cart-shopping"></i>
              <span>My Cart</span>
            </Link>
          </div>
        ) : ( '' )
      }

    </div>
  );
};

export default DropdownMenu;