import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useContext, useEffect } from "react";
import SideBar from "./SideBar";
import MenuUsuario from "./MenuDeUsuario";
import { UserContext } from "../../contexts/UserContext";

const Header = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('SAP');

  const { rol, matricula } = useContext(UserContext);


  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const handlePageSelect = (pageName) => {
    setSelectedPage(pageName);
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: '#28508E' }}>
        <Toolbar style={{ height: '3.4vw', padding: 0 }}>
          <Box display="flex" alignItems="center" width="100%" height='100%'>
            {(rol == '2' || rol == '3') &&
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
                mr:'-9%',
                fontSize: 'clamp(1.3rem, 1.3vw, 2rem)',
              }}
            >
              Colegio Profesional de Martilleros Corredores Públicos de la Provincia de Córdoba
            </Typography>
            <Box sx={{ mr: 1 , display:'flex',alignItems:'center', height:'100%'}}>

                <div style={{ display:'flex',overflow:'hidden',justifyContent:'center',alignItems:'center', height:'100%',padding:'5px'}}>
                  <h1 style={{fontSize:'clamp(0.4rem, 1vw, 1.25rem)', textAlign:'center'}}>
                    Matricula: <br />{matricula}
                  </h1>
                </div>
              
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