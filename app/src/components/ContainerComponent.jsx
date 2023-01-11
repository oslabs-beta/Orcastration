import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CPUPieChart from './CPUandMemCharts.js/CPUPieChart';
import MemPieChart from './CPUandMemCharts.js/MemPieChart';

export default function ContainerComponent({ chartData, memoryData }) {
  const [toggleData, setToggleData] = useState(false);

  // console.log(toggleData);
  // console.log(chartData);
  // console.log(memoryData);
  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, originY: -0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className='container_component p-5 my-2 flex flex-col bg-slate-100 hover:duration-200 w-5/6 min-h-fit snap-start scroll-mt-2 drop-shadow-lg hover:drop-shadow-2xl rounded-md z-30 text-sm text-slate-800'
      >
        <ul className='flex flex-row justify-between'>
          <h1>Container</h1>
          <li>data</li>
          <li>
            <button
              className='bg-blue-500 rounded-full w-8'
              onClick={() => setToggleData((prev) => !prev)}
            >
              {toggleData ? '<' : '\\/'}
            </button>
          </li>
        </ul>
        <CPUPieChart chartData={chartData} />
        <MemPieChart memoryData={memoryData} />
        <section className='flex flex-row p-4 gap-4'></section>
        {toggleData && (
          <motion.div
            className='bg-blue-200 w-full'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            This is some other sort of graph
          </motion.div>
        )}
      </motion.div>
    </React.Fragment>
  );
}
