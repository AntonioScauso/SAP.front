import React, { useState } from 'react';
import { Box, Grid, Modal, TextField, Button } from "@mui/material";
import BotonLoading from "../../components/BotonLoading";
import useFetch, { host } from "../../utils/Fetch";
import Swal from 'sweetalert2';

export default function ModalMatriculado({ matriculados, setMatriculados, isOpen, onClose }) {
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [rol, setRol] = useState('');
    const [matricula, setMatricula] = useState('');

    const { postFetch } = useFetch();

    function handleSave() {
        setLoading(true);
        const body = {
            'nombre': nombre,
            'apellido': apellido,
            'rol': 1,
            'matricula': matricula
        };

        postFetch(`${host}usuario/colegiado/`, body, true)
            .then(data => {
                setMatriculados([...matriculados, data]);
                handleClose();
                Swal.fire({
                    title: 'Éxito',
                    text: 'Matriculado creado con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            })
            .catch(err => {
                handleClose();
                Swal.fire({
                    title: 'Error',
                    text: err,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            })
            .finally(() => setLoading(false));
    }

    function handleClose() {
        setNombre('');
        setApellido('');
        setRol('');
        setMatricula('');
        onClose();
    }

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h2>Crear Matriculado</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Matrícula"
                            value={matricula}
                            onChange={(e) => setMatricula(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <BotonLoading
                            loading={loading}
                            funcion={handleSave}
                            text="Guardar"
                            state={!nombre || !apellido || !matricula}
                        >
                            Guardar
                        </BotonLoading>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}