import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm({ onSubmit, patientData }) {
  const [formData, setFormData] = React.useState({
    age: patientData?.age || '',
    gender: patientData?.gender || '',
    activityLevel: patientData?.activityLevel || '',
    diet: patientData?.diet || '',
    healthGoal: patientData?.healthGoal || ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    if (onSubmit) {
      onSubmit(updatedData);
    }
  };

  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="age" required>
          Age (years)
        </FormLabel>
        <OutlinedInput
          id="age"
          name="age"
          type="number"
          placeholder="e.g. 30"
          required
          size="small"
          value={formData.age}
          onChange={handleInputChange}
          inputProps={{ min: 0 }}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="gender" required>
          Gender
        </FormLabel>
        <Select
          id="gender"
          name="gender"
          required
          value={formData.gender}
          onChange={handleInputChange}
          size="small"
        >
          <MenuItem value="" disabled>
            Select gender
          </MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="activityLevel" required>
          Activity Level
        </FormLabel>
        <Select
          id="activityLevel"
          name="activityLevel"
          required
          value={formData.activityLevel}
          onChange={handleInputChange}
          size="small"
        >
          <MenuItem value="" disabled>
            Select activity level
          </MenuItem>
          <MenuItem value="Sedentary">Sedentary</MenuItem>
          <MenuItem value="Lightly active">Lightly active</MenuItem>
          <MenuItem value="Moderately active">Moderately active</MenuItem>
          <MenuItem value="Very active">Very active</MenuItem>
        </Select>
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="diet" required>
          Diet Type
        </FormLabel>
        <Select
          id="diet"
          name="diet"
          required
          value={formData.diet}
          onChange={handleInputChange}
          size="small"
        >
          <MenuItem value="" disabled>
            Select diet type
          </MenuItem>
          <MenuItem value="Vegetarian">Vegetarian</MenuItem>
          <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
        </Select>
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormControl required>
          <FormLabel component="legend">Health Goal</FormLabel>
          <RadioGroup
            name="healthGoal"
            value={formData.healthGoal}
            onChange={handleInputChange}
            row
          >
            <FormControlLabel value="Weight loss" control={<Radio />} label="Weight loss" />
            <FormControlLabel value="Muscle gain" control={<Radio />} label="Muscle gain" />
            <FormControlLabel value="Maintain weight" control={<Radio />} label="Maintain weight" />
            <FormControlLabel value="General fitness" control={<Radio />} label="General fitness" />
          </RadioGroup>
        </FormControl>
      </FormGrid>
    </Grid>
  );
}