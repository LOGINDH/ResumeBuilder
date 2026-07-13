import React from 'react';
import Input from './Input';

const PasswordInput = (props: any) => {
  return (
    <Input
      secureTextEntry
      {...props}
    />
  );
};

export default PasswordInput;