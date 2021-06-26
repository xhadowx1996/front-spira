import React, { useState, useContext, useEffect } from "react";
import "../../Assets/Css/login.css";
import Swal from "sweetalert2";
import Flip from "react-reveal/Reveal";
import LoginContext from "./context/Logincontext";

const Login = (props) => {
  const [disabledboton, cambiarDistabled] = useState(false);

  //Obtener State global

  const loginContext = useContext(LoginContext);
  const { autentificado, validarUsuario } = loginContext;

  const [Usuario, SetUsuario] = useState({
    email: "",
    password: "",
  });

  const { email, password } = Usuario;

//   Efect utilizado para validar respuesta del context
  useEffect(() => {
      if (autentificado ) {
          if (sessionStorage.getItem('urlactual') && sessionStorage.getItem('urlactual') !== '/home') {
              props.history.push(sessionStorage.getItem('urlactual'));
          } else {
              props.history.push('/Home');
          }
      }
  }, [autentificado])

  const Change = (e) => {
    SetUsuario({ ...Usuario, [e.target.name]: e.target.value });
  };

  const mayuscula = (e) => {
    SetUsuario({ ...Usuario, [e.target.name]: e.target.value.toUpperCase() });
  };

  const OnSubmit = async (e) => {
    e.preventDefault();
    cambiarDistabled(true);
    if (disabledboton) {
      Swal.fire(
        "Atención!",
        "Su petición ya fue enviada, por favor espere",
        "warning"
      );
      return;
    }
    if (email.trim() !== "" && password.trim() !== "") {
        validarUsuario(Usuario);
      setTimeout(() => {
        cambiarDistabled(false);
      }, 1000);
    } else {
      Swal.fire("Atención!", "Faltan campos por diligenciar", "warning");
    }
  };
  return (
    <Flip>
      <form onSubmit={OnSubmit}>
        <div className="container-loginv2">
          <div className="sesion1-login">
            <h2>Iniciar Sesión</h2>
            <div className="row ml-1">
              <label className="mt-5">
                Ingresa tu nombre de usuario y contraseña
              </label>

              <input
                name="email"
                id="username"
                onChange={Change}
                onKeyUp={mayuscula}
                onBlur={mayuscula}
                value={email}
                className="form-control mt-3 col-md-10"
                placeholder="Usuario"
                required
              />
              <span className="icon fas fa-user"></span>

              <input
                type="password"
                name="password"
                id="clave"
                className="form-control mt-5 col-md-10 "
                onChange={Change}
                value={password}
                placeholder="Clave"
                required
              />
              <span className="icon2 fas fa-lock"></span>
            </div>
            <div className="row mt-5 ml-1">
              <button className="btn-login-red col-10" disabled={disabledboton}>
                Iniciar
              </button>
            </div>
          </div>
        </div>
      </form>
    </Flip>
  );
};

export default Login;
