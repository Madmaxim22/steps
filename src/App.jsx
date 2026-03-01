import { useState } from 'react';
import './App.css';
import TrainingsForm from './components/TrainingsForm';
import TrainigsTable from "./components/TrainingsTable";

function sortByDate(trainings) {
  const parse = (s) => {
    const [d, m, y] = s.split('.');
    return new Date(y, m - 1, d).getTime();
  };
  return [...trainings].sort((a, b) => parse(a.date) - parse(b.date));
}

function mergeOrAddTraining(trainings, newTraining) {
  const i = trainings.findIndex(t => t.date === newTraining.date);
  if (i >= 0) {
    const existing = trainings[i];
    const distance = (parseFloat(existing.distance) || 0) + (parseFloat(newTraining.distance) || 0);
    const next = [...trainings];
    next[i] = { ...existing, distance: String(distance) };
    return next;
  }
  return [...trainings, newTraining];
}

function App() {
  const [trainings, setTrainings] = useState([]);

  function handleAddTraining(newTraining) {
    setTrainings(prev => sortByDate(mergeOrAddTraining(prev, newTraining)));
  }

  
  function handleDeleteTraining(date) {
    setTrainings(prev => prev.filter(t => t.date !== date));
  }

  console.log(trainings);

  return (
    <div className="container">
      <TrainingsForm onAddTraining={handleAddTraining} />
      <TrainigsTable 
        trainings={trainings}
        onDeleteTraining={handleDeleteTraining} 
      />
    </div>
  )
}

export default App;
