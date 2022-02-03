import React, { createContext, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from './Routes';
import { AuthContext } from '../context/Context';
import { ToastContainer } from 'react-toastify';

const AppRouter = () => {
    const { authorized, setAuthorized } = useContext(AuthContext);
    return (
        <BrowserRouter>
            <Routes>
                {authorized
                    ? privateRoutes.map(route =>
                        route.path === '*'
                            ? <Route path={route.path} element={<Navigate replace to={route.redirect} />} exact={route.exact} key={route.path} />
                            : <Route path={route.path} element={<route.component />} exact={route.exact} key={route.path} />
                    )
                    : publicRoutes.map(route =>
                        route.path === '*'
                            ? <Route path={route.path} element={<Navigate replace to={route.redirect} />} exact={route.exact} key={route.path} />
                            : <Route path={route.path} element={<route.component />} exact={route.exact} key={route.path} />
                    )
                }
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;