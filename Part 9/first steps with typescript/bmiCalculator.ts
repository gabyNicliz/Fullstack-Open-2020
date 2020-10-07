interface BmiValues {
  heigth: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(+args[2]) && !isNaN(+args[3])) {
    return {
      heigth: +args[2],
      weight: +args[3],
    };
  } else {
    throw new Error('the program only accepts numbers as valid values');
  }
}

const calculateBmi = (heigth: number, weight: number): string => {
  const heigthInMeters = heigth / 100;
  const bodyMassIndex = weight / (heigthInMeters * heigthInMeters);

  if (bodyMassIndex <= 15 && bodyMassIndex >= 0) {
    return 'Very severely underweight';
  } else if (bodyMassIndex <= 16) {
    return 'Severely underweight';
  } else if (bodyMassIndex <= 18.5) {
    return 'Underweight';
  } else if (bodyMassIndex <= 25) {
    return 'Normal (healthy weight)';
  } else if (bodyMassIndex <= 30) {
    return 'Overweight';
  } else if (bodyMassIndex <= 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (bodyMassIndex <= 40) {
    return 'Obese Class II (Severely obese)';
  } else {
    return 'Obese Class III (Very severely obese)';
  }
}

try {
  const { heigth, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(heigth, weight));
} catch (error) {
  console.log(error.message);
}