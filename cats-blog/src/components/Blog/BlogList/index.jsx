import Blog from '..';

import styles from './styles.module.scss';

function BlogList(props) {
    const blogs = props.blogs;
    const blogStyles = {
        'blog-preview': styles['blog-preview'],
        'blog-preview__heading': styles['blog-preview__heading'],
        'blog-preview__author': styles['blog-preview__author'],
    };

    return (
        <div>
            <h2>{props.title}</h2>

            <div>
                {blogs.map(blog => (<Blog blog={blog} styles={blogStyles} key={blog.id} />))}
            </div>
        </div>
    );
}

export default BlogList;
