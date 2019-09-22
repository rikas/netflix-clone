import React from 'react';
import YouTube from 'react-youtube';
import '../stylesheets/movie_modal.css';

const HEIGHT = '390';
const WIDTH = '640';

const VIDEO_OPTIONS = {
  height: HEIGHT,
  width: WIDTH,
  playerVars: {
    autoplay: 1,
    modestbranding: 1
  }
};

const MovieModal = ({ id, open, onClose, width, height }) => {
  const showModal = open || false;

  const modalStyle = {
    display: showModal ? 'block' : 'none'
  }

  return (
    <div className="movie-modal" style={modalStyle} onClick={onClose}>
      <div className="movie-modal-content">
        <div className="movie-container" style={{width: `${WIDTH}px`, height: `${HEIGHT}px`}}>
          {showModal && <YouTube videoId={id} opts={VIDEO_OPTIONS} width={width} height={height} />}
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
