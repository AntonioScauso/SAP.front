import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useContext, useEffect } from "react";
import SideBar from "./SideBar";
import MenuUsuario from "./MenuDeUsuario";
import { UserContext } from "../../contexts/UserContext";

const Header = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('SAP');

  const { rol } = useContext(UserContext);


  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const handlePageSelect = (pageName) => {
    setSelectedPage(pageName);
  };

  return ( //cambiar a 2
    <>
      <AppBar position="static" style={{ backgroundColor: '#28508E' }}>
        <Toolbar style={{ height: '40px', padding: 0 }}>
          <Box display="flex" alignItems="center" width="100%">
            {rol !== '123' &&
              <IconButton
                onClick={toggleSideBar}
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>}
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: {
                  xs: '0.70rem',  // Extra-small devices
                  sm: '0.75rem',     // Small devices
                  md: '1.25rem',  // Medium devices
                  lg: '1.5rem',   // Large devices
                },
              }}
            >
              Colegio Profesional de Martilleros Corredores Públicos de la Provincia de Córdoba
            </Typography>
            <Box sx={{ mr: 1 }}>
              <MenuUsuario />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <SideBar open={sideBarOpen} onClose={toggleSideBar} onPageSelect={handlePageSelect} />
    </>
  );
};

export default Header;