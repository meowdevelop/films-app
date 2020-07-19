import React from 'react';
import { connect } from 'react-redux';

import styles from './ResultsInfo.module.scss';
import stylesPage from '../../scss/Page.module.scss';

function ResultsInfo(props: {text: string, store: any, updateState: any}) {
  const { text, store } = props;
  const { sortType } = store.films;
  const changeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { updateState } = props;
    updateState('SET_SORT_TYPE', event.target.id);
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

export default connect(
  (state) => ({
    store: state,
  }),
  (dispatch) => ({
    updateState: (type: string, payload: any) => {
      dispatch({ type, payload });
    },
  }),
)(ResultsInfo);
