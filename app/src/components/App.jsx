import * as React from 'react';
import WorkerComponent from './WorkerComponent';

const App = (props) => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-100 gap-x-3.5'>
      <WorkerComponent />
      <WorkerComponent />
      <WorkerComponent />
      
    </div>
  )
};

export default App;