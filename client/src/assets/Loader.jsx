import React, { useState, useEffect } from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === 4 ? 1 : prev + 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loader}>
      <h4>Loading{".".repeat(dots)}</h4>
    </div>
  );
};

export default Loader;
