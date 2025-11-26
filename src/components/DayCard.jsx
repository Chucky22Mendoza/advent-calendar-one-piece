import React from 'react';
import { motion } from 'framer-motion';

const DayCard = ({ day, isOpen, onOpen, isLocked }) => {
  return (
    <motion.div
      layoutId={`card-${day.id}`}
      onClick={() => !isLocked && onOpen(day)}
      whileHover={{ scale: 1.05, rotate: Math.random() * 4 - 2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: day.id * 0.05 }}
      style={{
        background: isOpen ? 'var(--accent-purple)' : 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        aspectRatio: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Background Pattern or Glow */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
        zIndex: 0
      }} />

      <motion.span
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          zIndex: 1,
          color: isOpen ? '#fff' : 'var(--text-color)',
          fontFamily: 'var(--font-heading)'
        }}
      >
        {day.day}
      </motion.span>

      {isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ fontSize: '1.5rem', marginTop: '0.5rem', zIndex: 1 }}
        >
          {day.icon}
        </motion.div>
      )}

      {!isOpen && !isLocked && (
        <motion.div
          style={{
            position: 'absolute',
            bottom: '10px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--accent-orange)',
            boxShadow: '0 0 10px var(--accent-orange)'
          }}
        />
      )}
    </motion.div>
  );
};

export default DayCard;
