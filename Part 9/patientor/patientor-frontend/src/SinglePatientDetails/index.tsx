import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { apiBaseUrl } from '../constants';
import { useStateValue, setSinglePatient, addDiagnosisEntry } from '../state';
import { Diagnosis, Entry, Patient } from '../types';
import EntryDetails from './EntryDetails';

const SinglePatientDetails: React.FC = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(setSinglePatient(patientFromApi));
      } catch (error) {
        console.log(error.message);
      }
    };
    if (!patient || patient?.id !== id) {
      fetchPatient();
      closeModal();
    }
  }, [patient, id, dispatch]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addDiagnosisEntry(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div>
      <h3><strong>{patient?.name}</strong></h3>
      <p>date of birth: {patient?.dateOfBirth}</p>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <h3>entries</h3>
      {patient?.entries
      && patient?.entries?.map((entry: Entry) =>
        <div key={entry.id}>
          <EntryDetails entry={entry} />
          <ul>
            {entry?.diagnosisCodes?.map((code) => {
              const diagnosis: Diagnosis | undefined = diagnoses.find((d) => d.code === code);
              return (<li key={code}>{code} - {diagnosis?.name}</li>);
            }
            )}
          </ul>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
      )}
    </div>
  );
};

export default SinglePatientDetails;