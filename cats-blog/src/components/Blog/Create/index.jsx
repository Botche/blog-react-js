import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useFetch from 'hooks/useFetch.jsx';

import Input from 'components/Input';
import Button from 'components/Button';
import FormErrors from 'components/FormErrors';
import Spinner from 'components/Spinner';
import Error from 'components/Error';

import styles from './styles.module.scss';
import constants from 'utils/constants';
import { generatePageTitle } from 'utils/helperFunctions';

function Create() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Mario');
    const [category, setCategory] = useState();
    const [isPending, setIsPending] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const { data: categories, isLoading, error } = useFetch(constants.urls.categoriesUrl);

    const authorOptions = new Map();
    authorOptions.set('Mario', 'Mario');
    authorOptions.set('Yoshi', 'Yoshi');

    useEffect(() => {
        document.title = generatePageTitle('Create new blog');

        if (categories) {
            setCategory(categories[0].id);
        }
    }, [categories]);

    const generateCategoriesOptions = () => {
        const categoriesOptions = new Map();

        categories.map(category => categoriesOptions.set(category.id, category.name));

        return categoriesOptions;
    };

    const handleValidation = () => {
        let formIsValid = true;
        let errors = {};

        // Title
        if (!title) {
            formIsValid = false;
            errors['title'] = "Title cannot be empty!";
        } else if (title.length < 3) {
            formIsValid = false;
            errors['title'] = "Title's length must be more than 3 symbols!";
        }

        // Body
        if (!body) {
            formIsValid = false;
            errors['body'] = "Body cannot be empty!";
        } else if (body.length <= 50) {
            formIsValid = false;
            errors['body'] = "Body's length must be more than or equal to 50 symbols!";
        }

        // Author
        const authors = [
            'Mario',
            'Yoshi',
        ];
        if (!author) {
            formIsValid = false;
            errors['author'] = "Author cannot be empty!";
        } else if (!authors.includes(author)) {
            formIsValid = false;
            errors['author'] = "The author must be selected from the dropdown!";
        }
        
        // Category
        if (!category) {
            formIsValid = false;
            errors['category'] = "Category cannot be empty!";
        } else if (!categories.some(c => c.id == category)) {
            formIsValid = false;
            errors['category'] = "The Category must be selected from the dropdown!";
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
        
        const blog = {
            title,
            body,
            author,
            category
        };
        
        fetch(constants.urls.blogsUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blog),
        })
            .then(response => response.json())
            .then(blog => {
                setTitle('');
                setBody('');
                setIsPending(false);

                const blogDetailsUrl = constants.routes.blogDetailsRoute.replace(':id', blog.id);
                navigate(blogDetailsUrl, { replace: true });
            });
    }

    return (
       <div>
            { error && (<Error message={error} />) }
            { isLoading && <Spinner />}
            { categories && (
                <div className={styles['create-blog']}>
                    <h1 className={styles['create-blog__heading']}>Add a new blog</h1>
                    <FormErrors formErrors={formErrors} />
                    <form>
                        <Input 
                            key='title'
                            id='title' 
                            name='title'
                            isRequired={true} 
                            label='Blog Title' 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type='text'
                        />
                        <Input 
                            key='body'
                            id='body' 
                            name='body'
                            isRequired={true} 
                            label='Blog Body' 
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            type='textarea'
                        />
                        <Input 
                            key='author'
                            id='author' 
                            name='author'
                            label='Blog Author' 
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            type='select'
                            options={authorOptions}
                        />
                        <Input 
                            key='cateogy'
                            id='cateogy' 
                            name='cateogy'
                            label='Blog Category' 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            type='select'
                            options={generateCategoriesOptions()}
                        />
                        
                        {
                            !isPending ? ( 
                                <Button
                                    onClick={handleSumbit} 
                                    text="Add Blog"
                                />
                            ) : (
                                <Button
                                    isDisabled={true} 
                                    text="Adding Blog..."
                                />
                            )
                        }
                    </form>
                </div>
            )}
       </div>
    );
} 

export default Create;
