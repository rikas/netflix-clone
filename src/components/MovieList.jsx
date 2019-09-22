import React, { Component } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MoviePreview from './MoviePreview';
import MovieModal from './MovieModal';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

class MovieList extends Component {
  state = {
    modalOpen: false,
    modalMovie: null
  }

  handleSelect = (id) => {
    const { onOpen } = this.props;

    this.setState({ modalOpen: true, modalMovie: id });

    if (onOpen) {
      onOpen();
    }
  }

  handleModalClose = () => {
    const { onClose } = this.props;

    this.setState({ modalOpen: false });

    if (onClose) {
      onClose();
    }
  }

  render() {
    const { ids } = this.props;
    const { modalOpen, modalMovie } = this.state;

    return(
      <div className="movie-list-wrapper">
        <Carousel responsive={responsive}>
          {ids.map(id => <MoviePreview id={id} key={id} onSelect={this.handleSelect} />)}
        </Carousel>

        <MovieModal open={modalOpen} id={modalMovie} onClose={this.handleModalClose} />
      </div>
    )
  }
}

export default MovieList;
