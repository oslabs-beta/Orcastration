import React, { useState, useEffect } from 'react';

// import FirstTab from '../allTabs/firstTab';
// import SecondTab from '../allTabs/secondTab';
import TabNavItem from '../tabNavAndContent/TabNavItem';
import TabContent from '../tabNavAndContent/TabContent';
import TaskContainer from '../TaskContainer';
import ContainerComponent from '../ContainerComponent';
import Loader from './Loader';
import { flushSync } from 'react-dom';
// const containerNum = 0;
const Tabs = ({
  allTasks,
  activeTab,
  setActiveTab,
  currentNode,
  setCurrentNode,
  updateNode,
}) => {
  const [data, setData] = useState('');
  const [tabContentArr, setTabContentArr] = useState([]);
  //declare variable tabNavArr and initialize to empty array
  const [test, setTest] = useState(true);
  let tabNavArr = [];
  //declare variable tabContentArr and initialzie to empty array
  let tabContent = [];

  //loop through incoming tasks (use foreach loop below? we want this to happen on page load so yes. or can we put this in a function and then call th function in the fetch)
  const createNavAndContent = () => {
    // console.log('this is alltasks', allTasks);
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
    // console.log('this is tabNavArr: ', tabNavArr)
    // console.log('this is tabContentArr: ', tabContentArr)
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
        />
      );
    }
    return;
  };
  //create tabNav components for each node identical to the structure below
  //generate that inside unordered list
  // createTabContent();
  //while we are looping we can ALSO take care of tabcontent since this also relies on looping through alltasks initially

  useEffect(() => {
    // console.log(tabNavArr);
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
        // console.log('all tasks in the useEffect', allTasks[0].tasks)
        let parsedData = await response.json();
        // console.log('this is parsedData', parsedData);
        // console.log('here is the parsed data', parsedData);
        setData(parsedData);
        // createTabContent();
        // console.log('this is setData: ', setData)
        // console.log('this is data: ', data);
        // console.log('test', test)
        // console.log('this is tabContentArr: ', tabContentArr);
      } catch (err) {
        console.log('Error in App.jsx useEffect', err);
      }
      // console.log('data inside useEffect', data);
    };
    // setData(parsedData)
    fetchData();

    // console.log('data outside of fetch request: ', data);
    // console.log('this is tabNavArr: ', tabNavArr);
    // console.log('tabContentArr: ', tabContentArr);
    // return for componentWillUnmount lifecycle
  }, []);
  console.log('data', data);
  // useEffect(() => {
  //   const reqObj = {};
  //   allTasks.forEach((node) => {
  //     node.tasks.forEach((task) => {
  //       task.containers.forEach((container) => {
  //         reqObj[container] = task.taskID;
  //       });
  //     });
  //   });

  //   const fetchData = () => {
  //     fetch('/dockerCont/getStats', {
  //       method: 'POST',
  //       mode: 'cors',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(reqObj),
  //     })
  //       .then((response) => response.json())
  //       .then((parsedData) => setData(parsedData))
  //       .then((data) => {
  //         console.log(data);
  //       })
  //       .then(() => createTabContent());
  //   };
  //   fetchData();
  // }, []);

  // // console.log('this is data outside of useEffect function', data);
  createTabContent();
  return (
    <div className='Tabs px-4 pb-4 bg-nightblue-800/50 rounded-md'>
      <ul className='nav m-0 flex h-fit'>
        {/* <TabNavItem
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
        /> */}
        {tabNavArr.length === 0 ? (
          // change loader
          <Loader />
        ) : (
          tabNavArr
        )}
      </ul>

      {/* use for loop or map to render tab content components dynamically based on how many nodes are available */}
      {/* inclue the tasks array respective to the node passed down as props to each of the task containers  */}
      {/* <TabContent id='tab1' activeTab={activeTab}>
        {allTasks[0].tasks.map((task) => {
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
      <TabContent id='tab4' activeTab={activeTab}></TabContent> */}
      {/* 
      {!tabContentArr.length ? (
        // change loader
        <Loader />
      ) : (
        tabContentArr
      )} */}
      {tabNavArr.length === 0 ? <Loader /> : tabContent}
    </div>
  );
};
export default Tabs;
