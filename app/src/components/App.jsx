import * as React from 'react';
// import WorkerComponent from './WorkerComponent';
import Tabs from './tabComponent/Tabs';
import Tabs from './tabComponent/Tabs';

const App = (props) => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-100 gap-x-3.5'>
      <WorkerComponent />
      <WorkerComponent />
      <WorkerComponent />
      <Tabs />
    </div>
  );
};

export default App;
