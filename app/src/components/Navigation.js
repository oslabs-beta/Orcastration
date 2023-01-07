import React from 'react';

const Navigation = () => {
  return (
    <div className='navigationBar text-slate-200 bg-nightblue-700 border-slate-500 h-1/6 mx-2 mb-4'>
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
