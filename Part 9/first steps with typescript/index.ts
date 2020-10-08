import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});