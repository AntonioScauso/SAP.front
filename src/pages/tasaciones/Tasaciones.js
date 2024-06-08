import React, { useEffect, useState } from 'react';
import { TextField, Grid, Autocomplete, Typography } from "@mui/material";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import BotonLoading from "../../components/BotonLoading";
import CustomDataGrid from "../../components/CustomDataGrid";
import { esES } from "@mui/material/locale";
import useFetch, { host } from "../../utils/Fetch";

export default function Tasaciones() {
    const [circunscripciones, setCircunscripciones] = useState(null);
    const [circunscripcion, setCircunscripcion] = useState(null);
    const [localidad, setLocalidad] = useState(null);
    const [barrio, setBarrio] = useState(null);
    const [zona, setZona] = useState(null);
    const [precios, setPrecios] = useState(null);
    const [loading, setLoading] = useState(false);
    const [zonaEnTabla, setZonaEnTabla] = useState(null);

    const { getFetch } = useFetch();
    const url = `${host}tasacion/`;

    useEffect(() => {
        getFetch(url + 'data/', true)
            .then(data => {
                setCircunscripciones(data.circunscripciones);
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
                <GridToolbarExport />
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

    return (
        <Grid container gap={5}>
            <Grid container gap={5} justifyContent={'center'} alignItems={'center'}>
                <Autocomplete
                    options={circunscripciones?.map(circunscripcion => circunscripcion.nombre)}
                    style={{ width: 200 }}
                    value={circunscripcion}
                    renderInput={(params) => <TextField {...params} label="Circunscripcion" />}
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
                    style={{ width: 200 }}
                    disabled={circunscripcion === null}
                    renderInput={(params) => <TextField {...params} label="Localidad" />}
                    onChange={(event, newValue) => {
                        setLocalidad(newValue);
                        setBarrio(null);
                        setZona(null);
                    }}
                />
                <Autocomplete
                    options={circunscripciones?.find(circ => circ.nombre === circunscripcion)?.localidades?.find(loc => loc.nombre === localidad)?.barrios?.map(barrio => barrio.nombre) || []}
                    value={barrio}
                    style={{ width: 200 }}
                    disabled={localidad === null}
                    renderInput={(params) => <TextField {...params} label="Barrio" />}
                    onChange={(event, newValue) => {
                        setBarrio(newValue);
                        setZona(null);
                    }}
                />
                <Autocomplete
                    options={circunscripciones?.find(circ => circ.nombre === circunscripcion)?.localidades?.find(loc => loc.nombre === localidad)?.barrios?.find(bar => bar.nombre === barrio)?.zonas?.map(zona => zona.nombre) || []}
                    value={zona?.nombre || ''}
                    style={{ width: 200 }}
                    disabled={barrio === null}
                    renderInput={(params) => <TextField {...params} label="Zona" />}
                    onChange={(event, newValue) => {
                        setZona(circunscripciones?.find(circ => circ.nombre === circunscripcion)?.localidades?.find(loc => loc.nombre === localidad)?.barrios?.find(bar => bar.nombre === barrio)?.zonas?.find(zon => zon.nombre === newValue));
                    }}
                />
                <Grid style={{ width: 150 }}>
                    <BotonLoading
                        loading={loading}
                        funcion={() => buscarZona(zona)}
                        state={zona === null}
                    >
                        Buscar
                    </BotonLoading>
                </Grid>
            </Grid>
            {precios &&
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    style={{
                        height: "100vh",
                        width: "100%",
                    }}
                >
                    <Grid item xs={12} style={{ width: "100%" }} >
                        <CustomDataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={3}
                            disableRowSelectionOnClick
                            localeText={esES.components.MuiDataGrid?.defaultProps?.localeText}
                            slots={{ toolbar: CustomGridToolBar }}
                            style={{ flexGrow: 1, padding: 10 }}
                        />
                    </Grid>
                </Grid>
            }
        </Grid>
    );
}

