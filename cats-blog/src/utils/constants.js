const baseUrl = 'http://localhost:8000'; 

const constants = {
    routes: {
        homeRoute: '/',
        newBlogRoute: '/new-blog',
        blogDetailsRoute: '/blogs/:id',
    },
    urls: {
        baseUrl: baseUrl,
        blogsUrl: baseUrl + '/blogs',
    },
};

export default constants;
