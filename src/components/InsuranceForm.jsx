import React, { useState } from 'react';
import {
    TextField, MenuItem, FormControl, InputLabel, Select, ToggleButton, ToggleButtonGroup, IconButton,
    Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Toolbar, AppBar, Slide, Menu, ListItemText
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import useMediaQuery from '@mui/material/useMediaQuery';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
        const input = document.getElementById('export-content');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('export.pdf');
            })
            .finally(() => {
                handleExportMenuClose();
            });
    };

    const handleExportAsJPEG = () => {
        const input = document.getElementById('export-content');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/jpeg');
                const link = document.createElement('a');
                link.href = imgData;
                link.download = 'export.jpeg';
                link.click();
            })
            .finally(() => {
                handleExportMenuClose();
            });
    };

    return (
        <div className="p-4 space-y-4 bg-white rounded-lg shadow-md">
            {/* Part 1: Choosing Insurance */}
            <div className='w-full flex flex-col'>
                <h2 className="text-lg font-semibold mb-2">เลือกประกัน</h2>
                <div className='w-full flex flex-row gap-2'>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="insurance-name-label">เลือกประกัน</InputLabel>
                        <Select
                            labelId="insurance-name-label"
                            value={insuranceName}
                            onChange={(e) => setInsuranceName(e.target.value)}
                            label="Insurance Name"
                        >
                            <MenuItem value="insurance1">กรุงเทพสุดคุ้ม</MenuItem>
                            <MenuItem value="insurance2">กรุงเทพสมาร์ทคิดส์</MenuItem>
                            <MenuItem value="insurance3">แฮปปี้เซฟวิ่ง 2515 (มีเงินปันผล)</MenuItem>
                            <MenuItem value="insurance4">ตลอดชีพสุดคุ้ม</MenuItem>
                            {/* Add more options as needed */}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="insurance-plan-label">แผน</InputLabel>
                        <Select
                            labelId="insurance-plan-label"
                            value={insurancePlan}
                            onChange={(e) => setInsurancePlan(e.target.value)}
                            label="Insurance Plan"
                        >
                            <MenuItem value="plan1">15/9</MenuItem>
                            <MenuItem value="plan2">8/12</MenuItem>
                            <MenuItem value="plan2">21/15</MenuItem>
                            {/* Add more options as needed */}
                        </Select>
                    </FormControl>
                </div>
            </div>

            {/* Part 2: Insured Information */}
            <div className='w-full flex flex-wrap xl:flex-row lg:flex-row'>
                <div className='w-full xl:w-1/2 lg:w-1/2 p-2'>
                    <h2 className="text-lg font-semibold mb-2">กรอกข้อมูลผู้ทำประกัน</h2>
                    <div className="mb-4">
                        <h3 className="text-md font-medium mb-2">เพศ</h3>
                        <ToggleButtonGroup
                            value={gender}
                            exclusive
                            onChange={handleGenderChange}
                            aria-label="gender"
                        >
                            <ToggleButton value="female">หญิง</ToggleButton>
                            <ToggleButton value="male">ชาย</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-md font-medium mb-2">วัน/เดือน/ปี เกิด</h3>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="วัน/เดือน/ปี"
                                format="YYYY/MM/DD"
                                defaultValue={dayjs('2022-04-17')}
                            />
                        </LocalizationProvider>
                        <Typography className='text-red-700'>
                            **หมายเหตุหากวันที่ทำประกันเกินวันเกิดมามากกว่า6เดือน จะถือว่าอายุเท่าปีถัดไป
                        </Typography>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-md font-medium mb-2">คุณคือนักออมสายไหน</h3>
                        <FormControl fullWidth margin="normal">

                            <InputLabel id="saving-format-label">คุณคือนักออมสายไหน</InputLabel>
                            <Select
                                labelId="saving-format-label"
                                value={savingFormat}
                                onChange={(e) => setSavingFormat(e.target.value)}
                                label="Saving Format"
                            >
                                <MenuItem value="1_month">สายตั้งเป้าหมาย (ตั้งจาก เงินที่ต้องการในอนาคต)</MenuItem>
                                <MenuItem value="3_months">สายเน้นความคุ้มครองชีวิต เริ่มจากทุนประกัน</MenuItem>
                                <MenuItem value="6_months">สายมุ่งมั่น ไปเรื่อยๆ เท่าที่ไหว (ตั้งจากยอดออมรายเดือน)</MenuItem>
                                <MenuItem value="1_year">สายอยากออมราย 3 เดือน</MenuItem>
                                <MenuItem value="1_year">สายอยากออมราย 6 เดือน</MenuItem>
                                <MenuItem value="1_year">สายลดหย่อนภาษี (ตั้งจากยอดออมรายปี)</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-md font-medium mb-2">จำนวนเงิน</h3>
                        <TextField
                            fullWidth
                            label="จำนวนเงิน"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            margin="normal"
                        /></div>
                </div>
                <div className='w-full xl:w-1/2 lg:w-1/2 p-2'>
                    <h2 className="text-lg font-semibold mb-2">ข้อมูลผู้เอาประกัน</h2>
                    <div className="mb-4">
                        <h3 className="text-md font-medium mb-2">ชื่อผู้เอาประกัน</h3>
                    <TextField
                        fullWidth
                        label="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                    /></div>
                    <div className="mb-4">
                        <h3 className="text-md font-medium mb-2">เพศ</h3>
                        <ToggleButtonGroup
                            value={beneficiary}
                            exclusive
                            onChange={handleBeneficiaryGenderChange}
                            aria-label="gender"
                        >
                            <ToggleButton value="female">หญิง</ToggleButton>
                            <ToggleButton value="male">ชาย</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="mb-4">
                    <h3 className="text-md font-medium mb-2">วัน/เดือน/ปี เกิด</h3>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="วัน/เดือน/ปี เกิด"
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
                    คำนวณ
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
                        <IconButton edge="start" color="inherit" onClick={handleDialogClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Your Export
                        </Typography>
                        <IconButton
                            color="inherit"
                            onClick={handleExportMenuOpen}
                        >
                            <ImageIcon />
                        </IconButton>
                        <Menu
                            anchorEl={exportMenuAnchorEl}
                            open={Boolean(exportMenuAnchorEl)}
                            onClose={handleExportMenuClose}
                        >
                            <MenuItem onClick={handleExportAsJPEG}>
                                <ListItemText primary="Export as JPEG" />
                            </MenuItem>
                            <MenuItem onClick={handleExportAsPDF}>
                                <ListItemText primary="Export as PDF" />
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <div id="export-content">
                        <Export
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default InsuranceForm;
