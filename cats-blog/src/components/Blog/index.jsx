import { Link } from 'react-router-dom';
import constants from 'utils/constants';

function Blog(props) {
    const blog = props.blog;
    const blogDetailsRoute = constants.routes.blogDetailsRoute.replace(':id', blog.id);

    return (
        <article className={props.styles['blog-preview']} key={blog.id}>
            <Link to={blogDetailsRoute}>
                <h3 className={props.styles['blog-preview__heading']}>{blog.title}</h3>
                <p className={props.styles['blog-preview__author']}>
                    Written by: {blog.author}
                </p>
            </Link>
        </article>
    )
}

export default Blog;
