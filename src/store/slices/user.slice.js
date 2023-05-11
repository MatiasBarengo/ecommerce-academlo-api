import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice( {
  name: 'user',
  initialState: null,
  reducers: {
    setUser: ( state, action ) => { return action.payload }
  }
} )

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const getUser = () => ( dispatch ) =>
{
  const header = {
    headers: {
      Authorization: `Bearer ${ localStorage.getItem( 'token' ) }`
    }
  }
  const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/users/me';
  axios.get( url, header )
    .then( res => dispatch( setUser( res.data ) ) )
    .catch( err => console.log( err ) )
}