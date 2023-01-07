import React, { useState } from 'react';
// import FirstTab from '../allTabs/firstTab';
// import SecondTab from '../allTabs/secondTab';
import TabNavItem from '../tabNavAndContent/TabNavItem';
import TabContent from '../tabNavAndContent/TabContent';
import WorkerComponent from '../WorkerComponent';

const Tabs = ({ activeTab, setActiveTab, currentManager, updateManager }) => {
  //declare activeTab and setActiveTab to be able to display
  //   const [activeTab, setActiveTab] = useState('tab1');
  return (
    <div className='Tabs bg-nightblue-800/50 outline-nightblue-700 shadow-lg overflow-hidden'>
      {/* Tab nav */}
      <ul className='nav'>
        <TabNavItem
          title='Manager 1'
          id='tab1'
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentManager={currentManager}
          updateManager={updateManager}
          // setCurrentManager={setCurrentManager}
          // managerActive = {}
        />
        <TabNavItem
          title='Manager 2'
          id='tab2'
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentManager={currentManager}
          updateManager={updateManager}
        />
        <TabNavItem
          title='Manager 3'
          id='tab3'
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentManager={currentManager}
          updateManager={updateManager}
        />
        <TabNavItem
          title='Manager 4'
          id='tab4'
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentManager={currentManager}
          updateManager={updateManager}
        />
      </ul>
      <div className='outlet'>
        {/* content displayed here */}
        <TabContent id='tab1' activeTab={activeTab}>
          <div id='tab_background' className='flex items-center justify-center p-4 bg-slate-400/0 gap-x-3.5 rounded-md'>
            <WorkerComponent />
          </div>
        </TabContent>
        <TabContent id='tab2' activeTab={activeTab}>
          <div className='flex items-center justify-center p-4 gap-x-3.5'>
            <WorkerComponent />
            <WorkerComponent />
          </div>
        </TabContent>
        <TabContent id='tab3' activeTab={activeTab}>
          <div className='flex items-center justify-center p-4 bg-blue-100 gap-x-3.5'>
            <WorkerComponent />
            <WorkerComponent />
            <WorkerComponent />
          </div>
        </TabContent>
        <TabContent id='tab4' activeTab={activeTab}>
          <div className='flex items-center justify-center p-4 bg-blue-100 gap-x-3.5'>
            <WorkerComponent />
          </div>
        </TabContent>
      </div>
    </div>
  );
};
export default Tabs;
