import React from 'react';
import './styles/purchases.css'

const MyProducts = ( { product } ) =>
{
  console.log( product );
  return (
    <article className='cart-product'>
      <header>
        <h4>{ product.product.brand }</h4>
        <h3>{ product.product.title }</h3>
      </header>
      <div className='cant-container'>
        <div className='cant-cont'>
          <p>Cant:</p>
          <span>{ product.quantity }</span>
        </div>
        <div className='cant-cont'>
          <p>Unit price:</p>
          <span>$ { product.product.price }</span>
        </div>
      </div>
      <img src={ product.product.images[ 2 ].url } alt="product img" />
      <p className='date'>Purchase date:{ ' ' }
        { product.createdAt.slice( 8, 10 ) }-
        { product.createdAt.slice( 5, 7 ) }-
        { product.createdAt.slice( 0, 4 ) }
      </p>
    </article>
  );
};

export default MyProducts;