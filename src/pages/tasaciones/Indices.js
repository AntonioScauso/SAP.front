import React, { useState } from 'react';
import { TextField, Grid, Typography, Divider, Button, Popover, List, ListItem, ListItemText } from "@mui/material";
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
        <Grid item container direction="column" alignItems="stretch" sx={{ width: '100%' }}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2">{label}</Typography>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<HistoryIcon />}
                    style={{ marginLeft: '25%' }}
                    onClick={(e) => handleClick(e, indice)}
                >
                    Historial
                </Button>
            </Grid>
            <Divider sx={{ my: 1 }} />
            <TextField
                label={shortLabel}
                value={indice[indice.length - 1] || ''}
                fullWidth
                size="small"
                onChange={(e) => setIndice([...indice.slice(0, -1), e.target.value])}
            />
        </Grid>
    );

    return (
        <Grid container paddingX={2} direction='column' justifyContent={'center'} alignItems={'center'} gap={3} >
            <Typography variant="h6" textAlign={'center'}>Índices</Typography>

            {renderIndiceSection("Índice de costo de construcción", "ICC", indice1, setIndice1)}
            {renderIndiceSection("Índice de construcción del colegio de arquitectos de Córdoba", "ICCAC", indice2, setIndice2)}
            {renderIndiceSection("Índice de costo de la construcción de galpones", "ICCG", indice3, setIndice3)}

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
        </Grid>
    );
}