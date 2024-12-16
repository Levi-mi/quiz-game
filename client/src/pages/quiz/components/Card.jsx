import React, { useContext, useState } from 'react';
import { QuestionContext } from '../../../useManager/useContextManager.jsx';
import { PointsContext } from '../../../useManager/useContextManager.jsx';
import Questions from './Questions.jsx';

const Card = ({ object, questionsLength }) => {
    const { chosenQuestion, setChosenQuestion, answers, setAnswers } = useContext(QuestionContext);
    const { setPoints, endQuiz, setEndQuiz } = useContext(PointsContext);
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

    const handleScoreClick = () => {
        setEndQuiz(true);
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
