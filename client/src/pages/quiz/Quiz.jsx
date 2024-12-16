import React, { useContext } from 'react'
import { CategoryContext } from '../../useManager/useContextManager';
import Header from './components/Header';
import Choose from './components/Choose';

import Category from './components/Category';

const Quiz = () => {
    const { isSelected } = useContext(CategoryContext);
    return (
        <div>
            <Header />
            {!isSelected ? <Choose /> : <Category />}
            {/* <Questions /> */}
        </div>
    );
}

export default Quiz