import { useQuery } from '@tanstack/react-query';
import { fetchNFTs } from '../../service/api';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/components/_button.scss';

interface ButtonProps {
  visibleCount: number;
  handleLoadMore: (totalNFTs: number) => void;
}

export default function Button({ visibleCount, handleLoadMore }: ButtonProps) {
  const { data } = useQuery({
    queryKey: ['nfts'],
    queryFn: fetchNFTs,
  });

  const totalNFTs = data?.length || 0;
  const hasSeenAll = visibleCount >= totalNFTs;

  return (
    <div className="container-btn">
      <div className={`loading-bar ${hasSeenAll ? 'forward' : 'reverse'}`} />
      <button className="btn-carregar" onClick={() => handleLoadMore(totalNFTs)}>
        <AnimatePresence mode="wait">
          <motion.span
            key={hasSeenAll ? 'done' : 'load'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {hasSeenAll ? 'Você já viu tudo' : 'Carregar mais'}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}