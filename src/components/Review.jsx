import * as React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Review() {
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Underweight (BMI < 18.5)" secondary="Focus on a diet that promotes weight gain through increased calorie and nutrient intake, including healthy fats, proteins, and carbohydrates." />
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Normal Weight (BMI 18.5 - 24.9)" secondary="Maintain a balanced diet with appropriate portions to maintain a healthy weight." />
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Overweight (BMI 25 - 29.9)" secondary="Prioritize a diet focused on calorie reduction, increased fiber intake, and regular exercise to promote weight loss and improve overall health." />
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Obese (BMI 30 or higher)" secondary="A very low-calorie diet, combined with lifestyle changes, including increased physical activity and behavior modification, is often necessary." />
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 12 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            General Dietary Recommendations for Healthy Weight
          </Typography>
          <Typography gutterBottom>Calorie Balance</Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Consume only as many calories as your body expends to maintain a healthy weight. 
          </Typography>

          <Typography variant="subtitle2" gutterBottom>Macronutrient Balance:</Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Focus on consuming a balanced mix of carbohydrates, proteins, and healthy fats.
          </Typography>
          <Typography variant="subtitle2" gutterBottom>Micronutrient Adequacy:</Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Ensure adequate intake of vitamins and minerals through a variety of fruits, vegetables, and whole grains.
          </Typography>
          {/* <Typography variant="subtitle2" gutterBottom>Fiber Intake:</Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Include high-fiber foods like fruits, vegetables, and whole grains to promote satiety and digestive health.
          </Typography>
          <Typography variant="subtitle2" gutterBottom>Hydration:</Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Drink plenty of water throughout the day.
          </Typography>
          <Typography variant="subtitle2" gutterBottom>Sample Diet Plan (Example for Overweight/Obese, adjust portions based on individual needs):</Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Breakfast: Oatmeal with fruits and nuts, or a vegetable omelette with whole-grain toast.
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Lunch: A salad with grilled chicken or fish, or a whole-grain wrap with lean protein and vegetables.
          </Typography> */}
          {/* <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Dinner: Baked fish with roasted vegetables, or a lentil soup with brown rice.
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Snacks: Fruits, yogurt, nuts, or vegetables with hummus.
          </Typography>
          <Typography variant="subtitle2" gutterBottom>Important Considerations:</Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Consult a Healthcare Professional:
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Consult with a doctor or registered dietitian to determine the best dietary approach for your specific BMI and health status.
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Individualized Plans:
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Diet plans should be tailored to individual needs and preferences.
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Gradual Changes:
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Make gradual changes to your diet and lifestyle to ensure long-term success.
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Regular Physical Activity:
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            Incorporate regular physical activity into your routine for optimal health benefits.
          </Typography> */}
        </div>
      </Stack>
    </Stack>
  );
}