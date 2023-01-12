import React, { useState } from 'react';
// import FirstTab from '../allTabs/firstTab';
// import SecondTab from '../allTabs/secondTab';
import TabNavItem from '../tabNavAndContent/TabNavItem';
import TabContent from '../tabNavAndContent/TabContent';
import WorkerComponent from '../WorkerComponent';

const Tabs = ({
  allTasks,
  activeTab,
  setActiveTab,
  currentNode,
  setCurrentNode,
  updateNode,
}) => {
  return (
    <div className='Tabs px-4 pb-4 bg-nightblue-800/50 rounded-md'>
      <ul className='nav m-0 flex h-fit'>
        <TabNavItem
          title={!allTasks.length ? 'Node ID' : `${allTasks[0].nodeID}`}
          id='tab1'
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentNode={currentNode}
          updateNode={updateNode}
          setCurrentNode={setCurrentNode}
        />
        <TabNavItem
          title='Node 2'
          id='tab2'
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentNode={currentNode}
          updateNode={updateNode}
        />
        <TabNavItem
          title='Node 3'
          id='tab3'
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentNode={currentNode}
          updateNode={updateNode}
        />
        <TabNavItem
          title='Node 4'
          id='tab4'
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentNode={currentNode}
          updateNode={updateNode}
        />
      </ul>
      <TabContent id='tab1' activeTab={activeTab}>
        {allTasks.length === 0 ? (
          <div>Loading...</div>
        ) : (
          allTasks[0].tasks.map((task) => {
            return <WorkerComponent task={task} />;
          })
        )}
      </TabContent>
      <TabContent id='tab2' activeTab={activeTab}>
      </TabContent>
      <TabContent id='tab3' activeTab={activeTab}>
      </TabContent>
      <TabContent id='tab4' activeTab={activeTab}>
      </TabContent>
    </div>
  );
};
export default Tabs;
