import { AppBar, Toolbar, IconButton, Typography, Box , useMediaQuery} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useContext, useEffect } from "react";
import SideBar from "./SideBar";
import MenuUsuario from "./MenuDeUsuario";
import { UserContext } from "../../contexts/UserContext";

const Header = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('SAP');

  const { rol, nombre, apellido } = useContext(UserContext);

  const isMobile = useMediaQuery('(max-width:600px)');

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
              {isMobile ? (
                <p style={{ lineHeight: '0.8' }}>
                  C.P.M.C.P. <br />
                  <strong style={{ color: 'rgba(254, 254, 254, 0.57)', fontSize: '0.8rem' }}>Ley 7191</strong>
                </p>)
              :'Colegio Profesional de Martilleros Corredores Públicos de la Provincia de Córdoba'}
              
            </Typography>
            <Box sx={{ mr: 1 , display:'flex',alignItems:'center', height:'100%'}}>

                <div style={{ display:'flex',overflow:'hidden',justifyContent:'center',alignItems:'center', height:'100%',padding:'5px'}}>
                 {isMobile ? 

                 <h1 style={{fontSize:'clamp(0.7rem, 1vw, 1.25rem)', textAlign:'center',lineHeight: '1.4' }}>
                    {nombre} <br/>{apellido}
                  </h1>
                 :
                 
                 <h1 style={{fontSize:'clamp(0.6rem, 1vw, 1.25rem)', textAlign:'center'}}>
                    {nombre} {apellido}
                  </h1>}
                  
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