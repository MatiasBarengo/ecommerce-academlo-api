import React from 'react';
import { useSelector } from 'react-redux';
import CardProduct from '../components/Home/CardProduct';
import './styles/home.css'
import Aos from 'aos';

const Home = () =>
{
  Aos.init()

  const products = useSelector( state => state.products )

  return (
    <section className='products-container'>
      {
        products?.map( product => (
          <CardProduct
            key={ product.id }
            product={ product }
            data-aos='fade-left'
          />
        ) )
      }
    </section>
  );
};

export default Home;