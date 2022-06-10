import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import NotFound from 'pages/NotFound';

import Navbar from 'components/Navbar';
import Create from 'components/Blog/Create';
import Details from 'components/Blog/Details';

import styles from './styles.module.scss';
import constants from 'utils/constants';

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
            <Route path={routes.blogDetailsRoute} element={<Details />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
