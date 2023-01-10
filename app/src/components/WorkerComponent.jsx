import React from 'react';
import ContainerComponent from './ContainerComponent';
import { motion } from 'framer-motion';
// import { motion, useViewportScroll, useTransform } from "framer-motion";

export default function WorkerComponent({ chartData, totalPercentageCPU }) {
  // const { scrollYProgress } = useViewportScroll();
  // const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);
  let containers = [];
  for (let i = 0; i < chartData.length; i++) {
    containers.push(<ContainerComponent chartData={chartData[i]} />);
  }

  return (
    <motion.fieldset
      //  initial={{ opacity: 0 }}
      //  animate={{ opacity: 1 }}
      //  transition={{ duration: 0.8 }}
      // whileHover={{  backgroundColor: "#BBBA" }}
      // initial={{ opacity: 0, scale: 0.8 }}
      // animate={{ opacity: 1, scale: 1 }}
      // transition={{ duration: 0.2 }}
      className='worker-component w-96 border-solid flex flex-col items-center justify-items-end gap-y-2.5 overflow-auto snap-y scroll-smooth rounded-md'
    >
      <legend className='text-white bg-nightblue-300 text-lg p-2 rounded-md shadow-lg'>
        ID : 10293810
      </legend>
      <ContainerComponent />
      <ContainerComponent />
      <ContainerComponent />
      <ContainerComponent />
      {/* <motion.div style={{ scaleY: scrollYProgress }} className="bg-blue-600 w-full h-full origin-bottom z-20">  
  </motion.div> */}
    </motion.fieldset>
  );
}
