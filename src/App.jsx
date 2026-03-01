import { useState } from 'react'
import './App.css'
import TrainingsForm from './components/TrainingsForm'

function App() {
  const [trainings, setTrainings] = useState([]);

  function handleAddTraining(newTraining) {
    setTrainings(prev => [...prev, newTraining]);
  }

  console.log(trainings);

  return (
    <div className="container">
      <TrainingsForm onAddTraining={handleAddTraining} />
    </div>
  )
}

export default App
