import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SideBar from "./SideBar";
import MenuUsuario from "./MenuDeUsuario";

const Header = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('SAP');

  const planes = ['2'];

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const handlePageSelect = (pageName) => {
    setSelectedPage(pageName);
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: '#28508E' }}>
        <Toolbar style={{ height: '40px', padding: 0 }}>
          <Box display="flex" alignItems="center" width="100%">
            {(planes.includes('1')) &&
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
                textOverflow: 'ellipsis'
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