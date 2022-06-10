import styles from './styles.module.scss';

function Input({
    id, 
    label, 
    name,
    type, 
    isRequired,
    value,
    onChange,
    options
}) {

    const generateInputBasedOnType = () => {
        switch (type) {
            case 'textarea':
                return (
                    <textarea
                        id={id}
                        className={styles['input-container__input']}
                        name={name}
                        required={isRequired}
                        value={value}
                        onChange={onChange}
                        rows={5}
                    ></textarea>
                );
            case 'select':
                const htmlOptions = [];
                
                for (const [value, text] of options.entries()) {
                    htmlOptions.push(<option key={value} value={value}>{text}</option>);
                }

                return (
                    <select
                        id={id}
                        className={styles['input-container__input']}
                        name={name}
                        value={value}
                        onChange={onChange}
                    >
                        {htmlOptions}
                    </select>
                );
            default: 
                return (
                    <input
                        id={id}
                        className={styles['input-container__input']}
                        name={name}
                        type={type}
                        required={isRequired}
                        value={value}
                        onChange={onChange}
                    />
                );
        }
    }

    return (
        <div>
            <label className={styles['input-container__label']} htmlFor={id}>
                {label}
            </label>
            {generateInputBasedOnType()}
        </div>
    );
} 

export default Input;
