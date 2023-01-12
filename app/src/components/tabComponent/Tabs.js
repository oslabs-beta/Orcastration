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
    <div className='Tabs px-4 pb-4 bg-nightblue-800/50 rounded-md'>
      {/* Tab nav */}
        <ul className='nav m-0 flex h-fit'>
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
      <TabContent id='tab1' activeTab={activeTab}>
          <WorkerComponent
            chartData={chartData}
            totalPercentageCPU={totalPercentageCPU}
            memoryData={memoryData}
          />
      </TabContent>
      <TabContent id='tab2' activeTab={activeTab}>
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
      </TabContent>
      <TabContent id='tab3' activeTab={activeTab}>
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
      </TabContent>
      <TabContent id='tab4' activeTab={activeTab}>
          <WorkerComponent
            chartData={chartData}
            totalPercentageCPU={totalPercentageCPU}
            memoryData={memoryData}
          />
      </TabContent>
    </div>
  );
};
export default Tabs;
