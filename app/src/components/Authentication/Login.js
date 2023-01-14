import React from 'react';

const LogIn = (props) => {
  return (
    <div>
      <div className='navigationBar text-slate-200 border-slate-500 mx-2 mb-4'>
        <p id='logo' className='mainFontEl'>
          Orcastration
        </p>
        <button className='mainFontEl' id='signout' onClick={props.signUpPage}>
          sign up
        </button>
      </div>
      <div className='signUp'>
      <div className='signUpTitle'>Log In</div>
          email:
          <input className='signUpInput' id='email'></input>
          password:
          <input className='signUpInput' type="password" id='password'></input>
          <button className='enter' onClick={props.logInClick}> enter </button>
      </div>
    </div>
  )
}

export default LogIn;