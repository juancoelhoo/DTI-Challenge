import React, { Fragment } from "react";
import { Table } from "react-bootstrap";

const ReminderTable = ({ groupedData, handleDelete }) => {
    const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th colSpan="2" className="text-center">Lista de lembretes</th>
                </tr>
            </thead>
            <tbody>
                {sortedDates.map((date) => (
                    <Fragment key={date}>
                        <tr>
                            <td colSpan="2" className="table-secondary text-center">
                                {new Date(date).toLocaleDateString("pt-BR")}
                            </td>
                        </tr>
                        {groupedData[date].map((reminder) => (
                            <tr key={reminder.id}>
                                <td>{reminder.name}</td>
                                <td className="text-center">
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
    );
};

export default ReminderTable;
