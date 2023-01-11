import React, { useState } from 'react';
// import FirstTab from '../allTabs/firstTab';
// import SecondTab from '../allTabs/secondTab';
import TabNavItem from '../tabNavAndContent/TabNavItem';
import TabContent from '../tabNavAndContent/TabContent';
import WorkerComponent from '../WorkerComponent';

const Tabs = ({
  activeTab,
  setActiveTab,
  currentNode,
  setCurrentNode,
  updateNode,
  chartData,
  totalPercentageCPU,
  memoryData,
}) => {
  // console.log(chartData);

  //declare activeTab and setActiveTab to be able to display
  //   const [activeTab, setActiveTab] = useState('tab1');
  return (
    <div className='Tabs px-4 pb-4 bg-nightblue-800/50 overflow-x-auto overflow-y-visible w-full rounded-md'>
      {/* Tab nav */}
      <div className='w-full flex align-middle overflow-y-visible justify-center'>
        <ul className='nav m-0 h-fit'>
          <TabNavItem
            title='Node 1'
            id='tab1'
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentNode={currentNode}
            updateNode={updateNode}
            setCurrentNode={setCurrentNode}
            // NodeActive = {}
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
      </div>
      <div className='outlet flex items-end'>
        {/* content displayed here */}
        <TabContent id='tab1' activeTab={activeTab}>
          <div
            id='tab_background'
            className='flex items-center justify-center p-4 bg-slate-400/0 gap-x-3.5 rounded-md'
          >
            <WorkerComponent
              chartData={chartData}
              totalPercentageCPU={totalPercentageCPU}
              memoryData={memoryData}
            />
          </div>
        </TabContent>
        {/* <TabContent id='tab2' activeTab={activeTab}>
          <div className='flex items-center justify-center p-4 gap-x-3.5'>
            <WorkerComponent
              chartData={chartData}
              totalPercentageCPU={totalPercentageCPU}
              memoryData={memoryData}
            />
            <WorkerComponent
              chartData={chartData}
              totalPercentageCPU={totalPercentageCPU}
              memoryData={memoryData}
            />
          </div>
        </TabContent>
        <TabContent id='tab3' activeTab={activeTab}>
          <div className='flex items-center justify-center p-4 bg-blue-100 gap-x-3.5'>
            <WorkerComponent
              chartData={chartData}
              totalPercentageCPU={totalPercentageCPU}
              memoryData={memoryData}
            />
            <WorkerComponent
              chartData={chartData}
              totalPercentageCPU={totalPercentageCPU}
              memoryData={memoryData}
            />
            <WorkerComponent
              chartData={chartData}
              totalPercentageCPU={totalPercentageCPU}
              memoryData={memoryData}
            />
          </div>
        </TabContent>
        <TabContent id='tab4' activeTab={activeTab}>
          <div className='flex items-center justify-center p-4 bg-blue-100 gap-x-3.5'>
            <WorkerComponent
              chartData={chartData}
              totalPercentageCPU={totalPercentageCPU}
              memoryData={memoryData}
            />
          </div>
        </TabContent> */}
      </div>
    </div>
  );
};
export default Tabs;
