import { createContext, useState, useEffect } from 'react';

const UserContext = createContext()

function UserProvider({ children }) {
    const [token, setToken] = useState(undefined);
    const [usuario, setUsuario] = useState(undefined);
    const [empresa, setEmpresa] = useState(undefined);
    const [planes, setPlanes] = useState([]);
    const [rol, setRol] = useState([]);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        setUsuario(localStorage.getItem('usuario'));
        setRol(localStorage.getItem('rol'));
    }, []);

    function getToken() {
        if (token) return token;
        return localStorage.getItem('token');
    }

    function login(respuesta) {
        setUsuario(respuesta.user);
        setToken(respuesta.token);
        setRol(respuesta.rol_id);
        localStorage.setItem('token', respuesta.token);
        localStorage.setItem('usuario', respuesta.user);
        localStorage.setItem('rol', respuesta.rol_id);
        return respuesta.rol_id;
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
        <UserContext.Provider value={{ token, login, logout, usuario, empresa, planes, rol, getToken, setRol, setPlanes }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };