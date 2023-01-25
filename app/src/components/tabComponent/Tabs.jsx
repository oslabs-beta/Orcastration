import React, { useState, useEffect } from 'react';
import TabNavItem from '../tabNavAndContent/TabNavItem';
import TabContent from '../tabNavAndContent/TabContent';
import Loader from './Loader';

const Tabs = ({
  allTasks,
  activeTab,
  setActiveTab,
  currentNode,
  setCurrentNode,
  updateNode,
  userEmail,
  currentStep,
  setCurrentStep,
  setHealthStatus,
}) => {
  const [data, setData] = useState('');
  const [tabContentArr, setTabContentArr] = useState([]);
  const [UUID, setUUID] = useState(null);
  const [change, setChange] = useState(false);

  //declare variable tabNavArr and initialize to empty array
  const [test, setTest] = useState(true);
  let tabNavArr = [];
  //declare variable tabContentArr and initialzie to empty array
  let tabContent = [];

  //loop through incoming tasks (use foreach loop below? we want this to happen on page load so yes. or can we put this in a function and then call th function in the fetch)
  const createNavAndContent = () => {
    for (let i = 0; i < allTasks.length; i++) {
      tabNavArr.push(
        <TabNavItem
          title={!allTasks.length ? 'Node ID' : `${allTasks[i].nodeID}`}
          key={allTasks[i].nodeID}
          id={'tab' + i}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentNode={currentNode}
          updateNode={updateNode}
          setCurrentNode={setCurrentNode}
        />
      );
    }
    return;
  };
  createNavAndContent();

  const createTabContent = () => {
    for (let i = 0; i < allTasks.length; i++) {
      tabContent.push(
        <TabContent
          id={'tab' + i}
          activeTab={activeTab}
          key={allTasks[i].nodeID}
          tasks={allTasks[i].tasks}
          containerData={data}
          change={change}
          setHealthStatus={setHealthStatus}
        />
      );
    }
    return;
  };

  useEffect(() => {
    const fetchData = async () => {
      const reqObj = [];
      allTasks.forEach((node) => {
        node.tasks.forEach((task) => {
          task.containers.forEach((container) => {
            //for each container in each task in each node returned from allTasks, we will push the data contained in container
            console.log('container: ', container);
            reqObj.push(container);
          });
        });
      });

      try {
        setCurrentStep('Snapshot');
        let response = await fetch('/dockerCont/saveSwarmData', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqObj),
        });

        let newUUID = await response.json();
        setUUID(newUUID);
        setCurrentStep('Ready');
      } catch (err) {
        console.log('Error in Tabs.jsx useEffect', err);
      }
    };
    fetchData();
  }, []);

  createTabContent();

  useEffect(() => {
    if (currentStep === 'Start') {
      const sse = new EventSource(
        `http://localhost:3000/dockerCont/streamSwarmStats/${UUID}`
      );
      console.log('Started Streaming');
      sse.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setData(data);
        setChange((prev) => !prev);
      };
      sse.onerror = (err) => {
        console.log('see.error', err);
        return () => {
          sse.close();
        };
      };

      return () => {
        sse.close();
      };
    }
  }, [currentStep]);

  return (
    <div className='Tabs px-4 scroll-pb-4 bg-nightblue-800/50 rounded-md'>
      <ul className='nav m-0 h-fit justify-center'>
        {tabNavArr.length === 0 ? <Loader /> : tabNavArr}
      </ul>
      {tabNavArr.length === 0 ? <Loader /> : tabContent}
    </div>
  );
};
export default Tabs;
