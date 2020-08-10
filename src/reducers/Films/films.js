import {SET_SEARCH_VALUE} from '../../models/actionTypes';
import {SET_SEARCH_FILTER} from '../../models/actionTypes';
import {SET_SORT_TYPE} from '../../models/actionTypes';
import {SET_FILMS} from '../../models/actionTypes';
import {SET_FAVOURITES} from '../../models/actionTypes';
import {SET_CURRENT_FILM} from '../../models/actionTypes';
import {SET_IS_FAVOURITE} from '../../models/actionTypes';

const initialState = {
  searchValue: '',
  searchFilter: 'name',
  sortType: 'year',
  films: [],
  favourites: [],
  currentFilm: {
    film: {},
    isFavourite: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: payload,
      };
    case SET_SEARCH_FILTER:
      return {
        ...state,
        searchFilter: payload,
      };
    case SET_SORT_TYPE:
      return {
        ...state,
        sortType: payload,
        films: state.films.sort((a, b) => (b[payload] > a[payload] ? 1 : -1)),
      };
    case SET_FILMS:
      const filmsWithFavourites = payload.map((item) => {
        if (state.favourites.includes(`${item.id}`)) return { ...item, isFav: true };
        return { ...item, isFav: false };
      });
      return {
        ...state,
        films: filmsWithFavourites.sort((a, b) => (b[state.sortType] > a[state.sortType] ? 1 : -1)),
      };
    case SET_FAVOURITES:
      return {
        ...state,
        favourites: payload,
      };
    case SET_CURRENT_FILM:
      return {
        ...state,
        currentFilm: payload,
      };
    case SET_IS_FAVOURITE:
      return {
        ...state,
        currentFilm: {
          film: state.currentFilm.film,
          isFavourite: payload,
        },
      };


    default:
      return state;
  }
};

