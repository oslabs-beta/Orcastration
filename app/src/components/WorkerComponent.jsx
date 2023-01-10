import React from 'react';
import ContainerComponent from './ContainerComponent';
// import { motion, useViewportScroll, useTransform } from "framer-motion";

export default function WorkerComponent({ chartData, totalPercentageCPU }) {
  // const { scrollYProgress } = useViewportScroll();
  // const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);
  let containers = [];
  for (let i = 0; i < chartData.length; i++) {
    containers.push(<ContainerComponent chartData={chartData[i]} />);
  }

  return (
    <div className='shadow-[0_35px_80px_-15px_rgba(0,0,0,0.3)] m-6 w-96 h-5/6 border-solid border-1 border-slate-300 bg-gradient-to-b from-slate-300 to-slate-400/70 flex flex-col items-center justify-items-end gap-y-2.5 overflow-auto snap-y scroll-smooth rounded-md'>
      {containers}
      {/* <motion.div style={{ scaleY: scrollYProgress }} className="bg-blue-600 w-full h-full origin-bottom z-20">  
  </motion.div> */}
    </div>
  );
}
