import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Btns.module.scss';

const BtnSearchLink = () => (
  <div className={styles.btnSearchLink}>
    <Link to="/">Search</Link>
  </div>
);

export default BtnSearchLink;
