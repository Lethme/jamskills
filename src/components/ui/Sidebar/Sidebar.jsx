import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Context";
import ApiService from "../../service/ApiService";
import './Sidebar.scss';

const Sidebar = () => {
    let mount = true;
    const { authorized, setAuthorized } = useContext(AuthContext);
    const logout = () => {
        ApiService.RemoveData();
        if (mount) {
            setAuthorized(false);
        }
    }

    useEffect(() => {
        return () => {
            mount = false;
        }
    }, [])

    return (
        <nav className="sidebar">
            <div className="container-fluid xs:h-100 xs:flex-column xs:flex-align-start xs:flex-justify-sb">
                <div className="content">
                    <Link className="sidebar-link" to="/">
                        <div className="img-wrapper">
                            <img className="link-img" src={require('../../../assets/images/png/home.png')} alt="" />
                        </div>
                        <span>Домашняя страница</span>
                    </Link>
                </div>
                <div className="settings">
                    <p className="title">Настройки</p>
                    <Link className="sidebar-link" to="/">
                        <div className="img-wrapper">
                            <img className="link-img" src={require('../../../assets/images/png/user-home.png')} alt="" />
                        </div>
                        <span>Профиль</span>
                    </Link>
                    <Link onClick={logout} className="sidebar-link" to="/">
                        <div className="img-wrapper">
                            <img className="link-img" src={require('../../../assets/images/png/off.png')} alt="" />
                        </div>
                        <span>Выход</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;