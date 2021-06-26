import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

function Cursos() {
  const baseUrl = "http://127.0.0.1:4000/api/curso";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [cursoSelect, setCursoSelect] = useState({
    intesidad_horaria: '',
    descripcion: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setCursoSelect((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(cursoSelect);
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPost = async () => {
    await axios.post(baseUrl, cursoSelect)
      .then(response => {
        setData(data.concat(response.data.data));
        abrirCerrarModalInsertar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPut = async () => {

    await axios.put(baseUrl + "/" + cursoSelect.id, cursoSelect)
      .then(response => {
        var dataNueva = data;
        dataNueva.map(curso => {
          if (curso.id === cursoSelect.id) {
            curso.intesidad_horaria = cursoSelect.intesidad_horaria;
            curso.descripcion = cursoSelect.descripcion;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionDelete = async () => {
    await axios.delete(baseUrl + "/" + cursoSelect.id)
      .then(response => {
        // console.log(response)
        setData(data.filter(curso => curso.id !== cursoSelect.id));
        abrirCerrarModalEliminar();
      }).catch(error => {
        console.log(error);
      })
  }

  const seleccionarCurso = (curso, caso) => {
    setCursoSelect(curso);

    (caso === "Editar") ?
      abrirCerrarModalEditar() :
      abrirCerrarModalEliminar()
  }

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <br />
      <button className="btn btn-success" onClick={() => abrirCerrarModalInsertar()}>Insertar</button>
      <br /><br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Duracion</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>



        <tbody>
          {data.map(cursos => (
            <tr key={cursos.id}>
              <td>{cursos.id}</td>
              <td>{cursos.intesidad_horaria}</td>
              <td>{cursos.descripcion}</td>
              <td>
                <button className="btn btn-primary" onClick={() => seleccionarCurso(cursos, "Editar")}>Editar</button> {"  "}
                <button className="btn btn-danger" onClick={() => seleccionarCurso(cursos, "Eliminar")}>Eliminar</button>
              </td>
            </tr>


          ))}


        </tbody>
      </table>


      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Curso</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <label>Duracion: </label>
            <br />
            <input type="text" className="form-control" name="intesidad_horaria" onChange={handleChange} />
            <br />
            <label>Descripcion: </label>
            <br />
            <input type="text" className="form-control" name="descripcion" onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPost()}>Insertar</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>



      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Curso</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <label>Duracion: </label>
            <br />
            <input type="text" className="form-control" name="intesidad_horaria" onChange={handleChange} value={cursoSelect && cursoSelect.intesidad_horaria} />
            <br />
            <label>Descripcion: </label>
            <br />
            <input type="text" className="form-control" name="descripcion" onChange={handleChange} value={cursoSelect && cursoSelect.descripcion} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPut()}>Editar</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar el Curso {cursoSelect && cursoSelect.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default Cursos;
