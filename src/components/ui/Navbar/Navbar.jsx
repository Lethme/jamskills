import React from "react";
import { Link } from "react-router-dom";
import './Navbar.scss';

import LogoSvg from '../../../assets/images/svg/logo.svg';
import ApiService from "../../service/ApiService";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid xs:flex-row xs:flex-justify-sb">
                <div className="logo-wrapper">
                    <Link className="navbar-brand xs:flex-row xs:flex-align-center xs:flex-wrap-none" to="/">
                        <img className="logo-img" src={require('../../../assets/images/png/logo.png')} alt="" />
                        <span className="logo-text">
                            Jamskills
                        </span>
                    </Link>
                </div>
                <div className="user-wrapper xs:flex-row xs:flex-align-center xs:flex-wrap-none">
                    <span className="user-name">
                        { ApiService.AuthorizedUser.email }
                    </span>
                    <div className="user-img-wrapper">
                        {/* <img className="logo-img" src={require('../../../assets/images/logo.png')} alt="" /> */}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;