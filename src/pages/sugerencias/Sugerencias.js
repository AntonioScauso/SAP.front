import React, { useState, useEffect, useRef } from 'react';
import { Box, Drawer, Typography, IconButton, Button, Modal, TextField, Autocomplete, FormControl } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import useFetch, { host } from "../../utils/Fetch";

const Sugerencias = () => {
    const [sugerencias, setSugerencias] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [circunscripciones, setCircunscripciones] = useState(null);
    const [circunscripcion, setCircunscripcion] = useState(null);
    const [localidad, setLocalidad] = useState(null);
    const [barrio, setBarrio] = useState(null);
    const [zona, setZona] = useState(null);
    const [sugerencia, setSugerencia] = useState('');

    const localidadRef = useRef(null);
    const barrioRef = useRef(null);
    const zonaRef = useRef(null);

    const { getFetch } = useFetch();
    const url = `${host}tasacion/`;

    useEffect(() => {
        getFetch(url + 'data/', true)
            .then(data => {
                setCircunscripciones(data.circunscripciones);
            });
        //agregar get de sugerencias
        setSugerencias([
            {
                circunscripcion: 'Circunscripción 1',
                localidad: 'Localidad 1',
                barrio: 'Barrio 1',
                zona: 'Zona 1',
                texto: 'Muy buena zona, tranquila y segura.',
            },
            {
                circunscripcion: 'Circunscripción 2',
                localidad: 'Localidad 2',
                barrio: 'Barrio 2',
                zona: 'Zona 2',
                texto: 'Zona muy peligrosa, no se recomienda pasar por allí.',
            },
            {
                circunscripcion: 'Circunscripción 3',
                localidad: 'Localidad 3',
                barrio: 'Barrio 3',
                zona: 'Zona 3',
                texto: 'Zona muy transitada, mucho ruido.',
            },
        ]);
    }, []);

    useEffect(() => {
        if (circunscripcion) {
            const selectedCircunscripcion = circunscripciones.find(circ => circ.nombre === circunscripcion);
            if (selectedCircunscripcion && selectedCircunscripcion.localidades.length === 1) {
                setLocalidad(selectedCircunscripcion.localidades[0].nombre);
            } else {
                setTimeout(() => {
                    if (localidadRef.current) {
                        localidadRef.current.focus();
                    }
                }, 0);
            }
        }
        if (localidad) {
            const selectedLocalidad = circunscripciones.find(circ => circ.nombre === circunscripcion).localidades.find(loc => loc.nombre === localidad);
            if (selectedLocalidad.barrios.length === 1) {
                setBarrio(selectedLocalidad.barrios[0].nombre);
            } else {
                setTimeout(() => {
                    if (barrioRef.current) {
                        barrioRef.current.focus();
                    }
                }, 0);
            }
        }
        if (barrio) {
            const selectedBarrio = circunscripciones.find(circ => circ.nombre === circunscripcion).localidades.find(loc => loc.nombre === localidad).barrios.find(bar => bar.nombre === barrio);
            if (selectedBarrio.zonas.length === 1) {
                setZona(selectedBarrio.zonas[0]);
            } else {
                setTimeout(() => {
                    if (zonaRef.current) {
                        zonaRef.current.focus();
                    }
                }, 0);
            }
        }
    }, [circunscripcion, circunscripciones, localidad, barrio]);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setCircunscripcion(null);
        setLocalidad(null);
        setBarrio(null);
        setZona(null);
        setSugerencia('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí iría la lógica para enviar la sugerencia
        console.log({ circunscripcion, localidad, barrio, zona: zona?.nombre, sugerencia });
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
                    {sugerencias.map((sugerencia, index) => (
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
                                <strong>Circunscripción:</strong> {sugerencia.circunscripcion}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Localidad:</strong> {sugerencia.localidad}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Barrio:</strong> {sugerencia.barrio}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Zona:</strong> {sugerencia.zona}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Sugerencia:</strong> {sugerencia.texto}
                            </Typography>
                        </Box>
                    ))}
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
                    <div style={{ color: 'white', maxHeight: '2px' }}>.</div>
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
                        <FormControl fullWidth margin="normal">
                            <Autocomplete
                                options={circunscripciones?.map(circunscripcion => circunscripcion.nombre) || []}
                                value={circunscripcion}
                                renderInput={(params) => (
                                    <TextField {...params} label="Circunscripción" />
                                )}
                                openOnFocus
                                onChange={(event, newValue) => {
                                    setCircunscripcion(newValue);
                                    setLocalidad(null);
                                    setBarrio(null);
                                    setZona(null);
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <Autocomplete
                                options={circunscripciones?.find(circ => circ.nombre === circunscripcion)?.localidades?.map(localidad => localidad.nombre) || []}
                                value={localidad}
                                openOnFocus
                                disabled={circunscripcion === null}
                                renderInput={(params) => (
                                    <TextField {...params} label="Localidad" inputRef={localidadRef} />
                                )}
                                onChange={(event, newValue) => {
                                    setLocalidad(newValue);
                                    setBarrio(null);
                                    setZona(null);
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <Autocomplete
                                options={circunscripciones?.find(circ => circ.nombre === circunscripcion)?.localidades?.find(loc => loc.nombre === localidad)?.barrios?.map(barrio => barrio.nombre) || []}
                                value={barrio}
                                disabled={localidad === null}
                                openOnFocus
                                renderInput={(params) => (
                                    <TextField {...params} label="Barrio" inputRef={barrioRef} />
                                )}
                                onChange={(event, newValue) => {
                                    setBarrio(newValue);
                                    setZona(null);
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <Autocomplete
                                options={circunscripciones?.find(circ => circ.nombre === circunscripcion)?.localidades?.find(loc => loc.nombre === localidad)?.barrios?.find(bar => bar.nombre === barrio)?.zonas?.map(zona => zona.nombre) || []}
                                value={zona?.nombre || ''}
                                disabled={barrio === null}
                                openOnFocus
                                renderInput={(params) => (
                                    <TextField {...params} label="Zona" inputRef={zonaRef} />
                                )}
                                onChange={(event, newValue) => {
                                    setZona(circunscripciones?.find(circ => circ.nombre === circunscripcion)?.localidades?.find(loc => loc.nombre === localidad)?.barrios?.find(bar => bar.nombre === barrio)?.zonas?.find(zon => zon.nombre === newValue));
                                }}
                            />
                        </FormControl>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Sugerencia"
                            multiline
                            rows={4}
                            value={sugerencia}
                            onChange={(e) => setSugerencia(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: '#28508E',
                                '&:hover': {
                                    backgroundColor: '#1A365D',
                                }
                            }}
                        >
                            Enviar Sugerencia
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default Sugerencias;