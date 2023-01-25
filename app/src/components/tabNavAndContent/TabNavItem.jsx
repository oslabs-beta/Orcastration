import React from 'react';

const TabNavItem = ({
  id,
  title,
  activeTab,
  setActiveTab,
  updateNode,
  setCurrentNode,
}) => {
  const handleClick = (title) => {
    setActiveTab(id);
    //when you click a nav tab, you should update the currentManager
    //to equal the title of the nav item
    updateNode(title);
  };

  return (
    <li
      onClick={() => handleClick(title)}
      className={
        (activeTab === id ? 'active mainFontEl' : 'mainFontEl') +
        ' min-w-fit h-2 flex flex-col justify-center'
      }
    >
      {title}
    </li>
  );
};

export default TabNavItem;
