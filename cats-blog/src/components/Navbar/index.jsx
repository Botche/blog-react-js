import { Link } from 'react-router-dom';

import constants from "utils/constants";
import styles from "./styles.module.scss";

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <h1>The cat blog</h1>
            <div className={styles.navbar__links}>
                <Link className={styles.navbar__link} to={constants.homeRoute}>Home</Link>
                <Link className={styles.navbar__link} to={constants.newBlogRoute}>New blog post</Link>
            </div>
        </nav>
    );
}

export default Navbar;