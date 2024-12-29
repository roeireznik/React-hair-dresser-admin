import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function BasicSelect({appointments, getHairDresserValue, hairdresserList}) {
   const [hairDresser, setHairDresser] = React.useState(-1);
   const handleChange = (event) => {
      setHairDresser(event.target.value);
      getHairDresserValue(event.target.value)
   };
 
   function hairDresserFilter() {
      var arr = [];
      var arr2 = [];

      appointments.map(({hairdresserID, hairdresserName}) => {
         if(arr.indexOf(hairdresserID) === -1) {
            arr.push(hairdresserID)
            arr2.push({
               hairdresserID: hairdresserID,
               hairdresserName: hairdresserName
            })
         } 
      })
      return arr2
   }

   const getFilter = hairDresserFilter()
   

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
               {getFilter.map(elm => (
                  <MenuItem key={elm.hairdresserID} value={elm.hairdresserID}>{elm.hairdresserName}</MenuItem>
               ))}
            </Select>
         </FormControl>
      </Box>
   )
}

export default BasicSelect;