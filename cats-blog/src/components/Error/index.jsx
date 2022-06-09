import styles from './styles.module.scss';

function Error(props) {
    return (
        <div className={styles['error-container']}>
            <p className={styles['error-container__message']}>{props.message}</p>
        </div>
    );
}

export default Error;
