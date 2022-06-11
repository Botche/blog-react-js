import { useParams, useNavigate } from 'react-router-dom';

import Spinner from 'components/Spinner';
import Error from 'components/Error';

import constants from 'utils/constants';
import styles from './styles.module.scss';
import Button from 'components/Button';
import { useEffect, useState } from 'react';
import { generatePageTitle } from 'utils/helperFunctions';
import messages from 'utils/messages';

function Details() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState();
    const [category, setCategory] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        const blogDetailsUrl = constants.urls.blogUrl.replace(':id', id);
        fetch(blogDetailsUrl, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.ok === false) {
                    throw Error(messages.errorFetchingResourse); 
                }

                return response.json();
            })
            .then(blog => {
                document.title = generatePageTitle(blog.title);
                const categoryUrl = constants.urls.categoryUrl.replace(':id', blog.category);
                fetch(categoryUrl, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then(response => {
                        if (response.ok === false) {
                            throw Error(messages.errorFetchingResourse); 
                        }
        
                        return response.json();
                    })
                    .then(category => {
                        setError(null);
                        setIsLoading(false);
                        setBlog(blog);
                        setCategory(category);
                    });
            })
            .catch(error => {
                setIsLoading(false);
                setError(error.message);
            });
    }, [id]);

    const handleDelete = () => {
        const deleteBlogUrl = constants.urls.blogUrl.replace(':id', id);
        fetch(deleteBlogUrl, {
            method: 'DELETE',
        })
            .then(_ => {
                navigate(constants.routes.homeRoute, { replace: true });
            })
    };

    const handleUpdate = () => {
        const updateBlogUrl = constants.routes.blogUpdateRoute.replace(':id', id);
        navigate(updateBlogUrl);
    };

    return (
        <div>
            { error && (<Error message={error} />) }
            { isLoading && <Spinner />}
            { blog && (
                <article className={styles['blog-details']}>
                    <h1 className={styles['blog-details__heading']}>{blog.title}</h1>
                    <p className={styles['blog-details__category']}>Category: {category.name}</p>
                    <p className={styles['blog-details__author']}>Written by: {blog.author}</p>
                    <div className={styles['blog-details__content']}>{blog.body}</div>

                    <div className={styles['blog-details__buttons-container']}>
                        <Button 
                            text='Update'
                            onClick={handleUpdate}
                        />

                        <Button 
                            text='Delete'
                            onClick={handleDelete}
                        />
                    </div>
                </article>
            ) }
        </div>
    );
}

export default Details;
