import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/components/_button.scss';

export default function Button() {
    const [completed, setCompleted] = useState(false);

    const handleClick = () => {
        setCompleted((prev) => !prev);
    };

    return (
        <div className='container-btn'>
            <div className={`loading-bar ${completed ? 'forward' : 'reverse'}`} />
            <button className='btn-carregar' onClick={handleClick}>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={completed ? 'done' : 'load'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        {completed ? 'Você já viu tudo' : 'Carregar mais'}
                    </motion.span>
                </AnimatePresence>
            </button>
        </div>
    );
}
