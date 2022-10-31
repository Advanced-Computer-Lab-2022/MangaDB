import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function AddUserToggle(props) {
  const [alignment, setAlignment] = React.useState('Admin');

  const handleChange = (event, newAlignment) => {
    
    setAlignment(newAlignment);
    {props.onChange(event)}
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      className='my-0'
    >
      <ToggleButton value="Admin" classn>Admin</ToggleButton>
      <ToggleButton value="Instructor">Instructor</ToggleButton>
      <ToggleButton value="Corporate Trainee">Corporate Trainee</ToggleButton>
    </ToggleButtonGroup>
  );
}