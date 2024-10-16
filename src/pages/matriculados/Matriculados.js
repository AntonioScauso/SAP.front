import { useEffect, useState } from "react"
import useFetch, { host } from "../../utils/Fetch";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { Button, Grid, Typography, Dialog, Switch } from "@mui/material";
import ModalMatriculado from "./ModalMatriculado";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Matriculados() {
    const [matriculados, setMatriculados] = useState([]);
    const [matriculado, setMatriculado] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const { getFetch, postFetch } = useFetch();

    function CustomGridToolBar() {
        return (
            <GridToolbarContainer>
                <Button variant="contained" color="primary" onClick={() => setModalOpen(true)} >Crear Matriculado</Button>
            </GridToolbarContainer>
        )
    }

    useEffect(() => {
        getFetch(`${host}usuario/colegiados/`, true)
            .then(data => {
                console.log(data);

                setMatriculados(data.data);
            })
    }, []);

    const columns = [
        { field: 'nombre', headerName: 'Nombre', flex: 1 },
        { field: 'apellido', headerName: 'Apellido', flex: 1 },
        { field: 'matricula', headerName: 'Matrícula', flex: 1 },
        { field: 'rol_nombre', headerName: 'Rol', flex: 1 },
        { field: 'circunscripcion_nombre', headerName: 'Circunscripción', flex: 1 },
        {
            field: 'activo',
            headerName: 'Estado',
            width: 120,
            renderCell: (params) => (
                <Switch
                    checked={params.row.activo}
                    onChange={() => {
                        cambiarEstadoMatriculado(params.row.id);
                    }}
                />
            )
        },
        // {
        //     field: "acciones",
        //     headerName: "Acciones",
        //     width: 100,
        //     renderCell: (params) => {
        //         return (
        //             <DeleteIcon
        //                 style={{ color: "red", cursor: "pointer" }}
        //                 onClick={() => { setOpenDialog(true); setMatriculado(params.row) }}
        //             />
        //         )
        //     }
        // }
    ];

    function cambiarEstadoMatriculado(id) {
        postFetch(`${host}usuario/cambiar-estado-colegiado/`, { 'id_colegiado': id }, true)
            .then(data => {
                const newMatriculados = matriculados.map(matriculado => {
                    if (matriculado.id === id) {
                        matriculado.activo = !matriculado.activo;
                    }
                    return matriculado;
                });
                setMatriculados(newMatriculados);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <DataGrid
                rows={matriculados}
                columns={columns}
                slots={{ toolbar: CustomGridToolBar }}
                sx={{ height: '90vh' }}
            />
            <ModalMatriculado matriculados={matriculados} setMatriculados={setMatriculados} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    )
}