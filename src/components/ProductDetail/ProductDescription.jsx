import React, { useState } from 'react';
import './styles/productDescription.css'
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '../../store/slices/isLoading.slice';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getUserCart } from '../../store/slices/cart.slice';
import { useNavigate } from 'react-router';

const ProductDescription = ( { product } ) =>
{

  const [ counter, setCounter ] = useState( 1 )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { cart } = useSelector( state => state )
  const { user } = useSelector( state => state )

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
    if ( user )
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
      axios.post( url, data, headers )
        .then( res =>
        {
          console.log( res.data )
          dispatch( setIsLoading( false ) )
        } )
        .catch( err =>
        {
          if ( err.response.data.error === 'Product already added to cart' )
          {
            const productId = cart.filter( e => e.productId === product.id )[ 0 ].id
            const urlPut = `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${ productId }`
            const prevQuantity = cart?.filter( e => e.productId === product.id )[ 0 ].quantity
            const dataPut = {
              quantity: prevQuantity + counter
            }
            axios.put( urlPut, dataPut, headers )
              .then( res =>
              {
                dispatch( getUserCart() )
                dispatch( setIsLoading( false ) )
                Swal.fire( {
                  toast: true,
                  timer: 2000,
                  position: 'top-end',
                  title: `Se ha agregado ${ counter } "${ product.title }" a tu carrito de compras`,
                  icon: 'success',
                  confirmButtonColor: '#232323'
                } )
              } )
              .catch( err => console.log( err ) )
          }
        } )
    } else
    {
      navigate( '/login' )
    }
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