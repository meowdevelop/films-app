import React from 'react';
import { connect } from 'react-redux';

import FilmsList from '../containers/FilmsList/FilmsList';
import ResultsInfo from '../containers/ResultsInfo/ResultsInfo';
import Footer from '../components/Footer/Footer';
import FilmCard from '../components/FilmCard/FilmCard';
import HeaderWrapper from '../components/HeaderWrapper/HeaderWrapper';
import FilmTypes from '../models/FilmTypes';
import {setFavourites} from '../actions/actions';
import {setCurrentFilm} from '../actions/actions';
import {setIsFavourite} from '../actions/actions';
import {fetchFilms} from '../actions/actions';
import {fetchCurrentFilm} from '../actions/actions';

class FilmPage extends React.Component<any> {
  constructor(props:any) {
    super(props);
    this.addFavourite = this.addFavourite.bind(this);
    this.checkIsFavourite = this.checkIsFavourite.bind(this);
    this.getFilmsByDirector = this.getFilmsByDirector.bind(this);
  }

  componentDidMount() {
    const { match, fetchCurrentFilm } = this.props;
    this.setFavouritesFromStorage();
    fetchCurrentFilm(`/filmCard/${match.params.id}`, this.checkIsFavourite, this.getFilmsByDirector);
  }

  getFilmsByDirector(director: string) {
    const { fetchFilms } = this.props;
    fetchFilms(`/films?director=${director}`);
  }

  setFavouritesFromStorage() {
    const { setFavourites } = this.props;
    if (localStorage.favourites) {
      setFavourites(localStorage.favourites.split('&'));
    }
  }

  addFavourite() {
    const { setIsFavourite, film, isFavourite, favourites } = this.props;
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
    setIsFavourite(isFav);
    this.setFavouritesFromStorage();
  }

  checkIsFavourite() {
    const { favourites, match } = this.props;
    return favourites.includes(`${match.params.id}`);
  }

  render() {
    const { film, isFavourite, films } = this.props;

    return (
      <>
        <HeaderWrapper component={<FilmCard film={film} isFavourite={isFavourite} onClick={this.addFavourite} />} />
        <ResultsInfo text={`Films by ${film.director}`} />
        <FilmsList films={films} />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  favourites: state.films.favourites,
  films: state.films.films,
  film: state.films.currentFilm.film,
  isFavourite: state.films.currentFilm.isFavourite,
});

const mapDispatchToProps = {
  setFavourites,
  setCurrentFilm,
  setIsFavourite,
  fetchFilms,
  fetchCurrentFilm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmPage);
