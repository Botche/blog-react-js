import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useFetch from 'hooks/useFetch.jsx';

import Input from 'components/Input';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import Error from 'components/Error';
import FormErrors from 'components/FormErrors';

import constants from 'utils/constants';
import { generatePageTitle } from 'utils/helperFunctions';
import styles from './styles.module.scss';

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Mario');
    const [categoryId, setCategoryId] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const blogDetailsUrl = constants.urls.blogUrl.replace(':id', id);
    const { data: blog, isLoading, error } = useFetch(blogDetailsUrl);
    const { data: categories, areCategoriesLoading, errorCategories } = useFetch(constants.urls.categoriesUrl);

    const selectOptions = new Map();
    selectOptions.set('Mario', 'Mario');
    selectOptions.set('Yoshi', 'Yoshi');

    useEffect(() => {
        document.title = generatePageTitle('Update blog');
        
        if (blog) {
            setTitle(blog.title);
            setBody(blog.body);
            setAuthor(blog.author);
            setCategoryId(blog.category);
        }
    }, [blog]);

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
        if (!categoryId) {
            formIsValid = false;
            errors['category'] = "Category cannot be empty!";
        } else if (!categories.some(c => c.id.toString() === categoryId)) {
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
            category: categoryId,
        };
        
        const blogUpdateUrl = constants.urls.blogUrl.replace(':id', id);
        fetch(blogUpdateUrl, {
            method: 'PATCH',
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

                const blogDetailsRoute = constants.routes.blogDetailsRoute.replace(':id', blog.id);
                navigate(blogDetailsRoute, { replace: true });
            });
    }

    return (
        <div> 
            { error && errorCategories && (<Error message={error} />) }
            { isLoading && areCategoriesLoading && <Spinner />}
            { blog && categories && (
                <div className={styles['create-blog']}>
                    <h1 className={styles['create-blog__heading']}>Update "{blog.title}"</h1>
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
                            isRequired={true} 
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            type='select'
                            options={selectOptions}
                        />
                        <Input 
                            key='cateogy'
                            id='cateogy' 
                            name='cateogy'
                            label='Blog Category'
                            isRequired={true}  
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            type='select'
                            options={generateCategoriesOptions()}
                        />
                        
                        {
                            !isPending ? ( 
                                <Button
                                    onClick={handleSumbit} 
                                    text="Update Blog"
                                />
                            ) : (
                                <Button
                                    isDisabled={true} 
                                    text="Updating Blog..."
                                />
                            )
                        }
                    </form>
                </div>
            )}
        </div>
    );
} 

export default Update;
