import React, { useContext } from 'react'
import { CategoryContext } from '../../useManager/useContextManager';
import Header from './components/Header';
import Choose from './components/Choose';
import Category from './components/Category';
import Questions from './components/Questions';

const Quiz = () => {
    const { isSelected, chosenCategory } = useContext(CategoryContext);
    return (
        <div>
            <Header />
            {!isSelected ? <Choose /> : <Category />}
            {chosenCategory && <Questions />}
        </div>
    );
}

export default Quiz