import { useEffect } from 'react';

import Blog from 'components/Blog';

import styles from './styles.module.scss';
import { generatePageTitle } from 'utils/helperFunctions';

function BlogList(props) {
    const blogs = props.blogs;
    const blogStyles = {
        'blog-preview': styles['blog-preview'],
        'blog-preview__heading': styles['blog-preview__heading'],
        'blog-preview__author': styles['blog-preview__author'],
    };

    useEffect(() => {
        document.title = generatePageTitle('Blogs');
    }, []);

    return (
        <div>
            <h1>{props.title}</h1>

            <section>
                {blogs.map(blog => (<Blog blog={blog} styles={blogStyles} key={blog.id} />))}
            </section>
        </div>
    );
}

export default BlogList;
