import React, { useState, useEffect } from 'react';
// import FirstTab from '../allTabs/firstTab';
// import SecondTab from '../allTabs/secondTab';
import TabNavItem from '../tabNavAndContent/TabNavItem';
import TabContent from '../tabNavAndContent/TabContent';
import TaskContainer from '../TaskContainer';
import ContainerComponent from '../ContainerComponent';
import Loader from './Loader';

const Tabs = ({
  allTasks,
  activeTab,
  setActiveTab,
  currentNode,
  setCurrentNode,
  updateNode,
}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const reqObj = {};
      allTasks.forEach((node) => {
        node.tasks.forEach((task) => {
          task.containers.forEach((container) => {
            reqObj[container] = task.taskID;
          });
        });
      });
      try {
        let response = await fetch('/dockerCont/getStats', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqObj),
        });

        let parsedData = await response.json();
        console.log('here is the parsed data', parsedData);
        setData(parsedData);
      } catch (err) {
        console.log('Error in App.jsx useEffect', err);
      }
    };
    fetchData();
    // return for componentWillUnmount lifecycle
  }, []);

  return (
    <div className='Tabs px-4 pb-4 bg-nightblue-800/50 rounded-md'>
      <ul className='nav m-0 flex h-fit'>
        <TabNavItem
          // this is currently hardcoded
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
        {/* this is hardcoded, we are only taking the tasks from the first node */}
        {allTasks[0].tasks.map((task) => {
          console.log('here is the task: ', task);
          return (
            <TaskContainer id={task.taskID} key={task.taskID}>
              {!data ? (
                // change loader
                <Loader key={task.taskID} />
              ) : (
                task.containers.map((containerID) => {
                  return (
                    <ContainerComponent
                      key={containerID}
                      containerData={data[containerID]}
                    />
                  );
                })
              )}
            </TaskContainer>
          );
        })}
      </TabContent>
      <TabContent id='tab2' activeTab={activeTab}></TabContent>
      <TabContent id='tab3' activeTab={activeTab}></TabContent>
      <TabContent id='tab4' activeTab={activeTab}></TabContent>
    </div>
  );
};
export default Tabs;
