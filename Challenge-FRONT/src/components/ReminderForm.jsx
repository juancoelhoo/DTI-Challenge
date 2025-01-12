import React from "react";
import { Col } from "react-bootstrap";

const ReminderForm = ({ name, date, setName, setDate, handleSave }) => {
    return (
        <>
            <Col>
                <h4>Nome do Lembrete</h4>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nome do Lembrete"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Col>
            <Col>
                <h4>Data</h4>
                <input
                    type="date"
                    className="form-control"
                    placeholder="Data do Lembrete"
                    value={date}
                    min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Col>
            <Col className="d-flex align-items-end">
                <button
                    className="btn btn-primary w-100"
                    onClick={handleSave}
                >
                    Criar
                </button>
            </Col>
        </>
    );
};

export default ReminderForm;
