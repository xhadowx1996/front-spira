import {
  LOGIN_EXITOSO,
  LOGIN_FALLIDO
} from "../../../types/types";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_EXITOSO:
      return {
        ...state,
        autentificado: true,
        datosUser: action.datosUser,
        rol: action.payload,
      };
    case LOGIN_FALLIDO:
      return {
        ...state,
        autentificado: false,
        datosUser: [],
        rol: []
      };
    default:
      return state;
  }
};
