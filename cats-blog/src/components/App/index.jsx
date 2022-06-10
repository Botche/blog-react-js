import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from 'components/Navbar';
import Home from 'pages/Home';

import styles from './styles.module.scss';
import constants from 'utils/constants';
import Create from 'components/Blog/Create';

function App() {
  const routes = constants.routes;

  return (
    <Router>
      <div className={styles['app-content']}>
        <Navbar />

        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path={routes.newBlogRoute} element={<Create />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
