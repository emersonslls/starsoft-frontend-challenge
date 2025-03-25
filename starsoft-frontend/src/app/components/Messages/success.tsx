
'use client';

import React, {useEffect} from "react";
import '../../styles/components/sucessMessage.scss';
import { CheckCircle } from "lucide-react"; 


import { motion, AnimatePresence } from "framer-motion";

interface SuccessMessageProps {
    show: boolean;
    onClose: () => void;
}

const SuccessMessage = ({ show, onClose }: SuccessMessageProps) => {
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
            className="successMessage"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <CheckCircle className="icon" size={32} />
            <p>NFT adicionada com sucesso!</p>
          </motion.div>
        )}
      </AnimatePresence>
    );
};

export default SuccessMessage;
