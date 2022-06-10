import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useFetch from 'hooks/useFetch.jsx';

import Input from 'components/Input';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import Error from 'components/Error';

import constants from 'utils/constants';
import { generatePageTitle } from 'utils/helperFunctions';
import styles from './styles.module.scss';

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Mario');
    const [isPending, setIsPending] = useState(false);

    const blogDetailsUrl = constants.urls.blogDetailsUrl.replace(':id', id);
    const { data: blog, isLoading, error } = useFetch(blogDetailsUrl);

    const selectOptions = new Map();
    selectOptions.set('Mario', 'Mario');
    selectOptions.set('Yoshi', 'Yoshi');

    useEffect(() => {
        document.title = generatePageTitle('Update blog');

        if (blog) {
            setTitle(blog.title);
            setBody(blog.body);
            setAuthor(blog.author);
        }
    }, [blog]);

    const handleSumbit = (e) => {
        e.preventDefault();
        setIsPending(true);
        
        const blog = {
            title,
            body,
            author,
        };
        
        const blogUpdateUrl = constants.urls.blogDetailsUrl.replace(':id', id);
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
            { error && (<Error message={error} />) }
            { isLoading && <Spinner />}
            { blog && (
                <div className={styles['create-blog']}>
                    <h1 className={styles['create-blog__heading']}>Update "{blog.title}"</h1>
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
                            options={selectOptions}
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
