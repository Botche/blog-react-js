import Blog from "components/Blog";

import styles from './styles.module.scss';

function BlogGrid(props) {
    const blogs = props.blogs;
    const blogStyles = {
        'blog-preview': styles['blog-preview'],
        'blog-preview__heading': styles['blog-preview__heading'],
        'blog-preview__author': styles['blog-preview__author'],
    };

    return (
        <section className={styles['blog-grid']}>
            {blogs.map(blog => (<Blog blog={blog} styles={blogStyles} key={blog.id} />))}
        </section>
    );
}

  export default BlogGrid;