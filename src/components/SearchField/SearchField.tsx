import React from 'react';
import { connect } from 'react-redux';
import styles from './SearchField.module.scss';


function SearchField(props: {store: any,
  updateState: any,
  onClick: (e: React.MouseEvent) => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void}) {
  const {
    store, onChange, onKeyPress, onClick,
  } = props;
  const { searchValue } = store.films;
  return (
    <form className={styles.search} action="">
      <input
        className={styles.search__field}
        type="search"
        name="q"
        placeholder="Search"
        value={searchValue}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button className={styles.search__btn} type="button" onClick={onClick}>SEARCH</button>
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
)(SearchField);
