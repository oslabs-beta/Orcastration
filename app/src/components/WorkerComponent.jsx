import React from 'react';
import ContainerComponent from './ContainerComponent';
import { motion } from 'framer-motion';
// import { motion, useViewportScroll, useTransform } from "framer-motion";

export default function WorkerComponent({ chartData, totalPercentageCPU }) {
  let containers = [];
  for (let i = 0; i < chartData.length; i++) {
    containers.push(<ContainerComponent chartData={chartData[i]} />);
  }

  return (
    <motion.fieldset
      className='worker-component border-solid flex flex-col items-center gap-y-1 snap-y scroll-smooth rounded-md'
    >
      <legend className='text-white bg-nightblue-300 text-lg p-2 rounded-md'>
        Task Name
      </legend>
      {containers}
    </motion.fieldset>
  );
}
