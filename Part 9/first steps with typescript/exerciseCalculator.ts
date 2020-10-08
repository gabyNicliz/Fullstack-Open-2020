interface TrainingTargetResult {
  periodLength: number;
  target: number;
  average: number;
  success: boolean;
  trainingDays: number;
  rating: number;
  ratingDescription: string;
}

export const calculateExercises = (exerciseDays: number[], target: number): TrainingTargetResult => {
  const average: number = exerciseDays.reduce((sum, num, index, array) => {
    sum += num;
    console.log(sum);
    if (index === array.length - 1) {
      return sum / array.length;
    } else {
      return sum;
    }
  }, 0);
  const success = average >= target ? true : false;

  const trainingDays = exerciseDays.reduce((totalDays, day) => {
    if (day > 0) totalDays++;
    return totalDays;
  }, 0);

  let rating: number;
  let ratingDescription: string;

  if (average < (target / 2)) {
    rating = 1;
    ratingDescription = 'bad';
  } else if (average >= (target / 2) && average < target) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else  {
    rating = 3;
    ratingDescription = 'good job!';
  }

  return {
    periodLength: exerciseDays.length,
    target,
    average,
    success,
    trainingDays,
    rating,
    ratingDescription,
  };
};