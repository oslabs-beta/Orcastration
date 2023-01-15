import React from 'react';

const Navigation = (props) => {
  console.log('running navigation')
  return (
    <div className='navigationBar text-slate-200'>
      <p id='logo' className='mainFontEl'>
        Orcastration
      </p>
      <button className='mainFontEl' id='signout' onClick={props.logOutClick}>
        sign out
      </button>
    </div>
  );
};

export default Navigation;
