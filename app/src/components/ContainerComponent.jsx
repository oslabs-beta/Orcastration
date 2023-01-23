import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CPUPieChart from './Charts/CPUPieChart';
import MemPieChart from './Charts/MemPieChart';
import NetworkLineChart from './Charts/NetworkLineChart'
// import e from 'express';
// import { ProgressPlugin } from 'webpack';


export default function ContainerComponent({ containerData, containerID }) {
  const [toggleData, setToggleData] = useState(false);
  const [toggleHealth, setToggleHealth] = useState(false);
  const [healthStatus, setHealthStatus] = useState('');

  const healthCheck = (containerID) => {
    // const containerId = document.getElementById()
    fetch(`/dockerSwarm/getHealth/${containerID}`)
      .then((response) => response.json())
      .then((res) => {
        if (res[0] === null) {
          alert('Health Check is not set up for this container'),
            setToggleHealth(true);
          setHealthStatus('null');
          setToggleHealth((prev) => !prev)
        } else {
          alert(`${res[0].Status}`);
          setHealthStatus(`${res[0].Status}`);
        }
      });
  };

  // console.log('containerData in container component:', containerData);
  
  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, originY: -0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.01 }}
        className='container_component p-5 my-2 flex flex-col bg-slate-100/90 hover:bg-slate-100 hover:duration-200 w-5/6 scroll-mt-2 drop-shadow-lg hover:drop-shadow-2xl rounded-md z-30 text-sm text-slate-800'
      >
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col'>
            {!containerData ? (
              ''
            ) : (
              <h1>
                <span className='font-bold'>Container Name: </span>
                {containerData.Name}
              </h1>
            )}
            <h4>
              <span className='font-bold'>Container ID: </span> {containerID}
            </h4>
          </div>
          <button
            className='dockerHealth text-white bg-nightblue-300 rounded-md p-2 shadow-lg text-lg transition ease-in-out duration-300 hover:bg-custompurple'
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
        </div>
        {containerData && (
          <div className='chart-container h-24 flex'>
              <CPUPieChart CPUPerc={containerData.CPUPerc} />
              <MemPieChart memPerc={containerData.MemPerc} />
              {/* <NetworkLineChart change={change} propData={containerData.NetIO}/> */}
          </div>
        )}
        <section className='flex flex-row p-4 gap-4'></section>
        {containerData && (
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
