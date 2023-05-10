import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () =>
{
  const navigate = useNavigate()
  const { handleSubmit, register, reset } = useForm()

  const submit = data =>
  {
    const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/users'
    axios.post( url, data )
      .then( res =>
      {
        console.log( res.data );
        Swal.fire( {
          title: 'Se ha registrado con exito',
          icon: 'success',
        } )
        navigate( '/login' )
      } )
      .catch( err =>
      {
        console.log( err );
        Swal.fire( {
          title: 'No se ha podido registrar el usuario',
          icon: 'error',
          confirmButtonColor: '#232323'
        } )
      } )
  }

  return (
    <div className='container'>
      <form className='form-container' onSubmit={ handleSubmit( submit ) }>
        <h1 className='form-title'>Create Acount</h1>
        <div className='input-container'>
          <label htmlFor="">First Name</label>
          <input placeholder='Enter your first name' type="text" id="name" { ...register( "firstName" ) } />
        </div>
        <div className='input-container'>
          <label htmlFor="">Last Name</label>
          <input placeholder='Enter your last name' type="text" id="lastName" { ...register( "lastName" ) } />
        </div>
        <div className='input-container'>
          <label htmlFor="">Email</label>
          <input placeholder='Enter your Email' type="text" id="email" { ...register( "email" ) } />
        </div>
        <div className='input-container'>
          <label htmlFor="">Password</label>
          <input placeholder='Enter your password' type="password" id="password" { ...register( "password" ) } />
        </div>
        <div className='input-container'>
          <label htmlFor="">Phone</label>
          <input placeholder='Enter your phone number' type="text" id="phone" { ...register( "phone" ) } />
        </div>
        <button className='form-btn' type="">Register</button>
        <Link className='Link' to={ '/login' }>Do you already have an account?</Link>
      </form>
    </div>
  );
};

export default Register;