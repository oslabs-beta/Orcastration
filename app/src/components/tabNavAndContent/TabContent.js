import React from 'react';

const TabContent = ({ id, activeTab, children }) => {
  return activeTab === id ? <div className='TabContent'>{children}</div> : null;
  //   return <div>hello</div>;
};

export default TabContent;
