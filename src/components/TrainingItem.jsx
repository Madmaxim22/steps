function TrainingItem({ training: { date, distance }, onDelete, onEdit }) {
    return (
        <div className="table-row" data-date="2019-07-20">
            <div className="col-date">{date}</div>
            <div className="col-distance">{distance}</div>
            <div className="col-actions">
                <button 
                    className="action-btn edit-btn" 
                    title="Редактировать"
                    onClick={() => onEdit({ date, distance })}
                >✎</button>
                <button 
                    className="action-btn delete-btn" 
                    title="Удалить"
                    onClick={() => onDelete(date)}
                >✕</button>
            </div>
        </div>
    )
}

export default TrainingItem;