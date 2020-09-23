/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // ES6
import axios from 'axios';
import isNil from 'lodash/isNil';
import moment from 'moment';

const DynamicForm = props => {

  const isVisible = false;
  const array = [];
  console.time("inicio")
  for(let index = 0; index <= 1000000; index ++ ) {
    if(isVisible === false) {
        array.push(index);
    }
  }
  console.timeEnd("inicio")


  return (
    <div>
        {
            [1].map((item)=>{
                return <p>{item}</p>
            })
        }
    </div>
  );
};

DynamicForm.propTypes = {};

DynamicForm.defaultProps = {};

export default connect(
  null,
  null
)(DynamicForm);
