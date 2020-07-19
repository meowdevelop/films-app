import React from 'react';
import { connect } from 'react-redux';

import FilmsList from '../containers/FilmsList/FilmsList';
import ResultsInfo from '../containers/ResultsInfo/ResultsInfo';
import Footer from '../components/Footer/Footer';
import FilmCard from '../components/FilmCard/FilmCard';
import HeaderWrapper from '../components/HeaderWrapper/HeaderWrapper';
import FilmTypes from '../models/FilmTypes';

class FilmPage extends React.Component<any, { isFetched: boolean }> {
  constructor(props:any) {
    super(props);
    this.state = { isFetched: false };
    this.addFavourite = this.addFavourite.bind(this);
  }

  componentDidMount() {
    const { match, updateState } = this.props;
    this.setFavourites();

    fetch(`/filmCard/${match.params.id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Ответ сети не ok');
        return response.json();
      })
      .then((data) => {
        updateState('SET_CURRENT_FILM', { film: data, isFavourite: this.checkIsFavourite() });
        this.getFilmsByDirector(data.director);
      })
      .then(() => {
        this.setState({ isFetched: true });
      })
      .catch((error) => console.log(error.message));
  }

  getFilmsByDirector(director: string) {
    const { updateState } = this.props;
    fetch(`/films?director=${director}`)
      .then((response) => {
        if (!response.ok) throw new Error('Ответ сети не ok');
        return response.json();
      })
      .then((data) => {
        updateState('SET_FILMS', this.mapWithFavorites(data));
      })
      .catch((error) => console.log(error.message));
  }

  setFavourites() {
    const { updateState } = this.props;
    if (localStorage.favourites) {
      updateState('SET_FAVOURITES', localStorage.favourites.split('&'));
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

  addFavourite() {
    const { updateState, store } = this.props;
    const { film, isFavourite } = store.films.currentFilm;
    const { favourites } = store.films;
    let isFav = false;

    if (!localStorage.favourites) {
      localStorage.favourites = `${film.id}`;
      isFav = true;
      return;
    }
    if (isFavourite) {
      const filmIndex = favourites.indexOf(`${film.id}`);
      favourites.splice(filmIndex, 1);
      isFav = false;
    } else {
      favourites.push(film.id);
      isFav = true;
    }
    localStorage.favourites = favourites.join('&');
    updateState('SET_IS_FAVOURITE', isFav);
    this.setFavourites();
  }

  checkIsFavourite() {
    const { store, match } = this.props;
    const { favourites } = store.films;
    return favourites.includes(`${match.params.id}`);
  }

  render() {
    const { isFetched } = this.state;
    const { store } = this.props;
    const { film, isFavourite } = store.films.currentFilm;
    const { films } = store.films;
    return (
      <section>
        {isFetched ? (
          <>
            <HeaderWrapper component={<FilmCard film={film} isFavourite={isFavourite} onClick={this.addFavourite} />} />
            <ResultsInfo text={`Films by ${film.director}`} />
            <FilmsList films={films} />
          </>
        )
          : null}

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
)(FilmPage);
