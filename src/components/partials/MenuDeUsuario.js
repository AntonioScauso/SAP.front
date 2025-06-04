import * as React from "react";
import Box from "@mui/material/Box";
import { useMediaQuery} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import { UserContext } from "../../contexts/UserContext";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useContext } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";


export default function MenuUsuario() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { logout } = useContext(UserContext);
    const isMobile = useMediaQuery('(max-width:600px)');
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { matricula } = useContext(UserContext);

    return (
        <React.Fragment>
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center"}}>
                <Tooltip title="Configuracion Cuenta">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2}}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        {isMobile ? 
                        (<Avatar sx={{ width: '2vh', height: '2vh' }} />)
                        :
                        (<Avatar sx={{ width: '2.5vw', height: '2.5vw' }} />)}
                        
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}

            >
                <p style={{textAlign:'center', fontSize:'clamp(1rem, 1vw, 1.25rem)'}}>Matricula: {matricula}</p>

                <MenuItem
                    onClick={() => window.location.href = '/perfil'} 
                >
                    <ListItemIcon>
                        <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    Cambiar Contraseña
                </MenuItem>
                <MenuItem onClick={() => logout()}>

                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Cerrar Sesión
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}