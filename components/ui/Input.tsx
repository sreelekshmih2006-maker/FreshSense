import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
}

export function Input({
    label,
    error,
    leftIcon,
    className = '',
    id,
    ...props
}: InputProps) {
    const inputId = id || React.useId();

    return (
        <div className={`${styles.container} ${className}`}>
            {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
            <div className={styles.inputWrapper}>
                {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
                <input
                    id={inputId}
                    className={`${styles.input} ${leftIcon ? styles.hasIcon : ''} ${error ? styles.hasError : ''}`}
                    {...props}
                />
            </div>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
}
