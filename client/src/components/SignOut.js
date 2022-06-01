import React from 'react';
import { Redirect } from 'react-router-dom';

const SignOut = () =>{
    return <>
            {localStorage.removeItem('x-auth-token')}
            <Redirect to='/signin'/>      
        </>
  }

export default SignOut;