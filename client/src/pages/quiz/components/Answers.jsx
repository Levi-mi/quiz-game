import React, { useContext } from 'react'
import { QuestionContext } from '../../../useManager/useContextManager.jsx';

const Answers = ({ object, currentQuestion }) => {

    console.log(object);

    const { answers } = useContext(QuestionContext);

    const getClassName = (index) => {
        if (index == object.answer) {
            return 'true ';
        } else if (index == answers[currentQuestion]) {
            return 'false';
        } else {
            return '';
        }
    }

    return (
        <div>
            <div>
                <div className='answers'>
                    <h3 className='text'>{object.question}</h3>
                    {object.options.map((option, index) => (
                        <p
                            key={index}
                            className={getClassName(index)}>
                            {option}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Answers 