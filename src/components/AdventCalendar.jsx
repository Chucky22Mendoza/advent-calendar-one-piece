import React, { useState, useEffect } from 'react';
import DayCard from './DayCard';
import Modal from './Modal';
import { gifts } from '../data/gifts';
import { motion } from 'framer-motion';

const AdventCalendar = () => {
  const [openedDays, setOpenedDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  // Load opened days from local storage
  useEffect(() => {
    const saved = localStorage.getItem('openedDays');
    if (saved) {
      setOpenedDays(JSON.parse(saved));
    }
  }, []);

  const handleOpen = (day) => {
    setSelectedDay(day);
    if (!openedDays.includes(day.id)) {
      const newOpened = [...openedDays, day.id];
      setOpenedDays(newOpened);
      localStorage.setItem('openedDays', JSON.stringify(newOpened));
    }
  };

  const handleClose = () => {
    setSelectedDay(null);
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      position: 'relative',
      zIndex: 1
    }}>
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glow-text"
        style={{
          textAlign: 'center',
          fontSize: '3rem',
          marginBottom: '2rem',
          fontFamily: 'var(--font-heading)',
          color: 'var(--accent-purple)'
        }}
      >
        Aventura Navideña One Piece
      </motion.h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '15px',
        paddingBottom: '50px'
      }}>
        {gifts.map((gift) => (
          <DayCard
            key={gift.id}
            day={gift}
            isOpen={openedDays.includes(gift.id)}
            onOpen={handleOpen}
            isLocked={false} // For demo purposes, all are unlocked. In real app: gift.day > new Date().getDate()
          />
        ))}
      </div>

      <Modal selectedDay={selectedDay} onClose={handleClose} />
    </div>
  );
};

export default AdventCalendar;
