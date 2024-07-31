import { Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function BotonLoading({
    children,
    funcion,
    state = false,
    loading = false,
    color = '',
    colorLetra = '',
    startIcon,
    endIcon,
    ...otherProps
}) {
    return (
        <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: color, color: colorLetra || 'black' }}
            fullWidth
            disabled={state || loading}
            onClick={funcion}
            startIcon={loading ? null : startIcon}
            endIcon={loading ? null : endIcon}
            {...otherProps}
        >
            {loading ? (
                <CircularProgress size={24} color="inherit" />
            ) : children}
        </Button>
    );
}