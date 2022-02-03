import React from "react";
import { Link } from "react-router-dom";
import './Topbar.scss';

const Topbar = () => {
    return (
        <nav className="topbar">
            <div className="container-fluid xs:flex-row xs:flex-align-center xs:flex-justify-sb">
                <div className="page-subtitle">
                    <span className="subtitle">Домашняя страница</span>
                </div>
                <div className="page-title">
                    <span className="title">Домашняя страница</span>
                </div>
                <div className="page-controls">
                    <img className="page-controls-img" src={require('../../../assets/images/png/list.png')} alt="" />
                </div>
            </div>
        </nav>
    );
}

export default Topbar;