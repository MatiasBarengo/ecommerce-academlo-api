import React from 'react';
import './styles/cartProduct.css'

const CartProduct = ( { product } ) =>
{

  console.log( 'product in cart', product );

  return (
    <article className='cart-product'>
      <header>
        <h4>{ product.product.brand }</h4>
        <h3>{ product.product.title }</h3>
      </header>
      <button>
        <i className="fa-solid fa-trash-can"></i>
      </button>
      <div>{ product.quantity }</div>
      <div>
        <p>Unit price:</p>
        <span>$ { product.product.price }</span>
      </div>
    </article>
  );
};

export default CartProduct;