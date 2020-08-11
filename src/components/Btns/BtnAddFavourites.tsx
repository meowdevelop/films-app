import React from 'react';
import styles from './Btns.module.scss';

interface BtnFavTypes {
  isActive: boolean,
  onClick?: (e: React.MouseEvent) => void
}

const BtnAddFavourites = ({isActive, onClick}: BtnFavTypes) => {
  const color = isActive ? 'yellow' : 'transparent';
  return (
    <button type="button" className={styles.btnFav} style={{ backgroundColor: color }} onClick={onClick}>★</button>
  );
}

export default BtnAddFavourites;
