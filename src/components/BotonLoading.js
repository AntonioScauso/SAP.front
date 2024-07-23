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
    ...otherProps  // Esto capturará todas las propiedades adicionales
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
            {...otherProps}  // Esto pasará todas las propiedades adicionales al Button
        >
            {loading ? (
                <CircularProgress size={24} color="inherit" />
            ) : children}
        </Button>
    );
}