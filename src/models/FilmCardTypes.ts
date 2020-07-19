import FilmTypes from './FilmTypes';

export default
interface FilmCardTypes extends FilmTypes {
  caption: string,
  duration: number,
  description: string,
  cast: string
}
