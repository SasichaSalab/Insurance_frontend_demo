import React, { useState } from 'react';
import { 
    TextField, MenuItem, FormControl, InputLabel, Select, ToggleButton, ToggleButtonGroup, IconButton, 
    Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Toolbar, AppBar, Slide, Menu,ListItemText
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import useMediaQuery from '@mui/material/useMediaQuery';
import Export from './Export';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InsuranceForm = () => {
    const [insuranceName, setInsuranceName] = useState('');
    const [insurancePlan, setInsurancePlan] = useState('');
    const [gender, setGender] = useState('female');
    const [beneficiary, setBeneficiary] = useState('female');
    const [dob, setDob] = useState(null);
    const [savingFormat, setSavingFormat] = useState('');
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [exportMenuAnchorEl, setExportMenuAnchorEl] = useState(null);

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const handleGenderChange = (event, newGender) => {
        setGender(newGender);
    };

    const handleBeneficiaryGenderChange = (event, newGender) => {
        setBeneficiary(newGender);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleExportMenuOpen = (event) => {
        setExportMenuAnchorEl(event.currentTarget);
    };

    const handleExportMenuClose = () => {
        setExportMenuAnchorEl(null);
    };

    const handleExportAsPDF = () => {
        console.log("Exporting as PDF");
        handleExportMenuClose();
    };

    const handleExportAsJPEG = () => {
        console.log("Exporting as JPEG");
        handleExportMenuClose();
    };

    return (
        <div className="p-4 space-y-4 bg-white rounded-lg shadow-md">
            {/* Part 1: Choosing Insurance */}
            <div className='w-full flex flex-col'>
                <h2 className="text-lg font-semibold mb-2">Choose Insurance</h2>
                <div className='w-full flex flex-row gap-2'>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="insurance-name-label">Insurance Name</InputLabel>
                        <Select
                            labelId="insurance-name-label"
                            value={insuranceName}
                            onChange={(e) => setInsuranceName(e.target.value)}
                            label="Insurance Name"
                        >
                            <MenuItem value="insurance1">Insurance 1</MenuItem>
                            <MenuItem value="insurance2">Insurance 2</MenuItem>
                            {/* Add more options as needed */}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="insurance-plan-label">Insurance Plan</InputLabel>
                        <Select
                            labelId="insurance-plan-label"
                            value={insurancePlan}
                            onChange={(e) => setInsurancePlan(e.target.value)}
                            label="Insurance Plan"
                        >
                            <MenuItem value="plan1">Plan 1</MenuItem>
                            <MenuItem value="plan2">Plan 2</MenuItem>
                            {/* Add more options as needed */}
                        </Select>
                    </FormControl>
                </div>
            </div>

            {/* Part 2: Insured Information */}
            <div className='w-full flex flex-wrap xl:flex-row lg:flex-row'>
                <div className='w-full xl:w-1/2 lg:w-1/2 p-2'>
                    <h2 className="text-lg font-semibold mb-2">Insured Information</h2>
                    <div className="mb-4">
                        <h3 className="text-md font-medium mb-2">Gender</h3>
                        <ToggleButtonGroup
                            value={gender}
                            exclusive
                            onChange={handleGenderChange}
                            aria-label="gender"
                        >
                            <ToggleButton value="female">Female</ToggleButton>
                            <ToggleButton value="male">Male</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="mb-4">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date Picker"
                                format="YYYY/MM/DD"
                                defaultValue={dayjs('2022-04-17')}
                            />
                        </LocalizationProvider>
                        <Typography className='text-red-700'>
                            **หมายเหตุหากวันที่ทำประกันเกินวันเกิดมามากกว่า6เดือน จะถือว่าอายุเท่าปีถัดไป
                        </Typography>
                    </div>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="saving-format-label">Saving Format</InputLabel>
                        <Select
                            labelId="saving-format-label"
                            value={savingFormat}
                            onChange={(e) => setSavingFormat(e.target.value)}
                            label="Saving Format"
                        >
                            <MenuItem value="1_month">1 Month</MenuItem>
                            <MenuItem value="3_months">3 Months</MenuItem>
                            <MenuItem value="6_months">6 Months</MenuItem>
                            <MenuItem value="1_year">1 Year</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Amount of Savings"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        margin="normal"
                    />
                </div>
                <div className='w-full xl:w-1/2 lg:w-1/2 p-2'>
                    <h2 className="text-lg font-semibold mb-2">Additional Information</h2>
                    <TextField
                        fullWidth
                        label="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                    />
                    <div className="mb-4">
                        <h3 className="text-md font-medium mb-2">Gender</h3>
                        <ToggleButtonGroup
                            value={beneficiary}
                            exclusive
                            onChange={handleBeneficiaryGenderChange}
                            aria-label="gender"
                        >
                            <ToggleButton value="female">Female</ToggleButton>
                            <ToggleButton value="male">Male</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="mb-4">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date Picker"
                                format="YYYY/MM/DD"
                                defaultValue={dayjs('2022-04-17')}
                            />
                        </LocalizationProvider>
                        <Typography className='text-red-700'>
                            **หมายเหตุหากวันที่ทำประกันเกินวันเกิดมามากกว่า6เดือน จะถือว่าอายุเท่าปีถัดไป
                        </Typography>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-4">
                <Button variant="contained" color="primary" onClick={handleDialogOpen}>
                    Calculate
                </Button>
            </div>

            {/* Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleDialogClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {isSmallScreen ? 'ใบเสนอ...' : 'ใบเสนอสรุปผลประโยชน์และความคุ้มครอง'}
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={handleExportMenuOpen}
                            startIcon={<PictureAsPdfIcon />}
                            sx={{marginLeft:5}}
                        >
                            Export
                        </Button>
                        <Menu
                            anchorEl={exportMenuAnchorEl}
                            open={Boolean(exportMenuAnchorEl)}
                            onClose={handleExportMenuClose}
                        >
                            <MenuItem onClick={handleExportAsPDF}>
                                <PictureAsPdfIcon fontSize="small" />
                                <ListItemText primary="Export as PDF" />
                            </MenuItem>
                            <MenuItem onClick={handleExportAsJPEG}>
                                <ImageIcon fontSize="small" />
                                <ListItemText primary="Export as JPEG" />
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Export/>
            </Dialog>
        </div>
    );
};

export default InsuranceForm;
