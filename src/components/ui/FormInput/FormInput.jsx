import React, { useState } from "react";
import styles from './FormInput.module.scss';

const FormInput = ({ onChangeCallback, ...props }) => {
    return (
        <div className={styles['input-wrapper']}>
            <input
                {...props}
            />
        </div>
    );
}

export default FormInput;