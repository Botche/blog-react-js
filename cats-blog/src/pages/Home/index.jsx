import useFetch from "hooks/useFetch.jsx";

import BlogList from "components/Blog/BlogList";
import Spinner from "components/Spinner";
import Error from "components/Error";

import constants from "utils/constants";

function Home() {
    const {
        data: blogs, 
        isLoading, 
        error
    } = useFetch(constants.blogsUrl);

    return (
        <div>
            { error && (<Error message={error} />) }
            { isLoading && <Spinner />}
            { blogs && <BlogList blogs={blogs} title="All Blogs!" /> }
        </div>
    )
}

export default Home;