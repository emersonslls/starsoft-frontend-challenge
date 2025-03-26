
'use client';

import React, {useEffect} from "react";
import '../../styles/components/sucessBuyMessage.scss';
import { CheckCircle } from "lucide-react"; 


import { motion, AnimatePresence } from "framer-motion";

interface SuccessBuyMessageProps {
    show: boolean;
    onClose: () => void;
}

const SuccessBuyMessage = ({ show, onClose }: SuccessBuyMessageProps) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <AnimatePresence>
        {show && (
          <motion.div
            className="SuccessBuyMessage"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <CheckCircle className="icon" size={32} />
            <p>Compra realizada com sucesso!</p>
          </motion.div>
        )}
      </AnimatePresence>
    );
};

export default SuccessBuyMessage;
