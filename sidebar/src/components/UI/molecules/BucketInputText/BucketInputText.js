import React from 'react';
import InputText from '../../atoms/InputText/InputText';

const BucketInputText = ({ style, label, changeInputText, value }) => {
  return (
    <InputText
      style={style}
      variant="outlined"
      label={label}
      value={value}
      onChangeHandler={changeInputText}
    />
  );
};

export default BucketInputText;
