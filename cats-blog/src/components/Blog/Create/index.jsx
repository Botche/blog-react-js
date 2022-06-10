import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from 'components/Input';
import Button from 'components/Button';

import styles from './styles.module.scss';
import constants from 'utils/constants';
import { generatePageTitle } from 'utils/helperFunctions';

function Create() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Mario');
    const [isPending, setIsPending] = useState(false);

    const selectOptions = new Map();
    selectOptions.set('Mario', 'Mario');
    selectOptions.set('Yoshi', 'Yoshi');

    useEffect(() => {
        document.title = generatePageTitle('Create new blog');
    }, []);

    const handleSumbit = (e) => {
        e.preventDefault();
        setIsPending(true);
        
        const blog = {
            title,
            body,
            author,
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
        <div className={styles['create-blog']}>
            <h1 className={styles['create-blog__heading']}>Add a new blog</h1>
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
    );
} 

export default Create;
