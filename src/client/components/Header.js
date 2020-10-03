/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sound2 from '../sounds/Recording_136.m4a';
import Sound3 from '../sounds/Recording_137.m4a';
import Sound4 from '../sounds/Recording_139.m4a';
import Sound5 from '../sounds/Recording_141.m4a';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faVolumeMute,
  faVolumeUp,
  faPalette,
  faSun,
  faMoon
} from '@fortawesome/free-solid-svg-icons';

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
          onClick={() => {
            props.onClickThemeText();
          }}
        >
          <FontAwesomeIcon icon={props.themeTextColor === 0 ? faMoon : faSun} />
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
  let SoundObject2 = new Audio(Sound2);
  let SoundObject3 = new Audio(Sound3);
  let SoundObject4 = new Audio(Sound4);
  let SoundObject5 = new Audio(Sound5);

  useEffect(() => {
    //SoundObject.play();
    setTimeout(() => {
      SoundObject4.play();
      setTimeout(() => {
        SoundObject5.play();
        setTimeout(() => {
          SoundObject3.play();
          setTimeout(() => {
            SoundObject2.play();
          }, 40000);
        }, 63000);
      }, 40000);
    }, 15000);
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
          alert(1);
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
