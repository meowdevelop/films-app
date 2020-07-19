import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import SearchPage from './pages/SearchPage';
import FilmPage from './pages/FilmPage';
import FavouritesPage from './pages/FavouritesPage';

function App(props: {store: any}) {
  const { store } = props;
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route path="/favourites" component={FavouritesPage} />
          <Route path="/film/:id" component={FilmPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
