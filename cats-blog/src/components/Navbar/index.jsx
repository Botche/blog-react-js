import styles from "./styles.module.scss";

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <h1>The cat blog</h1>
            <div className={styles.navbar__links}>
                <a className={styles.navbar__link} href="/">Home</a>
                <a className={styles.navbar__link} href="/create">New blog post</a>
            </div>
        </nav>
    );
}

export default Navbar;