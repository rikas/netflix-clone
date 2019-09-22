
import React, { Component } from 'react';
import '../stylesheets/movie.css';
import { addtoLastWatched } from '../utils';

// The image preview of a movie
class MoviePreview extends Component {
  handleClick = () => {
    const { onSelect, id } = this.props;

    addtoLastWatched(id)
    onSelect(id);
  }

  render() {
    const { id } = this.props;

    return (
      <img className="movie-image" src={`/movies/${id}.png`} alt={id} onClick={this.handleClick} />
    );
  }
}

export default MoviePreview;
