import styles from './styles.module.scss';

function Button({
    text,
    onClick,
    isDisabled
}) {
    return (
        <div className={styles['button-container']}>
            <button
                disabled={isDisabled}
                onClick={onClick} 
                className={styles['button-container__button']}
            >
                {text}
            </button>
        </div>
    );
} 

export default Button;
