import { createContext, useState, useEffect } from 'react';

const UserContext = createContext()

function UserProvider({ children }) {
    const [token, setToken] = useState(undefined);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, []);

    function login(respuesta) {
        setToken(respuesta.token);
        localStorage.setItem('token', respuesta.token);
    }

    function logout() {
        setToken(null);
        console.log('hola :D');
        localStorage.removeItem('token');
    }

    return (
        <UserContext.Provider value={{ token, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
