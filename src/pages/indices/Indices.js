import React, { useState } from 'react';
import { TextField, Checkbox, Typography, Divider, Button, Popover, List, ListItem, ListItemText, Box } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';

export default function Indices(props) {
    const { indice1, setIndice1, indice2, setIndice2, indice3, setIndice3, historialesDolar } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndice, setSelectedIndice] = useState(null);
    const [conCargaSocial, setConCargaSocial] = useState(false);

    const handleClick = (event, historial) => {
        setAnchorEl(event.currentTarget);
        setSelectedIndice(historial);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedIndice(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const getLastActiveValue = (historial) => {
        if (historial && historial.length > 0) {
            return historial[historial.length - 1].valor;
        }
        return '';
    };

    const getLastDolarValue = (historial, type = 'venta') => {
        if (historial && historial.length > 0) {
            return historial[0][type];
        }
        return '';
    };

    const getLastInflacionValue = (historial) => {
        if (historial && historial.length > 0) {
            return historial[0].variacion;
        }
        return '';
    };

    const renderIndiceSection = (label, shortLabel, indice, setIndice) => (
        <Box display="flex" flexDirection="column" mb={2} gap={1} paddingLeft={2}>
            <Typography variant="subtitle2">{label}</Typography>
            <TextField
                label={shortLabel}
                value={getLastActiveValue(indice)}
                disabled
                size="small"
                sx={{
                    width: '80%',
                    '& .MuiInputBase-root': {
                        color: 'text.primary',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.6)',
                    },
                    '& .MuiInputBase-input': {
                        WebkitTextFillColor: 'inherit',
                        opacity: 1,
                    },
                }}
            />
            <Box display="flex" justifyContent="center">
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<HistoryIcon />}
                    onClick={(e) => handleClick(e, indice)}
                    sx={{ alignSelf: 'flex-start', mt: 1, mb: 1 }}
                >
                    Historial
                </Button>
            </Box>
            <Divider sx={{ backgroundColor: '#28508E', width: '80%', alignSelf: 'center' }} />
        </Box>
    );

    const renderDolarSection = (label, shortLabel, data, type = 'venta') => (
        <Box display="flex" flexDirection="column" mb={2} gap={1} paddingLeft={2}>
            <Typography variant="subtitle2">{label}</Typography>
            <TextField
                label={shortLabel}
                value={`$${getLastDolarValue(data, type)}`}
                disabled
                size="small"
                sx={{
                    width: '80%',
                    '& .MuiInputBase-root': {
                        color: 'text.primary',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.6)',
                    },
                    '& .MuiInputBase-input': {
                        WebkitTextFillColor: 'inherit',
                        opacity: 1,
                    },
                }}
            />
            <Box display="flex" justifyContent="center">
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<HistoryIcon />}
                    onClick={(e) => handleClick(e, data)}
                    sx={{ alignSelf: 'flex-start', mt: 1, mb: 1 }}
                >
                    Historial
                </Button>
            </Box>
            <Divider sx={{ backgroundColor: '#28508E', width: '80%', alignSelf: 'center' }} />
        </Box>
    );

    const renderInflacionSection = (label, shortLabel, data) => (
        <Box display="flex" flexDirection="column" mb={2} gap={1} paddingLeft={2}>
            <Typography variant="subtitle2">{label}</Typography>
            <TextField
                label={shortLabel}
                value={`${getLastInflacionValue(data)}%`}
                disabled
                size="small"
                sx={{
                    width: '80%',
                    '& .MuiInputBase-root': {
                        color: 'text.primary',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.6)',
                    },
                    '& .MuiInputBase-input': {
                        WebkitTextFillColor: 'inherit',
                        opacity: 1,
                    },
                }}
            />
            <Box display="flex" justifyContent="center">
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<HistoryIcon />}
                    onClick={(e) => handleClick(e, data)}
                    sx={{ alignSelf: 'flex-start', mt: 1, mb: 1 }}
                >
                    Historial
                </Button>
            </Box>
            <Divider sx={{ backgroundColor: '#28508E', width: '80%', alignSelf: 'center' }} />
        </Box>
    );

    return (
        <Box>
            <Typography variant="h6" textAlign="center" mt={1}>Costos</Typography>
            <Box display="flex" justifyContent="center" mb={1}>
                <Divider sx={{ backgroundColor: '#28508E', width: '100%' }} />
            </Box>

            <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="space-around">
                {renderIndiceSection("", "ICC CBA", indice1, setIndice1)}

                
                <Box display="flex" justifyContent="center" mt={-1}>
                    <Checkbox checked={conCargaSocial} onClick={() => setConCargaSocial(!conCargaSocial)} />
                    <Typography sx={{
                        alignSelf: 'center',
                        fontSize: '0.8rem',
                    }}>Con carga social</Typography>
                </Box>
                {conCargaSocial ?
                    renderIndiceSection("", "ICCAC + CS", indice2, setIndice2)
                    :
                    renderIndiceSection("", "ICCAC", indice3, setIndice3)
                }
                

                <Typography variant="h6" textAlign="center" mt={2} mb={1}>
                    Cotizaciones
                </Typography>

                {renderDolarSection("", "Cotización MEP", historialesDolar?.dolarMep)}
                {renderDolarSection("", "Cotización Oficial", historialesDolar?.dolarOficial)}
                {renderInflacionSection("Índice de Inflación", "Variación", historialesDolar?.indicesInflacion)}
            </Box>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List>
                    {selectedIndice && selectedIndice.slice().reverse().map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={item.valor ?
                                    ` ${item.mes}/${item['año']} - $${item.valor}` :
                                    item.variacion ?
                                        ` ${item.fecha} - ${item.variacion}%` :
                                        ` ${item.fecha} - Compra: $${item.compra} - Venta: $${item.venta}`
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </Box>
    );
}