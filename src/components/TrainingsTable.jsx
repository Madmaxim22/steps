import TrainingItem from "./TrainingItem";

function TrainingsTable({ trainings }) {
    return (
        <div className="data-table">
            <div className="table-header">
                <div className="col-date">Дата (ДД.ММ.ГГ)</div>
                <div className="col-distance">Пройдено км</div>
                <div className="col-actions">Действия</div>
            </div>
            <div className="table-body" id="tableBody">
                {trainings.length === 0 ? 
                    <div className="empty-state">Нет данных о тренировках</div> :
                    trainings.map((training) => (
                        <TrainingItem key={training.date} training={training} />
                    ))
                }
            </div>
            
        </div>
    )
}

export default TrainingsTable;