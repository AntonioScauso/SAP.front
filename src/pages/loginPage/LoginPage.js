import React, { useEffect, useRef, useState } from 'react';
import { Grid, TextField, InputAdornment, Typography, Box, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import BotonLoading from "../../components/BotonLoading";
import useFetch, { host } from "../../utils/Fetch";
import LogoColegio from "../../imagenes/LogoColegio.png";
import Animation from "../../imagenes/Animation.json";
import Lottie from "lottie-react";

export default function LoginPage() {
    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');

    const usuarioRef = useRef();

    const { login, logout } = useContext(UserContext);

    const navigate = useNavigate();

    const { postFetch } = useFetch();

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        logout();
        usuarioRef.current.focus();
    }, []);

    const handleUsuarioChange = (event) => {
        setUsuario(event.target.value);
        setLoginError(false);
    }

    const handleContraseñaChange = (event) => {
        setContraseña(event.target.value);
        setLoginError(false);
    }

    const handlePostLogin = () => {
        setLoading(true);
        let data = {}

        if (usuario) data.user = usuario;
        if (contraseña) data.password = contraseña;

        postFetch(`${host}usuario/login/`, data)
            .then(response => {
                if (response.token) {
                    login(response);
                    
                    if(response.cambio_contraseña){
                        navigate("/tasaciones");
                    }else{
                        navigate("/perfil");
                    }
                    
                }
            })
            .catch(() => {
                setLoginError(true);
                setUsuario('');
                setContraseña('');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                handlePostLogin();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    },);

    const renderLoginForm = () => (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: '100%', maxWidth: '400px' }}
        >
            <TextField
                ref={usuarioRef}
                error={loginError}
                label="Usuario"
                variant="outlined"
                value={usuario}
                fullWidth
                sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: isMobile ? '#28508E' : 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: isMobile ? '#28508E' : 'white'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: isMobile ? '#28508E' : 'white'
                        }
                    },
                    '& .MuiInputLabel-root': {
                        color: isMobile ? '#28508E' : 'white'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: isMobile ? '#28508E' : 'white'
                    },
                    '& .MuiOutlinedInput-input': {
                        color: isMobile ? '#28508E' : 'white'
                    },
                    '& .MuiFormHelperText-root': {
                        color: isMobile ? '#28508E' : 'white'
                    }
                }}
                onChange={handleUsuarioChange}
            />
            <TextField
                error={loginError}
                value={contraseña}
                label="Contraseña"
                variant="outlined"
                fullWidth
                sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: isMobile ? '#28508E' : 'white'
                        },
                        '&:hover fieldset': {
                            borderColor: isMobile ? '#28508E' : 'white'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: isMobile ? '#28508E' : 'white'
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: isMobile ? '#28508E' : 'white'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: isMobile ? '#28508E' : 'white'
                    },
                    '& .MuiOutlinedInput-input': {
                        color: isMobile ? '#28508E' : 'white'
                    },
                    '& .MuiFormHelperText-root': {
                        color: isMobile ? '#28508E' : 'white'
                    }
                }}
                onChange={handleContraseñaChange}
                type={showPassword ? 'text' : 'password'}
                helperText={loginError ? "Usuario o contraseña incorrectos" : ""}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {showPassword ? (
                                <VisibilityOffIcon onClick={handleTogglePasswordVisibility} style={{ cursor: 'pointer', color: isMobile ? '#28508E' : 'white' }} />
                            ) : (
                                <VisibilityIcon onClick={handleTogglePasswordVisibility} style={{ cursor: 'pointer', color: isMobile ? '#28508E' : 'white' }} />
                            )}
                        </InputAdornment>
                    ),
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && usuario && contraseña) {
                        handlePostLogin();
                    }
                }}
            />
            <BotonLoading
                funcion={handlePostLogin}
                state={usuario === "" || contraseña === ""}
                loading={loading}
                color={!isMobile ? 'white' : '#28508E'}
                colorLetra={!isMobile ? '#28508E' : 'white'}
                sx={{ width: '100%', mt: 2, mb: 8 }}
            >
                Iniciar Sesión
            </BotonLoading>
        </Grid>
    );

    if (isMobile) {
        return (
            <Box sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
            }}>
                <img
                    src={LogoColegio}
                    alt="Logo Colegio"
                    style={{
                        width: '100%',

                    }}
                />
                <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold', color: '#28508E', textAlign: 'center' }}>
                    Sistema de Consulta de Valores
                </Typography>
                {renderLoginForm()}
                <Typography variant="body2" sx={{ color: '#28508E', textAlign: 'center', mt: 2 }}>
                    Este sistema es de uso exclusivo para los matriculados del Colegio Profesional de Martilleros Corredores Públicos de la Provincia de Córdoba
                </Typography>
                <Typography variant="body2" sx={{ color: '#28508E', textAlign: 'center', mt: 2 }}>
                    Ley 7191
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Mitad izquierda */}
            <Box sx={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '40px',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <img
                    src={LogoColegio}
                    alt="Logo Colegio"
                    style={{
                        width: '100%',
                        position: 'absolute',
                        top: -85,
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                />
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    marginTop: '20vh',
                }}>
                    <Lottie
                        animationData={Animation}
                        style={{ width: 250, height: 250 }}
                    />
                </Box>
                <Typography variant="body1" color="black" sx={{
                    width: '50vw',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    lineHeight: 1.6,
                }}>
                    <Typography variant="h5" sx={{ mb: 2, color: '#28508E', fontWeight: 'bold' }}>
                        Sistema de Consulta de Valores
                    </Typography>
                    Este sistema es de uso exclusivo para los matriculados del Colegio Profesional de Martilleros Corredores Públicos de la Provincia de Córdoba
                </Typography>
                <Typography variant="body1" sx={{ color: '#28508E', textAlign: 'center', mb: 10 }}>
                    Ley 7191
                </Typography>
            </Box>

            {/* Mitad derecha */}
            <Box sx={{
                width: '50%',
                backgroundColor: '#28508E',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
            }}>
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'white' }}>
                    ¡Bienvenido!
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'white' }} >
                    Por favor, ingrese sus credenciales para acceder al Sistema de Tasación otorgado por el Colegio Profesional de Martilleros Corredores Públicos de la Provincia de Córdoba.
                </Typography>
                {renderLoginForm()}
            </Box>
        </Box>
    );
}