import React from 'react'
import styles from './Error.module.css';

const Error = ({ status }) => {
    return (
        <div className={styles.error} >
            <h1 className={styles.status}>{status}</h1>
            <p>Something went wrong..</p>
        </div>
    )
}

export default Error