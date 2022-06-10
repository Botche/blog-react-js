import { useParams } from 'react-router-dom';

import useFetch from 'hooks/useFetch.jsx';

import Spinner from 'components/Spinner';
import Error from 'components/Error';

import constants from 'utils/constants';
import styles from './styles.module.scss';

function Details() {
    const { id } = useParams();
    const blogDetailsUrl = constants.urls.blogDetailsUrl.replace(':id', id);
    const { data: blog, error, isLoading } = useFetch(blogDetailsUrl);

    return (
        <div>
            { error && (<Error message={error} />) }
            { isLoading && <Spinner />}
            { blog && (
                <article className={styles['blog-details']}>
                    <h2 className={styles['blog-details__heading']}>{blog.title}</h2>
                    <p className={styles['blog-details__author']}>Written by: {blog.author}</p>
                    <div className={styles['blog-details__content']}>{blog.body}</div>
                </article>
            ) }
        </div>
    );
}

export default Details;
