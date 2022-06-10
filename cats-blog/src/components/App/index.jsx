import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from 'components/Navbar';
import Home from 'pages/Home';

import styles from './styles.module.scss';
import constants from 'utils/constants';

function App() {


  return (
    <Router>
      <div className={styles['app-content']}>
        <Navbar />

        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path={constants.newBlogRoute} element={<></>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
