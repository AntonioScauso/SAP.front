import { useEffect, useState } from "react"
import useFetch, { host } from "../../utils/Fetch";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { Button, Box, IconButton, Switch } from "@mui/material";
import ModalMatriculado from "./ModalMatriculado";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Filtro from "../../components/Filtro";

export default function Matriculados() {
    const [matriculados, setMatriculados] = useState([]);
    const [matriculadosFiltrados, setMatriculadosFiltrados] = useState([]);
    const [matriculado, setMatriculado] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterColumn, setFilterColumn] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [fixedFilters, setFixedFilters] = useState([]);
    const filteredCount = matriculadosFiltrados.length;

    const { getFetch, postFetch } = useFetch();

    function CustomGridToolBar() {
        return (
            <GridToolbarContainer>
                <Button variant="contained" color="primary" onClick={() => setModalOpen(true)} >Crear Matriculado</Button>
            </GridToolbarContainer>
        )
    }

    useEffect(() => {
        if (matriculados.length > 0) {
            const filtered = Filtro.filtrarFilas(
                matriculados,
                columns,
                filterColumn,
                filterValue,
                fixedFilters
            );
            console.log(filtered);

            setMatriculadosFiltrados(filtered);
        }
    }, [matriculados, filterColumn, filterValue, fixedFilters]);

    useEffect(() => {
        getFetch(`${host}usuario/colegiados/`, true)
            .then(data => {
                setMatriculadosFiltrados(data.data);
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
        {
            field: "editar",
            headerName: "Editar",
            width: 100,
            renderCell: (params) => {
                return (
                    <IconButton>
                        <EditIcon
                            variant="contained"
                            color="primary"
                            onClick={() => { setMatriculado(params.row); setModalOpen(true) }}
                        >
                            Editar
                        </EditIcon>
                    </IconButton>
                )
            }
        }
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
        <Box sx={{ width: '100%', height: '100%', gap: 5 }}>
            <Filtro columns={columns.filter(column => column.field !== 'editar' && column.field !== 'activo')} filterColumn={filterColumn} setFilterColumn={setFilterColumn} filterValue={filterValue} setFilterValue={setFilterValue} fixedFilters={fixedFilters} setFixedFilters={setFixedFilters} filteredCount={filteredCount} />
            <DataGrid
                rows={matriculadosFiltrados}
                columns={columns}
                slots={{ toolbar: CustomGridToolBar }}
                sx={{ height: '65vh', mt: 2 }}
            />
            <ModalMatriculado matriculados={matriculados} setMatriculados={setMatriculados} isOpen={modalOpen} onClose={() => { setModalOpen(false); setMatriculado(null) }} matriculado={matriculado} />
        </Box>
    )
}