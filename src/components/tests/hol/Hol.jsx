import React, { useContext, useState, useEffect } from 'react';
import { Steps, Typography, Progress } from 'antd';
import ToastService from '../../service/ToastService';
import { AuthContext } from '../../context/Context';

import styles from './Hol.module.scss';
import { useParams } from 'react-router';
import useFetch from '../../hooks/useFetch';
import ApiService from '../../service/ApiService';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Step } = Steps;

const Tests = [{
    index: 1,
    question: "Какую профессию вы бы предпочли?",
    answers: {
        left: {
            name: "R",
            text: "Автомеханик"
        },
        right: {
            name: "I",
            text: "Биофизик"
        }
    }
}, {
    index: 2,
    question: "Какую профессию вы бы предпочли?",
    answers: {
        left: {
            name: "R",
            text: "Егерь"
        },
        right: {
            name: "S",
            text: "Интервьюер"
        }
    }
}, {
    index: 3,
    question: "Какую профессию вы бы предпочли?",
    answers: {
        left: {
            name: "R",
            text: "Кондитер"
        },
        right: {
            name: "C",
            text: "Делопроизводитель"
        }
    }
}];

const Hol = () => {
    const params = useParams();
    const [testState, setTestState] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(-1);
    const [chosenAnswer, setChosenAnswer] = useState('');
    const [result, setResult] = useState([]);
    const [progress, setProgress] = useState(0);
    const { authorized, setAuthorized } = useContext(AuthContext);
    const navigate = useNavigate();
    const setQuestion = (questionIndex) => {
        if (!testState) {
            setTestState(1);
            setCurrentQuestion(0);
        } else {
            if (questionIndex <= Tests.length) {
                if (!chosenAnswer) {
                    ToastService.Warning("Необходимо выбрать один из вариантов");
                } else {
                    setResult([
                        ...result,
                        {
                            index: Tests[currentQuestion].index,
                            name: chosenAnswer
                        }
                    ]);
                    setProgress(progress + Math.round(100 / Tests.length));
                    setChosenAnswer('');
                    if (questionIndex !== Tests.length) {
                        setCurrentQuestion(questionIndex);
                    } else {
                        setTestState(2);
                        setProgress(100);
                    }
                }
            }
        }
    }
    const [sendAnswer, sendingAnswer, sendingAnswerError] = useFetch(async (data) => {
        let toastID = ToastService.Loading('Сохранение результата...');
        ApiService.SendHolAnswers(params.id, data).then(response => {
            ToastService.Success('Ответы успешно сохранены!');
        }).catch(error => {
            if (error.response) {
                ToastService.Error(error.response.data.detail);
                ApiService.RemoveData();
                setAuthorized(false);
            }
        }).finally(() => {
            ToastService.Remove(toastID);
            navigate('/testing');
        });
    });

    useEffect(() => {
        if (testState === 2) {
            sendAnswer(result);
        }
    }, [testState]);

    const renderTest = () => {
        switch (testState) {
            default: {
                return (
                    <div className={styles['test-container'] + " container"}>
                        <Title>Тест №_</Title>
                        <Title style={{ fontWeight: 400 }} level={3}>Вам попарно будут представлены различные профессии, например:</Title>
                        <div className="answers-wrapper xs:flex-column md:flex-row xs:flex-justify-center xs:flex-align-center">
                            <div className="answer-wrapper">
                                <input className={styles['answer-radio']} type="radio" name="answerRadio" id="left" />
                                <label htmlFor="left" className={styles['answer-label']}><Title className={styles['answer-title']} style={{fontWeight: 500}} level={3}>Зоотехник</Title></label>
                            </div>
                            <div className="answer-wrapper">
                                <input className={styles['answer-radio']} type="radio" name="answerRadio" id="right" />
                                <label htmlFor="right" className={styles['answer-label']}><Title className={styles['answer-title']} style={{fontWeight: 500}} level={3}>Главный врач</Title></label>
                            </div>
                        </div>
                        <Title style={{ fontWeight: 400 }} level={3}>В каждой паре Вам следует отдать предпочтение какой-то одной.</Title>
                        <Title style={{ fontWeight: 400 }} level={5}>Выбрать вариант можно при помощи мыши. Подтвердить выбор можно через двойной щелчок или кнопки “Продолжить”.</Title>
                        <button onClick={() => setQuestion(currentQuestion + 1)} className={styles['btn-fluid'] + " xs:mt-40 btn-fluid btn btn-dark"}>Всё понятно!</button>
                    </div>
                );
            }
            case 1: {
                return (
                    <div className={styles['test-container'] + " container"}>
                        <Title>{Tests[currentQuestion].question}</Title>
                        <Progress percent={progress} />
                        <div className="answers-wrapper xs:flex-column md:flex-row xs:flex-justify-center xs:flex-align-center">
                            <div className="answer-wrapper">
                                <input checked={chosenAnswer ? true : false} onChange={() => {}} className={styles['answer-radio']} type="radio" name="answerRadio" id="left" />
                                <label
                                    onClick={() => setChosenAnswer(Tests[currentQuestion].answers.left.name)}
                                    onDoubleClick={() => setQuestion(currentQuestion + 1)}
                                    htmlFor="left"
                                    className={styles['answer-label']}>
                                    <Title className={styles['answer-title']} style={{ fontWeight: 500 }} level={3}>{Tests[currentQuestion].answers.left.text}</Title>
                                </label>
                            </div>
                            <div className="answer-wrapper">
                                <input checked={chosenAnswer ? true : false} className={styles['answer-radio']} type="radio" name="answerRadio" id="right" />
                                <label
                                    onClick={() => setChosenAnswer(Tests[currentQuestion].answers.right.name)}
                                    onDoubleClick={() => setQuestion(currentQuestion + 1)}
                                    htmlFor="right"
                                    className={styles['answer-label']}>
                                    <Title className={styles['answer-title']} style={{ fontWeight: 500 }} level={3}>{Tests[currentQuestion].answers.right.text}</Title>
                                </label>
                            </div>
                        </div>
                        <button onClick={() => setQuestion(currentQuestion + 1)} className={styles['btn-fluid'] + " xs:mt-40 btn-fluid btn btn-dark"}>Продолжить</button>
                    </div>
                );
            }
            case 2: {
                return (
                    <div className={styles['test-container'] + " container"}>
                        <Title>Ответы сохранены!</Title>
                    </div>
                );
            }
        }
    }
    return (
        <div className="container xs:flex-column xs:h-vh-100">
            <div className="steps-wrapper xs:mt-80 xs:flex-row xs:flex-justify-center">
                {/* <img className={styles['steps-img']} src={require('../../../assets/images/png/logo.png')} alt="" /> */}
                <Steps size="medium" current={currentQuestion}>
                    {Tests.map(test => {
                        return <Step key={test.index} />
                    })}
                </Steps>
            </div>
            <div className={styles['test-wrapper']}>
                {renderTest()}
            </div>
        </div>
    );
}

export default Hol;