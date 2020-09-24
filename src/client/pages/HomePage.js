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
/*
setInterval(()=>{
  console.log("dedededed", window.performance.memory.totalJSHeapSize)
  }, 1000)
  */
const HomePage = props => {
  useEffect(() => {}, []);

  const [searchValue, setSearchValue] = useState('');

  const [historiesArray, setHistoriesArray] = useState([
    {
      id: '001',
      title:'Anécdota en el metro cdmx 1',
      description: 'Gracias Tacu!! Te cuento que ví uno de tus videos sobre...',
      byUser: 'anonimous',
    },
    {
      id: '002',
      title:'Anécdota en el metro cdmx 1',
      description: 'Gracias Tacu!! Te cuento que ví uno de tus videos sobre...',
      byUser: 'anonimous',
    },
    {
      id: '003',
      title:'Anécdota en el metro cdmx 1',
      description: 'Gracias Tacu!! Te cuento que ví uno de tus videos sobre...',
      byUser: 'anonimous',
    },
    {
      id: '004',
      title:'Anécdota en el metro cdmx 1',
      description: 'Gracias Tacu!! Te cuento que ví uno de tus videos sobre...',
      byUser: 'anonimous',
    },
    {
      id: '005',
      title:'Anécdota en el metro cdmx 1',
      description: 'Gracias Tacu!! Te cuento que ví uno de tus videos sobre...',
      byUser: 'anonimous',
    },
  ]);

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
      <div
        style={{
          width: '90%',
          height: '80%',
          //padding: '10% 7%',
          backgroundColor: 'black',
          //margin: '0 auto',
          opacity: '.9',
          position: 'absolute',
          top: '10%',
          left: '5%'
        }}
      >
        <div style={{ padding: '1% 2%', display:'flex', flexDirection:'row' }}>
          <div style={{ padding: '0 2%' }}>
            <CustomInput
              id="uno"
              value={searchValue}
              placeholder="Buscar 1"
              onChange={(event, value) => {
                setSearchValue(value);
              }}
              onBlur={() => {}}
            />
          </div>
          {/*<div style={{ padding: '0 2%' }}>
            <CustomInput
              id="dos"
              value={searchValue}
              placeholder="Buscar 2"
              onChange={(event, value) => {
                setSearchValue(value);
              }}
              onBlur={() => {}}
            />
          </div>
          <div style={{ padding: '0 2%' }}>
            <CustomInput
              id="tres"
              value={searchValue}
              placeholder="Buscar 3"
              onChange={(event, value) => {
                setSearchValue(value);
              }}
              onBlur={() => {}}
            />
          </div>
          */}
        </div>
        <div style={{ padding: '1% 2%', width: '100%' }}>
        {
          isNil(historiesArray) === false && isEmpty(historiesArray) === false && historiesArray.map((item)=>{
            return (
              <div style={{display:'inline-block', padding: '0 2%', margin: '0 5px', color: "white", width: '25%', minWidth:'150px' }}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <hr></hr>
              </div>
            )
          })
        }
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default connect(
  null,
  null
)(HomePage);
