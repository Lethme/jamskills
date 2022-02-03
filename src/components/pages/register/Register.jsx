import React, { useContext, useState } from "react";
import classes from './Register.module.scss';
import RegisterForm from "../../ui/RegisterForm/RegisterForm";
import Controls from "../../ui/Controls/Controls";
import useFetch from "../../hooks/useFetch";
import ApiService from "../../service/ApiService";
import { AuthContext } from "../../context/Context";
import ToastService from "../../service/ToastService";
import { useNavigate } from "react-router-dom";

const Register = () => {
    let mounted = true;
    const [showControls, setShowControls] = useState(false);
    const { authorized, setAuthorized } = useContext(AuthContext);
    const navigate = useNavigate();
    const [sendData, dataSending, dataError] = useFetch(async (data) => {
        let toastID = ToastService.Loading('Рагистрация...');
        ApiService.Register({
            email: data.email,
            password: data.password,
            first_name: data.firstName,
            last_name: data.lastName,
            patronymic: data.patronymic
        }).then(response => {
            ToastService.Success('Вы успешно зарегистрированы!');
            navigate('/authorize');
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
        if (data.password === data.confirm) {
            if (data.accept) {
                sendData(data);
            } else {
                ToastService.Warning('Для продолжения необходимо принять Пользовательское соглашение и Политику конфиденциальности');
            }
        } else {
            ToastService.Error('Пароли не совпадают!');
        }
    }
    return (
        <div className="auth-wrapper xs:flex-row xs:h-auto sm:h-vh-100">
            <Controls
                show={showControls}
                title="Добро Пожаловать!"
                subtitle="Jamskills - это сервис для автоматизации оценки сотрудников и кандидатов!"
                text="Если Вы уже зарегистрированы, войдите в свой кабинет "
                btnText="Войти"
                btnLink="/authorize"
            />
            <div className="form xs:flex-column xs:flex-justify-center xs:flex-align-center">
                <button className={'controls-toggler ' + (showControls ? 'show' : '')} onClick={event => setShowControls(!showControls)} />
                <RegisterForm submitHandler={submit} />
                <div className="container-fluid copyright">
                     <p className="copyright-text">&copy; 2022 Jamskills</p>
                </div>
            </div>
        </div>
    );
}

export default Register;