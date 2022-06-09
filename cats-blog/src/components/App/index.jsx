import styles from './styles.module.scss';

import Navbar from 'components/Navbar';
import Home from 'pages/Home';

function App() {
  return (
    <div className={styles['app-content']}>
      <Navbar />

      <div>
        <Home />
      </div>
    </div>
  );
}

export default App;
