import React from 'react';
import { connect } from 'react-redux';
import styles from './ResultsInfo.module.scss';
import stylesPage from '../../scss/Page.module.scss';
import {setSortType} from '../../actions/actions';

interface ResultsInfoTypes {
  text: string, 
  sortType: string, 
  setSortType: any
}

const ResultsInfo = ({text, sortType, setSortType}: ResultsInfoTypes) => {
  const changeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortType(event.target.id);
  };
  return (
    <div className={stylesPage.container}>
      <div className={styles.resultsInfo}>
        <p className={styles.filmsCount}>{text}</p>
        <form className={styles.radioSort} action="">
          <p className={styles.radioSort__title}>Sort by</p>
          <input type="radio" name="sort" id="year" onChange={changeFilter} checked={sortType === 'year'} />
          <label className={styles.radioSort__label} htmlFor="year">release date</label>
          <input type="radio" name="sort" id="rating" onChange={changeFilter} checked={sortType === 'rating'} />
          <label className={styles.radioSort__label} htmlFor="rating">rating</label>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  sortType: state.films.sortType
});

const mapDispatchToProps = {
  setSortType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsInfo);
