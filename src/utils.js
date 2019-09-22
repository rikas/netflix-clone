import Cookies from 'js-cookie';
import movies from './movies';
import users from './users';


// Setting keys to use in cookies
const LOGGED_USER_KEY = '_cloneflix_loggedUser';
const FEATURED_VOLUME = '_cloneflix_featuredVolume';

export const loggedUser = () => {
  return Cookies.getJSON(LOGGED_USER_KEY);
}

export const logUser = (user) => {
  Cookies.set(LOGGED_USER_KEY, user, { path: '/' });
}

export const logoutUser = () => {
  Cookies.remove(LOGGED_USER_KEY, { path: '/' });
}

// The video volume goes from 0 to 1, as cookies save it into strings we have to transform into an
// integer
export const getFeaturedVolume = () => {
  const volume = Cookies.get(FEATURED_VOLUME);

  return volume ? parseInt(volume) : 1;
}

export const setFeaturedVolume = (volume) => {
  Cookies.set(FEATURED_VOLUME, volume);
}

// Get the Vimeo player for the featured movie (the big one on the top of the main page). This will
// fetch the window.Vimeo that is available since there's a <script> tag with the Vimeo library in
// the HTML.
export const getFeaturedMovie = () => {
  const featured = document.getElementById('featured-iframe');
  return new window.Vimeo.Player(featured);
}

export const getWatchedMovies = (user, type) => {
  const watched = window.localStorage.getItem(`_cloneflix_${user.id}_watched`);

  // There's a movie type provided
  if (type && watched) {
    return movies[type].filter(movie => watched.includes(movie));
  } else {
    return watched ? JSON.parse(watched) : [];
  }
}

export const addToWatchedMovies = (id) => {
  const user = loggedUser();
  const watched = getWatchedMovies(user);

  // The movie is already in the list, just return
  if (watched.lastIndexOf(id) > -1) {
    return;
  }

  watched.push(id);
  window.localStorage.setItem(`_cloneflix_${user.id}_watched`, JSON.stringify(watched));
}

export const getLastWatchedMovies = (user) => {
  const movies = window.localStorage.getItem(`_cloneflix_${user.id}_last_watched`);

  return movies ? JSON.parse(movies) : [];
}

// The idea is to have always 5 movies in the list, so before adding a new one we remove the first
// using slice.
export const addtoLastWatched = (id) => {
  addToWatchedMovies(id);
  const user = loggedUser();
  let last5 = getLastWatchedMovies(user);

  if (last5.length === 5) {
    last5 = last5.slice(1);
  }

  // The movie is already in the list, just return
  if (last5.lastIndexOf(id) > -1) {
    return;
  }

  // Add the movie id to the list.
  last5.push(id);

  window.localStorage.setItem(`_cloneflix_${user.id}_last_watched`, JSON.stringify(last5));
}

export const getPosts = (user) => {
  const posts = window.localStorage.getItem(`_cloneflix_${user.id}_posts`);

  return posts ? JSON.parse(posts) : [];
}

export const addPost = (fromUser, toUser, text) => {
  const posts = getPosts(toUser);

  posts.push({
    id: ID(),
    user: fromUser,
    text: text,
    created: new Date()
  });

  window.localStorage.setItem(`_cloneflix_${toUser.id}_posts`, JSON.stringify(posts));
}

export const getUser = (id) => {
  return users.find(user => user.id === parseInt(id));
}

// Generate a random ID, from https://gist.github.com/gordonbrander/2230317
const ID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};
