import React, { useEffect, useRef, useState } from 'react';
import { Grid, TextField, InputAdornment, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import BotonLoading from "../../components/BotonLoading";
import useFetch, { host } from "../../utils/Fetch";

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
                    navigate("/tasaciones/");
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
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ height: '100vh', }}
        >
            <Grid
                item
                container
                direction={"column"}
                justifyContent={"space-between"}
                sx={{
                    border: '1px solid #c1c1c1',
                    borderRadius: '10px',
                    padding: '30px',
                    paddingY: '15px',
                    width: '350px',
                }}
            >
                <Typography
                    variant="h4"
                    style={{
                        textAlign: "center",
                        marginBottom: '25px'
                    }}
                >
                    Admin
                </Typography>
                <TextField
                    ref={usuarioRef}
                    error={loginError}
                    label="Usuario"
                    variant="outlined"
                    value={usuario}
                    style={{ width: '100%', marginTop: '3%', marginBottom: '3%' }}
                    onChange={handleUsuarioChange}
                />
                <TextField
                    error={loginError}
                    value={contraseña}
                    label="Contraseña"
                    variant="outlined"
                    style={{ width: '100%', marginBottom: '3%' }}
                    onChange={handleContraseñaChange}
                    type={showPassword ? 'text' : 'password'}
                    helperText={loginError ? "Usuario o contraseña incorrectos" : ""}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {showPassword ? (
                                    <VisibilityOffIcon onClick={handleTogglePasswordVisibility} style={{ cursor: 'pointer' }} />
                                ) : (
                                    <VisibilityIcon onClick={handleTogglePasswordVisibility} style={{ cursor: 'pointer' }} />
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
                >
                    Login
                </BotonLoading>
            </Grid>
        </Grid>
    )
}
