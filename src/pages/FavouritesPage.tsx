import React from 'react';
import { connect } from 'react-redux';

import FilmsList from '../containers/FilmsList/FilmsList';
import ResultsInfo from '../containers/ResultsInfo/ResultsInfo';
import Footer from '../components/Footer/Footer';
import HeaderWrapper from '../components/HeaderWrapper/HeaderWrapper';
import HeadingFav from '../components/HeadingFav/HeadingFav';
import FilmTypes from '../models/FilmTypes';
import {setFavourites} from '../actions/actions';
import {setFilms} from '../actions/actions';
import {fetchFilms} from '../actions/actions';

class FavouritesPage extends React.Component<any> {

  componentDidMount() {
    const { setFavourites, setFilms, fetchFilms } = this.props;
    setFilms([]);
    if (localStorage.favourites) {
      const arrFavourites = localStorage.favourites.split('&');
      setFavourites(arrFavourites);
      const searchParams = arrFavourites.map((item: string) => `id=${item}`);
      const url = `/films?${searchParams.join('&')}`;

      fetchFilms(url);
    }
  }

  render() {
    const { films } = this.props;
    return (
      <section>
        <HeaderWrapper component={<HeadingFav />} />
        {films.length ? <ResultsInfo text={`${films.length} movies found`} /> : null}
        <FilmsList films={films} />
        <Footer />
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  favourites: state.films.favourites,
  films: state.films.films,
});

const mapDispatchToProps = {
  setFavourites,
  setFilms,
  fetchFilms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavouritesPage);
