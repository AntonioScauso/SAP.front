import React, { useEffect, useState, useRef } from "react";
import { Collapse, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { usePaginas } from '../../dashboards/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const SidebarContext = React.createContext();

export default function SideBar({ open, onClose, onPageSelect }) {
    const [actualPage, setActualPage] = useState('');
    const [collapseOpen, setCollapseOpen] = useState([]);
    const [selectedPage, setSelectedPage] = useState('');
    const fondoSelected = '#b9b9b9';

    const linkStyle = {
        textDecoration: "none",
        color: "black",
    };

    useEffect(() => {
        let path = window.location.pathname;
        let pages = path.split('/');
        let page = pages[pages.length - 2];
        setActualPage(page);

        const initialCollapseState = paginas.map(pagina => ({
            nombre: pagina.nombre,
            in: false,
            selectedPage: ''
        }));
        setCollapseOpen(initialCollapseState);

    }, [window.location.pathname]);

    const paginas = usePaginas();
    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current && !open) {
            let colapses = [];
            for (let i = 0; i < paginas.length; i++) {
                if (Array.isArray(paginas[i].seccion)) {
                    const collapse = collapseOpen.find(c => c.nombre === paginas[i].nombre);
                    colapses.push({ "nombre": paginas[i].nombre, "in": collapse ? collapse.in : false, "selectedPage": '' });
                }
            }
            setCollapseOpen(colapses);
        }
        prevOpen.current = open;
    }, [open, paginas, collapseOpen]);

    const handleCollapseClick = (nombre) => {
        setCollapseOpen(prevCollapseOpen => {
            const updatedCollapseOpen = prevCollapseOpen.map(collapse => {
                if (collapse.nombre === nombre) {
                    collapse.in = !collapse.in;
                } else {
                    collapse.in = false;
                }
                return collapse;
            });
            return [...updatedCollapseOpen];
        });
    };

    const handleItemClick = (pageName, collapseName) => {
        setSelectedPage(pageName);
        onClose();
        onPageSelect(`${collapseName} / ${pageName}`);

        setCollapseOpen(prevCollapseOpen => {
            const updatedCollapseOpen = prevCollapseOpen.map(collapse => {
                if (collapse.nombre === collapseName) {
                    collapse.selectedPage = pageName;
                }
                return collapse;
            });
            return updatedCollapseOpen;
        });
    };

    const listItem = (pagina, index) => {
        return (
            pagina.nombre !== undefined &&
            <Link to={pagina.url} style={linkStyle} key={index}>
                <ListItem
                    sx={{ backgroundColor: pagina.seccion === actualPage ? fondoSelected : '' }}
                    onClick={() => {
                        setCollapseOpen(prevCollapseOpen => {
                            const updatedCollapseOpen = prevCollapseOpen.map(collapse => {
                                collapse.in = false;
                                return collapse;
                            });
                            return [...updatedCollapseOpen];
                        });
                        setSelectedPage(pagina.nombre);
                        onPageSelect(pagina.nombre);
                        onClose();
                    }}
                >

                    <ListItemText primary={pagina.nombre} />
                </ListItem>
            </Link>
        );
    };

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <SidebarContext.Provider value={{ collapseOpen, handleCollapseClick, handleItemClick }}>
                <List sx={{ width: "300px", height: '100%', overflowY: 'auto', scrollbarWidth: "none" }}>
                    {paginas.map((pagina, index) => (
                        Array.isArray(pagina.seccion) ? (
                            <>
                                <ListItem
                                    button
                                    onClick={() => handleCollapseClick(pagina.nombre)}
                                    sx={{ backgroundColor: collapseOpen.find(element => element.nombre === pagina.nombre)?.in ? '#e8e8e8' : '' }}
                                >
                                    <ListItemText primary={pagina.nombre} />
                                    {collapseOpen.find(element => element.nombre === pagina.nombre)?.in ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse key={index} in={collapseOpen.find(element => element.nombre === pagina.nombre)?.in} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {pagina.seccion.map((seccion, index) => (
                                            seccion.nombre !== undefined &&
                                            <Link to={seccion.url} style={linkStyle} key={index}>
                                                <ListItem
                                                    sx={{
                                                        backgroundColor: selectedPage === seccion.nombre ? fondoSelected : '',
                                                        paddingLeft: 6
                                                    }}
                                                    onClick={() => handleItemClick(seccion.nombre, pagina.nombre)}
                                                >
                                                    <ListItemText primary={seccion.nombre} />
                                                </ListItem>
                                            </Link>
                                        ))}
                                    </List>
                                </Collapse>
                            </>
                        ) : listItem(pagina, index)
                    ))}
                </List>
            </SidebarContext.Provider>
        </Drawer>
    );
}

export function useSidebarContext() {
    return React.useContext(SidebarContext);
}