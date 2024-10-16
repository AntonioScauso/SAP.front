import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import PrivateRoute from "./PrivateRoute";
import Tasaciones from "../pages/tasaciones/Tasaciones";
import LoginPage from "../pages/loginPage/LoginPage";
import Administracion from "../pages/administracion/Administracion";
import Matriculados from "../pages/matriculados/Matriculados";
import Perfil from "../pages/perfil/Perfil";
import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const usePaginas = () => {
    const { rol } = useContext(UserContext);

    const paginas = [
        {
            nombre: "Tasaciones",
            seccion: "tasaciones",
            url: "/tasaciones/",
            component: <Tasaciones />,
            componentUrl: "/tasaciones/"
        },
        {
            seccion: "perfil",
            url: "/perfil/",
            component: <Perfil />,
            componentUrl: "/perfil/"
        },
        {
            nombre: "Matriculados",
            seccion: "matriculados",
            url: "/matriculados/",
            component: <Matriculados />,
            componentUrl: "/matriculados/"
        }
    ];

    if (rol === '9') {
        paginas.push({
            nombre: "Administracion",
            seccion: "administracion",
            url: "/administracion/",
            icon: '',
            component: <Administracion />,
            componentUrl: "/administracion/"
        });
    };

    return paginas;
}


export default function Dashboard() {
    const paginas = usePaginas();

    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route element={<AdminLayout />}>
                    {paginas.map((pagina, index) => (
                        Array.isArray(pagina.seccion) ?
                            pagina.seccion.map((seccion, index) => (
                                <Route key={index} path={seccion.componentUrl} element={seccion.component} />
                            ))
                            :
                            <Route key={index} path={pagina.componentUrl} element={pagina.component} />
                    ))}
                    <Route path="*" element={<Tasaciones />} />
                </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />

        </Routes>
    )
}