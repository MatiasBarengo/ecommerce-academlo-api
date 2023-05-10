import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/header.css'
import { useSelector } from 'react-redux';


const Header = () =>
{

  const [ cartQuantity, setCartQuantity ] = useState( 0 )

  const { cart } = useSelector( state => state )
  console.log( cart );

  useEffect( () =>
  {
    setCartQuantity( cart?.length )
  }, [ cart ] )

  return (
    <header className='header'>
      <nav className='navbar'>
        <ul className='navbar-ul'>
          <li className='navbar-li'><Link className='li-Link title' to={ '/' }>E-Commerce</Link></li>
        </ul>
        <ul className='navbar-ul concealable'>
          <li className='navbar-li' title='Login'>
            <Link className='li-Link' to={ '/login' }><i className="fa-solid fa-right-to-bracket"></i></Link>
          </li>
          <li className='navbar-li' title='Profile'>
            <Link className='li-Link' to={ '/profile' }><i className="fa-solid fa-user"></i></Link>
          </li>
          <li className='navbar-li' title='Search'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </li>
          <div className='cart-container'>
            <li className='navbar-li' title='Cart'>
              <Link className='li-Link' to={ '/cart' }><i className="fa-solid fa-cart-shopping"></i></Link>
            </li>
            <div className={ `cart-quantity ${ cartQuantity === 0 || cartQuantity === undefined ? 'empty' : '' }` }>
              <p>{ cartQuantity }</p>
            </div>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;