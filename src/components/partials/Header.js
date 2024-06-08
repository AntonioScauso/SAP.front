import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SideBar from "./SideBar";
import MenuUsuario from "./MenuDeUsuario";

const Header = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('SAP');

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const handlePageSelect = (pageName) => {
    setSelectedPage(pageName);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <IconButton
              onClick={toggleSideBar}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ marginLeft: "4vh" }}>
              {selectedPage || "SAP"}
            </Typography>
          </div>
          <div>
            <MenuUsuario />
          </div>
        </Toolbar>
      </AppBar>
      <SideBar open={sideBarOpen} onClose={toggleSideBar} onPageSelect={handlePageSelect} />
    </>
  );
};

export default Header;