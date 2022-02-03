import logo from './logo.svg';
import './App.scss';

import AppRouter from './components/router/AppRouter';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { AuthContext } from './components/context/Context';
import 'react-toastify/dist/ReactToastify.css';
import ApiService from './components/service/ApiService';

let authData = ApiService.GetData();
if (authData) {
  ApiService.AuthorizedUser = {
    email: authData.email,
    token: authData.token
  }
}

const App = () => {
  const [authorized, setAuthorized] = useState(authData ? true : false);

  return (
    <AuthContext.Provider value={{ authorized, setAuthorized }}>
      <AppRouter />
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default App;
