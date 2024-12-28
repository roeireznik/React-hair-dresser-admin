import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function BasicSelect({hairdresserList, getHairDresserValue}) {
   const [hairDresser, setHairDresser] = React.useState(-1);
   const handleChange = (event) => {
      setHairDresser(event.target.value);
      getHairDresserValue(event.target.value)
   };
 
   return(
      <Box sx={{ minWidth: 120 }}>
         <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Hairdresser</InputLabel>
            <Select
               value={hairDresser}
               label="Hairdresser"
               onChange={handleChange}
            >
               <MenuItem key={-1} value={-1}>All</MenuItem>
               {hairdresserList.map(elm => (
                  <MenuItem key={elm.hairdresserId} value={elm.hairdresserId}>{elm.hairdresserName}</MenuItem>
               ))}
            </Select>
         </FormControl>
      </Box>
   )
}

export default BasicSelect;