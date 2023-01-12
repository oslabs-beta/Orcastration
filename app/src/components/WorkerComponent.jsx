import React from 'react';
import ContainerComponent from './ContainerComponent';
import { motion } from 'framer-motion';
// import { motion, useViewportScroll, useTransform } from "framer-motion";

export default function WorkerComponent({
  chartData,
  totalPercentageCPU,
  memoryData,
  // need task prop below
  task,
}) {
  // const { scrollYProgress } = useViewportScroll();
  // const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);
  console.log(task);

  return (
    <motion.fieldset className='worker-component border-solid flex flex-col items-center gap-y-4 snap-y scroll-smooth rounded-md'>
      <legend className='text-white bg-nightblue-300 text-lg p-2 rounded-md shadow-lg'>
        taskID: {task ? task.taskID : 'Loading Task'}
      </legend>
      {!task
        ? null
        : task.containers.map((container) => {
            return <ContainerComponent containerData={container} />;
          })}
    </motion.fieldset>
  );
}
