import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../Utils/settings/Configuraciones';

const SettingsContext = createContext()

function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(null);
    const [wifi, setWifi] = useState(null);
    const navigate = useNavigate();
    const { getTemaActual } = useSettings();

    async function getSettings() {
        let empresa = getEmpresa();
        getTemaActual(empresa)
            .then(data => {
                setSettings(data.tema)
                setWifi(data.wifi)
            })
            .catch(error => navigate('/'));
    }

    function getEmpresa() {
        const url = window.location.href;
        const urlArray = url.split('/');
        return urlArray[3];
    }

    return (
        <SettingsContext.Provider value={{ settings, wifi, getSettings, getEmpresa }}>
            {children}
        </SettingsContext.Provider>
    );
};

export { SettingsProvider, SettingsContext };
