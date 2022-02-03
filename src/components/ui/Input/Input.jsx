import React, { useState } from "react";
import './Input.scss';

const Input = ({
    passwordField,
    placeholderPasswordShown = "Введите пароль",
    placeholderPasswordHidden = "••••••••••••••",
    value = '',
    onChangeHandler = event => {},
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const switchShowPassword = () => {
        setShowPassword(!showPassword);
    }

    if (passwordField) {
        return (
            <div className={'input-wrapper'}>
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={showPassword ? placeholderPasswordShown : placeholderPasswordHidden}
                    value={value}
                    onChange={event => onChangeHandler(event)}
                    {...props}
                />
                <div className={'input-btn fa-lg ' + (showPassword ? 'fa-eye' : 'fa-eye-slash')} onClick={switchShowPassword}></div>
            </div>
        )
    }

    return (
        <div className={'input-wrapper'}>
            <input
                value={value}
                onChange={event => onChangeHandler(event)}
                {...props}
            />
        </div>
    );
}

export default Input;