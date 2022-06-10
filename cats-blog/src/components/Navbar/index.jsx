import { Link } from 'react-router-dom';

import constants from "utils/constants";
import styles from "./styles.module.scss";

function Navbar() {
    const routes = constants.routes;

    return (
        <nav className={styles.navbar}>
            <Link className={styles['navbar__link--project-name']} to={routes.homeRoute}>The cat blog</Link>
            <div className={styles.navbar__links}>
                <Link className={styles.navbar__link} to={routes.homeRoute}>Home</Link>
                <Link className={styles.navbar__link} to={routes.newBlogRoute}>New blog post</Link>
                <Link className={styles.navbar__link} to={routes.newCategoryRoute}>New category post</Link>
            </div>
        </nav>
    );
}

export default Navbar;