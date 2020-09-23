/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
const CustomInput = props => {
const {
    value,
    onChange,
    onBlur,
    placeholder,
    id,
} = props;
  return (
    <div className="form__group field">
      <input
        id={id}
        type="input"
        className="form__field"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        autoComplete="false"
        onChange={(event)=>{
            onChange(event, event.target.value);
        }}
        onBlur={(event)=>{
            onBlur(event, event.target.value);
        }}
      />
      <label onClick={()=>{
          document.getElementById(id).focus();
      }} for="name" className="form__label">
        {placeholder}
      </label>
    </div>
  );
};

export default CustomInput;
