import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

function Alumnos() {
  const Url = "http://127.0.0.1:4000/api/usuario";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [rol, setRol] = useState([])
  const [modalEliminar, setModalEliminar] = useState(false);
  const [alumnoSelect, setAlumnoSelect] = useState({
    id: '',
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    id_curso: '',
    id_rol: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setAlumnoSelect((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(alumnoSelect);
  }

  useEffect(() => {
    async function getData() {
      const peticion = await fetch(`${Url}/roles`, {
        method: "GET",
        headers: {
          "Accept": "aplcation/json",
          "Content-Type": "application/json",
        }
      })
      const response = await peticion.json()
      setRol(response.data)
      console.log('estetetetetete', response)
    }
    getData()
  }, [])
  console.log(rol)

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
    await axios.get(Url)
      .then(response => {
        setData(response.data.data);
        console.log(response.data.data)
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPost = async () => {
    await axios.post(Url, alumnoSelect)
      .then(response => {
        setData(data.concat(response.data.data));
        abrirCerrarModalInsertar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPut = async () => {

    await axios.put(Url + "/" + alumnoSelect.id, alumnoSelect)
      .then(response => {
        var dataNueva = data;
        dataNueva.map(alumno => {
          if (alumno.id === alumnoSelect.id) {
            alumno.nombre = alumnoSelect.nombre;
            alumno.email = alumnoSelect.email;
            alumno.telefono = alumnoSelect.telefono;
            alumno.password = alumnoSelect.password;
            alumno.id_curso = alumnoSelect.id_curso;
            alumno.id_rol = alumnoSelect.id_rol;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionDelete = async () => {
    await axios.delete(Url + "/" + alumnoSelect.id)
      .then(response => {
        // console.log(response)
        setData(data.filter(alumno => alumno.id !== alumnoSelect.id));
        abrirCerrarModalEliminar();
      }).catch(error => {
        console.log(error);
      })
  }

  const seleccionarAlumno = (alumno, caso) => {
    setAlumnoSelect(alumno);

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
            <th>Nombre</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Contraseña</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>



        <tbody>
          {data.map(alumno => (
            <tr key={alumno.id}>
              <td>{alumno.id}</td>
              <td>{alumno.nombre}</td>
              <td>{alumno.email}</td>
              <td>{alumno.telefono}</td>
              <td>{alumno.password}</td>
              <td>{alumno.id_curso}</td>
              <td>{alumno.id_rol}</td>
              <td>
                <button className="btn btn-primary" onClick={() => seleccionarAlumno(alumno, "Editar")}>Editar</button> {"  "}
                <button className="btn btn-danger" onClick={() => seleccionarAlumno(alumno, "Eliminar")}>Eliminar</button>
              </td>
            </tr>


          ))}


        </tbody>
      </table>


      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Curso</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id </label>
            <br />
            <input type="text" className="form-control" name="id" onChange={handleChange} />
            <label>Nombre </label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange} />
            <br />
            <label>Correo </label>
            <br />
            <input type="text" className="form-control" name="email" onChange={handleChange} />
            <br />
            <label>Telefono </label>
            <br />
            <input type="text" className="form-control" name="telefono" onChange={handleChange} />
            <br />
            <label>Contraseña </label>
            <br />
            <input type="text" className="form-control" name="password" onChange={handleChange} />
            <br />
            <label>Rol_curso</label>
            <br />
            <input type="text" className="form-control" name="id_curso" onChange={handleChange} />
            <br />
            <label>Rol</label>
            <br />
            <select  onChange={handleChange} className="form-control" name="id_rol">
              <option value="">Selecione una opcion</option>
              {rol.map(listUF => (
                <option key={listUF.id} value={listUF.id}>
                  {listUF.descripcion}
                </option>
              ))}
            </select>
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
            <label>Id </label>
            <br />
            <input type="text" className="form-control" name="id" onChange={handleChange} />
            <label>Nombre </label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange} value={alumnoSelect && alumnoSelect.nombre} />
            <br />
            <label>Correo </label>
            <br />
            <input type="text" className="form-control" name="email" onChange={handleChange} value={alumnoSelect && alumnoSelect.email} />
            <br />
            <label>Telefono </label>
            <br />
            <input type="text" className="form-control" name="telefono" onChange={handleChange} value={alumnoSelect && alumnoSelect.telefono} />
            <br />
            <label>Contraseña </label>
            <br />
            <input type="text" className="form-control" name="password" onChange={handleChange} value={alumnoSelect && alumnoSelect.password} />
            <br />
            <label>Rol_curso</label>
            <br />
            <input type="text" className="form-control" name="id_curso" onChange={handleChange} value={alumnoSelect && alumnoSelect.id_curso} />
            <br />
            <label>Rol </label>
            <br />
            <input type="text" className="form-control" name="id_rol" onChange={handleChange} value={alumnoSelect && alumnoSelect.id_rol} />
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
          ¿Estás Seguro Que Deseas Eliminar El Alumno? {alumnoSelect && alumnoSelect.nombre}?
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

export default Alumnos;
