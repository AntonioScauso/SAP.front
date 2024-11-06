import React, { useEffect, useState, useRef } from 'react';
import { TextField, Grid, Autocomplete, Typography, Divider, Box, IconButton, useMediaQuery } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import BotonLoading from "../../components/BotonLoading";
import CustomDataGrid from "../../components/CustomDataGrid";
import { esES } from "@mui/material/locale";
import useFetch, { host } from "../../utils/Fetch";
import LogoColegio from "../../imagenes/LogoColegio.png";
import Indices from "../indices/Indices";
import BackspaceIcon from '@mui/icons-material/Backspace';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Sugerencias from "../sugerencias/Sugerencias";

const Tasaciones = () => {
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
    const [historialesDolar, setHistorialesDolar] = useState(null);

    const localidadRef = useRef(null);
    const barrioRef = useRef(null);
    const zonaRef = useRef(null);

    const { getFetch } = useFetch();
    const isMobile = useMediaQuery('(max-width:600px)');

    const url = `${host}tasacion/`;

    useEffect(() => {
        getFetch(url + 'data/', true)
            .then(data => {
                setCircunscripciones(data.circunscripciones);
            })
            .catch(err => {
                console.error(err);
            });
        getFetch(url + 'historialIndice/')
            .then(responseData => {
                const data = responseData.data;
                setIndice1(data[0]?.historial || []);
                setIndice2(data[1]?.historial || []);
                setIndice3(data[2]?.historial || []);
            })
            .catch(err => {
                console.error(err);
            });
        getFetch(url + 'historialesDolar/', true)
            .then(data => {
                setHistorialesDolar(data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (circunscripcion) {
            handleCircunscripcionChange();
        }
        if (localidad) {
            handleLocalidadChange();
        }
        if (barrio) {
            handleBarrioChange();
        }
    }, [circunscripcion, localidad, barrio]);

    const handleCircunscripcionChange = () => {
        const selectedCircunscripcion = circunscripciones.find(circ => circ.nombre === circunscripcion);
        if (selectedCircunscripcion && selectedCircunscripcion.localidades.length === 1) {
            setLocalidad(selectedCircunscripcion.localidades[0].nombre);
        } else {
            focusElement(localidadRef);
        }
    };

    const handleLocalidadChange = () => {
        const selectedLocalidad = circunscripciones.find(circ => circ.nombre === circunscripcion).localidades.find(loc => loc.nombre === localidad);
        if (selectedLocalidad.barrios.length === 1) {
            setBarrio(selectedLocalidad.barrios[0].nombre);
        } else {
            focusElement(barrioRef);
        }
    };

    const handleBarrioChange = () => {
        const selectedBarrio = circunscripciones.find(circ => circ.nombre === circunscripcion).localidades.find(loc => loc.nombre === localidad).barrios.find(bar => bar.nombre === barrio);
        if (selectedBarrio.zonas.length === 1) {
            setZona(selectedBarrio.zonas[0]);
        } else {
            focusElement(zonaRef);
        }
    };

    const focusElement = (ref) => {
        setTimeout(() => {
            if (ref.current) {
                ref.current.focus();
                ref.current.click();
            }
        }, 0);
    };

    const buscarZona = (zona) => {
        setLoading(true);
        getFetch(url + `precio/?id=${zona.id}`, true)
            .then(data => {
                setPrecios(data);
                setDolarOficial(data.dolarOficial);
                setDolarMep(data.dolarMep);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
                setZonaEnTabla(zona);
            });
    };

    const handleClear = () => {
        setCircunscripcion(null);
        setLocalidad(null);
        setBarrio(null);
        setZona(null);
        setPrecios(null);
        setZonaEnTabla(null);
    };

    // Component functions
    const CustomGridToolBar = () => (
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
    );

    const columns = [
        { field: 'priceType', headerName: 'Moneda', flex: 1 },
        { field: 'minPrice', headerName: 'Precio Mínimo', flex: 1 },
        { field: 'maxPrice', headerName: 'Precio Máximo', flex: 1 },
        { field: 'avgPrice', headerName: 'Promedio', flex: 1 },
    ];

    const rows = [
        { id: 1, priceType: 'Pesos', minPrice: precios?.precioMin, maxPrice: precios?.precioMax, avgPrice: precios?.promedioPesos },
        { id: 2, priceType: 'Dólar Oficial', minPrice: precios?.precioMinDolarOficial, maxPrice: precios?.precioMaxDolarOficial, avgPrice: precios?.promedioDolarOficial },
        { id: 3, priceType: 'Dólar MEP', minPrice: precios?.precioMinDolarMep, maxPrice: precios?.precioMaxDolarMep, avgPrice: precios?.promedioDolarMep },
    ];

    const renderAutocompletes = () => (
        <Grid container spacing={2} display="flex" flexDirection="row" justifyContent="center" alignItems="center">

            <Grid container spacing={2} width="90%" justifyContent="start" alignItems="center" padding="10px">
                <Grid item xs={isMobile ? 6 : 6}>
                    <Autocomplete
                        options={circunscripciones?.map(circunscripcion => circunscripcion.nombre) || []}
                        value={circunscripcion}
                        sx={{ width: isMobile ? '100%' : '100%' }}
                        renderInput={(params) => <TextField {...params} label="Circunscripcion" />}
                        onChange={(event, newValue) => {
                            setCircunscripcion(newValue);
                            setLocalidad(null);
                            setBarrio(null);
                            setZona(null);
                        }}
                    />
                </Grid>
                <Grid item xs={isMobile ? 6 : 6} >
                    <Autocomplete
                        options={circunscripciones?.find(circ => circ.nombre === circunscripcion)?.localidades?.map(localidad => localidad.nombre) || []}
                        value={localidad}
                        disabled={circunscripcion === null}
                        sx={{ width: isMobile ? '100%' : '100%' }}
                        openOnFocus
                        renderInput={(params) => <TextField {...params} label="Localidad" inputRef={localidadRef} />}
                        onChange={(event, newValue) => {
                            setLocalidad(newValue);
                            setBarrio(null);
                            setZona(null);
                        }}
                    />
                </Grid>
                <Grid item xs={isMobile ? 6 : 6} >
                    <Autocomplete
                        options={circunscripciones?.find(circ => circ.nombre === circunscripcion)?.localidades?.find(loc => loc.nombre === localidad)?.barrios?.map(barrio => barrio.nombre) || []}
                        value={barrio}
                        openOnFocus
                        sx={{ width: isMobile ? '100%' : '100%' }}
                        disabled={localidad === null}
                        renderInput={(params) => <TextField {...params} label="Barrio" inputRef={barrioRef} />}
                        onChange={(event, newValue) => {
                            setBarrio(newValue);
                            setZona(null);
                        }}
                    />
                </Grid>
                <Grid item xs={isMobile ? 6 : 6} >
                    <Autocomplete
                        options={circunscripciones?.find(circ => circ.nombre === circunscripcion)?.localidades?.find(loc => loc.nombre === localidad)?.barrios?.find(bar => bar.nombre === barrio)?.zonas?.map(zona => zona.nombre) || []}
                        value={zona?.nombre || ''}
                        sx={{ width: isMobile ? '100%' : '100%' }}
                        
                        openOnFocus
                        disabled={barrio === null}
                        renderInput={(params) => <TextField {...params} label="Zona" inputRef={zonaRef} />}
                        onChange={(event, newValue) => {
                            setZona(circunscripciones?.find(circ => circ.nombre === circunscripcion)?.localidades?.find(loc => loc.nombre === localidad)?.barrios?.find(bar => bar.nombre === barrio)?.zonas?.find(zon => zon.nombre === newValue));
                        }}
                    />
                </Grid>
            </Grid>
            {!isMobile && <Grid item xs={'auto'} width="10%"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'40px'}}>
                <IconButton
                    onClick={handleClear}
                    color="primary"
                    aria-label="clear fields"
                    style={{ color: '#28508E' }}
                    disabled={circunscripcion === null && zonaEnTabla === null}
                >
                    <BackspaceIcon />
                </IconButton>
            </Grid>}
        </Grid>
    );

    const renderMobileView = () => (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            overflowY: 'auto',
        }}>
            <Box sx={{
                padding: '10px',
                overflowY: 'auto',
                height: '100%',
                width: '90%',
            }}>
                {renderAutocompletes()}
                <Grid container justifyContent="center" style={{ marginTop: '20px'}}>
                    <Grid item xs={6} >
                        <BotonLoading
                            loading={loading}
                            funcion={() => buscarZona(zona)}
                            state={zona === null}
                            colorLetra='white'
                            sx={{
                                height: '35px',
                                backgroundColor: '#28508E',
                                '&:hover': { backgroundColor: '#28508E' },
                                width: '100%',
                            }}
                            endIcon={<QueryStatsIcon style={{ fontSize: '1.5rem' }} />}
                        >
                            Consultar
                        </BotonLoading>
                    </Grid>
                    <Grid item xs={6} container justifyContent="center">
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
                </Grid>
                {precios ? (
                    <Box mt={2}>
                        <Typography variant='h6' style={{ marginBottom: '10px', textAlign: 'center' }}>
                            Precios de la zona: {zonaEnTabla?.nombre}
                        </Typography>
                        {[
                            { title: 'Pesos', data: { min: precios.precioMin, max: precios.precioMax, avg: precios.promedioPesos }, color: 'rgba(255, 152, 0, 0.3)' },
                            { title: 'Dólar Oficial', data: { min: precios.precioMinDolarOficial, max: precios.precioMaxDolarOficial, avg: precios.promedioDolarOficial }, color: 'rgba(76, 175, 80, 0.3)' },
                            { title: 'Dólar MEP', data: { min: precios.precioMinDolarMep, max: precios.precioMaxDolarMep, avg: precios.promedioDolarMep }, color: 'rgba(33, 150, 243, 0.3)' }
                        ].map((item, index) => (
                            <Box key={index} sx={{
                                backgroundColor: item.color,
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px'
                            }}>
                                <Typography variant="subtitle1" fontWeight="bold">{item.title}</Typography>
                                <Typography>Precio Mínimo: {item.data.min}</Typography>
                                <Typography>Precio Máximo: {item.data.max}</Typography>
                                <Typography>Promedio: {item.data.avg}</Typography>
                            </Box>
                        ))}
                        <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={2}
                            border={1} borderColor="primary.main" borderRadius={2} mt={2}>
                            <Typography variant="body2">
                                Dólar Oficial: ${dolarOficial}
                            </Typography>
                            <Typography variant="body2">
                                Dólar MEP: ${dolarMep}
                            </Typography>
                        </Box>
                        <Typography variant="body2" textAlign="center" mt={1} mb={2}>
                            Dólar promedio del último mes.
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <img src={LogoColegio} alt="Logo Colegio" style={{ maxWidth: '100%' }} />
                    </Box>
                )}
            </Box>
        </Box>
    );

    const renderDesktopView = () => (
        <Box display="flex" flexDirection="row" alignItems="start"  height="100vh" width="100vw"  overflow="auto" >

            <Box display="flex" flexDirection="column" width="30%" minWidth="200px" maxWidth="300px"
                 marginBottom={3} overflow="auto" height="100%" style={{ backgroundColor: '#E0E0E0' }}
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '0.2em',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#28508E',
                    },
                }}>
                <Indices indice1={indice1} setIndice1={setIndice1} indice2={indice2} setIndice2={setIndice2} indice3={indice3} setIndice3={setIndice3} historialesDolar={historialesDolar} />
                <div style={{ paddingBottom: '30px', color: '#E0E0E0' }} >.</div>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#28508E', width: '1px', marginRight: '10px' }} />

            <Box flexGrow={1} display="flex" flexDirection="column" padding="30px" minHeight="40vw" width="80%" >
                <Grid container direction="column" mt={1}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center" gap={2}>
                        {renderAutocompletes()}
                    </Grid>
                    <Grid container justifyContent="center" mt={1}>
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
                                    maxHeight: '45vh',
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
                        <Sugerencias zonaEnTabla={zonaEnTabla} />
                    </Box>
                    :
                    <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center" paddingTop={3} marginBottom={-2}> 
                        <p style={{fontSize:'3vw', marginBottom:"-30px"}}>SISTEMA DE CONSULTA DE VALORES</p>
                        <img src={LogoColegio} alt="Logo Colegio" style={{ width: '55vw', height:'auto' }} />
                    </Box>
                }
            </Box>
        </Box>
    );

    return isMobile ? renderMobileView() : renderDesktopView();
};

export default Tasaciones;