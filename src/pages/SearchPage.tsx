import React from 'react';
import { connect } from 'react-redux';

import FilmsList from '../containers/FilmsList/FilmsList';
import Searching from '../containers/Searching/Searching';
import ResultsInfo from '../containers/ResultsInfo/ResultsInfo';
import Footer from '../components/Footer/Footer';
import HeaderWrapper from '../components/HeaderWrapper/HeaderWrapper';

const SearchPage = ({searchedFilms}: any) => {
  return (
    <section>
      <HeaderWrapper component={<Searching />} />
      {searchedFilms.length ? <ResultsInfo text={`${searchedFilms.length} movies found`} /> : null}
      <FilmsList films={searchedFilms} />
      <Footer />
    </section>
  );
}

const mapStateToProps = (state: any) => ({
    searchedFilms: state.films.films
  });

export default connect(
  mapStateToProps,
  null
)(SearchPage);
