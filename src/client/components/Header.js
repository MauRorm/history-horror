/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sound from '../sounds/trackOne.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faVolumeMute, faVolumeUp, faPalette } from '@fortawesome/free-solid-svg-icons';

const Header = props => {
  const [isActivateAudio, setIsActivateAudio] = useState(false);

  return (
    <div
      id="header"
      style={{
        height: '50px',
        width: '100%',
        backgroundColor: 'rgb(125 23 86)',
        top: 0,
        position: 'fixed',
        zIndex: '1'
      }}
    >
      <div title="Cambiar colores" style={{ position: 'absolute', right: '60px', top: '5px' }}>
        <div
          style={{
            backgroundColor: 'rgb(95 40 130)',
            color: 'white',
            borderRadius: '4px',
            padding: '10px'
          }}
          onClick={() => {}}
        >
          <FontAwesomeIcon icon={faPalette} />
        </div>
      </div>

      <div title="Desactivar audio" style={{ position: 'absolute', right: '8px', top: '5px' }}>
        {isActivateAudio ? (
          <BackgroundAudioComponent
            isActivateAudio={isActivateAudio}
            onclickPlayer={() => {
              if (isActivateAudio) {
                setIsActivateAudio(false);
              } else {
                setIsActivateAudio(true);
              }
            }}
          />
        ) : (
          <div
            style={{
              backgroundColor: 'rgb(95 40 130)',
              color: 'white',
              borderRadius: '4px',
              padding: '10px'
            }}
            onClick={() => {
              if (isActivateAudio) {
                setIsActivateAudio(false);
              } else {
                setIsActivateAudio(true);
              }
            }}
          >
            {isActivateAudio ? (
              <FontAwesomeIcon icon={faVolumeMute} />
            ) : (
              <FontAwesomeIcon icon={faVolumeUp} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const BackgroundAudioComponent = props => {
  const { isActivateAudio, onclickPlayer } = props;
  let SoundObject = new Audio(Sound);

  useEffect(() => {
    SoundObject.play();
  }, []);

  return (
    <div
      id="track"
      style={{
        backgroundColor: 'rgb(95 40 130)',
        color: 'white',
        borderRadius: '4px',
        padding: '10px'
      }}
      onClick={() => {
        onclickPlayer();
        if (isActivateAudio) {
          SoundObject.pause();
          SoundObject.currentTime = 0;
          //SoundObject = null;
        } else {
        }
      }}
    >
      {isActivateAudio ? (
        <FontAwesomeIcon icon={faVolumeMute} />
      ) : (
        <FontAwesomeIcon icon={faVolumeUp} />
      )}
    </div>
  );
};

export default Header;
