import { useParams, useNavigate } from 'react-router-dom';

import useFetch from 'hooks/useFetch.jsx';

import Spinner from 'components/Spinner';
import Error from 'components/Error';

import constants from 'utils/constants';
import styles from './styles.module.scss';
import Button from 'components/Button';
import { useEffect } from 'react';
import { generatePageTitle } from 'utils/helperFunctions';

function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const blogDetailsUrl = constants.urls.blogDetailsUrl.replace(':id', id);
    const { data: blog, error, isLoading } = useFetch(blogDetailsUrl);

    useEffect(() => {
        if (blog) {
            document.title = generatePageTitle(blog.title);
        }
    }, [blog]);

    const handleDelete = () => {
        const deleteBlogUrl = constants.urls.blogDetailsUrl.replace(':id', id);
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
