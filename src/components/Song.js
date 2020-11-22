import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Song = ({ song }) => (
  <Fragment>
    <h2>Song Lyric</h2>
    <p className="letra">{song}</p>
  </Fragment>
);

Song.propTypes = {
  song: PropTypes.string.isRequired
}

export default Song;