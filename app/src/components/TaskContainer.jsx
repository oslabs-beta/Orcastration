import React from 'react';
import ContainerComponent from './ContainerComponent';
import Loader from './tabComponent/Loader';

export default function TaskContainer({
  id,
  containers,
  containerData,
  change,
  setHealthStatus,
}) {
  let containerComponents = [];
  for (let i = 0; i < containers.length; i++) {
    //for every container available, we want to create a ContainerComponent passing down the containerID, and container
    //metric data
    containerComponents.push(
      <ContainerComponent
        id={containers[i]}
        key={containers[i]}
        containerID={containers[i]}
        containerData={containerData[containers[i]]}
        change={change}
        setHealthStatus={setHealthStatus}
      />
    );
  }
  return (
    <fieldset className='task-container border-solid flex flex-col items-center snap-y scroll-smooth rounded-md'>
      <legend className='text-white bg-nightblue-300 text-lg p-2 ml-4 rounded-md shadow-lg'>
        Task ID: {id ? id : 'Loading Task'}
      </legend>

      {!containers.length ? null : containerComponents}
    </fieldset>
  );
}
