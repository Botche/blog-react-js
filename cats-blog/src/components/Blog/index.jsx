function Blog(props) {
    const blog = props.blog;

    return (
        <div className={props.styles['blog-preview']} key={blog.id}>
            <h3 className={props.styles['blog-preview__heading']}>{blog.title}</h3>
            <p className={props.styles['blog-preview__author']}>
                Written by: {blog.author}
            </p>
        </div>
    )
}

export default Blog;
