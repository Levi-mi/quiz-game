import { createContext, useState } from 'react';

export const CategoryContext = createContext(null);
export const QuestionContext = createContext(null);
export const PointsContext = createContext(null);

const UseStateManager = ({ children }) => {
    const [chosenCategory, setChosenCategory] = useState('');
    const [chosenQuestion, setChosenQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [difficulty, setDifficulty] = useState('');
    const [points, setPoints] = useState(0);
    const [endQuiz, setEndQuiz] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [answers, setAnswers] = useState([]);

    return (

        <CategoryContext.Provider value={{ difficulty, setDifficulty, chosenCategory, setChosenCategory, isSelected, setIsSelected }}>
            <QuestionContext.Provider value={{ chosenQuestion, setChosenQuestion, questions, setQuestions, answers, setAnswers }}>
                <PointsContext.Provider value={{ points, setPoints, endQuiz, setEndQuiz }}>
                    {children}
                </PointsContext.Provider>
            </QuestionContext.Provider>
        </CategoryContext.Provider>
    );
};

export default UseStateManager;
