import {useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box, Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

function BasicTable({appointments, setAppointments, hairdresserValue, hairdresserList, cutomerList}) {
  const [addValues, setAddValues] = useState([{
    start: '',
    end: '',
    customerID: '',
    hairdresserID: ''
  }]);


  const handleDelete = (id, index) => {
    var all = [...appointments];

    axios.delete(`http://localhost:3001/appointments/delete/${id}`)
    .then(response => {
      if(response.data.status === 'deleted') {
        all.splice(index, 1);
        setAppointments(all);
      }
    })
  }

  function formSwal(action, index) {
    return <>
              <Box
                  component="form"
                  sx={{ '& > :not(style)': { m: 1, width: '35ch' } }}
                  noValidate
                  autoComplete="off"
                >
                <FormControl fullWidth >
                  <div className='selectForm'>
                    {action === 'add' 
                      ? <input type='datetime-local' id="swal-input1"/> 
                      : <input type='datetime-local' defaultValue={dayjs(appointments[index].start).format('YYYY-MM-DDTHH:mm')} id="swal-input1" /> 
                    }
                    
                  </div>
                </FormControl>
                <FormControl fullWidth>
                  <div className='selectForm'>
                    {action === 'add' 
                      ? <input type='datetime-local' id="swal-input2" /> 
                      : <input type='datetime-local' defaultValue={dayjs(appointments[index].end).format('YYYY-MM-DDTHH:mm')} id="swal-input2" /> 
                    }
                  </div>
                </FormControl>

                <FormControl fullWidth>
                    <select defaultValue={action === 'add' ? "Select Hairdresser" : appointments[index].hairdresserID} className='selectForm' id="swal-input3">
                      <option>Select Hairdresser</option>
                      {hairdresserList.map(elm => (
                        <option key={elm.hairdresserId} value={elm.hairdresserId}>{elm.hairdresserName}</option>
                      ))}
                    </select>
                </FormControl>

                <FormControl fullWidth>
                    <select defaultValue={action === 'add' ? "Select Hairdresser" : appointments[index].customerID} className='selectForm' id="swal-input4">
                    <option>Select Customer</option>
                    {cutomerList.map(elm => (
                      <option key={elm.customerId} value={elm.customerId}>{elm.customerName}</option>
                    ))}
                  </select>
                </FormControl>
              </Box>
            </>
  }

  const handleAddEdit =  async (action, index) => {
    var title;
    if(action === 'add') {
      title = "Add new appointment"
    }else {
      title = "Edit new appointment"
    }
    const { value: formValues } = await withReactContent(Swal).fire({
      title: title,
      showCancelButton: true,
      confirmButtonText: 'Add' ,
      html: formSwal(action, index),
      preConfirm: () => {
        return [{   
          start: dayjs(document.getElementById('swal-input1').value).format("YYYY/MM/DD HH:mm"),
          end: dayjs(document.getElementById('swal-input2').value).format("YYYY/MM/DD HH:mm"),
          hairdresserID: document.getElementById('swal-input3').value,
          customerID: document.getElementById('swal-input4').value
        }]
      }
    })

    if (formValues) {
        if(action === 'add') {
          axios.post(`http://localhost:3001/appointments/add`,formValues[0])
          .then(response => {
            if(response.data.status === 'added') {
              var add = [...appointments];
              formValues[0]["id"] = response.data.id
              add.push(formValues[0]);
              setAppointments(add);
            }
          })
        }else {
          console.log(formValues[0])
          axios.put(`http://localhost:3001/appointments/edit`,[formValues[0], action])
          .then(response => {
            if(response.data.status === 'edited') {
              var add = [...appointments];
              formValues[0]["id"] = add[index].id;
              add[index] = formValues[0];
              setAppointments(add);
            }
          })
        }
        
    }
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="30%" align="center">Appointment Time</TableCell>
            <TableCell width="30%" align="center">Customer</TableCell>
            <TableCell colSpan={2} width="40%" align="center" >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment, index) => {
            if(hairdresserValue === appointment.hairdresserID) {
               return <TableRow key={appointment.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{appointment.start}</TableCell>
                        <TableCell align="center">{appointment.customerID}</TableCell>
                        <TableCell align="center"><DeleteIcon onClick={() => handleDelete(appointment.id, index)} /></TableCell>
                        <TableCell align="center"><EditIcon/></TableCell>
                      </TableRow>
            }
            if(hairdresserValue === -1) {
              return <TableRow key={appointment.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{ dayjs(appointment.start).format("YYYY/MM/DD HH:mm")}</TableCell>
                        <TableCell align="center">{appointment.customerID}</TableCell>
                        <TableCell align="center"><DeleteIcon onClick={() => handleDelete(appointment.id, index)} /></TableCell>
                        <TableCell align="center"><EditIcon onClick={ () => handleAddEdit(appointment.id,index)} /></TableCell>
                      </TableRow>
            }
              
          })}
        </TableBody>
      </Table>
    </TableContainer>
    <div id='addNewAppointment'>
      <Button onClick={ () => handleAddEdit('add')} variant="contained">New appointment</Button>
    </div>
    </>
  );
}
export default BasicTable;
