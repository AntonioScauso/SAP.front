import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import useFetch, { host } from "../../utils/Fetch";

const ModalAdministracion = ({ open, setOpen, mode, item, setItem, activeTab, setActiveTab }) => {
    const [formData, setFormData] = useState({ nombre: '', parentId: '' });
    const [parentOptions, setParentOptions] = useState([]);
    const { postFetch, putFetch, getFetch } = useFetch();

    const url = `${host}tasacion/`;

    useEffect(() => {
        console.log(mode, item, activeTab);
    }, [mode, item, activeTab]);

    const handleClose = () => {
        setOpen(false);
        setItem(null);
    };

    const handleSubmit = () => {

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>{mode === 'add' ? 'Agregar' : 'Editar'} {activeTab === 0 ? 'Circunscripción' : activeTab === 1 ? 'Localidad' : activeTab === 2 ? 'Barrio' : 'Zona'}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Nombre"
                    type="text"
                    fullWidth
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />
                {activeTab > 0 && (
                    <FormControl fullWidth margin="dense">
                        <InputLabel>{activeTab === 1 ? 'Circunscripción' : activeTab === 2 ? 'Localidad' : 'Barrio'}</InputLabel>
                        <Select
                            value={formData.parentId}
                            onChange={handleChange}
                            name="parentId"
                        >
                            {parentOptions.map(option => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancelar</Button>
                <Button onClick={handleSubmit} color="primary">{mode === 'add' ? 'Agregar' : 'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalAdministracion;
