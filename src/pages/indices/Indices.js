import React, { useState } from 'react';
import { TextField, Checkbox, Typography, Divider, Button, Popover, List, ListItem, ListItemText, Box } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import { Height } from '@mui/icons-material';
import SeparadorMiles from '../../utils/SeparadorDeMiles';

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
            return historial[historial.length - 1][type];
        }
        return '';
    };

    const getLastInflacionValue = (historial) => {
        if (historial && historial.length > 0) {
            return historial[historial.length - 1].variacion;
        }
        return '';
    };

    const renderIndiceSection = (label, shortLabel, indice, setIndice) => (
        <Box display="flex" flexDirection="column" mb={1.5} gap={1} paddingLeft={2} paddingTop={1}>
            
            <Box display="flex" flexDirection="row" gap='10px' paddingRight='10px' >
                <TextField
                    label={shortLabel}
                    value={SeparadorMiles(getLastActiveValue(indice))}
                    disabled
                    size="medium"
                    sx={{
                        width: '80%',
                        '& .MuiInputBase-root': {
                            color: 'rgba(0, 0, 0, 0.6)',
                            height: 'clamp(3rem, 4vw, 5rem)',
                            fontSize:'clamp(1rem, 1.3vw, 1.7rem)'
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontSize:'clamp(1rem, 1.3vw, 1.6rem)'
                            
                        },
                        '& .MuiInputBase-input': {
                            WebkitTextFillColor: 'inherit',
                            opacity: 1,
                        }, 
                       
                    }}
                />
                <Box display="flex"  justifyContent="center" >
                    
                    <button style={{width:'3vw', display:'flex', justifyContent:'center',
                                    alignItems:'center', cursor:'pointer', backgroundColor:'transparent'
                                    , color:'#28508E', border:'none', borderRadius:'20px'}}
                                    onClick={(e) => handleClick(e, indice)}
                                    > <HistoryIcon style={{fontSize:'clamp(1.5rem, 1.8vw, 2rem)'}}/></button>
                </Box>

            </Box>
            
            {(shortLabel=='ICC-CA'||shortLabel=='ICC-CA + CS')&&
            
            <Box display="flex" justifyContent="center" mt={-1} mb={-1}>
                <Checkbox checked={conCargaSocial} onClick={() => setConCargaSocial(!conCargaSocial)} />
                <Typography sx={{
                    alignSelf: 'center',
                    fontSize:'clamp(1rem, 1.2vw, 1.4rem)',
                }}>Con carga social</Typography>
            </Box>} 
            <Divider sx={{ backgroundColor: '#28508E', width: '90%', alignSelf: 'center' }} />
        </Box>
    );

    const renderDolarSection = (label, shortLabel, data, type = 'venta') => (
        <Box display="flex" flexDirection="column" mb={1.2} gap={2} paddingLeft={2}>

            <Box display="flex" flexDirection="row" gap='10px' paddingRight='10px'>
                <Typography variant="subtitle2">{label}</Typography>
                <TextField
                        label={shortLabel}
                        value={`$${SeparadorMiles(getLastDolarValue(data, type))}`}
                        disabled
                        size="medium"
                        sx={{
                            width: '80%',
                            '& .MuiInputBase-root': {
                                color: 'rgba(0, 0, 0, 0.6)',
                                height: 'clamp(3rem, 4vw, 5rem)',
                                fontSize:'clamp(1rem, 1.3vw, 1.7rem)'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(0, 0, 0, 0.23)',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'rgba(0, 0, 0, 0.6)',
                                fontSize:'clamp(1rem, 1.3vw, 1.6rem)'
                                
                            },
                            '& .MuiInputBase-input': {
                                WebkitTextFillColor: 'inherit',
                                opacity: 1,
                            }, 
                        }}
                    />
                <Box display="flex" justifyContent="center">
                    <button style={{width:'3vw', display:'flex', justifyContent:'center',
                                    alignItems:'center', cursor:'pointer', backgroundColor:'transparent'
                                    , color:'#28508E', border:'none'}}
                                    onClick={(e) => handleClick(e, data)}
                        > <HistoryIcon style={{fontSize:'clamp(1.5rem, 1.8vw, 2rem)'}} /></button>
                </Box>
            </Box>
           
            <Divider sx={{ backgroundColor: '#28508E', width: '90%', alignSelf: 'center' }} />
        </Box>
    );

    const renderInflacionSection = (label, shortLabel, data) => (
        <Box display="flex" flexDirection="column" mb={2} gap={2} paddingLeft={2}>
            <Box display="flex" flexDirection="row" gap='10px' paddingRight='10px'>
                <Typography variant="subtitle2">{label}</Typography>
                <TextField
                    label={shortLabel}
                    value={`${getLastInflacionValue(data)}%`}
                    disabled
                    size="medium"
                    sx={{
                        width: '80%',
                        '& .MuiInputBase-root': {
                            color: 'rgba(0, 0, 0, 0.6)',
                            height: 'clamp(3rem, 4vw, 5rem)',
                            fontSize:'clamp(1rem, 1.3vw, 1.7rem)'
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontSize:'clamp(1rem, 1.3vw, 1.6rem)'
                            
                        },
                        '& .MuiInputBase-input': {
                            WebkitTextFillColor: 'inherit',
                            opacity: 1,
                        }, 
                    }}
                />
                <Box display="flex" justifyContent="center">
                    <button style={{width:'3vw', display:'flex', justifyContent:'center',
                                        alignItems:'center', cursor:'pointer', backgroundColor:'transparent'
                                        , color:'#28508E', border:'none', borderRadius:'20px'}}
                                        onClick={(e) => handleClick(e, data)}
                            > <HistoryIcon  style={{fontSize:'clamp(1.5rem, 1.8vw, 2rem)'}}/></button>
                </Box>
            </Box>
            <Divider sx={{ backgroundColor: '#28508E', width: '80%', alignSelf: 'center' }} />
        </Box>
    );

    return (
        <Box>
            <Typography variant="h6" textAlign="center" mt={1} fontSize='clamp(1.4rem, 1.8vw, 2rem)' color='rgba(0, 0, 0, 0.6)'>
                Precio de la Construcción
            </Typography>
            <Box display="flex" justifyContent="center" mb={1}>
                <Divider sx={{ backgroundColor: '#28508E', width: '100%' }} />
            </Box>

            <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="space-around">
                {renderIndiceSection("", "ICC CBA", indice1, setIndice1)}

                
                
                {conCargaSocial ?
                    renderIndiceSection("", "ICC-CA + CS", indice2, setIndice2)
                    :
                    renderIndiceSection("", "ICC-CA", indice3, setIndice3)
                }
                

                <Typography variant="h6" textAlign="center" mt={-2} mb={1} fontSize='clamp(1.5rem, 1.8vw, 2rem)' color='rgba(0, 0, 0, 0.6)'>
                    Cotizaciones
                </Typography>

                {renderDolarSection("", "Cotización MEP", historialesDolar?.dolarMep)}
                {renderDolarSection("", "Cotización Oficial", historialesDolar?.dolarOficial)}
                {renderInflacionSection("", "Índice de Inflación", historialesDolar?.indicesInflacion)}
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
                sx={{
                    
                    '& .MuiListItemText-primary': {
                        fontSize: 'clamp(1rem, 1.2vw, 1.8rem)', // Ajusta el tamaño de fuente para el texto de cada elemento
                    },
                }}
            >
                <List>
                    {selectedIndice && selectedIndice.slice().reverse().map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText 
                                primary={
                                    item.valor ? (
                                        <>
                                            <span style={{ fontWeight: 'bold' }}>{item.mes}/{item['año']}</span> - ${SeparadorMiles(item.valor)}
                                        </>
                                    ) : item.variacion ? (
                                        <>
                                            <span style={{ fontWeight: 'bold' }}>{item.fecha}</span> - {item.variacion}%
                                        </>
                                    ) : (
                                        <>
                                            <span style={{ fontWeight: 'bold' }}>{item.fecha}</span> - 
                                            <span style={{ fontWeight: 'bold' }}> Compra:</span> ${SeparadorMiles(item.compra)} - 
                                            <span style={{ fontWeight: 'bold' }}> Venta:</span> ${SeparadorMiles(item.venta)}
                                        </>
                                    )
                                }
                                sx={{ fontSize: 'clamp(1rem, 1.2vw, 1.5rem)' }} />
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </Box>
    );
}