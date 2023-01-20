import React from 'react';
import ContainerComponent from './ContainerComponent';

export default function TaskContainer({ id, children }) {
  return (
    <fieldset className='task-container border-solid flex flex-col items-center gap-y-4 snap-y scroll-smooth rounded-md'>
      <legend className='text-white bg-nightblue-300 text-lg p-2 rounded-md shadow-lg'>
        Task ID: {id ? id : 'Loading Task'}
      </legend>
      {children}
      {/* {!task
        ? null
        : task.containers.map((containerID) => {
            return (
              <ContainerComponent
                id={containerID}
                key={containerID}
                containerData={containerID}
              />
            );
          })} */}
    </fieldset>
  );
}
