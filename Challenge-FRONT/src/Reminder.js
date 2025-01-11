import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

import { Table, Toast } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Reminder = () => {

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('http://localhost:5291/api/DReminder/')
            .then((result) => {
                const sortedData = result.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setData(sortedData);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Deseja realmente excluir esse lembrete?")) {
            axios.delete(`http://localhost:5291/api/DReminder/${id}`)
                .then(() => {
                    getData();
                    toast.success('Lembrete excluído');
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        }
    };

    const handleSave = () => {
        const currentTime = new Date();
        const url = 'http://localhost:5291/api/DReminder';
        const newData = {
            "name": name,
            "date": date,
            "createdAt": currentTime.toISOString()
        };

        if (name.trim() === "") {
            toast.error("O campo 'Nome do Lembrete' não pode estar vazio!");
            return;
        }

        axios.post(url, newData)
            .then(() => {
                getData();
                clear();
                toast.success('Lembrete adicionado');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const clear = () => {
        setName('');
        setDate('');
    };

    const groupRemindersByDate = () => {
        return data.reduce((acc, reminder) => {
            const reminderDate = reminder.date;
            if (!acc[reminderDate]) {
                acc[reminderDate] = [];
            }
            acc[reminderDate].push(reminder);
            return acc;
        }, {});
    };

    const groupedData = groupRemindersByDate();
    const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));

    return (
        <Fragment>
            <ToastContainer />
            <Container>
                <Row className="my-3">
                    <Col>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome do Lembrete"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Data do Lembrete"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
                        />
                    </Col>
                    <Col>
                        <button className="btn btn-primary" onClick={handleSave}>Criar</button>
                    </Col>
                </Row>
            </Container>
            <Table striped bordered hover>
                <thead>
                </thead>
                <tbody>
                    {sortedDates.map((date) => (
                        <Fragment key={date}>
                            <tr>
                                <td colSpan="3" className="table-secondary text-center">
                                    {new Date(date).toLocaleDateString('pt-BR')}
                                </td>
                            </tr>
                            {groupedData[date].map((reminder) => (
                                <tr key={reminder.id}>
                                    <td>{reminder.name}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(reminder.id)}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </Fragment>
                    ))}
                </tbody>
            </Table>
        </Fragment>
    );
};

export default Reminder;
