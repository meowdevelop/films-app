import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Film.module.scss';
import FilmTypes from '../../models/FilmTypes';
import BtnAddFavourites from '../Btns/BtnAddFavourites';

const Film = (props: {film: FilmTypes}) => {
  const { film } = props;

  return (
    <li className={styles.film}>
      <Link to={`/film/${film.id}`}>
        <div className={styles.film__imgWrap}>
          <img src={`/assets/${film.imgPath}`} className={styles.film__img} alt="film-poster" />
          {film.isFav ? <BtnAddFavourites isActive /> : null}
        </div>
        <div className={styles.film__info}>
          <div className={styles.film__infoGroup}>
            <p className={styles.film__name}>{film.name}</p>
            <p className={styles.film__genre}>{film.jenre}</p>
          </div>
          <span className={styles.film__year}>{film.year}</span>
        </div>
      </Link>
    </li>
  );
}

export default Film;
