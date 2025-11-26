import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import confetti from 'canvas-confetti';

const Modal = ({ selectedDay, onClose }) => {
  React.useEffect(() => {
    if (selectedDay) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9b5de5', '#f15bb5', '#00bbf9']
      });
    }
  }, [selectedDay]);

  if (!selectedDay) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}
      >
        <motion.div
          layoutId={`card-${selectedDay.id}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#1a1a20',
            border: '1px solid var(--accent-purple)',
            borderRadius: '24px',
            padding: '2rem',
            width: '100%',
            maxWidth: '400px',
            position: 'relative',
            boxShadow: '0 0 50px rgba(155, 93, 229, 0.3)',
            textAlign: 'center'
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: 'var(--text-color)',
              cursor: 'pointer'
            }}
          >
            <X size={24} />
          </button>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{ fontSize: '5rem', marginBottom: '1rem' }}
          >
            {selectedDay.icon}
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              color: 'var(--accent-green)',
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem'
            }}
          >
            {selectedDay.title}
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ lineHeight: '1.6', fontSize: '1.1rem' }}
          >
            {selectedDay.content}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            style={{
              marginTop: '2rem',
              padding: '10px 30px',
              background: 'linear-gradient(45deg, var(--accent-purple), var(--accent-orange))',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem',
              boxShadow: '0 4px 15px rgba(155, 93, 229, 0.4)'
            }}
          >
            Cerrar
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
