import React from 'react';

const SignUp = (props) => {
  return (
    <div>
      <div className='navigationBar text-slate-200 border-slate-500 mx-2 mb-4'>
        <p id='logo' className='mainFontEl'>
          Orcastration
        </p>
        <button className='mainFontEl' id='signout' onClick={props.logInPage}>
          sign in
        </button>
      </div>
      <div className='signUp'>
      <div className='signUpTitle'>Create User</div>
          email:
          <input className='signUpInput' id='email'></input>
          password:
          <input className='signUpInput' type="password" id='password'></input>
          <button className='enter' onClick={props.signUpClick}> enter </button>
      </div>
    </div>
  )
}

export default SignUp;