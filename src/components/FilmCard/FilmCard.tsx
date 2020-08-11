import React from 'react';
import styles from './FilmCard.module.scss';
import FilmCardTypes from '../../models/FilmCardTypes';
import BtnAddFavourites from '../Btns/BtnAddFavourites';

interface FilmCardPropTypes {
  film: FilmCardTypes,
  isFavourite: boolean,
  onClick?: (e: React.MouseEvent) => void
}

const FilmCard = ({film, isFavourite, onClick}: FilmCardPropTypes) =>  (
    <section className={styles.filmCard}>
      <div className={styles.filmCard__imgWrap}>
        <img src={`/assets/${film.imgPath}`} className={styles.filmCard__img} alt="film-poster" />
        <BtnAddFavourites isActive={isFavourite} onClick={onClick} />
      </div>
      <div className={styles.filmCard__info}>
        <div className={styles.filmCard__headingInfo}>
          <h1 className={styles.filmCard__filmName}>{film.name}</h1>
          <p className={styles.filmCard__rating}>{film.rating}</p>
        </div>
        <p className={styles.filmCard__caption}>{film.caption}</p>
        <p className={styles.filmCard__miniInfo}>
          <span className={styles.filmCard__year}>{film.year}</span>
          <span className={styles.filmCard__duration}>{`${film.duration} min`}</span>
        </p>
        <p className={styles.filmCard__descr}>{film.description}</p>
        <p className={styles.filmCard__director}>{`Director: ${film.director}`}</p>
        <p className={styles.filmCard__cast}>{`Cast: ${film.cast}`}</p>
      </div>
    </section>
);

export default FilmCard;
