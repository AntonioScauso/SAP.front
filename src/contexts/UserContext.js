import { createContext, useState, useEffect } from 'react';

const UserContext = createContext()

function UserProvider({ children }) {
    const [token, setToken] = useState(undefined);
    const [usuario, setUsuario] = useState(undefined);
    const [nombre, setNombre] = useState([]);
    const [apellido, setApellido] = useState([]);
    const [matricula, setMatricula] = useState([]);
    const [empresa, setEmpresa]=useState(undefined);
    const [planes, setPlanes] = useState([]);
    const [rol, setRol] = useState([]);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        setUsuario(localStorage.getItem('usuario'));
        setRol(localStorage.getItem('rol'));
        setNombre(localStorage.getItem('nombre')); 
        setApellido(localStorage.getItem('apellido')); 
        setMatricula(localStorage.getItem('matricula')); 
    }, []);

    function getToken() {
        if (token) return token;
        return localStorage.getItem('token');
    }

    function login(respuesta) {
        setUsuario(respuesta.user);
        setToken(respuesta.token);
        setRol(respuesta.rol_id);
        setApellido(respuesta.apellido);
        setNombre(respuesta.nombre);
        setMatricula(respuesta.matricula)
        localStorage.setItem('token', respuesta.token);
        localStorage.setItem('usuario', respuesta.user);
        localStorage.setItem('rol', respuesta.rol_id); 
        localStorage.setItem('nombre', respuesta.nombre); 
        localStorage.setItem('apellido', respuesta.apellido); 
        localStorage.setItem('matricula', respuesta.matricula); 
        
        return respuesta.rol_id , respuesta.nombre, respuesta.apellido, respuesta.matricula;
    }

    function logout() {
        setUsuario(null);
        setToken(null);
        setRol(null);
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('rol');
    }

    return (
        <UserContext.Provider value={{ token, login, logout, usuario, planes, rol, nombre, apellido, matricula, empresa, getToken, setRol, setPlanes }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };