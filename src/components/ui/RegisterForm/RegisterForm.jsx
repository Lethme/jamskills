import React, { useState } from "react";
import Input from "../Input/Input";

import '../../../assets/scss/authreg.scss';

import UserSvg from '../../../assets/images/svg/user.svg';
import EmailSvg from '../../../assets/images/svg/email.svg';
import PasswordSvg from '../../../assets/images/svg/password.svg';

const RegisterForm = ({ submitHandler }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        patronymic: '',
        email: '',
        password: '',
        confirm: '',
        accept: false
    });

    const submit = (event) => {
        event.preventDefault();
        if (submitHandler) submitHandler(formData);
    }

    return (
        <form className="form data-form" onSubmit={event => submit(event)}>
            <h1 className="title text-dark">Регистрация</h1>
            <div className="form-inner">
                <div className="input-group-wrapper">
                    <div className="image">
                        <img src={UserSvg} alt="" />
                    </div>
                    <div className="inputs">
                        <Input
                            required
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChangeHandler={event => setFormData({ ...formData, lastName: event.target.value })}
                            placeholder="Фамилия"
                        />
                        <div className="inputs-wrapper xs:flex-row xs:col-24 md:col-8">
                            <Input
                                required
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChangeHandler={event => setFormData({ ...formData, firstName: event.target.value })}
                                placeholder="Имя"
                            />
                        </div>
                        <div className="inputs-wrapper xs:flex-row xs:col-24 md:col-16 md:pl-10">
                            <Input
                                type="text"
                                name="patronymic"
                                value={formData.patronymic}
                                onChangeHandler={event => setFormData({ ...formData, patronymic: event.target.value })}
                                placeholder="Отчество"
                            />
                        </div>
                    </div>
                </div>
                <div className="input-group-wrapper">
                    <div className="image">
                        <img src={EmailSvg} alt="" />
                    </div>
                    <div className="inputs">
                        <Input
                            required
                            type="email"
                            name="name"
                            value={formData.email}
                            onChangeHandler={event => setFormData({ ...formData, email: event.target.value })}
                            placeholder="example@gmail.com"
                        />
                    </div>
                </div>
                <div className="input-group-wrapper">
                    <div className="image">
                        <img src={PasswordSvg} alt="" />
                    </div>
                    <div className="inputs">
                        <Input
                            required
                            passwordField={true}
                            name="password"
                            value={formData.password}
                            onChangeHandler={event => setFormData({ ...formData, password: event.target.value })}
                        />
                        <Input
                            required
                            type="password"
                            name="confirm"
                            placeholder="Подтвердите пароль"
                            value={formData.confirm}
                            onChangeHandler={event => setFormData({ ...formData, confirm: event.target.value })}
                        />
                        <label htmlFor="acceptPolicies" className="checkbox">
                            <input
                                id="acceptPolicies"
                                name="acceptPolicies"
                                type="checkbox"
                                checked={formData.accept}
                                onChange={event => setFormData({ ...formData, accept: event.target.checked })}
                            />
                            <span className="box"></span>
                            <p className="label">Принимаю <a href="#" className="link">Пользовательское соглашение и Политику конфиденциальности</a></p>
                        </label>
                    </div>
                </div>
            </div>
            <button className="btn btn-dark" type="submit">Создать</button>
        </form>
    );
}

export default RegisterForm;