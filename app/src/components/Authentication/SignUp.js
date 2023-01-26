import React from 'react';

const SignUp = (props) => {
  return (
    <div>
      <div className='navigationBar flex justify-between pt-3 text-lightgrey border-slate-500 mx-2 mb-4'>
        <p id='logo' className='mainFontEl'>
          Orcastration
        </p>
        <button
          className='mainFontEl bg-darkblue-500 rounded-md px-2 transition ease-in-out duration-300 hover:bg-lightgrey hover:text-darkblue-500'
          id='signout'
          onClick={props.logInPage}
        >
          sign in
        </button>
      </div>
      <div className='signUp'>
        <div className='signUpTitle'>Create User</div>
        <div className='signUpInput'>
          <div className='text-white'>email:</div>
          <input className='signUpInput mr-4' id='email'></input>
          <div className='text-white'>password:</div>
          <input className='signUpInput' type='password' id='password'></input>
          <div>
            <button
              className='enter transition ease-in-out duration-300 hover:bg-lightgrey hover:text-darkblue-500'
              onClick={props.signUpClick}
            >
              {' '}
              enter{' '}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
