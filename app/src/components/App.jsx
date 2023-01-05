import React, { useState } from 'react';
import Tabs from './tabComponent/Tabs';
import Navigation from './Navigation';
import ManagerMetricsContainer from './Managers/ManagerMetricsContainer';

const App = (props) => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [currentManager, setCurrentManager] = useState('Manager 1');

  const updateManager = (manager) => {
    setCurrentManager(manager);
  };

  return (
    <div className='navigation'>
      <Navigation />
      <div className='managerAndTabs'>
        <ManagerMetricsContainer
          activeTab={activeTab}
          currentManager={currentManager}
          // managerActive={true}
        />
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentManager={currentManager}
          updateManager={updateManager}
          // managerActive={true}
        />
      </div>
    </div>
  );
};

export default App;
