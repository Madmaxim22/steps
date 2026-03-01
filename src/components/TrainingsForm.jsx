import { useState } from 'react'

function TrainingsForm({ onAddTraining }) {
    const [date, setDate] = useState('');
    const [distance, setDistance] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onAddTraining({ date, distance });
        setDate('');
        setDistance('');
    }
    
    return (
        <div className="form-container">
            <form id="trainingForm" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
                        <input 
                            type="text" 
                            id="date" 
                            name="date" 
                            placeholder="20.07.2019" 
                            required 
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="distance">Пройдено км</label>
                        <input 
                            type="number" 
                            id="distance" 
                            name="distance" 
                            placeholder="5.7" 
                            step="0.1" 
                            min="0" 
                            required 
                            value={distance}
                            onChange={e => setDistance(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-btn">OK</button>
                </div>
            </form>
        </div>
    )
}

export default TrainingsForm;