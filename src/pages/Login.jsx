import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import './styles/login.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { setUser } from '../store/slices/user.slice';
import { getUserCart } from '../store/slices/cart.slice';

const Login = () =>
{
  const navigate = useNavigate()
  const { handleSubmit, register, reset } = useForm()
  const dispatch = useDispatch()

  const submit = data =>
  {
    dispatch( setIsLoading( true ) )
    const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/users/login'
    axios.post( url, data )
      .then( res =>
      {
        console.log( res.data )
        console.log( 'token', res.data.token );
        dispatch( setUser( res.data.user ) )
        localStorage.setItem( 'token', res.data.token )
        Swal.fire( {
          toast: true,
          timer: 2000,
          position: 'top-end',
          title: 'Se inicio sesion con exito',
          icon: 'success',
          confirmButtonColor: '#232323'
        } )
        navigate( '/' )
        dispatch( getUserCart() )
        dispatch( setIsLoading( false ) )
      } )
      .catch( error =>
      {
        console.log( error )
        dispatch( setIsLoading( false ) )
        Swal.fire( {
          toast: true,
          timer: 2000,
          position: 'top-end',
          title: 'Usuario o contraseña invalidos',
          icon: 'error',
          confirmButtonColor: '#232323'
        } )
      } )
  }

  return (
    <div className='container'>
      <form className='form-container' onSubmit={ handleSubmit( submit ) }>
        <h1 className='form-title'>Log In</h1>
        <div className='input-container'>
          <label htmlFor="">Email</label>
          <input placeholder='Enter your Email' type="text" id='email' { ...register( "email" ) } />
        </div>
        <div className='input-container'>
          <label htmlFor="">Password</label>
          <input placeholder='Enter your password' type="password" id='password' { ...register( "password" ) } />
        </div>
        <button className='form-btn' type="">Login</button>
        <Link className='Link' to={ '/register' }>You do not have an account yet?</Link>
      </form>
    </div>
  );
};

export default Login;