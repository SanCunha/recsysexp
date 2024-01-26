import React, { useEffect, useState } from 'react';
import './home.css'

import Form from '../form/form';

function HomePage() {
  return (
    <div className='main-container'>
      <div className='header'>
        <h1>RecSysExp</h1>
      </div>

      <div className='configs'>
        <Form />
      </div>
    </div>
  );
}

export default HomePage;