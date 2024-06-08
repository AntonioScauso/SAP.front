import { Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function BotonLoading(props) {
    const { children, funcion, state = false, loading = false } = props;

    return (
        <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={state || loading}
            onClick={funcion}
        >
            {loading ?
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={24} color="inherit" />
                </div>
                : children}
        </Button>
    );
}
