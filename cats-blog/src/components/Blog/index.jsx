import { Link } from 'react-router-dom';

import useFetch from 'hooks/useFetch.jsx';

import constants from 'utils/constants';

function Blog(props) {
    const blog = props.blog;
    const blogDetailsRoute = constants.routes.blogDetailsRoute.replace(':id', blog.id);

    const categoryUrl = constants.urls.categoryUrl.replace(':id', blog.category);
    const { data: category } = useFetch(categoryUrl);

    const generateShortText = (text) => {
        const symbolsToTake = 200;
        let shortenText = text.substring(0, symbolsToTake);
        if (text.length > symbolsToTake) {
            shortenText += '...';
        }

        return shortenText;
    };

    return (
        <div className={props.styles['blog-preview']}>
            {category && (
                <article key={blog.id}>
                    <Link to={blogDetailsRoute}>
                        <h3 className={props.styles['blog-preview__heading']}>{blog.title} : {category.name}</h3>
                        <p>
                            {generateShortText(blog.body)}
                        </p>
                        <p className={props.styles['blog-preview__author']}>
                            Written by: {blog.author}
                        </p>
                    </Link>
                </article>
            )}
        </div>
    )
}

export default Blog;
