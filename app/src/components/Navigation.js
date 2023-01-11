import React from 'react';

const Navigation = () => {
  console.log('running navigation')
  return (
    <div className='navigationBar text-slate-200 border-slate-500 mx-2 mb-4'>
      <p id='logo' className='mainFontEl'>
        Orcastration
      </p>
      <a className='mainFontEl' id='signout' href=''>
        sign out
      </a>
    </div>
  );
};

export default Navigation;
