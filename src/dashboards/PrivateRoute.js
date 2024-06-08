import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from "../contexts/UserContext";

export default function PrivateRoute() {
    const { token } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token !== undefined) {
            setLoading(false);
        }
    }, [token]);

    return <Outlet />;
    if (loading) return null;
    return token ? <Outlet /> : <Navigate to="/login" />;
};
