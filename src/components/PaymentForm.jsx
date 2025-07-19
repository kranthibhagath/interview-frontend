import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

const Card = styled(MuiCard)(({ theme }) => ({
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  width: '100%',
  '&:hover': {
    background:
      'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)',
    borderColor: 'primary.light',
    boxShadow: '0px 2px 8px hsla(0, 0%, 0%, 0.1)',
    ...theme.applyStyles('dark', {
      background:
        'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
      borderColor: 'primary.dark',
      boxShadow: '0px 1px 8px hsla(210, 100%, 25%, 0.5) ',
    }),
  },
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    maxWidth: `calc(50% - ${theme.spacing(1)})`,
  },
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        borderColor: (theme.vars || theme).palette.primary.light,
        ...theme.applyStyles('dark', {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

const PaymentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: 375,
  padding: theme.spacing(3),
  borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
  border: '1px solid ',
  borderColor: (theme.vars || theme).palette.divider,
  background:
    'linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)',
  boxShadow: '0px 4px 8px hsla(210, 0%, 0%, 0.05)',
  [theme.breakpoints.up('xs')]: {
    height: 300,
  },
  [theme.breakpoints.up('sm')]: {
    height: 350,
  },
  ...theme.applyStyles('dark', {
    background:
      'linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)',
    boxShadow: '0px 4px 8px hsl(220, 35%, 0%)',
  }),
}));

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function PaymentForm({ patientData, onSubmit }) {
  const [formData, setFormData] = React.useState({
    height: patientData?.height || '',
    weight: patientData?.weight || ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    if (onSubmit) {
      onSubmit({ ...patientData, ...updatedData });
    }
  };

  // Calculate BMI
  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100; // Convert cm to meters
      const bmi = formData.weight / (heightInMeters * heightInMeters);
      return Math.round(bmi * 10) / 10; // Round to 1 decimal place
    }
    return 0;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obesity';
  };

  const bmi = calculateBMI();

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <PaymentContainer>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Personalized Diet Planner</Typography>
            <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="height" required>
                Height (cm)
              </FormLabel>
              <OutlinedInput
                id="height"
                name="height"
                type="number"
                placeholder="e.g. 175"
                required
                size="small"
                value={formData.height}
                onChange={handleInputChange}
                inputProps={{ min: 0 }}
              />
            </FormGrid>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="weight" required>
                Weight (kg)
              </FormLabel>
              <OutlinedInput
                id="weight"
                name="weight"
                type="number"
                placeholder="e.g. 70"
                required
                size="small"
                value={formData.weight}
                onChange={handleInputChange}
                inputProps={{ min: 0 }}
              />
            </FormGrid>
          </Box>

          <Box
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Your BMI: {bmi} ({getBMICategory(bmi)})
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Height: {formData.height || 0} cm | Weight: {formData.weight || 0} kg
            </Typography>
            <Slider
              value={bmi}
              min={15}
              max={40}
              step={0.1}
              disabled
              marks={[
                { value: 18.5, label: 'Underweight' },
                { value: 25, label: 'Normal' },
                { value: 30, label: 'Overweight' },
                { value: 35, label: 'Obesity' },
              ]}
              sx={{ mt: 2 }}
            />
          </Box>
        </PaymentContainer>
      </Box>
    </Stack>
  );
}