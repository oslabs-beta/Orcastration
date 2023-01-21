import React from 'react';

const Navigation = (props) => {
  // console.log('running navigation')
  return (
    <div className='navigationBar text-slate-200 flex justify-between items-center px-12'>
      <p id='logo' className='mainFontEl'>
        Orcastration
      </p>
      <button
        className='mainFontEl bg-nightblue-500 p-2 rounded-md hover:bg-nightblue-300 transition ease-in-out duration-300'
        id='signout'
        onClick={props.logOutClick}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Navigation;
