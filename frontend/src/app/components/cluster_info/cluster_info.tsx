import React, { ReactNode } from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface ClusterFields {
  name: string,
  value: string,
  label: string,
  onChange: () => void
}

interface ClusterProps {
  fields: ClusterFields[]
}

function ClusterInfo(props: ClusterProps) {

  const generateFields = props.fields.map((field: ClusterFields): ReactNode => <TextField key={field.name} name={field.name} value={field.value} label={field.label} onChange={field.onChange} variant="outlined" /> as ReactNode)


  return (
    <div style={{ width: "100%", alignItems: "center", display: "flex", flexDirection: "column" }}>
      <h2>Cluster Infos</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
          {generateFields}
        </Box>
      </div>
    </div>
  );
}

export default ClusterInfo;