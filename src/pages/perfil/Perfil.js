import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Grid, TextField, Button, Typography, Paper, Divider, IconButton, InputAdornment } from '@mui/material';
import { UserContext } from "../../contexts/UserContext";
import useFetch, { host } from "../../utils/Fetch";
import Swal from 'sweetalert2';
import BotonLoading from '../../components/BotonLoading';
import { LockOutlined as LockOutlinedIcon , ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';

export default function PerfilPage() {
    const [contraseñaActual, setContraseñaActual] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [showContraseñaActual, setShowContraseñaActual] = useState(false);
    const [showNuevaContraseña, setShowNuevaContraseña] = useState(false);
    const [showConfirmarContraseña, setShowConfirmarContraseña] = useState(false);

    const [loading, setLoading] = useState(false);
    const { postFetch } = useFetch();
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setLoading(true);
        if (nuevaContraseña === confirmarContraseña) {
            postFetch(`${host}usuario/cambiar-contraseña/`, {
                contraseña: contraseñaActual,
                nueva_contraseña: nuevaContraseña
            }, true)
                .then(data => {
                    console.log(data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Contraseña cambiada',
                        text: data.mensaje,
                    });
                    setContraseñaActual('');
                    setNuevaContraseña('');
                    setConfirmarContraseña('');
                    navigate("/tasaciones");
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.mensaje,
                    });
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden',
            });
        }
    };

    const handleClickShowPassword = (setter) => () => {
        setter((show) => !show);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh" >
            <Paper sx={{ p: 4, width: '100%', maxWidth: 400, marginTop: 15 }}>
                <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
                    <LockOutlinedIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h4" component="h1" gutterBottom>
                        Cambiar Contraseña
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />
                <Box component="form" onSubmit={handlePasswordChange} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="currentPassword"
                        label="Contraseña actual"
                        type={showContraseñaActual ? 'text' : 'password'}
                        id="currentPassword"
                        autoComplete="current-password"
                        value={contraseñaActual}
                        onChange={(e) => setContraseñaActual(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword(setShowContraseñaActual)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showContraseñaActual ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="Nueva contraseña"
                        type={showNuevaContraseña ? 'text' : 'password'}
                        id="newPassword"
                        value={nuevaContraseña}
                        onChange={(e) => setNuevaContraseña(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword(setShowNuevaContraseña)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showNuevaContraseña ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirmar contraseña"
                        type={showConfirmarContraseña ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmarContraseña}
                        onChange={(e) => setConfirmarContraseña(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword(setShowConfirmarContraseña)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showConfirmarContraseña ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                        <BotonLoading
                            loading={loading}
                            funcion={handlePasswordChange}
                            variant="contained"
                            sx={{ mt: 1 }}
                            state={!contraseñaActual || !nuevaContraseña || !confirmarContraseña}
                            colorLetra='white'
                        >
                            Cambiar Contraseña
                        </BotonLoading>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', mb:-2 }}>
                        <Button
                            variant="text"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate(-1)}
                        >
                            Volver Atrás
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}