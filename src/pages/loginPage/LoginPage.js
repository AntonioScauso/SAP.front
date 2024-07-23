import React, { useEffect, useRef, useState } from 'react';
import { Grid, TextField, InputAdornment, Typography, Box } from "@mui/material";
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
                    navigate("/tasaciones");
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
                position: 'relative',  // Añadido para posicionar el logo absolutamente
                overflow: 'hidden',    // Para asegurar que el logo no se salga del contenedor
            }}>
                <img
                    src={LogoColegio}
                    alt="Logo Colegio"
                    style={{
                        width: '80%',
                        position: 'absolute',
                        top: -70,    // Ajusta este valor para mover el logo más arriba o abajo
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
                    marginTop: '15vh',  // Ajusta este valor para dar espacio al logo
                }}>
                    <Lottie
                        animationData={Animation}
                        style={{ width: 250, height: 250 }}  // Aumenté el tamaño, ajusta según necesites
                    />
                </Box>

                <Typography variant="body1" color="black" sx={{
                    maxWidth: '80%',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    lineHeight: 1.6,
                    marginTop: '20px',
                }}>
                    Este sistema es de uso exclusivo para los matriculados del Colegio Profesional de Martilleros Corredores Públicos de la Provincia de Córdoba
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
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                }
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white',
                            },
                            '& .MuiOutlinedInput-input': {
                                color: 'white',
                            },
                            '& .MuiFormHelperText-root': {
                                color: 'white',
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
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white',
                            },
                            '& .MuiOutlinedInput-input': {
                                color: 'white',
                            },
                            '& .MuiFormHelperText-root': {
                                color: 'white',
                            }
                        }}
                        onChange={handleContraseñaChange}
                        type={showPassword ? 'text' : 'password'}
                        helperText={loginError ? "Usuario o contraseña incorrectos" : ""}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {showPassword ? (
                                        <VisibilityOffIcon onClick={handleTogglePasswordVisibility} style={{ cursor: 'pointer', color: 'white' }} />
                                    ) : (
                                        <VisibilityIcon onClick={handleTogglePasswordVisibility} style={{ cursor: 'pointer', color: 'white' }} />
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
                        color={"white"}
                        sx={{ width: '100%', mt: 2 }}
                    >
                        Iniciar Sesión
                    </BotonLoading>
                </Grid>
            </Box>
        </Box>
    )
}