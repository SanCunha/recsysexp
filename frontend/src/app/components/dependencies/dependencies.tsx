import React, { ReactNode } from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Dependencies(props:any) {
    const request = ["experiment-01", "experiment-02", "experiment-03"]

    const render_checkboxes = (labels:string[]):ReactNode[] => {
        const checkboxes:ReactNode[] = []
            for (const label of labels) {
                checkboxes.push(<FormControlLabel control={<Checkbox />} label={label}/>)
            }
        return checkboxes
    }

    const render_dependencies = ():ReactNode[] => {
        const dependencies:ReactNode[] = []
        for (const experiment of request) {
            dependencies.push(
                <div style={{display:"flex", flexDirection: "column", width: "25%", border: "1px solid black", padding: "1px", alignItems: "center"}}>
                    <h3>{experiment}</h3>
                    <FormGroup>
                        {render_checkboxes(request.filter((e) => e != experiment))}
                    </FormGroup>
                </div>
            )
        }
        return dependencies
    }
  return (
    <div style={{width: "100%", alignItems: "center", display:"flex", flexDirection: "column"}}>
        <h2>Dependencies</h2>
        <div style={{display: 'flex', width: "100%", justifyContent: "center"}}>
            {/* <FormGroup>
                <FormControlLabel control={<Checkbox />} label={"label"}/>
            </FormGroup> */}
            {render_dependencies()}
        </div>
    </div>
  );
}

export default Dependencies;