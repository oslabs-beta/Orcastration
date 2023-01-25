import React from 'react';
import TaskContainer from '../TaskContainer';

const TabContent = ({
  id,
  activeTab,
  tasks,
  containerData,
  change,
  setHealthStatus,
}) => {
  // use for loop to loop over tasks array,
  // for each loop, we want to create a task container passing a props down
  //for taskID, container data, and containerID as well as other props that will be used later on
  const taskContainers = [];
  for (let i = 0; i < tasks.length; i++) {
    taskContainers.push(
      <TaskContainer
        id={tasks[i].taskID}
        key={tasks[i].taskID}
        containers={tasks[i].containers}
        containerData={containerData}
        change={change}
        setHealthStatus={setHealthStatus}
      />
    );
  }
  return activeTab === id ? (
    <div className='task-scroll mb-4 overflow-y-auto space-y-4'>
      {taskContainers}
    </div>
  ) : null;
};

export default TabContent;
