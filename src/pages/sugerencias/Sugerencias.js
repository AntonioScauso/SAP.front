import React, { useState, useEffect } from 'react';
import { Box, Drawer, Typography, IconButton, Button, Modal, TextField, } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import useFetch, { host } from "../../utils/Fetch";
import BotonLoading from '../../components/BotonLoading';

export default function Sugerencias(props) {
    const { zonaEnTabla } = props;
    const [sugerencias, setSugerencias] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [sugerencia, setSugerencia] = useState('');
    const [fecha, setFecha] = useState('');
    const [precio, setPrecio] = useState('');
    const [colegiado,] = useState('');

    const [loading, setLoading] = useState(false);
    const { getFetch, postFetch } = useFetch();
    const url = `${host}tasacion/`;

    useEffect(() => {
        getFetch(url + 'sugerencias/?zona=' + zonaEnTabla.id, true)
            .then(data => {
                setSugerencias(data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [zonaEnTabla]);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSugerencia('');
        setFecha('');
        setPrecio('');
    };

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();

        const data = {
            zona: zonaEnTabla.id,
            observacion: sugerencia,
            fecha: fecha,
            precio: parseInt(precio),
        };

        postFetch(url + 'sugerencias/', data, true)
            .then(() => {
                getFetch(url + 'sugerencias/?zona=' + zonaEnTabla.id, true)
                    .then(data => {
                        setSugerencias(data.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
        handleModalClose();
    };

    return (
        <>
            <IconButton
                onClick={toggleDrawer}
                sx={{
                    position: 'fixed',
                    top: '50%',
                    right: 0,
                    transform: 'translateY(-50%)',
                    backgroundColor: '#28508E',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#1A365D',
                    },
                    borderTopLeftRadius: '50%',
                    borderBottomLeftRadius: '50%',
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    padding: '12px 8px',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                }}
            >
                <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer}
                PaperProps={{
                    sx: {
                        width: 300,
                        backgroundColor: '#F5F5F5',
                    }
                }}
            >
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 2,
                    }}
                >
                    <Typography variant="h6" color="#28508E" gutterBottom>
                        Sugerencias
                    </Typography>
                    {Array.isArray(sugerencias) && sugerencias.length > 0 ? sugerencias.map((sugerencia, index) => (
                        <Box
                            key={index}
                            sx={{
                                backgroundColor: '#FFFFFF',
                                padding: 2,
                                borderRadius: 2,
                                marginBottom: 2,
                            }}
                        >
                            <Typography variant="body1" gutterBottom>
                                <strong>Zona:</strong> {zonaEnTabla.nombre}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Fecha:</strong> {sugerencia.fecha}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Precio:</strong> {sugerencia.precio}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Observación:</strong> {sugerencia.observacion}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Colegiado:</strong> {sugerencia.colegiado}
                            </Typography>
                        </Box>
                    )) : <Typography variant="body1" gutterBottom>No hay sugerencias para esta zona</Typography>}
                    <Button
                        variant="contained"
                        onClick={handleModalOpen}
                        sx={{
                            backgroundColor: '#28508E',
                            '&:hover': {
                                backgroundColor: '#1A365D',
                            },
                            marginTop: 'auto'
                        }}
                    >
                        Agregar Sugerencia
                    </Button>
                </Box>
            </Drawer>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                        Agregar Sugerencia
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Sugerencia"
                            multiline
                            rows={4}
                            value={sugerencia}
                            onChange={(e) => setSugerencia(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Fecha"
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Precio"
                            type="number"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                        />
                        <BotonLoading
                            funcion={handleSubmit}
                            state={!(sugerencia && fecha && precio)}
                            loading={loading}
                        >
                            Enviar Sugerencia
                        </BotonLoading>
                    </form>
                </Box>
            </Modal>
        </>
    );
};
