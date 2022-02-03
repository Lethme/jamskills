import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Controls.scss';

import LogoFlatSvg from '../../../assets/images/svg/logo_flat.svg';

const Controls = ({ show = false, title = 'Добро Пожаловать!', subtitle = '', text = '', btnText = '', btnLink = '/' }) => {
    return (
        <div className={'controls xs:flex-column xs:flex-align-center xs:flex-justify-center xs:w-auto ' + (show ? 'show' : '')}>
            <div className="container-fluid controls-wrapper xs:flex-column xs:flex-align-center xs:text-center xs:plr-30">
                <object className="controls-img" type="image/svg+xml" data={LogoFlatSvg}>
                    <img className="controls-img" src={require('../../../assets/images/png/logo_flat.png')} alt="" />
                </object>
                <h1 className="title">{ title }</h1>
                <h2 className="subtitle">{ subtitle }</h2>
                <h2 className="subtitle semi-transparent">{ text }</h2>
                <Link to={btnLink} className="btn btn-fluid">{ btnText }</Link>
            </div>
        </div>
    );
}

export default Controls;