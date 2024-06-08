import { styled } from '@mui/material/styles';
import { DataGrid } from "@mui/x-data-grid";


const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-row:nth-of-type(odd)': {
        backgroundColor: theme.palette.grey[100],
    },
    '& .MuiDataGrid-row:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default,
    },
    '& .MuiDataGrid-row:hover': {
        backgroundColor: theme.palette.grey[300], // Cambia el color de fondo al hacer hover a un tono más oscuro
    },
    '& .dark-row': {
        backgroundColor: theme.palette.grey[700],
        fontWeight: 'bold',
    },

    // quiero que no se pueda tocar las casillas, cuando toco me hace como un foucs
    '& .MuiDataGrid-cell:focus': {
        outline: 'none',
    },

    '& .MuiDataGrid-columnHeader:focus': {
        outline: 'none',
    },
}));

export default CustomDataGrid;