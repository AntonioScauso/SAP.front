import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Collapse,
    Tooltip,
    InputAdornment,
    Grid
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, ExpandLess, ExpandMore, Search as SearchIcon } from '@mui/icons-material';
import useFetch, { host } from "../../utils/Fetch";
import ModalAdministracion from './ModalAdministracion';

export default function Administracion() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [editItem, setEditItem] = useState(null);
    const [expanded, setExpanded] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');

    const { getFetch, deleteFetch } = useFetch();
    const url = `${host}tasacion/`;

    const tabs = ['Localidades', 'Barrios', 'Zonas'];

    useEffect(() => {
        console.log('administracion',url)
        getFetch(url + 'data/', true)
            .then(data => {
                setData(data.circunscripciones);
                setFilteredData(data.circunscripciones);
            });
    }, []);

    useEffect(() => {
        const filtered = data.filter(item =>
            item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.localidades.some(loc =>
                loc.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                loc.barrios.some(bar =>
                    bar.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    bar.zonas.some(zona =>
                        zona.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                )
            )
        );
        setFilteredData(filtered);
    }, [searchTerm, data]);

    const handleAddItem = () => {
        setModalMode('add');
        setModalOpen(true);
    };

    const handleEditItem = (item) => {
        setModalMode('edit');
        setEditItem(item);
        setModalOpen(true);
    };

    const handleDeleteItem = (id) => {
        // Implementar lógica para eliminar item
        // Probablemente quieras mostrar un diálogo de confirmación antes de eliminar
    };

    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const getBackgroundColor = (level) => {
        switch (level) {
            case 0: return 'inherit';
            case 1: return '#e3f2fd';
            case 2: return '#e8f5e9';
            case 3: return '#fff9c4';
            default: return 'inherit';
        }
    };

    const getItemType = (level) => {
        switch (level) {
            case 0: return 'Circunscripción';
            case 1: return 'Localidad';
            case 2: return 'Barrio';
            case 3: return 'Zona';
            default: return '';
        }
    };

    const highlightText = (text, highlight) => {
        if (!highlight.trim()) {
            return <span>{text}</span>;
        }
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ?
                        <span key={i} style={{ backgroundColor: '#FFFF00' }}>{part}</span> :
                        part
                )}
            </span>
        );
    };

    const renderItems = (items, level = 0) => {
        const currentLevelItems = level === 0 ? items :
            level === 1 ? items.localidades :
                level === 2 ? items.barrios :
                    items.zonas;

        return (
            <List>
                {currentLevelItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <ListItem
                            style={{
                                paddingLeft: `${level * 20}px`,
                                backgroundColor: index % 2 === 0 ? getBackgroundColor(level) : '#f5f5f5'
                            }}
                        >
                            <Grid container alignItems="center" justifyContent="flex-end">
                                <Grid item xs={7} >
                                    <ListItemText primary={highlightText(item.nombre, searchTerm)} />
                                </Grid>
                                <Grid item xs={3}>
                                    <ListItemText primary={getItemType(level)} />
                                </Grid>
                                <Grid item xs={2}>
                                    <ListItemSecondaryAction>
                                        {level < 3 && (
                                            <IconButton edge="end" onClick={() => toggleExpand(item.id)}>
                                                {expanded[item.id] ? <ExpandLess style={{ color: 'green' }} /> : <ExpandMore style={{ color: 'green' }} />}
                                            </IconButton>
                                        )}
                                        <IconButton edge="end" onClick={() => handleEditItem(item)}>
                                            <EditIcon style={{ color: 'green' }} />
                                        </IconButton>
                                        <IconButton edge="end" onClick={() => handleDeleteItem(item.id)}>
                                            <DeleteIcon style={{ color: 'red' }} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </Grid>
                            </Grid>
                        </ListItem>
                        {level < 3 && (
                            <Collapse in={expanded[item.id]} timeout="auto" unmountOnExit>
                                {renderItems(item, level + 1)}
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>
        );
    };

    return (
        <Box display="flex" flexDirection="column" height="80vh" width="100vw" overflow="hidden">
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Box>
                    {tabs.map((tab, index) => (
                        <Tooltip title={`Agregar ${tab.slice(0, -1)}`} key={index}>
                            <Button
                                startIcon={<AddIcon />}
                                variant="contained"
                                style={{ backgroundColor: '#28508E', color: 'white', marginLeft: 10 }}
                                onClick={() => {
                                    setActiveTab(index);
                                    handleAddItem();
                                }}
                            >
                                {tab}
                            </Button>
                        </Tooltip>
                    ))}
                </Box>
            </Box>

            <List>
                <ListItem style={{ backgroundColor: '#28508E', fontWeight: 'bold', color: 'white' }}>
                    <Grid container>
                        <Grid item xs={7}>
                            <ListItemText primary="Nombre" />
                        </Grid>
                        <Grid item xs={3}>
                            <ListItemText primary="Tipo" />
                        </Grid>
                        <Grid item xs={2}>
                            <ListItemText primary="Acciones" style={{ textAlign: 'right' }} />
                        </Grid>
                    </Grid>
                </ListItem>
            </List>

            <Box
                flexGrow={1}
                overflow="auto"
                sx={{
                    "&::-webkit-scrollbar": {
                        width: "10px",
                        backgroundColor: "#f5f5f5",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#28508E",
                        borderRadius: "10px",
                        backgroundClip: "content-box",
                        border: "2px solid transparent",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f5f5f5",
                    },
                }}
            >
                {renderItems(filteredData)}
            </Box>
            <ModalAdministracion
                open={modalOpen}
                setOpen={setModalOpen}
                mode={modalMode}
                item={editItem}
                setItem={setEditItem}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </Box>
    );
}