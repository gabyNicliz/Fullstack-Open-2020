import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('hello');
});

app.get('/bmi', (req, res) => {
  const { heigth, weight } = req.query;

  if (heigth && weight && !isNaN(+heigth) && !isNaN(+weight)) {
    const bmi = calculateBmi(+heigth, +weight);
    res.send({
      heigth: +heigth,
      weight: +weight,
      bmi: bmi,
    });
  } else {
    res.send({ error: 'malformated arguments '});
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  
  if (!Array.isArray(daily_exercises) || !target) {
    res.send({ error: 'parameters missing' })
  }

  const parsedArgs = daily_exercises.map((day: string | number) => {
    if (!isNaN(+day)) return +day;
    else return res.send({ error: 'malformated arguments' });
  })
  const result = calculateExercises(parsedArgs, +target);
  res.send(result);
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});