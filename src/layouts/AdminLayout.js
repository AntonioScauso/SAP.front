import Header from '../components/partials/Header';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
    return (
        <div style={{
            height: '100vh',
            overflow: 'hidden',
        }}>
            <Header />
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                flexGrow: 1,
                padding: '30px',
            }}>
                <Outlet />
            </div>
        </div>
    )
}