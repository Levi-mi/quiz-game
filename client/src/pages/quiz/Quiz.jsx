import React, { useContext } from 'react'
import { CategoryContext } from '../../useManager/useContextManager';
import { PointsContext } from '../../useManager/useContextManager';
import Header from './components/Header';
import Choose from './components/Choose';
import Category from './components/Category';
import Questions from './components/Questions';
import Score from './components/Score';

const Quiz = () => {
    const { isSelected, chosenCategory } = useContext(CategoryContext);
    const { endQuiz } = useContext(PointsContext);

    return (
        <div>
            <Header />
            {endQuiz ? (
                <Score />
            ) : (
                <>
                    {!isSelected ? <Choose /> : <Category />}
                    {chosenCategory && <Questions />}
                </>
            )}
        </div>
    );
}

export default Quiz