function Navbar() {
    return (
        <nav className="navbar">
            <h1>The cat blog</h1>
            <div className="navbar__links">
                <a href="/">Home</a>
                <a href="/create">New blog post</a>
            </div>
        </nav>
    );
}

export default Navbar;