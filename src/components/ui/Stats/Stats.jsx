import React from "react";
import { Link } from "react-router-dom";
import '../../../assets/scss/colors.scss';
import './Stats.scss';

const Stats = ({ markerColor, iconClasses, title, value }) => {
    return (
        <div className="stats">
            <p className="stats-title">
                {markerColor
                    ? <span style={{ color: markerColor }} className="marker">• </span>
                    : ''
                }
                { title }
            </p>
            <h3 className="stats-value">
                {iconClasses ? <i className={iconClasses}></i> : ''}
                <span className="value">{ value }</span>
            </h3>
        </div>
    );
}

export default Stats;