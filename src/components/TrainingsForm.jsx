import { useState } from 'react';

function TrainingsForm({ editTraining, onSubmitTraining }) {
    const [date, setDate] = useState(editTraining?.date ?? '');
    const [distance, setDistance] = useState(editTraining?.distance ?? '');
    const [dateError, setDateError] = useState('');
    const [distanceError, setDistanceError] = useState('');

    function validateDate(value) {
        if (!value) {
            return 'Введите дату';
        }

        const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
        if (!match) {
            return 'Неверный формат даты (ДД.ММ.ГГГГ)';
        }

        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);

        const dateObj = new Date(year, month - 1, day);

        if (
            dateObj.getFullYear() !== year ||
            dateObj.getMonth() !== month - 1 ||
            dateObj.getDate() !== day
        ) {
            return 'Несуществующая дата';
        }

        return null;
    }

    function validateDistance(value) {
        if (value === '' || value == null) {
            return 'Введите расстояние';
        }

        const num = Number(value);

        if (!Number.isFinite(num)) {
            return 'Введите корректное число';
        }

        if (num <= 0) {
            return 'Расстояние должно быть больше 0';
        }

        return null;
    }

    function handleSubmit(e) {
        e.preventDefault();

        const dateValidationError = validateDate(date);
        const distanceValidationError = validateDistance(distance);

        setDateError(dateValidationError ?? '');
        setDistanceError(distanceValidationError ?? '');

        if (dateValidationError || distanceValidationError) {
            return;
        }

        const numericDistance = Number(distance);

        onSubmitTraining(
            { date, distance: numericDistance },
            editTraining?.originalDate ?? undefined
        );
        setDate('');
        setDistance('');
        setDateError('');
        setDistanceError('');
    }
    
    return (
        <div className="form-container">
            <form id="trainingForm" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
                        <input 
                            type="text" 
                            id="date" 
                            name="date" 
                            placeholder="20.07.2019" 
                            required 
                            value={date}
                            onChange={e => {
                                setDate(e.target.value);
                            }}
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
                            required 
                            value={distance}
                            onChange={e => {
                                setDistance(e.target.value);
                            }}
                        />
                    </div>
                    <button type="submit" className="submit-btn">OK</button>
                </div>
                {(dateError || distanceError) && (
                    <div className="form-errors">
                        {dateError && <div className="error-message">{dateError}</div>}
                        {distanceError && <div className="error-message">{distanceError}</div>}
                    </div>
                )}
            </form>
        </div>
    )
}

export default TrainingsForm;