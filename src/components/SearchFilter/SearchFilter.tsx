import React from 'react';
import { connect } from 'react-redux';
import styles from './SearchFilter.module.scss';


function SearchFilter(props:{store: any,
  updateState: any,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  const { store, onChange } = props;
  const { searchFilter } = store.films;
  return (
    <form className={styles.radioSearch} action="">
      <p className={styles.radioSearch__title}>SEARCH BY</p>
      <input type="radio" name="name" id="name" onChange={onChange} checked={searchFilter === 'name'} />
      <label className={styles.radioSearch__label} htmlFor="name">TITLE</label>
      <input type="radio" name="director" id="director" onChange={onChange} checked={searchFilter === 'director'} />
      <label className={styles.radioSearch__label} htmlFor="director">DIRECTOR</label>
    </form>
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
)(SearchFilter);
