import React from 'react';
import ContainerComponent from './ContainerComponent';
import { motion } from 'framer-motion';
// import { motion, useViewportScroll, useTransform } from "framer-motion";

export default function WorkerComponent({
  chartData,
  totalPercentageCPU,
  memoryData,
}) {
  // const { scrollYProgress } = useViewportScroll();
  // const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);
  let containers = [];
  for (let i = 0; i < chartData.length; i++) {
    // console.log(chartData[i]);
    containers.push(
      <ContainerComponent chartData={chartData[i]} memoryData={memoryData[i]} />
    );
  }

  return (
    <motion.fieldset
      className='worker-component border-solid flex flex-col items-center gap-y-4 snap-y scroll-smooth rounded-md'
    >
      <legend className='text-white bg-nightblue-300 text-lg p-2 rounded-md mb-4'>
        Task Name
      </legend>
      {containers}
    </motion.fieldset>
  );
}
