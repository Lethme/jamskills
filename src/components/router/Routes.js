import { createContext } from "react";
import Auth from "../pages/auth/Auth";
import Register from "../pages/register/Register";
import Testing from "../pages/testing/Testing";
import Hol from "../tests/hol/Hol";

export const privateRoutes = [
    { path: '/testing', component: Testing, exact: true },
    { path: '/testing/hol/:id', component: Hol, exact: true },
    { path: '*', redirect: '/testing', exact: true },
];

export const publicRoutes = [
    { path: '/authorize', component: Auth, exact: true },
    { path: '/register', component: Register, exact: true },
    { path: '*', redirect: '/authorize', exact: true }
];