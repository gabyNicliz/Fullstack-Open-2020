interface TrainingDaysArray {
  array: number[];
}

interface TrainingTargetResult {
  periodLength: number;
  target: number;
  average: number;
  success: boolean;
  trainingDays: number;
  rating: number;
  ratingDescription: string;
}

const calculateExercises = (exerciseArgs: number[]): TrainingTargetResult => {
  const target = exerciseArgs[0];
  const exerciseDays = exerciseArgs.slice(1);
  const average: number = exerciseDays.reduce((sum, num, index, array) => {
    sum += num;
    console.log(sum)
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
    ratingDescription = 'kinda bad, init?';
  } else if (average >= (target / 2) && average < target) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else if (average >= target) {
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
}

const parseExerciseArguments = (args: Array<string>): TrainingDaysArray => {
  let parsedArray: number[] = [];
  for (let i = 2; i < args.length; i++) {
    if (!isNaN(+args[i])) parsedArray = parsedArray.concat(+args[i]);
    else throw new Error('it was at this moment that he knew he fucked up');
  }

  return { array: parsedArray };
}

let myObj = calculateExercises([3, 0, 2, 4.5, 0, 3, 1]);

try {
  const { array } = parseExerciseArguments(process.argv);
  let trainingTargetResult = calculateExercises(array);
  console.log(trainingTargetResult);
} catch (error) {
  console.log(error.message);
}