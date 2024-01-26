import React from 'react';
import './configs.css'

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Configs() {
  return (
    <div className='main-config'>
        <h4>Parameter</h4>
        <div style={{display: 'flex', flexDirection:'column'}}>
        <FormGroup>
            <FormControlLabel control={<Checkbox/>} label="Config 01" />
            <FormControlLabel control={<Checkbox/>} label="Config 02" />
            <FormControlLabel control={<Checkbox/>} label="Config 03" />
            <FormControlLabel control={<Checkbox/>} label="Config 04" />
        </FormGroup>
        </div>
    </div>
  );
}

export default Configs;