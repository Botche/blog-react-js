import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import NotFound from 'pages/NotFound';

import Navbar from 'components/Navbar';
import { default as CreateBlog } from 'pages/Blog/Create';
import Details from 'pages/Blog/Details';
import Update from 'pages/Blog/Update';
import CreateCategory from 'pages/CreateCategory';

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

            <Route path={routes.newBlogRoute} element={<CreateBlog />} />
            <Route path={routes.blogDetailsRoute} element={<Details />} />
            <Route path={routes.blogUpdateRoute} element={<Update />} />

            <Route path={routes.newCategoryRoute} element={<CreateCategory />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
