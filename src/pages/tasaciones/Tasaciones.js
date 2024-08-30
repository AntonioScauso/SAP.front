import React, { useEffect, useState, useRef } from 'react';
import { TextField, Grid, Autocomplete, Typography, Divider, Box, IconButton } from "@mui/material";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import BotonLoading from "../../components/BotonLoading";
import CustomDataGrid from "../../components/CustomDataGrid";
import { esES } from "@mui/material/locale";
import useFetch, { host } from "../../utils/Fetch";
import LogoColegio from "../../imagenes/LogoColegio.png";
import Indices from "../indices/Indices";
import BackspaceIcon from '@mui/icons-material/Backspace';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Sugerencias from "../sugerencias/Sugerencias";

export default function Tasaciones() {
    const [circunscripciones, setCircunscripciones] = useState(null);
    const [circunscripcion, setCircunscripcion] = useState(null);
    const [localidad, setLocalidad] = useState(null);
    const [barrio, setBarrio] = useState(null);
    const [zona, setZona] = useState(null);
    const [precios, setPrecios] = useState(null);
    const [loading, setLoading] = useState(false);
    const [zonaEnTabla, setZonaEnTabla] = useState(null);
    const [dolarOficial, setDolarOficial] = useState(null);
    const [dolarMep, setDolarMep] = useState(null);
    const [indice1, setIndice1] = useState('');
    const [indice2, setIndice2] = useState('');
    const [indice3, setIndice3] = useState('');

    const localidadRef = useRef(null);
    const barrioRef = useRef(null);
    const zonaRef = useRef(null);

    const { getFetch } = useFetch();
    const url = `${host}tasacion/`;

    useEffect(() => {
        getFetch(url + 'data/', true)
            .then(data => {
                setCircunscripciones(data.circunscripciones);
                setIndice1([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                setIndice2([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
                setIndice3([21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
            });
    }, []);

    function buscarZona(zona) {
        setLoading(true);
        getFetch(url + `precio/?id=${zona.id}`, true)
            .then(data => {
                setPrecios({
                    precioMin: data.precioMin,
                    precioMax: data.precioMax,
                    promedioPesos: data.promedioPesos,
                    precioMaxDolarOficial: data.precioMaxDolarOficial,
                    precioMinDolarOficial: data.precioMinDolarOficial,
                    promedioDolarOficial: data.promedioDolarOficial,
                    precioMaxDolarMep: data.precioMaxDolarMep,
                    precioMinDolarMep: data.precioMinDolarMep,
                    promedioDolarMep: data.promedioDolarMep,
                });
                setDolarOficial(data.dolarOficial);
                setDolarMep(data.dolarMep);
            })
            .finally(() => {
                setLoading(false);
                setZonaEnTabla(zona);
            });
    }

    function CustomGridToolBar() {
        return (
            <GridToolbarContainer style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'center'
            }}>
                {precios &&
                    <Typography variant='h5' style={{ marginRight: 'auto' }}>
                        Precios de la zona: {zonaEnTabla?.nombre}
                    </Typography>
                }
            </GridToolbarContainer>
        )
    }

    const columns = [
        { field: 'priceType', headerName: 'Moneda', flex: 1 },
        { field: 'minPrice', headerName: 'Precio Mínimo', flex: 1 },
        { field: 'maxPrice', headerName: 'Precio Máximo', flex: 1 },
        { field: 'avgPrice', headerName: 'Promedio', flex: 1 },
    ];

    const rows = [
        { id: 1, priceType: 'Pesos', minPrice: precios ? precios.precioMin : '', maxPrice: precios ? precios.precioMax : '', avgPrice: precios ? precios.promedioPesos : '' },
        { id: 2, priceType: 'Dólar Oficial', minPrice: precios ? precios.precioMinDolarOficial : '', maxPrice: precios ? precios.precioMaxDolarOficial : '', avgPrice: precios ? precios.promedioDolarOficial : '' },
        { id: 3, priceType: 'Dólar MEP', minPrice: precios ? precios.precioMinDolarMep : '', maxPrice: precios ? precios.precioMaxDolarMep : '', avgPrice: precios ? precios.promedioDolarMep : '' },
    ];

    useEffect(() => {
        if (circunscripcion) {
            const selectedCircunscripcion = circunscripciones.find(circ => circ.nombre === circunscripcion);
            if (selectedCircunscripcion && selectedCircunscripcion.localidades.length === 1) {
                setLocalidad(selectedCircunscripcion.localidades[0].nombre);
            } else {
                setTimeout(() => {
                    if (localidadRef.current) {
                        localidadRef.current.focus();
                        localidadRef.current.click();
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
                        barrioRef.current.click();
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
                        zonaRef.current.click();
                    }
                }, 0);
            }
        }
    }, [circunscripcion, circunscripciones, localidad, barrio]);

    const handleClear = () => {
        setCircunscripcion(null);
        setLocalidad(null);
        setBarrio(null);
        setZona(null);
        setPrecios(null);
        setZonaEnTabla(null);
    };

    return (
        <Box display="flex" flexDirection="row" height="100vh" width="100vw">
            <Box display="flex" flexDirection="column" width="20%" minWidth="200px" maxWidth="300px"
                marginTop={-3} ml={-3} overflow="auto" height="100%" style={{ backgroundColor: '#E0E0E0' }}
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '0.4em',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#28508E',
                    },
                }}>
                <Indices indice1={indice1} setIndice1={setIndice1} indice2={indice2} setIndice2={setIndice2} indice3={indice3} setIndice3={setIndice3} />
            </Box>
            <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#28508E', width: '1px', marginRight: '10px' }} />

            <Box flexGrow={1} display="flex" flexDirection="column" overflow="auto" padding="20px">
                <Grid container direction="column" spacing={2} mt={1}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center" gap={2}>
                        <Autocomplete
                            options={circunscripciones?.map(circunscripcion => circunscripcion.nombre)}
                            value={circunscripcion}
                            sx={{ width: '175px' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Circunscripcion"
                                />
                            )}
                            onChange={(event, newValue) => {
                                setCircunscripcion(newValue);
                                setLocalidad(null);
                                setBarrio(null);
                                setZona(null);
                            }}
                        />
                        <Autocomplete
                            options={circunscripciones?.find(circ => circ.nombre === circunscripcion)?.localidades?.map(localidad => localidad.nombre) || []}
                            value={localidad}
                            disabled={circunscripcion === null}
                            sx={{ width: '175px' }}
                            openOnFocus
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Localidad"
                                    inputRef={localidadRef}
                                />
                            )}
                            onChange={(event, newValue) => {
                                setLocalidad(newValue);
                                setBarrio(null);
                                setZona(null);
                            }}
                        />
                        <Autocomplete
                            options={circunscripciones?.find(circ => circ.nombre === circunscripcion)?.localidades?.find(loc => loc.nombre === localidad)?.barrios?.map(barrio => barrio.nombre) || []}
                            value={barrio}
                            openOnFocus
                            sx={{ width: '175px' }}
                            disabled={localidad === null}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Barrio"
                                    inputRef={barrioRef}
                                />
                            )}
                            onChange={(event, newValue) => {
                                setBarrio(newValue);
                                setZona(null);
                            }}
                        />
                        <Autocomplete
                            options={circunscripciones?.find(circ => circ.nombre === circunscripcion)?.localidades?.find(loc => loc.nombre === localidad)?.barrios?.find(bar => bar.nombre === barrio)?.zonas?.map(zona => zona.nombre) || []}
                            value={zona?.nombre || ''}
                            sx={{ width: '175px' }}
                            openOnFocus
                            disabled={barrio === null}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Zona"
                                    inputRef={zonaRef}
                                />
                            )}
                            onChange={(event, newValue) => {
                                setZona(circunscripciones?.find(circ => circ.nombre === circunscripcion)?.localidades?.find(loc => loc.nombre === localidad)?.barrios?.find(bar => bar.nombre === barrio)?.zonas?.find(zon => zon.nombre === newValue));
                            }}
                        />
                        <IconButton
                            onClick={handleClear}
                            color="primary"
                            aria-label="clear fields"
                            style={{ color: '#28508E' }}
                            disabled={circunscripcion === null && zonaEnTabla === null}
                        >
                            <BackspaceIcon />
                        </IconButton>
                    </Grid>
                    <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
                        <Grid item xs={2}>
                            <BotonLoading
                                loading={loading}
                                funcion={() => buscarZona(zona)}
                                state={zona === null}
                                colorLetra='white'
                                sx={{
                                    height: '35px', backgroundColor: '#28508E',
                                    '&:hover': { backgroundColor: '#28508E' }
                                }}
                                endIcon={<QueryStatsIcon style={{ fontSize: '1.5rem' }} />}
                            >
                                Consultar
                            </BotonLoading>
                        </Grid>
                    </Grid>
                </Grid>
                {precios ?
                    <Box display="flex" flexDirection="column" mt={2}>
                        <Box mb={2}>
                            <CustomDataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={3}
                                hideFooter
                                disableRowSelectionOnClick
                                localeText={esES.components.MuiDataGrid?.defaultProps?.localeText}
                                slots={{ toolbar: CustomGridToolBar }}
                                getRowClassName={(params) => {
                                    return params.row.id === 3 ? 'dolarMEP-row' : params.row.id === 2 ? 'dolarOficial-row' : 'pesos-row';
                                }}
                                sx={{
                                    height: '100%',
                                    fontSize: '1.2em',
                                    backgroundColor: '#f0f0f0',
                                    '& .MuiDataGrid-row': {
                                        '&.dolarMEP-row': {
                                            backgroundColor: 'rgba(33, 150, 243, 0.3)',
                                        },
                                        '&.dolarOficial-row': {
                                            backgroundColor: 'rgba(76, 175, 80, 0.3)',
                                        },
                                        '&.pesos-row': {
                                            backgroundColor: 'rgba(255, 152, 0, 0.3)',
                                        }
                                    }
                                }}
                            />
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={2}
                            border={1} borderColor="primary.main" borderRadius={2}>
                            <Box display="flex" justifyContent="center" alignItems="center" gap={4}>
                                <Typography variant="body1">
                                    Dólar Oficial: ${dolarOficial}
                                </Typography>
                                <Typography variant="body1">
                                    Dólar MEP: ${dolarMep}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="body1" textAlign="center">
                            Dólar promedio del último mes.
                        </Typography>
                    </Box>
                    :
                    <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
                        <img src={LogoColegio} alt="Logo Colegio" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </Box>
                }
            </Box>
            <Sugerencias />

        </Box>
    );
}