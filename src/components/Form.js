import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Form = ({ saveQuestLetter }) => {
  const [search, saveSearch] = useState({ 'artist': '', 'song': '' });
  const [error, saveError] = useState(false);
  const { artist, song } = search;

  const handleChange = (e) => {
    saveSearch({
      ...search,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate all fields
    if (artist.trim === '' || song.trim() === '') {
      saveError(true);
      return;
    }

    saveError(false);

    // send to the main component
    saveQuestLetter(search);

    // clean object
    saveSearch({ 'artist': '', 'song': '' });
  }

  return (
    <div className="bg-info">
      <div className="container">
        <div className="row">
          <form
            className="col card text-while bg-transparent mb-5 pt-5 pb-2"
            onSubmit={handleSubmit}
          >
            <fieldset>
              <legend className="text-center text-white">
                Songs seeker and lyrics
              </legend>
              {error ? <p className="alert alert-primary text-center">All fields are required</p> : null}
              <div className="row text-white">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="artist">Artist</label>
                    <input
                      type="text"
                      className="form-control"
                      name="artist"
                      placeholder="Artist Name"
                      onChange={handleChange}
                      value={artist}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="song">Song</label>
                    <input
                      type="text"
                      className="form-control"
                      name="song"
                      placeholder="Write a Song"
                      onChange={handleChange}
                      value={song}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary float-right">Search Song</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

Form.propTypes = {
  saveQuestLetter: PropTypes.func.isRequired
}

export default Form;