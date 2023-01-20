import React from 'react';
import TaskContainer from '../TaskContainer';

const TabContent = ({ id, activeTab, tasks, containerData }) => {
  // console.log('we are in tabContent', tasks);
  // use for loop to loop over tasks array,
  //for each loop, we want to create a task container passing a new prop down
  //called containers which is equal to all the containers of that task
  const taskContainers = [];
  for (let i = 0; i < tasks.length; i++) {
    // console.log('tasks within tab content for loop: ', tasks[i])
    // console.log('containerData in tab content', containerData)
    taskContainers.push(
      <TaskContainer
        id={tasks[i].taskID}
        key={tasks[i].taskID}
        containers={tasks[i].containers}
        containerData = {containerData}
      />
    );
  }
  // console.log('this is taskContainer data: ', taskContainers);
  return (activeTab === id ? <div>{taskContainers}</div> : null);
};

export default TabContent;
