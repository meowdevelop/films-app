import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './Searching.module.scss';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import SearchField from '../../components/SearchField/SearchField';

class Searching extends React.Component<any> {
  constructor(props:any) {
    super(props);
    this.state = {};
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    this.getFilmsWithParams();
    history.listen(() => {
      if (history.action === 'POP') {
        this.getFilmsWithParams();
      }
    });
  }

  onSearchClick() {
    const { store, history, updateState } = this.props;
    const { searchValue, searchFilter } = store.films;
    history.push(`/?f=${searchFilter}&v=${searchValue}`);

    this.getFilms(searchValue, searchFilter);
    updateState('SET_SEARCH_VALUE', '');
  }

  onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { updateState } = this.props;
    updateState('SET_SEARCH_VALUE', event.target.value);
  }

  onEnterPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.charCode === 13) {
      event.preventDefault();
      this.onSearchClick();
    }
  }

  getFilms(searchValue: string, searchFilter: string) {
    const { updateState } = this.props;
    fetch(`/films?${searchFilter}=${searchValue}`)
      .then((response) => {
        if (!response.ok) throw new Error('Ответ сети не ok');
        return response.json();
      })
      .then((data) => {
        updateState('SET_FILMS', data);
      })
      .catch((error) => console.log(error.message));
  }

  getFilmsWithParams() {
    const { location, updateState } = this.props;
    if (location.search !== '') {
      const searchPapams = location.search.slice(1).split('&');
      const objParams = searchPapams.reduce((prevValue: object, item: string) => {
        const param = item.split('=');
        return {
          ...prevValue,
          [param[0]]: param[1],
        };
      }, {});
      this.getFilms(objParams.v, objParams.f);
    } else {
      updateState('SET_FILMS', []);
    }
  }

  changeFilter(event: React.ChangeEvent<HTMLInputElement>) {
    const { updateState } = this.props;
    updateState('SET_SEARCH_FILTER', event.target.name);
  }

  render() {
    return (
      <div className={styles.searching}>
        <h1 className={styles.searching__heading}>FIND YOUR MOVIE</h1>
        <SearchField
          onChange={this.onSearchChange}
          onKeyPress={this.onEnterPress}
          onClick={this.onSearchClick}
        />
        <SearchFilter onChange={this.changeFilter} />
      </div>
    );
  }
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
)(withRouter(Searching));
