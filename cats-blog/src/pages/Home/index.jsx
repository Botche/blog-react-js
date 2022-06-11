import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faBorderAll } from '@fortawesome/free-solid-svg-icons'

import useFetch from "hooks/useFetch.jsx";

import BlogList from "pages/Blog/BlogList";
import Spinner from "components/Spinner";
import Error from "components/Error";
import BlogGrid from "pages/Blog/BlogGrid";

import constants from "utils/constants";
import { generatePageTitle } from "utils/helperFunctions";
import styles from './styles.module.scss';

const dataVisualizationTypes = {
    list: 'List',
    grid: 'Grid',
};

function Home() {
    const [dataVisualizationType, setDataVisualizationType] = useState(dataVisualizationTypes.list);
    const {
        data: blogs, 
        isLoading, 
        error
    } = useFetch(constants.urls.blogsUrl);
    

    useEffect(() => {
        document.title = generatePageTitle('Blogs');
    }, []);

    const showBlogs = () => {
        if (blogs) {
            if (dataVisualizationType === dataVisualizationTypes.list) {
                return (<BlogList blogs={blogs} />);
            } else if (dataVisualizationType === dataVisualizationTypes.grid) {
                return (<BlogGrid blogs={blogs} />);
            }
        }
    };

    return (
        <div>
            <div className={styles['home-page__header']}>
                <h1 className={styles['home-page__heading']}>
                    All Blogs!
                </h1>

                <div className={styles['home-page__icons']}>
                    <span></span>
                    <span className={styles['home-page__icon']} onClick={() => setDataVisualizationType(dataVisualizationTypes.list)}>
                        <FontAwesomeIcon icon={faList} size="2x" />
                    </span>
                    <span className={styles['home-page__icon']} onClick={() => setDataVisualizationType(dataVisualizationTypes.grid)}>
                        <FontAwesomeIcon icon={faBorderAll} size="2x" />
                    </span>
                </div>
            </div>
            { error && (<Error message={error} />) }
            { isLoading && <Spinner />}
            { !isLoading && !error && showBlogs() }
        </div>
    )
}

export default Home;