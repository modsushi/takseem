import React from 'react';
import Map from './components/Map';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
       <h1 className='urdu'>تقسیم</h1>
      </header> */}
      <div className='logo'>
        <h1 className='urdu'>تقسیم</h1>
        <Button variant="contained" color="primary" className='urdu'>
        اپنی تقسیم اناج شامل کریں
        </Button>
      </div>
      <div className='searchbar'>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={['Lahore', 'Gujranwala', 'Islamabad', 'Karachi', 'Faisalabad', 'Rawalpindi', 'Gilgit', 'Gujrat']}
        renderInput={(params) => (
          <TextField {...params} label="علاقہ" className='searchinput'  color="primary" variant='outlined' fullWidth
          /> 
        )}
      />
      </div>
      <Map/>
    </div>
  );
}

export default App;
