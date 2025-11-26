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

  const [showLockedMessage, setShowLockedMessage] = useState(false);

  const handleOpen = (day) => {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-11, December is 11
    const currentDay = today.getDate();

    // Logic: Unlock if it's December (11) and the day has arrived or passed.
    // For testing/dev purposes, if it's NOT December, we might want to lock everything
    // OR allow testing. Assuming strict Advent rules:
    // If month < 11 (Nov), everything is locked.
    // If month > 11 (Jan), everything is unlocked.
    // If month == 11 (Dec), check day.

    let isLocked = true;

    if (currentMonth === 11) { // December
      isLocked = day.day > currentDay;
    } else if (currentMonth > 11) { // Past December (Next Year)
      isLocked = false;
    } else {
      // Before December (e.g. November)
      // Strictly speaking, all should be locked.
      isLocked = true;
    }

    // UNCOMMENT THIS LINE TO TEST AS IF IT IS DECEMBER 10th:
    // isLocked = day.day > 10;

    if (isLocked) {
      setShowLockedMessage(true);
    } else {
      setSelectedDay(day);
      if (!openedDays.includes(day.id)) {
        const newOpened = [...openedDays, day.id];
        setOpenedDays(newOpened);
        localStorage.setItem('openedDays', JSON.stringify(newOpened));
      }
    }
  };

  const handleClose = () => {
    setSelectedDay(null);
    setShowLockedMessage(false);
  };

  const lockedGift = {
    title: "¡Shhh! Aún no es tiempo",
    content: "La paciencia es una virtud de un gran pirata. ¡No comas ansias! Espera a que llegue el día para descubrir tu tesoro.",
    icon: "⏳"
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

      <Modal selectedDay={showLockedMessage ? lockedGift : selectedDay} onClose={handleClose} />
    </div>
  );
};

export default AdventCalendar;
