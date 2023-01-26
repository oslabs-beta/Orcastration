import { motion } from "framer-motion";
import Backdrop from "./backdrop";

export default function Modal({ handleClose, text }) {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        
      >
      
      </motion.div>
    </Backdrop>
  )
}