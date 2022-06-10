import { Link } from 'react-router-dom';
import constants from 'utils/constants';

function Blog(props) {
    const blog = props.blog;
    const blogDetailsRoute = constants.routes.blogDetailsRoute.replace(':id', blog.id);

    const generateShortText = (text) => {
        const symbolsToTake = 200;
        let shortenText = text.substring(0, symbolsToTake);
        if (text.length > symbolsToTake) {
            shortenText += '...';
        }

        return shortenText;
    };

    return (
        <article className={props.styles['blog-preview']} key={blog.id}>
            <Link to={blogDetailsRoute}>
                <h3 className={props.styles['blog-preview__heading']}>{blog.title}</h3>
                <p>
                    {generateShortText(blog.body)}
                </p>
                <p className={props.styles['blog-preview__author']}>
                    Written by: {blog.author}
                </p>
            </Link>
        </article>
    )
}

export default Blog;
