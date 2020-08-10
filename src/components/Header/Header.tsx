import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Header.module.scss';
import BtnSearchLink from '../Btns/BtnSearchLink';

const Header = (props: {location: any}) => {
  const { location } = props;
  return (
    <header className={styles.header}>
      <span className={styles.header__logo}>netflixroulette</span>
      {location.pathname !== '/' ? <BtnSearchLink /> : null}
    </header>
  );
}

export default withRouter(Header);
