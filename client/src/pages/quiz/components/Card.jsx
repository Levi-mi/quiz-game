import React, { useContext, useState } from 'react';
import { QuestionContext, CategoryContext } from '../../../useManager/useContextManager.jsx';
import { PointsContext } from '../../../useManager/useContextManager.jsx';
import axios from 'axios';
import URLs from '../../../constants/URLS.js';

const Card = ({ object, questionsLength }) => {
    const { chosenQuestion, setChosenQuestion, answers, setAnswers, questions } = useContext(QuestionContext);
    const { points, setPoints, setEndQuiz } = useContext(PointsContext);
    const { chosenCategory } = useContext(CategoryContext);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const trueAnswer = object.answer;

    const handleNextClick = () => {
        setChosenQuestion(chosenQuestion + 1);
        setSelectedAnswer(null);
    };

    const handleAnswer = (index) => {
        if (selectedAnswer === null) {
            setSelectedAnswer(index);
            if (trueAnswer === index) {
                setPoints((prevPoints) => +prevPoints + 10);
            }
            setAnswers((prevAnswers) => [...prevAnswers, index]);
        }
        console.log(object);
    };

    const handleScoreClick = async () => {
        setEndQuiz(true);
        try {
            const userInfo = await axios.get(URLs.info, { withCredentials: true });
            
            const quizRecord = {
                userId: userInfo.data._id,
                username: userInfo.data.username,
                category: chosenCategory,
                difficulty: object.difficulty,
                score: points,
                timeTaken: 0,
                correctAnswers: points / 10,
                questions: questions.map(q => q.question),
                randomQuestions: true
            };
            
            await axios.post(URLs.newRecord, quizRecord, { withCredentials: true });
        } catch (error) {
            console.error('Error saving quiz record:', error);
        }
    };

    const getClassName = (index) => {
        if (selectedAnswer !== null) {
            if (selectedAnswer === index) {
                return trueAnswer === index ? 'true' : 'false';
            }
            if (trueAnswer === index) {
                return 'true';
            }
        }
        return 'answer-button';
    };

    return (
        <div>
            <p>{object.difficulty}</p>
            <h3 className='text'>{object.question}</h3>
            <div className='answers'>
                {object.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className={getClassName(index)}>
                        {option}
                    </button>
                ))}
            </div>
            {questionsLength - 1 > chosenQuestion ? (
                <button className={`next-button`} onClick={handleNextClick} disabled={selectedAnswer === null}>Next</button>
            ) : (
                <button className='score-button' onClick={handleScoreClick} disabled={selectedAnswer === null}>see your score</button>
            )}
        </div>
    );
};

export default Card;
