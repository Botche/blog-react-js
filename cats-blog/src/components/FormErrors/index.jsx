import styles from './styles.module.scss';

function FormErrors({ formErrors }) {
    return (
        <div className={styles['form-errors']}>
            {Object.keys(formErrors).map((fieldName, i) => {
                if(formErrors[fieldName].length > 0){
                    return (
                        <p className={styles['form-errors__error']} key={i}>{formErrors[fieldName]}</p>
                    );
                } else {
                    return '';
                }
            })}
        </div>
    );
}

export default FormErrors;
