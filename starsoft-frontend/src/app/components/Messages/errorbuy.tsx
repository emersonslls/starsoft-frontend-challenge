// src/app/components/Messages/ErrorBuyMessage.tsx

'use client';

import React, { useEffect } from 'react';
import { XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/components/errorBuyMessage.scss';

interface ErrorBuyMessageProps {
  show: boolean;
  onClose: () => void;
}

const ErrorBuyMessage = ({ show, onClose }: ErrorBuyMessageProps) => {
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
          className="ErrorBuyMessage"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <XCircle className="icon" size={32} />
          <p>Não há itens no carrinho!</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorBuyMessage;
