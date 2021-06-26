import React, { useState, useEffect } from 'react';
import { Formulario, Contenedor, ContbtnCen, Boton, MsnExito, MsnError, Label } from '../Elementos/Formulario/Formulario'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Input from './input'
import Jumbotron from 'react-bootstrap/Jumbotron';
import { v4 as uuidv4 } from 'uuid';

const Compinput = () => {

    
        const [nombre, cambiarNombre] = useState({ campo: '', valido: null });
        const [correo, cambiarCorreo] = useState({ campo: '', valido: null });
        const [password, cambiarPassword] = useState({campo: '', valido: null});
        const [password2, cambiarPassword2] = useState({campo: '', valido: null});
        const [telefono, cambiarTelefono] = useState({ campo: '', valido: null });
        const [terminos, cambiarTerminos] = useState(false);
        const [FormularioValido, cambiarFormularioValido] = useState(null);

        const expresiones = {
      
            nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
            correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            password: /^.{4,12}$/, // 4 a 12 digitos.
            telefono: /^\d{7,14}$/, //7 a 14 numeros.
  
        }
        
        const validarPassword2 = () => {
            if(password.campo.length > 0){
                if(password.campo !== password2.campo){
                    cambiarPassword2((prevState) => {
                        return {...prevState, valido: 'false'}
                    });
                } else {
                    cambiarPassword2((prevState) => {
                        return {...prevState, valido: 'true'}
                    });
                }
            }
        }
        const onChangeTerminos = (e) => {
            cambiarTerminos(e.target.checked);
        }

        const onSubmit = (e) => {
            e.preventDefault();
    
            if(
                
                nombre.valido === 'true' &&
                password.valido === 'true' &&
                password2.valido === 'true' &&
                correo.valido === 'true' &&
                telefono.valido === 'true' &&
                terminos
            ){
                cambiarFormularioValido(true);
                cambiarNombre({campo: '', valido: null});
                cambiarPassword({campo: '', valido: null});
                cambiarPassword2({campo: '', valido: 'null'});
                cambiarCorreo({campo: '', valido: null});
                cambiarTelefono({campo: '', valido: null});
    
                // ... 
            } else {
                cambiarFormularioValido(false);
            }
        }
        
        return ( 
            
            
            <main >
                <Formulario action = ""
                onSubmit = { onSubmit } >
               
                <Input estado = { nombre }
                cambiarEstado = { cambiarNombre }
                tipo = "text"
                label = "Nombre"
                placeholder = "Felipe pinto"
                name = "usuario"
                leyendaError = "El nombre solo puede contener letras y espacios."
                expresionRegular = { expresiones.nombre }
                /> 
                <Input
                estado={password}
                cambiarEstado={cambiarPassword}
                tipo="password"
                label="Contraseña"
                name="password1"
                leyendaError="La contraseña tiene que ser de 4 a 12 dígitos."
                expresionRegular={expresiones.password}
                />
                <Input
                    estado={password2}
                    cambiarEstado={cambiarPassword2}    
                    tipo="password"
                    label="Repetir Contraseña"
                    name="password2"
                    leyendaError="Ambas contraseñas deben ser iguales."
                    funcion={validarPassword2}
                />
                <Input estado = { correo }
                cambiarEstado = { cambiarCorreo }
                tipo = "email"
                label = "Correo Electrónico"
                placeholder = "john@correo.com"
                name = "correo"
                leyendaError = "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
                expresionRegular = { expresiones.correo }
                />
                <Input estado = { telefono }
                cambiarEstado = { cambiarTelefono }
                tipo = "text"
                label = "Teléfono"
                placeholder = "3507680286"
                name = "telefono"
                leyendaError = "El telefono solo puede contener numeros y el maximo son 14 dígitos."
                expresionRegular = { expresiones.telefono }
                /> 
               
                <Contenedor>
                
                <Label>
                
                <input type = "checkbox"
                name = "terminos"
                id = "terminos"
                checked = { terminos }
                onChange = { onChangeTerminos }
                />
                Acepto los Terminos y Condiciones
                </Label> 
                </Contenedor> {
                    FormularioValido === false && <MsnError>
                         <p>
                        <FontAwesomeIcon icon = { faExclamationTriangle }/> <b> Error: </b> Por favor rellena el formulario correctamente. </p>
                        
                        </MsnError>}
                        
                        <ContbtnCen>
                        <Boton type = "submit"> Enviar </Boton> {
                        FormularioValido === true && <MsnExito> Formulario enviado exitosamente! </MsnExito>} 

                        </ContbtnCen> 
                </Formulario> 
            </main>


                    )
                }

export default Compinput;