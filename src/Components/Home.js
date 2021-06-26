import React,{useState,useEffect} from "react";
import Container from 'react-bootstrap/Container'
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Row, Col } from "react-bootstrap";
import Beneficios from "../Assets/Images/icon-beneficios.svg"
import Productos from "../Assets/Images/icon-gestion-pro.svg";
import Cursos from './Crud-Curso/Cursos';
import { v4 as uuidv4 } from 'uuid';

const Home = (props) => {
    
    const History = useHistory()

    const handleRedirect = (route)  => {History.push(route)}
    
    return (

        <React.Fragment>

            <Container className="altura-contenedor">   
                <Row>
                    <Col>
                        <h6 className="tituloModulo py-4">Selecciona el módulo al que desea ingresar</h6>
                        <div><Button onClick={ () =>{handleRedirect('/')} } >Volver</Button></div>
                        <h2 className="titulos-Modulos">Admin</h2>
                    </Col> 
                </Row>

                <Row className="py-5">
                <Col md="6" className="text-center featured">
                    <h4>Ingresa Aqui Para Crear un Cursos</h4>
                    <p>Ingresa Aqui Para Crear un Alumno</p>
                    <div className="text-center">
                        <Button variant=" primary " className= "btn-access3 mr-2 featured" onClick={ () =>{handleRedirect('/Cursos')} }>Crear Curso</Button>{' '}
                        <Button className= "btn-access2 mr-2 " onClick={ () =>{handleRedirect('/Alumnos')} }> Crear Alumno </Button>
                      
                   </div>
                
                </Col>
                </Row>
  
            </Container>
           
         </React.Fragment>

    );
  };

  export default Home;