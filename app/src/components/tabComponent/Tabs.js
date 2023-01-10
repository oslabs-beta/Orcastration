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

    <div className='Tabs px-4 pb-4 bg-nightblue-800/50 overflow-x-auto overflow-y-visible w-full rounded-md'>
      {/* Tab nav */}
      <div className='w-full flex align-middle overflow-y-visible justify-center'>
        <ul className='nav m-0 h-fit'>
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
      </div>
      <div className='outlet flex items-end'>
        {/* content displayed here */}
        <TabContent id='tab1' activeTab={activeTab}>
            <WorkerComponent />
            <WorkerComponent />
        </TabContent>
        <TabContent id='tab2' activeTab={activeTab}>
            <WorkerComponent />
            <WorkerComponent />
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
