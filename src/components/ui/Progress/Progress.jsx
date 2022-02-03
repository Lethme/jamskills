import React from "react";
import './Progress.scss';

const Progress = ({ progress, minProgress, color, size }) => {
    return (
        <div className="progress-container">
            <div className="progress-track">
                <div style={{ width: progress + '%', height: size, minWidth: minProgress + '%' }} className="progress-wrapper">
                    <div style={{ backgroundColor: color }} className="progress-bar"></div>
                </div>
            </div>
            <span className="progress-label">{ progress + '%' }</span>
        </div>
    )
}

export default Progress;