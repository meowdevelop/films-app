import React from 'react';
import { connect } from 'react-redux';
import styles from './SearchFilter.module.scss';


const SearchFilter = (props:{onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, searchFilter: string}) => {
  const { searchFilter, onChange } = props;
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

const mapStateToProps = (state: any) => ({
  searchFilter: state.films.searchFilter
});

export default connect(
  mapStateToProps
)(SearchFilter);
