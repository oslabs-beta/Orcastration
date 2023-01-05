import React from 'react';

const TabNavItem = ({
  id,
  title,
  activeTab,
  setActiveTab,
  updateManager,
  setCurrentManager,
}) => {
  const handleClick = (title) => {
    setActiveTab(id);
    //when you click a nav tab, you should update the currentManager
    //to equal the title of the nav item
    console.log(title);
    updateManager(title);
  };

  return (
    <li
      onClick={() => handleClick(title)}
      className={activeTab === id ? 'active mainFontEl' : 'mainFontEl'}
    >
      {title}
    </li>
  );
};

export default TabNavItem;
