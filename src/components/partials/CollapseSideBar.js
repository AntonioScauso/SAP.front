import React, { useState } from 'react';
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function CollpaseSideBar(props) {
    const { pagina, selectedPage, setSelectedPage, fondoSelected, closeSideBar } = props;

    const [open, setOpen] = useState(false);

    const linkStyle = {
        textDecoration: "none",
        color: "black",
    };

    return (
        <div>
            <ListItem button onClick={() => { setOpen(!open) }} sx={{
                backgroundColor: pagina.seccion.find(subPagina => subPagina.nombre === selectedPage) ? '#D3D3D3' : ''
            }}>
                <ListItemText primary={pagina.nombre} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablePadding >
                    {pagina.seccion.map((subPagina, index) => (
                        subPagina.nombre === undefined ? null :
                            <Link to={subPagina.url} style={linkStyle} key={index} onClick={() => {
                                setSelectedPage(subPagina.nombre);
                                closeSideBar();
                            }}>
                                <ListItem button style={{
                                    backgroundColor: selectedPage === subPagina.nombre ? fondoSelected : '',
                                    paddingLeft: "40px"
                                }}>
                                    <ListItemText primary={subPagina.nombre} />
                                </ListItem>
                            </Link>
                    ))}
                </List>
            </Collapse>
        </div>
    )
}