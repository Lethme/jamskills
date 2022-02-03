import React, { useContext, useEffect, useState } from "react";
import classes from './Auth.module.scss';
import AuthForm from "../../ui/AuthForm/AuthForm";
import Controls from "../../ui/Controls/Controls";
import ApiService from "../../service/ApiService";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/Context";
import ToastService from "../../service/ToastService";

const Auth = () => {
    let mounted = true;
    const [showControls, setShowControls] = useState(false);
    const {authorized, setAuthorized} = useContext(AuthContext);
    const [sendData, dataSending, dataError] = useFetch(async (data) => {
        let toastID = ToastService.Loading('Авторизация...');
        ApiService.Authorize({
            email: data.email,
            password: data.password
        }).then(response => {
            ApiService.AuthorizedUser = {
                email: data.email,
                token: response.data.token
            }
            ApiService.SaveData();
            if (mounted) setAuthorized(true);
        }).catch(error => {
            if (error.response) {
                Object.values(error.response.data).forEach(errors => {
                    errors.forEach(message => {
                        ToastService.Error(message);
                    })
                });
            }
        }).finally(() => {
            ToastService.Remove(toastID);
        });
    });
    const submit = (data) => {
        sendData(data);
    }
    useEffect(() => {
        return () => {
            mounted = false;
        }
    }, [])
    return (
        <div className="auth-wrapper xs:flex-row xs:h-auto sm:h-vh-100">
            <Controls
                show={showControls}
                title="Добро Пожаловать!"
                subtitle="Jamskills - это сервис для автоматизации оценки сотрудников и кандидатов!"
                text="Если Вы еще не зарегистрированны, создайте свой кабинет"
                btnText="Создать"
                btnLink="/register"
            />
            <div className="form xs:flex-column xs:flex-justify-center xs:flex-align-center">
                <button className={'controls-toggler ' + (showControls ? 'show' : '')} onClick={event => setShowControls(!showControls)} />
                <AuthForm submitHandler={submit} />
                <div className="container-fluid copyright">
                     <p className="copyright-text">&copy; 2022 Jamskills</p>
                </div>
            </div>
        </div>
    );
}

export default Auth;