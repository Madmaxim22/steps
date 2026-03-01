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
  const [editingTraining, setEditingTraining] = useState(null);

  function handleSubmitTraining(newTraining, originalDate = null) {
    setTrainings(prev => {
      const next = originalDate
        ? prev.filter(t => t.date !== originalDate)
        : prev;
      return sortByDate(mergeOrAddTraining(next, newTraining));
    });
    if (originalDate) setEditingTraining(null);
  }

  function handleDeleteTraining(date) {
    setTrainings(prev => prev.filter(t => t.date !== date));
  }

  function handleEditTraining(training) {
    setEditingTraining({
      originalDate: training.date,
      date: training.date,
      distance: training.distance,
    });
  }

  return (
    <div className="container">
      <TrainingsForm
        key={editingTraining?.originalDate ?? 'new'}
        editTraining={editingTraining}
        onSubmitTraining={handleSubmitTraining}
      />
      <TrainigsTable 
        trainings={trainings}
        onDeleteTraining={handleDeleteTraining} 
        onEditTraining={handleEditTraining}
      />
    </div>
  )
}

export default App;
