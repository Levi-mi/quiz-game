import React, { useContext } from 'react';
import { CategoryContext } from '../../../useManager/useContextManager.jsx';
import Loader from '../../../assets/Loader';
import Error from '../../../assets/Error';
import useAxiosGet from '../../../hooks/useAxiosGet.jsx';
import URLs from '../../../contants/URLS.js';

const Category = () => {
    const { setChosenCategory, chosenCategory, setIsSelected } = useContext(CategoryContext);

    const { data: categories, error, isLoading } = chosenCategory !== 'random' ? useAxiosGet({
        URI: URLs.categories,
        initialValue: []
    }) : { data: [], error: null, isLoading: false };

    const handleBackClick = () => {
        setIsSelected(false);
    };

    return (
        <>{error ? <Error status={error} /> : isLoading ? <Loader /> : !chosenCategory && <div className='content-container'>
            <button className='back-button' onClick={handleBackClick}>back</button>
            <h3 className='content-title'>Select a category</h3>
            {categories.map((category, index) => (
                <button
                    className='category-button'
                    onClick={() => setChosenCategory(category.code)}
                    key={index}>
                    {category.code}
                </button>
            ))}
        </div>}
        </>
    );
};

export default Category;