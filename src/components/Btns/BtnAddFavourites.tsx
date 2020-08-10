import React from 'react';
import styles from './Btns.module.scss';

const BtnAddFavourites = (props: {isActive: boolean, onClick?: (e: React.MouseEvent) => void}) => {
  const { isActive, onClick } = props;
  const color = isActive ? 'yellow' : 'transparent';
  return (
    <button type="button" className={styles.btnFav} style={{ backgroundColor: color }} onClick={onClick}>★</button>
  );
}

export default BtnAddFavourites;
