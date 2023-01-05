import React from "react";
import ContainerComponent from "./ContainerComponent";
import { motion, useViewportScroll, useTransform } from "framer-motion";

export default function WorkerComponent() {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);
  
  return (
    <div className="m-6 w-96 h-5/6 shadow-inner border-solid border-2 border-slate-400 bg-gradient-to-b from-slate-300 to-slate-400/70 flex flex-col items-center justify-items-end gap-y-2.5 overflow-auto snap-y scroll-smooth rounded-md">
    <ContainerComponent />
    <ContainerComponent />
    <ContainerComponent />
    <ContainerComponent />
      {/* <motion.div style={{ scaleY: scrollYProgress }} className="bg-blue-600 w-full h-full origin-bottom z-20">  
  </motion.div> */}
    </div>
  ) 
}