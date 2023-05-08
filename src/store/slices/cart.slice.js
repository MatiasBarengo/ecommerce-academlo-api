import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice( {
  name: 'cart',
  initialState: null,
  reducers: {
    setCart: ( state, action ) => action.payload
  }
} )

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;

export const getUserCart = () => ( dispatch ) =>
{
  dispatch( setIsLoading( true ) )
  const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/cart'
  const header = {
    headers: {
      Authorization: `Bearer ${ localStorage.getItem( 'token' ) }`
    }
  }
  axios.get( url, header )
    .then( res => dispatch( setCart( res.data ) ) )
    .catch( err =>
    {
      dispatch( setCart( null ) )
    } )
    .finally( () => dispatch( setIsLoading( false ) ) )
}