
import { motion } from 'framer-motion';

export const hoverAnimation = {
  initial: { scale: 1, backgroundColor: 'transparent', color: 'black' },
  hover: {
    scale: 1.2, // Aumenta um pouco o tamanho
    backgroundColor: 'orange', // Fundo laranja
    color: 'white', // Ícone branco
    transition: {
      type: 'spring', // Tipo de transição
      stiffness: 300, // Força da animação
      damping: 20, // Suavidade
    },
  },
};
