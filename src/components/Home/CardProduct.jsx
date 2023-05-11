import React from 'react';
import { useNavigate } from 'react-router';
import './styles/cardProduct.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart } from '../../store/slices/cart.slice';
import Swal from 'sweetalert2';
import { setIsLoading } from '../../store/slices/isLoading.slice';

const CardProduct = ( { product } ) =>
{
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cart } = useSelector( state => state )
  const { user } = useSelector( state => state )

  // click en la card para ver el detalle del producto
  const handleClick = () =>
  {
    navigate( `/product/${ product.id }` )
    window.scrollTo( {
      top: 0,
      behavior: 'smooth'
    } )
  }

  // agregar productos al carrito de a uno desde la card
  const handleBtnClick = ( e ) =>
  {
    e.stopPropagation()
    if ( user )
    {
      dispatch( setIsLoading( true ) )
      const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/cart'
      const data = {
        quantity: 1,
        productId: product.id,
      }
      const headers = {
        headers: {
          Authorization: `Bearer ${ localStorage.getItem( 'token' ) }`
        }
      }
      axios.post( url, data, headers )
        .then( res =>
        {
          dispatch( getUserCart() )
          dispatch( setIsLoading( false ) )
          Swal.fire( {
            toast: true,
            timer: 2000,
            position: 'top-end',
            title: `Se ha agregado un "${ product.title }" a tu carrito de compras`,
            icon: 'success',
            confirmButtonColor: '#232323'
          } )
        } )
        .catch( err =>
        {
          // si la peticion da error poruq el producto ya esta agregado al carrito
          // se agrega el producto al carrito modificando la cantidad con el siguiente endpoint
          if ( err.response.data.error === 'Product already added to cart' )
          {
            const productId = cart.filter( e => e.productId === product.id )[ 0 ].id
            const urlPut = `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${ productId }`
            const prevQuantity = cart.filter( e => e.productId === product.id )[ 0 ].quantity
            const dataPut = {
              quantity: prevQuantity + 1
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
                  title: `Se ha agregado otro "${ product.title }" a tu carrito de compras`,
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
    <article className='product' onClick={ handleClick }>
      <header className='product-header'>
        <img className='product-img' src={ product.images[ 1 ].url } alt="" />
        <img className='product-img' src={ product.images[ 0 ].url } alt="" />
      </header>
      <section className='product-body'>
        <h3 className='product-name'>{ product.title }</h3>
        <article className='product-price-container'>
          <span className='product-price-label'>Price:</span>
          <h4 className='product-price-number'>{ product.price }</h4>
        </article>
        <button onClick={ handleBtnClick } className='product-btn'><i className="fa-solid fa-cart-shopping"></i></button>
      </section>
    </article>
  );
};

export default CardProduct;