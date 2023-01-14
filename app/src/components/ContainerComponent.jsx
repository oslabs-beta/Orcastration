import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CPUPieChart from './CPUandMemCharts.js/CPUPieChart';
import MemPieChart from './CPUandMemCharts.js/MemPieChart';

export default function ContainerComponent({ containerData }) {
  const [toggleData, setToggleData] = useState(false);

  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, originY: -0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className='container_component overflow-hidden p-5 my-2 flex flex-col bg-slate-100/90 hover:bg-slate-100 hover:duration-200 w-5/6 min-h-fit snap-start scroll-mt-2 drop-shadow-lg hover:drop-shadow-2xl rounded-md z-30 text-sm text-slate-800'
      >
        <ul className='flex flex-row justify-between'>
          <h1>{containerData.containerID}</h1>
          <li>
            <button
              className='bg-blue-500 rounded-full w-8'
              onClick={() => setToggleData((prev) => !prev)}
            >
              {!toggleData ? '+' : '-'}
            </button>
          </li>
        </ul>
        <div className='chart-container'>
          <CPUPieChart CPUPerc={containerData.CPUPerc} />
          <MemPieChart memPerc={containerData.memPerc} />
        </div>
        <section className='flex flex-row p-4 gap-4'></section>
        {toggleData && (
          <motion.div
            className='bg-blue-200 w-full min-h-fit p-1'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Mem Usage / Mem Limit: {containerData.memUsage}
            <br></br>
            net I/O: {containerData.netIO}
            <br></br>
            Image: {containerData.information.image}
            <br></br>
            Created At: {containerData.information.created}
            <br></br>
            Size: {containerData.information.size}
          </motion.div>
        )}
      </motion.div>
    </React.Fragment>
  );
}
