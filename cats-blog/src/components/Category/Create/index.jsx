import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from 'components/Input';
import Button from 'components/Button';
import FormErrors from 'components/FormErrors';

import styles from './styles.module.scss';
import constants from 'utils/constants';
import { generatePageTitle } from 'utils/helperFunctions';

function Create() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        document.title = generatePageTitle('Create new category');
    }, []);

    const handleValidation = () => {
        let formIsValid = true;
        let errors = {};

        // Name
        if (!name) {
            formIsValid = false;
            errors['name'] = "Name cannot be empty!";
        } else if (name.length < 3) {
            formIsValid = false;
            errors['name'] = "Name's length must be more than 3 symbols!";
        }
        
        setFormErrors(errors);
        return formIsValid;
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        if (!handleValidation()) {
            return;
        }
        
        setIsPending(true);
        
        const category = {
            name
        };
        
        fetch(constants.urls.categoriesUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        })
            .then(_ => {
                setName('');
                setIsPending(false);

                navigate(constants.routes.homeRoute, { replace: true });
            });
    }

    return (
        <div className={styles['create-category']}>
            <h1 className={styles['create-category__heading']}>Create a new category</h1>
            <FormErrors formErrors={formErrors} />
            <form>
                <Input 
                    key='name'
                    id='name' 
                    name='name'
                    isRequired={true} 
                    label='Category Name' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                />
                
                {
                    !isPending ? ( 
                        <Button
                            onClick={handleSumbit} 
                            text="Create Category"
                        />
                    ) : (
                        <Button
                            isDisabled={true} 
                            text="Creating Category..."
                        />
                    )
                }
            </form>
        </div>
    );
} 

export default Create;
