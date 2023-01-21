import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CPUPieChart from './CPUandMemCharts.js/CPUPieChart';
import MemPieChart from './CPUandMemCharts.js/MemPieChart';
// import e from 'express';
// import { ProgressPlugin } from 'webpack';

const healthCheck = (containerId) => {
  // const containerId = document.getElementById()
  fetch(`/dockerSwarm/getHealth/${containerId}`)
    .then((response) => response.json())
    .then((res) => {
      if (res[0] === null) {
        alert('Health Check is not set up for this container'), setToggleHealth(true);
        setHealthStatus('null');
        // setToggleHealth((prev) => !prev)
      } else{
        alert(`${res}`)
        setHealthStatus(`${res}`)
      }
    });
};

export default function ContainerComponent({ containerData, containerID }) {
  const [toggleData, setToggleData] = useState(false);
  // const [toggleHealth, setToggleHealth] = useState(false);
  // const [healthStatus, setHealthStatus] = useState('');
  // console.log('we are in container component', containerData);

  console.log('containerData in container component:', containerData);
  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, originY: -0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className='container_component p-5 my-2 flex flex-col bg-slate-100/90 hover:bg-slate-100 hover:duration-200 w-5/6 scroll-mt-2 drop-shadow-lg hover:drop-shadow-2xl rounded-md z-30 text-sm text-slate-800'
      >
        <ul className='flex flex-row justify-between'>

          {!containerData ? (
            ''
          ) : (
            <h1> {`Container Name: ${containerData.Name}`}</h1>
          )}
          <h4>{`Container ID: ${containerID}`}</h4>
          <button
            className='dockerHealth'
            onClick={() => healthCheck(containerID)}
          >
            Health Check
          </button>
          {/* <motion.div
            className='bg-blue-200 w-full min-h-fit p-1'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {healthStatus}
          </motion.div> */}
          {/* <motion.div></motion.div> */}
          <li>
            <button
              className='bg-blue-500 rounded-full w-8'
              onClick={() => setToggleData((prev) => !prev)}
            >
              {!toggleData ? '+' : '-'}
            </button>
          </li>
        </ul>
        <div className='chart-container h-24 flex'>
        {!containerData ? (
            ''
          ) : (
            <CPUPieChart CPUPerc={containerData.CPUPerc} />
          )}
        {!containerData ? (
            ''
          ) : (
            <MemPieChart memPerc={containerData.MemPerc} />
          )}
         
        </div>
        <section className='flex flex-row p-4 gap-4'></section>
        {toggleData && (
          <motion.div
            className='bg-blue-200 w-full min-h-fit p-1'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Mem Usage / Mem Limit: {containerData.MemUsage}
            <br></br>
            net I/O: {containerData.NetIO}
            {/* <br></br> */}
            {/* Image: {containerData.information.image} */}
            {/* <br></br> */}
            {/* Created At: {containerData.information.created} */}
            {/* <br></br> */}
            {/* Size: {containerData.information.size} */}
          </motion.div>
        )}
      </motion.div>
    </React.Fragment>
  );
}
