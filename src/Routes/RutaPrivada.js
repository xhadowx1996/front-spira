import React, { useContext, useEffect, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';


import Home from "../Components/Home"

//Dependencias 
import Fade from 'react-reveal/Fade';
import LoginContext from '../Components/auth/context/Logincontext';

const RutaPrivada = ({ component: Component, ...props }) => {



    const authContext = useContext(LoginContext);
    const { autentificado, Userautentificado } = authContext;

    useEffect(() => {
        var info = sessionStorage.getItem('roles');
        if (info !== null && autentificado === false) {
            Userautentificado()
        }

    }, []);


    return (
        <Route {...props} render={props => !autentificado ?
            (
                <Redirect to="/" />
            )

            : (
                <Fragment>
                    <Fade top>
                        {/* <Home /> */}
                        <Component  {...props} />
                    </Fade>
                    
                </Fragment>
            )} />

    );
}

export default RutaPrivada;