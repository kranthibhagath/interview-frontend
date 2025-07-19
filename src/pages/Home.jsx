import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AddressForm from '../components/AddressForm';
import Info from '../components/Info';
import InfoMobile from '../components/InfoMobile';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import { useNavigate } from 'react-router-dom';

import { getPatientData, updatePatientData } from "../services/authService";

const steps = ['Profile', 'BMI Calculator', 'Plans'];

export default function Home() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [patientData, setPatientData] = React.useState({
    age: '',
    gender: '',
    activityLevel: '',
    diet: '',
    healthGoal: '',
    height: '',
    weight: ''
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const userID = JSON.parse(localStorage.getItem("user"))?.id; // Get user ID from localStorage
        if (!userID) {
          console.error("User ID not found in localStorage");
          return;
        }
        const response = await getPatientData(userID);
        console.log("Fetched Patient Data:", response.data[0]);
        setPatientData({
          age: response.data[0].age || '',
          gender: response.data[0].gender || '',
          activityLevel: response.data[0].activityLevel || '',
          diet: response.data[0].diet || '',
          healthGoal: response.data[0].healthGoal || '',
          height: response.data[0].height || '',
          weight: response.data[0].weight || ''
        });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatientData();
  }, []);
console.log("Patient Data:", patientData); // For debugging
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleFormSubmit = (formData) => {
    setPatientData(formData);
    console.log('Patient Data:', formData); // For debugging
  };
  const handleLogin = () => {
    localStorage.removeItem("token"); // Clear token from localStorage
    localStorage.removeItem("user");
    navigate('/Login'); // Redirect to login page
  }
  const handleGeneratePlan = async () => {
    const userID = JSON.parse(localStorage.getItem("user"))?.id; // Get user ID from localStorage
    if (!userID) {
      console.error("User ID not found in localStorage");
      return;
    }
    const updatedPatientData = {
      ...patientData,
      userId: userID // Add userID to the patient data
    };
    console.log('Generating plan with data:', updatedPatientData);
    setPatientData(updatedPatientData);
    // Call the API to update patient data
    const response = await updatePatientData(updatedPatientData);
    if (response.status === 200) {
      console.log("Patient data updated successfully:", response.data);
      alert("Plan generated successfully!");
      handleNext(); // Move to the next step after successful update
    }
    // console.log('Generating plan with data:', patientData);
  };
  function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm onSubmit={handleFormSubmit} patientData={patientData} />;
    case 1:
      return <PaymentForm patientData={patientData} onSubmit={handleFormSubmit} />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}
  return (
    <div>
      <Button
        variant="contained"
        // endIcon={<ChevronRightRoundedIcon />}
        onClick={handleLogin}
        sx={{ width: { xs: '100%', sm: 'fit-content' } }}
      >
        Login
      </Button>
      <CssBaseline enableColorScheme />

      <Grid
        container
        sx={{
          height: {
            xs: '100%',
            sm: 'calc(100dvh - var(--template-frame-height, 0px))',
          },
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      >
        <Grid
          size={{ sm: 12, md: 12, lg: 12 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            width: '100%',
            backgroundColor: { xs: 'transparent', sm: 'background.default' },
            alignItems: 'start',
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: { sm: 'space-between', md: 'flex-end' },
              alignItems: 'center',
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexGrow: 1,
              }}
            >
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{ width: '100%', height: 40 }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: { sm: '100%', md: '100%' },
              // maxHeight: '720px',
              gap: { xs: 5, md: 'none' },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: 'flex', md: 'none' } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ':first-child': { pl: 0 },
                    ':last-child': { pr: 0 },
                    '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={[
                    {
                      display: 'flex',
                      flexDirection: { xs: 'column-reverse', sm: 'row' },
                      alignItems: 'end',
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: '60px',
                    },
                    activeStep !== 0
                      ? { justifyContent: 'space-between' }
                      : { justifyContent: 'flex-end' },
                  ]}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{ display: { xs: 'flex', sm: 'none' } }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep !== steps.length - 1  && <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={() => activeStep === steps.length - 2 ? handleGeneratePlan() : handleNext()}
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  >
                    {activeStep === steps.length - 2 ? 'Generate Plan' : 'Next'}
                  </Button>}
                </Box>
              </React.Fragment>
          </Box>
        </Grid>
      </Grid>
      </div>
  );
}
