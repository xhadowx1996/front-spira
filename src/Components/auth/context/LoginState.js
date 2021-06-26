import { useReducer } from "react";
import Swal from "sweetalert2";
import { url } from "../../../config/url";
import { LOGIN_EXITOSO, LOGIN_FALLIDO } from "../../../types/types";
import LoginContext from "./Logincontext";
import loginReducer from "./loginReducer";

const LoginState = (props) => {
  const loginState = {
    datosUser: [],
    rol: [],
    usuario: "",
    autentificado: false,
  };

  const [state, dispatch] = useReducer(loginReducer, loginState);

  const validarUsuario = async (datos) => {
    await fetch(`${url}/login`, {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((respuesta) => respuesta.json())
      .then((respuesta2) => {
        console.log(respuesta2);
        if (respuesta2.message !== "Login exitoso") {
          dispatch({
            type: LOGIN_FALLIDO,
          });
          if(respuesta2.message === "Contraseña incorrecta"){
            Swal.fire(
                "Atención!",
                respuesta2.message,
                "warning"
              );
              return;
          }
          if(respuesta2.message === "El usuario no existe con este email"){
            Swal.fire(
                "Atención!",
                respuesta2.message,
                "warning"
              );
              return;
          }
        } else {
            
          dispatch({
            type: LOGIN_EXITOSO,
            payload: respuesta2.rol.descripcion,
            datosUser: datos,
          });
          sessionStorage.setItem("roles", [
            JSON.stringify(respuesta2.rol.descripcion),
          ]);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const Userautentificado = () => {
    dispatch({
      type: LOGIN_EXITOSO
    });
  };

  return (
    <LoginContext.Provider
      value={{
        rol: state.rol,
        autentificado: state.autentificado,
        validarUsuario,
        Userautentificado
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginState;
