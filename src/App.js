import './App.css';
import BasicTable from './components/table';
import BasicSelect from './components/select';
import axios from 'axios'
import React, { useState, useEffect } from 'react';

function App() {

  const [appointments, setAppointments] = useState([]);
  const [hairdresserValue, setValueHairdresser] = useState(-1)
  const [hairdresserList, setListHairdresser] = useState([])
  const [cutomerList, setCutomerList] = useState([])


  const getCustomers = async () => {
    const {data} = await axios.get('http://localhost:3001/customers')
    setCutomerList(data)
  }
  const getHairDressers = async () => {
    const {data} = await axios.get('http://localhost:3001/hairdressers')
    setListHairdresser(data)
  }

  const getAppointments = async () => {
    const {data} = await axios.get('http://localhost:3001/appointments')
    setAppointments(data);
  }

  useEffect(() => {
    getAppointments()
    getHairDressers()
    getCustomers()
  }, [])

  const getHairDresserValue = (value) => {
    setValueHairdresser(value)
  }

  return (
    <div className="App">
      <h1>Appointments Admin</h1>
      <div id="selectContainer">
        <BasicSelect 
          appointments={appointments} 
          getHairDresserValue={getHairDresserValue}
          hairdresserList={hairdresserList}
        />
      </div>
      <div id='tableContainer'>
        <BasicTable 
          appointments={appointments} 
          setAppointments={setAppointments} 
          hairdresserValue={hairdresserValue} 
          hairdresserList={hairdresserList} 
          cutomerList={cutomerList}
        />
      </div>
    </div>
  );
}

export default App;
