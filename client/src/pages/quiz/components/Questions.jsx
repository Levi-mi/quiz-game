import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import { CategoryContext, QuestionContext, PointsContext } from '../../../useManager/useContextManager.jsx';
import Loader from '../../../assets/Loader';
import Error from '../../../assets/Error';
import useAxiosGet from '../../../hooks/useAxiosGet.jsx';
import URLs from '../../../constants/URLS.js';

const Questions = () => {
    const { difficulty, setDifficulty, chosenCategory, setChosenCategory, setIsSelected } = useContext(CategoryContext);
    const { chosenQuestion, setChosenQuestion, setQuestions, setAnswers } = useContext(QuestionContext);
    const { endQuiz, points, setPoints } = useContext(PointsContext);

    const handleBackClick = () => {
        setChosenCategory('');
        setQuestions([]);
        setChosenQuestion(0);
        setAnswers([]);
        setPoints(0);

        if (chosenCategory === 'random' || !chosenCategory) {
            setIsSelected(false);
        }
    };

    const { data: questions, error: isError, isLoading: loading } = useAxiosGet({
        URI: `${URLs.questionsByCategory}//${chosenCategory}${difficulty ? `/${difficulty}` : ''}`
        ,
        initialValue: [],
        deps: [chosenCategory]
    })

    return (
        <>
            {isError ? <Error status={isError} /> : loading ? <Loader /> : endQuiz || questions.length > 0 && <div className='content-container'>
                <div className='header-container'>
                    <button className='back-button' onClick={handleBackClick}>exit</button>
                    <p>Points: {points}</p>
                </div>
                <h2 className='content-title'>{chosenCategory}</h2>
                <Card object={questions[chosenQuestion]} questionsLength={questions.length} />
            </div>}
        </>
    );
};

export default Questions;
