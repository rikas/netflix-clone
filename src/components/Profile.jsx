import React, { Component, Fragment } from 'react';
import NavBar from './NavBar';
import '../stylesheets/profile.css';
import MovieList from './MovieList'
import { getLastWatchedMovies, getWatchedMovies, loggedUser, getUser } from '../utils';
import { Link } from 'react-router-dom';
import PostList from './PostList';

class Profile extends Component {
  componentDidMount() {
    // Scroll to top when mounting this component
    window.scrollTo(0, 0);
  }

  render() {
    // Get the user id from the URL. react-router sends this via this.props.match.params.
    const { id } = this.props.match.params
    const user = id ? getUser(id) : loggedUser();

    return (
      <div>
        <NavBar />

        <div className="profile">
          <h2 className="section-title">Last watched movies</h2>
          {getLastWatchedMovies(user).length > 0 ?
            <MovieList ids={getLastWatchedMovies(user).reverse()} /> :
            <p className="profile-list-placeholder ml-4">
              Still didn't watch any movie on Cloneflix! What are you waiting for? Go and <Link to="/">watch your favorite movies</Link> right now!
            </p>
          }

          {getLastWatchedMovies(user).length > 0 && <h1 className="top-genres-title">TOP WATCHED GENRES</h1>}

          {getWatchedMovies(user, 'heroes').length > 0 &&
            <Fragment>
              <h2 className="section-title">Heroes</h2>
              <MovieList ids={getWatchedMovies(user, 'heroes')} />
            </Fragment>
          }

          {getWatchedMovies(user, 'drama').length > 0 &&
            <Fragment>
              <h2 className="section-title">Drama</h2>
              <MovieList ids={getWatchedMovies(user, 'drama')} />
            </Fragment>
          }

          {getWatchedMovies(user, 'epic').length > 0 &&
            <Fragment>
              <h2 className="section-title">Epic</h2>
              <MovieList ids={getWatchedMovies(user, 'epic')} />
            </Fragment>
          }

          <PostList user={user} />
        </div>
      </div>
    );
  }
}

export default Profile;
