import React, { useEffect, useState } from 'react';
import './styles/profile.css'
import axios from 'axios';
import Swal from 'sweetalert2';

const Profile = () =>
{

  const [ user, setUser ] = useState( {} );
  const [ changeData, setChangeData ] = useState( false )

  useEffect( () =>
  {
    const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/users/me'
    const headers = {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem( 'token' ) }`
      }
    }
    axios.get( url, headers )
      .then( res => setUser( res.data ) )
  }, [] )

  console.log( user );

  const handleData = () =>
  {
    Swal.fire( {
      icon: 'error',
      title: 'Proximamente',
      confirmButtonColor: '#232323'
    } )
    // setChangeData( !changeData )
  }

  const submit = () =>
  {

  }

  return (
    <article className='profile-container'>
      <section className='data-container'>
        <h2>Account Data</h2>
        <ul className='list-container'>
          <li className='user-data'>
            <p>Name : </p><span>{ user?.firstName }</span>
          </li>
          <li className='user-data'>
            <p>Lastname : </p><span>{ user?.lastName }</span>
          </li>
          <li className='user-data'>
            <p>Email : </p><span>{ user?.email }</span>
          </li>
          <li className='user-data'>
            <p>Phone : </p><span>{ user?.phone }</span>
          </li>
        </ul>
        <p className='change-data' onClick={ handleData }>Change your personal data?</p>      </section>
      {
        changeData && (
          <section className='modal-container'>
            <aside className={ `modal ${ changeData ? '' : 'hidden' }` }>
              <button onClick={ handleData } type=""><i className="fa-solid fa-xmark close"></i></button>
              <form onSubmit={ submit }>
                <div>
                  <label for="">First Name</label>
                  <input type="text" placeholder='First Name' />
                </div>
                <div>
                  <label for="">First Name</label>
                  <input type="text" placeholder='First Name' />
                </div>
                <div>
                  <label for="">First Name</label>
                  <input type="text" placeholder='First Name' />
                </div>
                <div>
                  <label for="">First Name</label>
                  <input type="text" placeholder='First Name' />
                </div>
                <div>
                  <label for="">First Name</label>
                  <input type="text" placeholder='First Name' />
                </div>
                <div>
                  <label for="">First Name</label>
                  <input type="text" placeholder='First Name' />
                </div>
              </form>
            </aside>
          </section>
        )
      }
    </article>
  );
};

export default Profile;