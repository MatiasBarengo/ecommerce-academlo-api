import React, { useState } from 'react';
import './styles/productDescription.css'
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../../store/slices/isLoading.slice';
import axios from 'axios';

const ProductDescription = ( { product } ) =>
{

  const [ counter, setCounter ] = useState( 1 )

  const dispatch = useDispatch()

  const handleMinus = () =>
  {
    if ( counter - 1 > 0 )
    {
      setCounter( counter - 1 )
    }
  }

  const handlePlus = () =>
  {
    setCounter( counter + 1 )
  }

  const handleCart = () =>
  {
    dispatch( setIsLoading( true ) )
    const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/cart'
    const headers = {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem( 'token' ) }`
      }
    }
    const data = {
      quantity: counter,
      productId: product.id
    }
    axios.post( url, headers, data )
      .then( res =>
      {
        console.log( res.data )
        dispatch( setIsLoading( false ) )
      } )
      .catch( err =>
      {
        const url = ''
        axios.put()
        dispatch( setIsLoading( false ) )
      } )
  }

  return (
    <article className='description-container'>
      <h2>{ product?.title }</h2>
      <p>{ product?.description }</p>
      <section className='description-section-container'>
        <div className='description-price-container'>
          <span>Price :</span>
          <h3>${ product?.price }</h3>
        </div>
        <div className='description-quantity-container'>
          <h3>Quantity :</h3>
          <div className='description-counter-container'>
            <div className='description-counter-btn' onClick={ handleMinus }>-</div>
            <div className='description-counter-number'>{ counter }</div>
            <div className='description-counter-btn' onClick={ handlePlus }>+</div>
          </div>
        </div>
      </section>
      <button onClick={ handleCart } className='description-btn'>Add to Cart <i className="fa-solid fa-cart-shopping"></i></button>
    </article>
  );
};

export default ProductDescription;