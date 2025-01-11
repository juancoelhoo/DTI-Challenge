import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";

import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Reminder = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[name, setName] = useState('')
    const[date, setDate] = useState('')
    

    const reminderdata = [
        {
            id : 1, 
            name: 'quero comer',
            date: '2025-01-09T00:00:00',
            createdAt : '2025-01-09T00:00:00'
        },
        {
            id : 2, 
            name: 'fazer compras',
            date: '2025-01-09T00:00:00',
            createdAt : '2025-01-09T00:00:00'
        },
        {
            id : 3, 
            name: 'ir a feira',
            date: '2025-01-09T00:00:00',
            createdAt : '2025-01-09T00:00:00'
        }
    ]

    const [data, setData] = useState([]);

    useEffect(()=>{
        getData();
    }, [])

    const getData = () => {
        axios.get('http://localhost:5291/api/DReminder/')
         .then((result)=>{
            setData(result.data)
         })
         .catch((e)=>{
            console.log(e)
         })
    }

    const handleDelete = (id) => {
        if(window.confirm("Deseja realmente excluir esse lembrete?") == true)
        {
            alert(id);
        }
    }

    return(
        <Fragment>
            <Container>
            <Row>
                <Col>
                <input type="text" className="form-control" placeholder="Nome do Lembrete" value={name} onChange={(e) => setName(e.target.value)}/>
                </Col>
                <Col>
                <input type ="text" className="form-control" placeholder="Data do Lembrete" value ={date} onChange={(e) => setDate(e.target.value)}/>
                </Col>
                <Col>
                <button className="btn btn-primary">Criar</button>
                </Col>
            </Row>
            </Container>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Deletar</th>
                </tr>
            </thead>
            <tbody>
        {
            data && data.length > 0 ?
            data.map((item, index) => {
                return(
                    <tr key = {index}>
                        <td>{item.date}</td>
                        <td>{item.name}</td>
                        <td colSpan={1}>
                            <button className="btn btn-danger" onClick={() => handleDelete(item.id)}> X </button>
                        </td>
                    </tr>
                )
            })
            :
            'Loading...'
        }
      </tbody>
            </Table>
        </Fragment>
    )
}

export default Reminder;