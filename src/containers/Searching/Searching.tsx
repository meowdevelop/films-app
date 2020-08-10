import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './Searching.module.scss';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import SearchField from '../../components/SearchField/SearchField';
import {setSearchFilter} from '../../actions/actions';
import {setFilms} from '../../actions/actions';
import {setSearchValue} from '../../actions/actions';
import {fetchFilms} from '../../actions/actions';

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
    const { searchValue, searchFilter, history, setSearchValue } = this.props;
    history.push(`/?f=${searchFilter}&v=${searchValue}`);

    this.getFilms(searchValue, searchFilter);
    setSearchValue('');
  }

  onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { setSearchValue } = this.props;
    setSearchValue(event.target.value);
  }

  onEnterPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.charCode === 13) {
      event.preventDefault();
      this.onSearchClick();
    }
  }

  getFilms(searchValue: string, searchFilter: string) {
    const { fetchFilms } = this.props;
    fetchFilms(`/films?${searchFilter}=${searchValue}`);
  }

  getFilmsWithParams() {
    const { location, setFilms } = this.props;
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
      setFilms([]);
    }
  }

  changeFilter(event: React.ChangeEvent<HTMLInputElement>) {
    const { setSearchFilter } = this.props;
    setSearchFilter(event.target.name);
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

const mapStateToProps = (state: any) => ({
  searchValue: state.films.searchValue,
  searchFilter: state.films.searchFilter
});

const mapDispatchToProps = {
  setSearchFilter,
  setFilms,
  setSearchValue,
  fetchFilms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Searching));
