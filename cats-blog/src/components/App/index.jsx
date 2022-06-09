import styles from './styles.module.scss';

import Navbar from 'components/Navbar';
import Home from 'pages/Home';

function App() {
  return (
    <div className={styles['app-content']}>
      <Navbar />

      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
