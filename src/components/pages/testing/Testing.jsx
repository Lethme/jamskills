import React, { useContext, useEffect, useState } from "react";
import Navbar from '../../ui/Navbar/Navbar';
import Sidebar from '../../ui/Sidebar/Sidebar';
import Topbar from '../../ui/Topbar/Topbar';
import Stats from '../../ui/Stats/Stats';

import styles from './Testing.module.scss';
import './Testing.scss';
import "antd/dist/antd.css";
import { AuthContext } from "../../context/Context";
import ToastService from "../../service/ToastService";
import useFetch from "../../hooks/useFetch";
import ApiService from "../../service/ApiService";
import { Table, Input } from "antd";
import { Link } from "react-router-dom";
const { Search } = Input;

const Testing = () => {
    const tempTests = [];
    const { authorized, setAuthorized } = useContext(AuthContext);
    const [tests, setTests] = useState([]);
    const [getTests, testsLoading, testsFetchError] = useFetch(async () => {
        let toastID = ToastService.Loading('Загрузка...');
        ApiService.GetQuizCollection().then(response => {
            response.data.forEach(test => {
                getTestsByID(test, response.data.length, () => {
                    setTests(tempTests);
                });
            })
        }).catch(error => {
            if (error.response) {
                ToastService.Error(error.response.data.detail);
                ApiService.RemoveData();
                setAuthorized(false);
            }
        }).finally(() => {
            ToastService.Remove(toastID);
        });
    });
    const [getTestsByID, testsByIDLoading, testsByIDFetchError] = useFetch(async (test, testsCount, callback) => {
        // let toastID = ToastService.Loading('Загрузка...');
        ApiService.GetQuiz(test.id).then(response => {
            let tempData = response.data.map(obj => {
                return {
                    ...test,
                    testID: obj.id,
                    testStatus: obj.status,
                    quiz: obj.quiz
                }
            })
            tempTests.push(...tempData);
        }).catch(error => {
            if (error.response) {
                ToastService.Error(error.response.data.detail);
                ApiService.RemoveData();
                setAuthorized(false);
            }
        }).finally(() => {
            if (test.id === testsCount && callback) {
                callback();
            }
        });
    });

    const tableColumns = [{
        title: 'Тест',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
    }, {
        title: 'Подтест',
        dataIndex: 'quiz',
        key: 'quiz',
        render: quiz => {
            switch (quiz) {
                case 'hol': return 'Холлонда';
                case 'usk': return 'УСК';
                case 'gatb-5': return 'GATB';
                default: return '-';
            }
        }
    }, {
        title: 'Отправитель',
        dataIndex: 'hr',
        key: 'hr',
    }, {
        title: 'Приглашение',
        dataIndex: 'invited_at',
        key: 'invited_at',
        render: date => {
            return (
                <span>{new Date(date).toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                })}</span>
            );
        },
        sorter: (a, b) => {
            let d1 = new Date(a.invited_at);
            let d2 = new Date(b.invited_at);
            
            if (d1 > d2) return 1;
            if (d2 > d1) return -1;
            return 0;
        }
    }, {
        title: 'Завершение',
        render: () => {
            return (
                <span>-</span>
            )
        }
    }, {
        title: 'Состояние',
        render: () => {
            return (
                <span>-</span>
            )
        }
    }, {
        title: 'Прогресс',
        render: () => {
            return (
                <span>-</span>
            )
        }
    },
    {
        title: 'Действия',
        render: (test) => {
            return (
                <div className="links">
                    <Link to={`./${test.quiz.replace('-', '_')}/${test.id}`} className="link xs:pr-10">Перейти</Link>
                    <a href="#" className="link xs:plr-10">Отказ</a>
                    <a href="#" className="link xs:pl-10">Результат</a>
                </div>
            )
        }
    }];

    useEffect(() => {
        getTests();
    }, []);

    useEffect(() => {
        console.log(tests);
    }, [tests]);

    return (
        <div className="testing">
            <Navbar />
            <div className="page xs:flex-row xs:flex-wrap-none">
                <div className="side-wrapper">
                    <Sidebar />
                </div>
                <div className="main-wrapper">
                    <Topbar />
                    <div className="main-content">
                        <div className={styles['main-container'] + " container-fluid xs:plr-62"}>
                            <div className="stats-wrapper xs:flex-row xs:flex-justify-end xs:col-24">
                                <Stats markerColor="#1890ff" title="Всего приглашений" value={tests.length} />
                                <Stats markerColor="#73d13d" title="Пройдено" value="45" iconClasses="far fa-thumbs-up" />
                                <Stats markerColor="#faad14" title="В процессе" value="2" iconClasses="far fa-clock" />
                                <Stats markerColor="#ff4d4f" title="Отказано" value="76" iconClasses="fas fa-fire" />
                            </div>
                            <Search className={styles['search-input'] + " xs:mtb-16"} placeholder="input search text" style={{width: 335}} />
                            <div className={styles['table-wrapper'] + " xs:col-24"}>
                                <Table
                                    dataSource={tests}
                                    columns={tableColumns}
                                    pagination={{
                                        size: 'small',
                                        total: tests.length,
                                        pageSize: 10,
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Testing;