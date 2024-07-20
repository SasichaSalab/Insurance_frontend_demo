import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, useTheme
} from '@mui/material';
import axios from 'axios';
import { Add } from '@mui/icons-material';

// Options for the periods
const periodsOptions = [
  '1 Month',
  '3 Months',
  '6 Months',
  '1 Year',
  // Add more periods as needed
];
const parentIdOptions = [
  '1', '2', '3',
  // Add more periods as needed
];

const Calculator = ({ onSubmit, onClose }) => {
  const [calculation, setCalculation] = useState('');

  const handleButtonClick = (value) => {
    setCalculation(prev => prev + value);
  };

  const handleClear = () => {
    setCalculation('');
  };

  const handleChange = (event) => {
    setCalculation(event.target.value);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Enter Calculation</DialogTitle>
      <DialogContent>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            value={calculation}
            onChange={handleChange}
            placeholder="Type your calculation here"
            InputProps={{
              endAdornment: (
                <Button onClick={handleClear}>Clear</Button>
              )
            }}
          />
          <div className='grid grid-cols-4 gap-2 mt-2'>
            <Button onClick={() => handleButtonClick('(')}>(</Button>
            <Button onClick={() => handleButtonClick(')')}>)</Button>
            <Button onClick={() => handleButtonClick('+')}>+</Button>
            <Button onClick={() => handleButtonClick('-')}>-</Button>
            <Button onClick={() => handleButtonClick('*')}>*</Button>
            <Button onClick={() => handleButtonClick('/')}>/</Button>
            <Button onClick={() => handleButtonClick('%')}>%</Button>
            <Button onClick={() => handleButtonClick('Insured Sum')}>Insured Sum</Button>
            <Button onClick={() => handleButtonClick('Savings')}>Savings</Button>
            <Button onClick={() => handleButtonClick('0')}>0</Button>
            <Button onClick={() => handleButtonClick('1')}>1</Button>
            <Button onClick={() => handleButtonClick('2')}>2</Button>
            <Button onClick={() => handleButtonClick('3')}>3</Button>
            <Button onClick={() => handleButtonClick('4')}>4</Button>
            <Button onClick={() => handleButtonClick('5')}>5</Button>
            <Button onClick={() => handleButtonClick('6')}>6</Button>
            <Button onClick={() => handleButtonClick('7')}>7</Button>
            <Button onClick={() => handleButtonClick('8')}>8</Button>
            <Button onClick={() => handleButtonClick('9')}>9</Button>
            <Button onClick={handleClear}>C</Button>
            <Button onClick={() => handleButtonClick('.')}>.</Button>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onSubmit(calculation)} color='primary'>Submit</Button>
        <Button onClick={onClose} color='secondary'>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

const AddInsurance = () => {
  const theme = useTheme();
  const [insurance, setInsurance] = useState({
    name: '',
    periods: [], // Array for multi-select
    parentId: ''
  });

  const [protect, setProtect] = useState([{ id: 1, name: '' }]);
  const [protectDetails, setProtectDetails] = useState([{ id: 1, name: '', calculate: '', max_age: '', min_age: '', note: '', protectId: 1 }]);
  const [saved, setSaved] = useState([{ id: 1, name: '' }]);
  const [savedDetails, setSavedDetails] = useState([{ id: 1, name: '', calculate: '', max_year: '', min_year: '', note: '', savedId: 1 }]);

  const [openCalculator, setOpenCalculator] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(null);

  const handleChange = (e, setter, index) => {
    const { name, value } = e.target;
    setter(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const handleMultiSelectChange = (event) => {
    setInsurance(prev => ({ ...prev, periods: event.target.value }));
  };
  const handleParentSelectChange = (event) => {
    const newValue = event.target.value;
  
    setInsurance(prevInsurance => ({
      ...prevInsurance, // Spread the previous state to keep other properties
      parentId: newValue // Update only the parentId field
    }));
  };
  const handleNameChange = (event) => {
    const newValue = event.target.value;
  
    setInsurance(prevInsurance => ({
      ...prevInsurance, // Spread the previous state to keep other properties
      name: newValue // Update only the parentId field
    }));
  };


  const handleAddEntry = (setter, template) => {
    setter(prev => [...prev, { id: prev.length + 1, ...template }]);
  };

  const handleSubmit = async () => {
    try {
      const insuranceResponse = await axios.post('/api/insurance', insurance);
      const insuranceId = insuranceResponse.data._id;

      for (const p of protect) {
        const protectResponse = await axios.post('/api/protect', { ...p, insuranceId });
        const protectId = protectResponse.data._id;

        for (const pd of protectDetails) {
          if (pd.protectId === p.id) {
            await axios.post('/api/protectDetails', { ...pd, protectId });
          }
        }
      }

      for (const s of saved) {
        const savedResponse = await axios.post('/api/saved', { ...s, insuranceId });
        const savedId = savedResponse.data._id;

        for (const sd of savedDetails) {
          if (sd.savedId === s.id) {
            await axios.post('/api/savedDetails', { ...sd, savedId });
          }
        }
      }

      alert('Insurance created successfully!');
    } catch (error) {
      console.error(error);
      alert('Error creating insurance');
    }
  };

  const handleCalculateClick = (detailType, index) => {
    setCurrentDetail({ detailType, index });
    setOpenCalculator(true);
  };

  const handleCalculatorSubmit = (calculation) => {
    if (currentDetail) {
      const { detailType, index } = currentDetail;
      if (detailType === 'protect') {
        setProtectDetails(prev => {
          const updated = [...prev];
          updated[index] = { ...updated[index], calculate: calculation };
          return updated;
        });
      } else if (detailType === 'saved') {
        setSavedDetails(prev => {
          const updated = [...prev];
          updated[index] = { ...updated[index], calculate: calculation };
          return updated;
        });
      }
    }
    setOpenCalculator(false);
  };

  const handleCloseCalculator = () => {
    setOpenCalculator(false);
  };
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    // Handle file upload logic here
    // e.g., sending the file to a server or storing it locally
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      // Example of sending the file to a server
      // await axios.post('/api/upload', formData);
      alert('File uploaded successfully!');
    } else {
      alert('No file selected.');
    }
  };

  return (
    <div className='p-5 w-full'>
      <Typography variant='h4'>Add Insurance</Typography>
      <div className='my-3'>
        <TextField
          label='Name'
          name='name'
          value={insurance.name}
          onChange={handleNameChange}
          fullWidth
          margin='normal'
        />
        <div className='flex flex-wrap w-full'>
          <div className='w-full xl:w-1/2 lg:w-1/2 xl:pr-4 lg:pr-4'>
            <FormControl fullWidth margin='normal'>
              <InputLabel>Periods</InputLabel>
              <Select
                multiple
                name='periods'
                value={insurance.periods}
                onChange={handleMultiSelectChange}
                renderValue={(selected) => selected.join(', ')}
              >
                {periodsOptions.map((period, index) => (
                  <MenuItem key={index} value={period}>
                    <Checkbox checked={insurance.periods.indexOf(period) > -1} />
                    <ListItemText primary={period} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='w-full xl:w-1/2 lg:w-1/2 xl:pl-4 lg:pl-4'>
            <FormControl fullWidth margin='normal'>
              <InputLabel id="parent-label">Parent</InputLabel>
              <Select
                labelId="parent-label"
                name='parent'
                value={insurance.parentId || ''}
                onChange={handleParentSelectChange}
                label="Parent"
              >
                {parentIdOptions.map((period, index) => (
                  <MenuItem key={index} value={period}>
                    <ListItemText primary={period} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className='w-full xl:w-1/3 lg:w-1/3 xl:pl-2 lg:pr-2 my-3 p-3 rounded-xl flex flex-col gap-5 bg-tertiary '>
        <FormControl fullWidth margin='normal'>
          <Typography variant='h6'>Upload Premium Rate</Typography>
          <input
            type='file'
            accept='.csv, .xlsx, .xls' // Specify allowed file types here
            onChange={handleFileChange}
            style={{ display: 'block', margin: '1em 0' }}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleFileUpload}
          >
            Upload
          </Button>
        </FormControl>
      </div>
      <div className='flex flex-wrap mb-5' >
        <div className='flex flex-col gap-5  xl:w-1/2 lg:w-1/2 w-full xl:pr-2 lg:pr-2 '>
          <Typography variant='h5'>Protect</Typography>
          {protect.map((p, index) => (
            <div key={p.id} className='p-5 flex flex-col gap-5 bg-tertiary rounded-xl border-2 border-primary'>
              <TextField
                label='Protect Name'
                name='name'
                value={p.name}
                onChange={(e) => handleChange(e, setProtect, index)}
                fullWidth
              />
              {protectDetails
                .filter(pd => pd.protectId === p.id)
                .map((pd, pdIndex) => (
                  <div key={pd.id} className='p-5 flex flex-col gap-5 items-start justify-start bg-white rounded-xl border-2 border-secondary'>
                    <Typography variant='h6'>Protect Details {pdIndex + 1}</Typography>
                    <TextField
                      label='Name'
                      name='name'
                      value={pd.name}
                      onChange={(e) => handleChange(e, setProtectDetails, pdIndex)}
                      fullWidth
                    />
                    <div className='flex flex-wrap w-full'>
                      <div className='w-full xl:w-1/3 lg:w-1/3 xl:pr-4 lg:pr-4 flex flex-col items-center justify-center'>
                        <Button
                          onClick={() => handleCalculateClick('protect', pdIndex)}
                          variant='outlined'
                          fullWidth
                        >
                          {pd.calculate || 'Enter Calculation'}
                        </Button></div>
                      <div className='w-full xl:w-1/3 lg:w-1/3 xl:px-2 lg:px-2'>
                        <TextField
                          label='Max Age'
                          name='max_age'
                          value={pd.max_age}
                          onChange={(e) => handleChange(e, setProtectDetails, pdIndex)}
                          fullWidth
                        />
                      </div>
                      <div className='w-full xl:w-1/3 lg:w-1/3 xl:pl-4 lg:pl-4'>
                        <TextField
                          label='Min Age'
                          name='min_age'
                          value={pd.min_age}
                          onChange={(e) => handleChange(e, setProtectDetails, pdIndex)}
                          fullWidth
                        />
                      </div>
                    </div>
                    <TextField
                      label='Note'
                      name='note'
                      value={pd.note}
                      onChange={(e) => handleChange(e, setProtectDetails, pdIndex)}
                      fullWidth
                    />
                  </div>
                ))}
              <Button variant='outlined' sx={{ width: 210, alignItems: 'center' }} onClick={() => handleAddEntry(setProtectDetails, { name: '', calculate: '', max_age: '', min_age: '', note: '', protectId: p.id })}>
                <Add style={{ fontSize: 30, color: theme.palette.primary.main }} />Add Protect Detail
              </Button>
            </div>
          ))}
          <Button variant='contained' sx={{ width: 250, alignItems: 'center' }} onClick={() => handleAddEntry(setProtect, { name: '' })}>
            <Add style={{ fontSize: 30, color: 'white' }} />Add Protect
          </Button>
        </div>

        <div className='flex flex-col gap-5 xl:w-1/2 lg:w-1/2 w-full xl:pl-2 lg:pl-2' >
          <Typography variant='h5'>Saved</Typography>
          {saved.map((s, index) => (
            <div key={s.id} className='p-5 flex flex-col gap-5 bg-tertiary rounded-xl border-2 border-primary'>
              <TextField
                label='Saved Name'
                name='name'
                value={s.name}
                onChange={(e) => handleChange(e, setSaved, index)}
                fullWidth
              />
              {savedDetails
                .filter(sd => sd.savedId === s.id)
                .map((sd, sdIndex) => (
                  <div key={sd.id} className='p-5 flex flex-col gap-5 items-start justify-start bg-white rounded-xl border-2 border-secondary'>
                    <Typography variant='h6'>Saved Details {sdIndex + 1}</Typography>
                    <TextField
                      label='Name'
                      name='name'
                      value={sd.name}
                      onChange={(e) => handleChange(e, setSavedDetails, sdIndex)}
                      fullWidth
                    />
                    <div className='flex flex-wrap w-full'>
                      <div className='w-full xl:w-1/3 lg:w-1/3 xl:pr-4 lg:pr-4 flex flex-col items-center justify-center'>
                        <Button
                          onClick={() => handleCalculateClick('saved', sdIndex)}
                          variant='outlined'
                          fullWidth
                        >
                          {sd.calculate || 'Enter Calculation'}
                        </Button>
                      </div>
                      <div className='w-full xl:w-1/3 lg:w-1/3 xl:px-2 lg:px-2'>
                        <TextField
                          label='Max Year'
                          name='max_year'
                          value={sd.max_year}
                          onChange={(e) => handleChange(e, setSavedDetails, sdIndex)}
                          fullWidth
                        /></div>
                      <div className='w-full xl:w-1/3 lg:w-1/3 xl:pr-4 lg:pr-4'>
                        <TextField
                          label='Min Year'
                          name='min_year'
                          value={sd.min_year}
                          onChange={(e) => handleChange(e, setSavedDetails, sdIndex)}
                          fullWidth
                        /></div></div>
                    <TextField
                      label='Note'
                      name='note'
                      value={sd.note}
                      onChange={(e) => handleChange(e, setSavedDetails, sdIndex)}
                      fullWidth
                    />
                  </div>
                ))}
              <Button variant='outlined' sx={{ width: 200, alignItems: 'center' }} onClick={() => handleAddEntry(setSavedDetails, { name: '', calculate: '', max_year: '', min_year: '', note: '', savedId: s.id })}>
                <Add style={{ fontSize: 30, color: theme.palette.primary.main }} />Add Saved Detail
              </Button>
            </div>
          ))}
          <Button variant='contained' sx={{ width: 200, alignItems: 'center' }} onClick={() => handleAddEntry(setSaved, { name: '' })}>
            <Add style={{ fontSize: 30, color: 'white' }} />Add Saved
          </Button>
        </div>
      </div>
      <Button variant='contained' color='primary' onClick={handleSubmit} className='w-full'>
        Add Insurance
      </Button>

      {/* Calculator Dialog */}
      {openCalculator && (
        <Calculator
          onSubmit={handleCalculatorSubmit}
          onClose={handleCloseCalculator}
        />
      )}
    </div>
  );
};

export default AddInsurance;
