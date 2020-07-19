import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Btns.module.scss';

const FavouritesLink = () => (
  <div className={styles.favourites}>
    <Link to="/favourites">Favourites</Link>
  </div>
);

export default FavouritesLink;
