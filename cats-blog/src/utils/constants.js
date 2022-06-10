const baseUrl = 'http://localhost:8000'; 

const constants = {
    routes: {
        homeRoute: '/',

        newBlogRoute: '/new-blog',
        blogDetailsRoute: '/blogs/:id',
        blogUpdateRoute: '/blogs/update/:id',

        newCategoryRoute: '/new-category',
        categoryDetailsRoute: '/categories/:id',
    },
    urls: {
        baseUrl: baseUrl,

        blogsUrl: baseUrl + '/blogs',
        blogUrl: baseUrl + '/blogs/:id',

        categoriesUrl: baseUrl + '/categories',
        categoryUrl: baseUrl + '/categories/:id',
    },
};

export default constants;
