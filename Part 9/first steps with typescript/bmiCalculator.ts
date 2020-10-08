export const calculateBmi = (heigth: number, weight: number): string => {
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
};