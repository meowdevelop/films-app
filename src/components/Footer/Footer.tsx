import React from 'react';
import styles from './Footer.module.scss';
import FavouritesLink from '../Btns/FavouritesLink';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <span className={styles.footer__logo}>netflixroulette</span>
      <FavouritesLink />
    </div>
  </footer>
);

export default Footer;
