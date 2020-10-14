/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import diagnoseData from '../../data/diagnoses.json';

const getDiagnoses = () => {
  return diagnoseData;
};

export default {
  getDiagnoses,
};
