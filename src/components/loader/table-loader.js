import { Box } from "@mui/system";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const TableLoader = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%'}}>
            <CircularProgress sx={{color: colors.blueAccent[100]}} />
        </Box>
    )
}

module.exports = TableLoader;