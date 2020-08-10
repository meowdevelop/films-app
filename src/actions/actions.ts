import {SET_SEARCH_VALUE} from '../models/actionTypes';
import {SET_SEARCH_FILTER} from '../models/actionTypes';
import {SET_SORT_TYPE} from '../models/actionTypes';
import {SET_FILMS} from '../models/actionTypes';
import {SET_FAVOURITES} from '../models/actionTypes';
import {SET_CURRENT_FILM} from '../models/actionTypes';
import {SET_IS_FAVOURITE} from '../models/actionTypes';

export function setSearchValue(value: string) {
    return {
        type: SET_SEARCH_VALUE,
        payload: value
    }
}

export function setSearchFilter(filterType: string) {
    return {
        type: SET_SEARCH_FILTER,
        payload: filterType
    }
}

export function setSortType(sortType: string) {
    return {
        type: SET_SORT_TYPE,
        payload: sortType
    }
}

export function setFilms(films: any) {
    return {
        type: SET_FILMS,
        payload: films
    }
}

export function setFavourites(favourites: any) {
    return {
        type: SET_FAVOURITES,
        payload: favourites
    }
}

export function setCurrentFilm(film: any) {
    return {
        type: SET_CURRENT_FILM,
        payload: film
    }
}

export function setIsFavourite(isFavourite: boolean) {
    return {
        type: SET_IS_FAVOURITE,
        payload: isFavourite
    }
}

export function fetchFilms(url: string) {
    return async (dispatch: (arg: { type: string; payload: any; }) => void) => {
        fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error('Ответ сети не ok');
          return response.json();
        })
        .then((data) => {
          dispatch({
            type: SET_FILMS,
            payload: data
        })
        })
        .catch((error) => console.log(error.message));
    }
}

export function fetchCurrentFilm(url: string, checkIsFavourite: any, getFilmsByDirector: any) {
    return async (dispatch: (arg: { type: string; payload: any; }) => void) => {
        fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error('Ответ сети не ok');
          return response.json();
        })
        .then((data) => {
          dispatch({
            type: SET_CURRENT_FILM,
            payload: { film: data, isFavourite: checkIsFavourite() }
        });
        getFilmsByDirector(data.director);
        })
        .catch((error) => console.log(error.message));
    }
}