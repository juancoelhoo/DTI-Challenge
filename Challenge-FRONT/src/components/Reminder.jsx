import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import ReminderForm from "./ReminderForm";
import ReminderTable from "./ReminderTable";
import { getReminders, createReminder, deleteReminder } from "../services/reminderApi";
import groupRemindersByDate from "../utils/groupRemindersByDate";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const Reminder = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        try {
            const reminders = await getReminders();
            setData(reminders);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async () => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (name.trim() === "") {
            toast.error("O campo 'Nome do Lembrete' não pode estar vazio!");
            return;
        }

        if (selectedDate <= today || date === "") {
            toast.error("A data selecionada deve ser a partir de amanhã!");
            return;
        }

        try {
            await createReminder({ name, date });
            fetchReminders();
            setName("");
            setDate("");
            toast.success("Lembrete adicionado");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Deseja realmente excluir esse lembrete?")) {
            try {
                await deleteReminder(id);
                fetchReminders();
                toast.success("Lembrete excluído");
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const groupedData = groupRemindersByDate(data);
    return (
        <Fragment>
            <ToastContainer />
            <Container>
                <Row className="my-3">
                    <ReminderForm
                        name={name}
                        date={date}
                        setName={setName}
                        setDate={setDate}
                        handleSave={handleSave}
                    />
                </Row>
                <Row>
                    <Col>
                        <ReminderTable
                            groupedData={groupedData}
                            handleDelete={handleDelete}
                        />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Reminder;
