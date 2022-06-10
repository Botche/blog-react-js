const baseUrl = 'http://localhost:8000'; 

const constants = {
    routes: {
        homeRoute: '/',
        newBlogRoute: '/new-blog',
        blogDetailsRoute: '/blogs/:id',
        blogUpdateRoute: '/blogs/update/:id',
    },
    urls: {
        baseUrl: baseUrl,
        blogsUrl: baseUrl + '/blogs',
        blogDetailsUrl: baseUrl + '/blogs/:id',
    },
};

export default constants;
