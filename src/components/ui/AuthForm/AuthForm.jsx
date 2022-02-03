import React, { useState } from "react";
import Input from "../Input/Input";

import '../../../assets/scss/authreg.scss';

import EmailSvg from '../../../assets/images/svg/email.svg';
import PasswordSvg from '../../../assets/images/svg/password.svg';

const AuthForm = ({ submitHandler }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const submit = (event) => {
        event.preventDefault();
        if (submitHandler) submitHandler(formData);
    }

    return (
        <form className="form data-form" onSubmit={event => submit(event)}>
            <h1 className="title text-dark">Авторизация</h1>
            <div className="form-inner">
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
                    </div>
                </div>
            </div>
            <button className="btn btn-dark" type="submit">Войти</button>
        </form>
    );
}

export default AuthForm;