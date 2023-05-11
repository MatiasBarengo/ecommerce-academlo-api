import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartProduct from '../components/Cart/CartProduct';
import axios from 'axios';
import { getUserCart } from '../store/slices/cart.slice';
import './styles/cart.css'

const Cart = () =>
{

  const { cart } = useSelector( state => state );
  const dispatch = useDispatch();

  const handleCheckout = () =>
  {
    const header = {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem( 'token' ) }`
      }
    };

    axios.post( 'https://e-commerce-api-v2.academlo.tech/api/v1/purchases', {}, header )
      .then( res =>
      {
        console.log( res.data );
        dispatch( getUserCart() );
      } )
      .catch( err =>
      {
        console.log( err );
      } );
  };

  return (
    <section className='cart-component-container'>
      <h2 className='cart-title'>Cart</h2>
      {
        cart?.length === 0 ? (
          <p>Your cart is Empty!</p>
        )
          : (
            <div className='cart-card'>
              {
                cart?.map( ( product ) => (
                  <CartProduct
                    key={ product.id }
                    product={ product } />
                ) )
              }
            </div>
          )
      }

      <footer className='cart-footer'>
        <div>
          <span>Total:</span>
          <p>${
            cart ?
              cart.reduce( ( acc, cv ) =>
              {
                let total = cv.product.price * cv.quantity + acc
                total = Number( total.toFixed( 2 ) )
                return total
              }, 0 ) : '0.00'
          }</p>
        </div>
        <button className='checkout-btn' onClick={ handleCheckout }>Checkout</button>
      </footer>
    </section>
  );
};

export default Cart;