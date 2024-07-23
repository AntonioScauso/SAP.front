import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import PrivateRoute from "./PrivateRoute";
import Tasaciones from "../pages/tasaciones/Tasaciones";
import LoginPage from "../pages/loginPage/LoginPage";

export const usePaginas = () => {
    const paginas = [
        {
            nombre: "Tasaciones",
            seccion: "tasaciones",
            url: "/tasaciones/",
            component: <Tasaciones />,
            componentUrl: "/tasaciones/"
        },
    ];

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