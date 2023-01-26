import React from 'react';
import logo from '../../../app/assets/LOGO.png';

const Navigation = (props) => {
  return (
    <div className='navigationBar bg-nightblue-800/60 text-slate-200 flex items-center px-12 py-2'>
      <img src={logo} className='w-24'></img>
      <p id='logo' className='font-sans ml-4'>
        Orcastration
      </p>
      {/* <button
        className='bg-nightblue-300 p-2 rounded-md hover:bg-secondarymidblue transition ease-in-out duration-300 ml-auto'
        id='signout'
        onClick={props.logOutClick}
      >
        Sign Out
      </button> */}
    </div>
  );
};

export default Navigation;
