import React from 'react';
import { connect } from 'react-redux';

import FilmsList from '../containers/FilmsList/FilmsList';
import Searching from '../containers/Searching/Searching';
import ResultsInfo from '../containers/ResultsInfo/ResultsInfo';
import Footer from '../components/Footer/Footer';
import HeaderWrapper from '../components/HeaderWrapper/HeaderWrapper';

function SearchPage(props: any) {
  const { store } = props;
  const searchedFilms = store.films.films;
  return (
    <section>
      <HeaderWrapper component={<Searching />} />
      {searchedFilms.length ? <ResultsInfo text={`${searchedFilms.length} movies found`} /> : null}
      <FilmsList films={searchedFilms} />
      <Footer />
    </section>
  );
}

export default connect(
  (state) => ({
    store: state,
  }),
  (dispatch) => ({
    updateState: (type: any, payload: any) => {
      dispatch({ type, payload });
    },
  }),
)(SearchPage);
