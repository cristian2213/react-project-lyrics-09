import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

// components
import Form from './components/Form';
import Song from './components/Song';
import Info from './components/Info';

function App() {
  // define state
  const [questLetter, saveQuestLetter] = useState({});
  // results api
  const [letterResult, saveLetterResult] = useState('');
  const [artistInfo, saveArtistInfo] = useState({});

  // using useEffect to do a request to the api
  useEffect(() => {
    if (Object.keys(questLetter).length === 0) return;

    const consultApiLetter = async () => {
      const { artist, song } = questLetter;

      const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;

      try {
        const [resultApiLyric, informationApi2] = await Promise.all([axios(url), axios(url2)]);

        saveLetterResult(resultApiLyric.data.lyrics);
        saveArtistInfo(informationApi2.data.artists[0]);

      } catch (error) {
        console.log(error);
      }
    }
    consultApiLetter();
  }, [questLetter]);

  const component = !letterResult ? null : <Song song={letterResult} />

  return (
    <Fragment>
      <Form
        saveQuestLetter={saveQuestLetter}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            {component}
          </div>
          <div className="col-md-6">
            <Info artistInfo={artistInfo} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
