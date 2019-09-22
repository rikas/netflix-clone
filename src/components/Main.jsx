import React, { Component } from 'react';
import NavBar from './NavBar';
import MovieList from './MovieList';
import '../stylesheets/main.css';
import Avatar from './Avatar';
import users from '../users';
import { getFeaturedVolume, setFeaturedVolume, getFeaturedMovie } from '../utils';
import movies from '../movies';
import MovieModal from './MovieModal';
import { Link } from 'react-router-dom';

const MIN_SCROLL_TO_PLAY_FEATURED = 250;

class Main extends Component {
  state = {
    featuredVolume: 1
  }

  componentDidMount() {
    const player = getFeaturedMovie();
    const volume = getFeaturedVolume();

    player.setVolume(volume);
    this.setState({ featuredVolume: volume });
    player.play();

    // Scroll to top when mounting this component
    window.scrollTo(0, 0);

    document.addEventListener('scroll', this.playPauseVideoOnScroll);
  }

  // When unmounting we need to remove the scroll listener
  componentWillUnmount() {
    document.removeEventListener('scroll', this.playPauseVideoOnScroll);
  }

  playPauseVideoOnScroll = () => {
    if (window.scrollY < MIN_SCROLL_TO_PLAY_FEATURED) {
      this.playFeatured();
    } else {
      this.pauseFeatured();
    }
  }

  toggleFeatureSound = () => {
    const player = getFeaturedMovie();
    const newVolume = this.state.featuredVolume === 1 ? 0 : 1;

    this.setState({ featuredVolume: newVolume });

    player.setVolume(newVolume);
    setFeaturedVolume(newVolume);
  }

  pauseFeatured = () => {
    const player = getFeaturedMovie();
    player.pause();
  }

  playFeatured = () => {
    // Close the featured movie is it's open.
    this.setState({ watchNowOpen: false });

    // If the user has scrolled more than the MIN_SCROLL_TO_PLAY_FEATURED we don't want to play the
    // movie, otherwise play it.
    if (window.scrollY < MIN_SCROLL_TO_PLAY_FEATURED) {
      const player = getFeaturedMovie();
      player.play();
    }
  }

  // Handle the "watch now" button click. We set the state and pause the featured video.
  handleWatchNow = () => {
    this.setState({ watchNowOpen: true });
    this.pauseFeatured();
  }

  render() {
    const { featuredVolume, watchNowOpen } = this.state;

    return (
      <div>
        <NavBar />

        <div className="main">
          <div className="featured-info">
            <h2 className="section-title">The Lord of the Rings: The Fellowship of the Ring</h2>
            <p className="featured-description ml-4">A meek Hobbit from the Shire and eight companions set out on a journey to destroy
              the powerful One Ring and save Middle-earth from the Dark Lord Sauron.</p>

            <button className="btn btn-dark ml-4" onClick={this.handleWatchNow}>
              <i className="fas fa-play mr-2"></i> Watch now
            </button>
          </div>

          <div className="movie-banner">
            <div className="vimeo-wrapper">
              <iframe
                src="https://player.vimeo.com/video/191876783?background=1&autoplay=0&loop=1&byline=0&title=0"
                id="featured-iframe"
                allow="autoplay; fullscreen"
                title="Featured movie"
                frameBorder="0"
                allowFullScreen></iframe>
            </div>
          </div>

          {watchNowOpen && <MovieModal id="V75dMMIW2B4" open={watchNowOpen} onClose={this.playFeatured} />}

          <button className="featured-volume" onClick={this.toggleFeatureSound}>
            {featuredVolume === 1 ?
              <i className="fa fa-volume-up"></i> :
              <i className="fa fa-volume-mute"></i>
            }
          </button>

          <h2 className="section-title">Popular on Cloneflix</h2>
          <MovieList ids={movies.popular} onOpen={this.pauseFeatured} onClose={this.playFeatured} />

          <h2 className="section-title">All Movies</h2>
          <MovieList ids={movies.all} onOpen={this.pauseFeatured} onClose={this.playFeatured} />

          <h2 className="section-title">Top movies watched in Portugal</h2>
          <MovieList ids={movies.topPortugal} onOpen={this.pauseFeatured} onClose={this.playFeatured} />

          <h1 className="top-genres-title">TOP GENRES</h1>
          <h3 className="first-genre-title">Epic</h3>
          <MovieList ids={movies.epic} onOpen={this.pauseFeatured} onClose={this.playFeatured} />

          <h2 className="section-title">Drama</h2>
          <MovieList ids={movies.drama} onOpen={this.pauseFeatured} onClose={this.playFeatured} />

          <h2 className="section-title">Heroes</h2>
          <MovieList ids={movies.heroes} onOpen={this.pauseFeatured} onClose={this.playFeatured} />

          <h2 className="section-title">Top users watching movies</h2>
          {users.map(user => {
            return(
              <span className="top-user" key={user.id}>
                <Link to={`/profile/${user.id}`}>
                  <Avatar user={user} /> {user.firstName} {user.lastName}
                </Link>
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Main;
