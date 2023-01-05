import React from 'react';

const Navigation = () => {
  return (
    <div className='navigationBar'>
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
