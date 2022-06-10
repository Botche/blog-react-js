import { useParams } from 'react-router-dom';

import styles from './styles.module.scss';

function Details() {
    const { id } = useParams();

    return (
        <div>
            Blog details - {id}
        </div>
    );
}

export default Details;
