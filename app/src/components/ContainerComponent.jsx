import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PieChart from './Charts/PieChart';
import LineChart from './Charts/LineChart';

export default function ContainerComponent({
  containerData,
  containerID,
  change,
  setHealthStatus,
}) {
  const [toggleData, setToggleData] = useState(false);
  const [toggleHealth, setToggleHealth] = useState(false);

  const handleClick = () => {
    healthCheck(containerID);
  };

  const healthCheck = (containerID) => {
    fetch(`/dockerSwarm/getHealth/${containerID}`)
      .then((response) => response.json())
      .then((res) => {
        //if container has not been set up with a docker health check file, it will return null and we will not be able to provide health check details
        if (res[0] === null) {
          setToggleHealth(true);
          setHealthStatus('null');
          setToggleHealth((prev) => !prev);
        } else {
          //if container HAS been setup for docker health check, we can move forward with supplying this health check information
          setHealthStatus(Object.assign(res[0], { containerID: containerID }));
        }
      });
  };

  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, originY: -0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
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
            className='dockerHealth text-white bg-nightblue-300 rounded-md p-2 shadow-lg text-lg transition ease-in-out duration-300 hover:bg-secondarymidblue'
            onClick={handleClick}
          >
            Health Check
          </button>
        </div>
        {containerData && (
          <div className='chart-container h-24 grid grid-flow-col h-fit justify-center items-center overflow-visible'>
            <PieChart perc={containerData.CPUPerc} containerStat={'CPUPerc'} />
            <PieChart perc={containerData.MemPerc} containerStat={'MemPerc'} />
            <LineChart change={change} networkIO={containerData.NetIO} />
          </div>
        )}
      </motion.div>
    </React.Fragment>
  );
}
