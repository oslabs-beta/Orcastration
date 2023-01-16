import React from 'react';

const TabContent = ({ id, activeTab, children }) => {
  return activeTab === id ? (
    <div className='TabContent snap-inline'>{children}</div>
  ) : null;
};

export default TabContent;
