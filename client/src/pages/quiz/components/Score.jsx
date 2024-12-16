import React, { useContext, useState } from 'react'
import { PointsContext, CategoryContext, QuestionContext } from '../../../useManager/useContextManager.jsx';
import Answers from './Answers.jsx';
import Loader from '../../../assets/Loader.jsx';
import Error from '../../../assets/Error.jsx';
import useAxiosGet from '../../../hooks/useAxiosGet.jsx';

const Score = () => {
    const { points, setPoints, endQuiz, setEndQuiz } = useContext(PointsContext);
    const { chosenCategory, setChosenCategory, setIsSelected } = useContext(CategoryContext);
    const { setQuestions, chosenQuestion, setChosenQuestion, setAnswers } = useContext(QuestionContext);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [flag, setFlag] = useState(true);

    const { data: questions, error: isError, isLoading: loading } = useAxiosGet({
        URI: `http://localhost:3001/questions/${chosenCategory}`,
        initialValue: [],
        deps: [chosenCategory]
    })

    const handleBackClick = () => {
        setEndQuiz(false);
        setChosenCategory('');
        setQuestions([]);
        setPoints(0);
        setChosenQuestion(0);
        setIsSelected(false);
        setAnswers([]);
    }

    const handleSeeClick = () => {
        flag && setChosenQuestion(0);
        setFlag(!flag);
    };

    const handleNextClick = () => {
        if (chosenQuestion < questions.length) {
            setChosenQuestion(chosenQuestion + 1);
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePreviousClick = () => {
        if (chosenQuestion > 0) {
            setChosenQuestion(chosenQuestion - 1);
            setCurrentQuestion(currentQuestion - 1);
        }
    };


    return (
        <>{endQuiz && <div className='content-container'>
            <h3>score</h3>
            <p className='text'>you got <strong>{points}</strong> points!</p>
            <button className='back-to-menu' onClick={handleBackClick}>back to main menu</button>
            {flag ? (<div>
                <button
                    className='show-btn' onClick={handleSeeClick} > Show Answers</button>
            </div>) :
                (<div>
                    <button
                        className='hide-btn' onClick={handleSeeClick}>Hide Answers
                    </button>
                    <br />
                    <button className='previous-button' onClick={handlePreviousClick} disabled={chosenQuestion === 0}>
                        Previous
                    </button>
                    <button className='next-button' onClick={handleNextClick} disabled={chosenQuestion === questions.length - 1}>
                        Next
                    </button>
                    <Answers object={questions[chosenQuestion]} questionsLength={questions.length} currentQuestion={currentQuestion} />

                </div>)
            }

        </div>}
        </>
    )
}

export default Score