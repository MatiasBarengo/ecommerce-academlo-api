import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyProducts from '../components/Purchases/MyProducts';
import '../components/Purchases/styles/purchases.css'
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../store/slices/isLoading.slice';

const Purchases = () =>
{

  const [ purchases, setPurchases ] = useState( [] )

  const dispatch = useDispatch()

  useEffect( () =>
  {
    const header = {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem( 'token' ) }`
      }
    }
    dispatch( setIsLoading( true ) )
    axios.get( 'https://e-commerce-api-v2.academlo.tech/api/v1/purchases', header )
      .then( res =>
      {
        const reverseData = res.data.reverse()
        setPurchases( reverseData )
        dispatch( setIsLoading( false ) )
      } )
      .catch( err =>
      {
        console.log( err )
        dispatch( setIsLoading( false ) )
      } )
  }, [] )

  return (
    <section className='purchases-container'>
      <h2>Purchases</h2>
      {
        purchases?.map( ( product, id ) => (
          <MyProducts
            key={ id }
            product={ product }
          />
        ) )
      }
    </section>
  );
};

export default Purchases;


