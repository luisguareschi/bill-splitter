import styles from "./Button.module.css";

interface props {
    children?: any;
    onClick: any;
    variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'grey';
    className?: string;
}

const Button = ({children, onClick, variant, className}:props) => {
    return (
        <button className={`${styles.button} ${styles[variant]} ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button