import React from 'react';
import { connect } from 'react-redux';
import styles from './SearchField.module.scss';

interface SearchFieldTypes {
  searchValue: string,
  onClick: (e: React.MouseEvent) => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const SearchField = ({searchValue, onClick, onChange, onKeyPress}: SearchFieldTypes) => (
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

const mapStateToProps = (state: any) => ({
  searchValue: state.films.searchValue
});

export default connect(
  mapStateToProps
)(SearchField);
