import React, { useContext } from 'react'
import { CategoryContext } from '../../../useManager/useContextManager';
import styles from '../../../assets/Choose.module.css';

const Choose = () => {

    const { difficulty: Difficulty, setDifficulty, setChosenCategory, setIsSelected } = useContext(CategoryContext);

    const difficulties = ['easy', 'medium', 'hard', 'expert', 'random'];

    const handleClass = (difficulty) => {
        if (difficulty === Difficulty)
            return 'difficulty-button'
        else return 'chosen-difficulty'
    }

    return (
        <div className={styles.class}>
            <div>
                <button className={styles.button} onClick={() => setIsSelected(true)}>select a category</button>
                <button className={styles.button} onClick={() => { setChosenCategory('random'); setIsSelected(true); }}>random questions</button>
            </div>
            <div>
                <h6>select difficulty</h6>
                {difficulties.map((difficulty, index) => (<button className={handleClass(difficulty)} key={index} onClick={() => { setDifficulty(difficulty) }}>{difficulty}</button>))}
            </div>
        </div>
    )
}

export default Choose