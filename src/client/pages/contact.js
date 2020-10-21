/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // ES6
import axios from 'axios';
import moment from 'moment';
import DynamicForm from '../components/dynamicForm';
import CustomInput from '../components/customInput';
import Rain from '../images/rainTwo.gif';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faVolumeMute,
  faVolumeUp,
  faWindowClose
} from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../context/themeTextColor';

const Contact = props => {
  const sectionStyle = {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${Rain})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div id="historyScreen" style={sectionStyle}>
      <ThemeContext.Consumer>
        {themeColorId => (
          <div
            className={
              isNil(true)
                ? themeColorId === 0
                  ? 'basic-box-color-night'
                  : 'basic-box-color-sun'
                : themeColorId === 0
                ? 'read-box-color-night'
                : 'read-box-color-sun'
            }
            style={{
              width: '90%',
              height: '80%',
              //padding: '10% 7%',
              //margin: '0 auto',
              opacity: '.95',
              position: 'absolute',
              top: '10%',
              left: '5%',
              color: themeColorId === 0 ? '#e2dfdf' : 'black'
            }}
          >
            <div style={{ padding: '1% 2%' }}>
              <h3>{'Contacto'}</h3>
              <br />
              <p style={{ textAlign: 'justify', textJustify: 'inter-word', fontSize: '1.2em' }}>
                {`Para poder publicar tu anéctota o historia contactanos vía Facebook. Te recomendamos omitir o cambiar datos personales como nombres.`}
                <strong
                  style={{ color: '#fbb6b6' }}
                >{` NO RECABAMOS LAS HISTORIAS POR OTROS MEDIOS.`}</strong>
              </p>
              <br />
              <ul>
                <li>
                  Facebook:{' '}
                  <a
                    href="https://www.facebook.com/Casa-Paranormal-106726387890090"
                    target="_blank"
                  >
                    https://www.facebook.com/Casa-Paranormal
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    </div>
  );
};

Contact.propTypes = {};

Contact.defaultProps = {};

export default connect(
  null,
  null
)(Contact);
