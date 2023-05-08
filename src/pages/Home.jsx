import React from 'react';
import { useSelector } from 'react-redux';
import CardProduct from '../components/Home/CardProduct';
import './styles/home.css'

const Home = () =>
{

  const products = useSelector( state => state.products )

  return (
    <section className='products-container'>
      {
        products?.map( product => (
          <CardProduct
            key={ product.id }
            product={ product } />
        ) )
      }
    </section>
  );
};

export default Home;