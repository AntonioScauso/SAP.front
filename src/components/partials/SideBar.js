import React, { useEffect, useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { usePaginas } from '../../dashboards/Dashboard';
import CollpaseSideBar from "./CollapseSideBar";

const SidebarContext = React.createContext();

export default function SideBar({ open, onClose, onPageSelect }) {
    const [actualPage, setActualPage] = useState('');
    const [collapseOpen, setCollapseOpen] = useState([]);
    const [selectedPage, setSelectedPage] = useState('');
    const fondoSelected = '#b9b9b9';
    const path = window.location.pathname;

    const linkStyle = {
        textDecoration: "none",
        color: "black",
    };

    const paginas = usePaginas();

    useEffect(() => {
        let pages = path.split('/');
        let page = pages[pages.length - 2];
        let subPage = pages[pages.length - 1];

        setActualPage(page);

        if (subPage) {
            setCollapseOpen(prevCollapseOpen => {
                const updatedCollapseOpen = prevCollapseOpen.map(collapse => {
                    if (collapse.nombre.toLowerCase() === page) {
                        collapse.in = true;
                        collapse.selectedPage = subPage;
                    }
                    return collapse;
                });
                return [...updatedCollapseOpen];
            });
        } else {
            setCollapseOpen(prevCollapseOpen => {
                const updatedCollapseOpen = prevCollapseOpen.map(collapse => {
                    collapse.in = false;
                    return collapse;
                });
                return [...updatedCollapseOpen];
            });
        }

    }, [path]);

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
                <List sx={{ width: "50%", minWidth: 250 }}>
                    {paginas.map((pagina, index) => (
                        Array.isArray(pagina.seccion) ? (
                            <CollpaseSideBar key={index} pagina={pagina} collapseOpen={collapseOpen} handleItemClick={handleItemClick} selectedPage={selectedPage} fondoSelected={fondoSelected} closeSideBar={onClose} setSelectedPage={setSelectedPage} />
                        ) : pagina.nombre === undefined ? null : (
                            listItem(pagina, index))
                    ))}
                </List>
            </SidebarContext.Provider>
        </Drawer>
    );
}

export function useSidebarContext() {
    return React.useContext(SidebarContext);
}