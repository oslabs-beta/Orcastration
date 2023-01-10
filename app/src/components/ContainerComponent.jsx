import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PieChart from '../components/PieChart';

export default function ContainerComponent({ chartData }) {
  const [toggleData, setToggleData] = useState(false);

  // console.log(toggleData);
  // console.log(chartData);
  return (
    <React.Fragment>
      <PieChart chartData={chartData} />
      <motion.div className='p-5 m-3 flex flex-col bg-slate-100/90 hover:bg-slate-100 hover:duration-200 w-5/6 min-h-fit snap-start scroll-mt-2 drop-shadow-lg hover:drop-shadow-2xl rounded-md z-30 text-sm text-slate-800'>
        <ul className='flex flex-row justify-between'>
          <h1>Container</h1>
          <li>data</li>
          <li>
            <button
              className='bg-blue-500 rounded-full w-8'
              onClick={() => setToggleData((prev) => !prev)}
            >
              {toggleData ? '<' : '/'}
            </button>
          </li>
        </ul>

        <section className='flex flex-row p-4 gap-4'>
          <canvas>{/* <PieChart chartData={chartData} /> */}</canvas>

          <div className='h-14 w-14 bg-orange-300 rounded-full'></div>
          <div className='h-14 w-14 bg-green-300 rounded-full'></div>
        </section>
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
