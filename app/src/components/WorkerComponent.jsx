import React from 'react';
import ContainerComponent from './ContainerComponent';

export default function WorkerComponent({ task }) {
  return (
    <fieldset className='worker-component border-solid flex flex-col items-center gap-y-4 snap-y scroll-smooth rounded-md'>
      <legend className='text-white bg-nightblue-300 text-lg p-2 rounded-md shadow-lg'>
        taskID: {task ? task.taskID : 'Loading Task'}
      </legend>
      {!task
        ? null
        : task.containers.map((container) => {
            return <ContainerComponent containerData={container} />;
          })}
    </fieldset>
  );
}
