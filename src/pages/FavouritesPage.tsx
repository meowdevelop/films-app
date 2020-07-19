import React from 'react';
import { connect } from 'react-redux';

import FilmsList from '../containers/FilmsList/FilmsList';
import ResultsInfo from '../containers/ResultsInfo/ResultsInfo';
import Footer from '../components/Footer/Footer';
import HeaderWrapper from '../components/HeaderWrapper/HeaderWrapper';
import HeadingFav from '../components/HeadingFav/HeadingFav';
import FilmTypes from '../models/FilmTypes';

class FavouritesPage extends React.Component<any> {
  componentDidMount() {
    const { updateState } = this.props;
    updateState('SET_FILMS', []);
    if (localStorage.favourites) {
      const arrFavourites = localStorage.favourites.split('&');
      updateState('SET_FAVOURITES', arrFavourites);
      const searchParams = arrFavourites.map((item: string) => `id=${item}`);

      fetch(`/films?${searchParams.join('&')}`)
        .then((response) => {
          if (!response.ok) throw new Error('Ответ сети не ok');
          return response.json();
        })
        .then((data) => {
          updateState('SET_FILMS', this.mapWithFavorites(data));
        })
        .catch((error) => console.log(error.message));
    }
  }

  mapWithFavorites(films: FilmTypes[]) {
    const { store } = this.props;
    const { favourites } = store.films;
    return films.map((item: FilmTypes) => {
      if (favourites.includes(`${item.id}`)) return { ...item, isFav: true };
      return { ...item, isFav: false };
    });
  }

  render() {
    const { store } = this.props;
    const { films } = store.films;
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

export default connect(
  (state) => ({
    store: state,
  }),
  (dispatch) => ({
    updateState: (type: string, payload: any) => {
      dispatch({ type, payload });
    },
  }),
)(FavouritesPage);
