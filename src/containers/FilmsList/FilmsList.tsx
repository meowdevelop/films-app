import React from 'react';
import { connect } from 'react-redux';

import styles from './FilmsList.module.scss';
import stylesPage from '../../scss/Page.module.scss';
import Film from '../../components/Film/Film';
import EmptyResults from '../../components/EmptyResults/EmptyResults';
import FilmTypes from '../../models/FilmTypes';

const FilmsList = (props: {films: FilmTypes[]}) => {
  const { films } = props;
  return (
    <div className={stylesPage.container}>
      <ul className={styles.filmsList}>
        {films.length
          ? films.map((item:FilmTypes) => <Film key={item.id} film={item} />)
          : <EmptyResults />}
      </ul>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  store: state
});

export default connect(
  mapStateToProps
)(FilmsList);

