import { useState } from 'react';
import './App.css';
import TrainingsForm from './components/TrainingsForm';
import TrainigsTable from "./components/TrainingsTable";

function App() {
  const [trainings, setTrainings] = useState([]);

  function handleAddTraining(newTraining) {
    setTrainings(prev => {
      const next = [...prev, newTraining];
      next.sort((a, b) => {
        const parse = (s) => {
          const [d, m, y] = s.split('.');
          return new Date(y, m - 1, d).getTime();
        };
        return parse(a.date) - parse(b.date);
      });
      return next;
    });
  }

  console.log(trainings);

  return (
    <div className="container">
      <TrainingsForm onAddTraining={handleAddTraining} />
      <TrainigsTable trainings={trainings} />
    </div>
  )
}

export default App;
