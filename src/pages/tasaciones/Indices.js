import React, { useState } from 'react';
import { TextField, Grid, Typography, Divider, Button, Popover, List, ListItem, ListItemText, Box } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';

export default function Indices(props) {
    const { indice1, setIndice1, indice2, setIndice2, indice3, setIndice3 } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndice, setSelectedIndice] = useState(null);

    const handleClick = (event, indice) => {
        setAnchorEl(event.currentTarget);
        setSelectedIndice(indice);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedIndice(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const renderIndiceSection = (label, shortLabel, indice, setIndice) => (
        <Box display="flex" flexDirection="column" mb={2} gap={1} paddingLeft={2} >
            <Typography variant="subtitle2">{label}</Typography>
            <TextField
                label={shortLabel}
                value={indice[indice.length - 1] || ''}
                disabled
                size="small"
                onChange={(e) => setIndice([...indice.slice(0, -1), e.target.value])}
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
            {indice !== indice3 &&
                <Divider sx={{ backgroundColor: '#28508E', width: '80%', alignSelf: 'center' }} />
            }
        </Box>
    );

    return (
        <Box >
            <Typography variant="h6" textAlign="center" mt={1}>Índices</Typography>
            <Box display="flex" justifyContent="center" mb={1}>
                <Divider sx={{ backgroundColor: '#28508E', width: '100%' }} />
            </Box>
            <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="space-around">
                {renderIndiceSection("Índice de costo de construcción", "ICC", indice1, setIndice1)}
                {renderIndiceSection("Índice de construcción del colegio de arquitectos de Córdoba", "ICCAC", indice2, setIndice2)}
                {renderIndiceSection("Índice de costo de la construcción de galpones", "ICCG", indice3, setIndice3)}
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
                    {selectedIndice && selectedIndice.slice().reverse().map((valor, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`Mes ${selectedIndice.length - index}: ${valor}`} />
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </Box>
    );
}