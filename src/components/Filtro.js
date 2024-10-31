import React, { useEffect, useState } from 'react';
import { Grid, Typography, TextField, Autocomplete, Checkbox, FormControlLabel, Button, Chip, Box, Select, MenuItem } from "@mui/material";

export default function Filtro({ columns, filterColumn, setFilterColumn, filterValue, setFilterValue, fixedFilters, setFixedFilters, filteredCount }) {
    const selectedColumn = columns?.find(c => c.field === filterColumn) || null;

    const handleFixFilter = () => {
        if (filterColumn && filterValue) {
            setFixedFilters([...fixedFilters, { column: filterColumn, value: filterValue }]);
            setFilterColumn('');
            setFilterValue('');
        }
    };

    const handleRemoveFilter = (index) => {
        const newFixedFilters = fixedFilters.filter((_, i) => i !== index);
        setFixedFilters(newFixedFilters);
    };

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item container spacing={2} alignItems="center" style={{ width: selectedColumn?.field === "fecha_vencimiento" || selectedColumn?.field === "fecha" ? '700px' : '450px' }}>
                <Grid item style={{ width: '150px', marginRight: '20px' }}>
                    <Autocomplete
                        options={columns?.filter(c => c.headerName !== "Acciones")}
                        getOptionLabel={(option) => option.headerName}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Columna"
                                error={filteredCount === 0 && filterValue}
                                style={{ width: '150px' }}
                            />
                        )}
                        value={selectedColumn}
                        onChange={(e, value) => {
                            setFilterColumn(value ? value.field : '');
                            setFilterValue('');
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item style={{ width: selectedColumn?.field === "fecha_vencimiento" || selectedColumn?.field === "fecha" ? '500px' : '250px' }}>
                    {selectedColumn?.field === "estadsdo" ? (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filterValue === 'true'}
                                    onChange={(e) => setFilterValue(e.target.checked ? 'true' : 'false')}
                                    disabled={!filterColumn}
                                />
                            }
                            label="Con Pago"
                        />
                    ) : (
                        <TextField
                            disabled={!filterColumn}
                            placeholder='Buscar...'
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            error={filteredCount === 0 && filterValue}
                            fullWidth
                        />
                    )}
                </Grid>
            </Grid>
            <Grid item style={{ width: '250px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFixFilter}
                    fullWidth
                    style={{ height: '40px' }}
                    disabled={!filterColumn || !filterValue}
                >
                    Fijar Filtro
                </Button>
            </Grid>
            <Grid item xs>
                <Box sx={{ overflowX: 'auto', display: 'flex', flexWrap: 'nowrap' }}>
                    {fixedFilters?.map((ff, index) => (
                        <Chip
                            key={index}
                            onDelete={() => handleRemoveFilter(index)}
                            label={`${ff.column}: ${ff.value}`}
                            color="primary"
                            variant="outlined"
                            style={{ marginRight: '8px' }}
                        />
                    ))}
                </Box>
            </Grid>
            {filterValue && filterColumn && (
                <Grid item xs={12}>
                    <Typography variant="body1" color={filteredCount === 0 ? "error" : "initial"}>
                        {filteredCount} coincidencias encontradas
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
}

// Función estática actualizada para filtrar
Filtro.filtrarFilas = function (filas, columns, filterColumn, filterValue, fixedFilters) {
    let result = filas;

    const allFilters = [...fixedFilters, { column: filterColumn, value: filterValue }]
        .filter(f => f.column && f.value);

    allFilters.forEach(({ column, value }) => {
        result = result.filter(declaracion => {
            const col = columns?.find(c => c.field === column);
            if (!col) return true;

            let colValue = declaracion[column];

            if (column === 'estado') {
                colValue = declaracion.solicitud?.estado?.nombre || declaracion.estado;
            }

            if (typeof colValue === 'string') {
                return colValue.toLowerCase().includes(value.toLowerCase());
            }

            return false;
        });
    });

    return result;
};
