import React from 'react';
import { Loader2 } from 'lucide-react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    isLoading,
    leftIcon,
    rightIcon,
    className,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${isLoading ? styles.loading : ''} ${className || ''}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className={`${styles.spinner} animate-spin`} size={16} />}
            {!isLoading && leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
            <span className={styles.content}>{children}</span>
            {!isLoading && rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
        </button>
    );
}
