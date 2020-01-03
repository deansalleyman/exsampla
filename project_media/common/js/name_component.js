import React from 'react';

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
  }
  
  const user = {
    firstName: 'Dean ',
    lastName: 'Salleyman'
  };
  
  const NameElement = () => (
    <h1>
      Hello, {formatName(user)}!
    </h1>
  );

  export default NameElement;