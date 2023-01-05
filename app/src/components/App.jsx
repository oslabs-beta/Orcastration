import * as React from 'react';
import WorkerComponent from './WorkerComponent';
import Tabs from './tabComponent/Tabs';
import Star from '../star.svg'

const App = (props) => {
  return (
    <div id='background' className='flex items-center justify-center h-screen gap-x-3.5 overflow-clip'>
        <WorkerComponent />
        <WorkerComponent />
        <WorkerComponent />
    </div>
  );
};

export default App;
