import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    footer?: React.ReactNode;
    variant?: 'default' | 'glass' | 'outlined';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

export function Card({
    children,
    className = '',
    title,
    footer,
    variant = 'glass',
    padding = 'md',
    onClick
}: CardProps) {
    return (
        <div
            className={`${styles.card} ${styles[variant]} ${styles[`padding-${padding}`]} ${className}`}
            onClick={onClick}
        >
            {title && <div className={styles.header}><h3 className={styles.title}>{title}</h3></div>}
            <div className={styles.content}>{children}</div>
            {footer && <div className={styles.footer}>{footer}</div>}
        </div>
    );
}
