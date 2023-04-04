import { Box } from "@mui/system";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import TableLoader from '@/components/loader/table-loader';

const MainTable = ({headers, orderBy, order, tableData, pageOptions, page, rowsPerPage, handlePageChange, handleRowsPerPageChange, handleSortChange, isLoading}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={{width: '100%', height: '100%'}}>
            {isLoading && <TableLoader />}

            {!isLoading && 
            <>
            <TableContainer sx={{ maxHeight: "70vh" }} component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    {headers.map((item) => (
                        <TableCell 
                            key={item.field}
                            sx={{ backgroundColor: colors.blueAccent[700], "fontWeight": "bold" }}
                            align={item.align ?? undefined}
                            sortDirection={orderBy === item.field ? order : false}
                        >
                        <TableSortLabel
                            active={orderBy === item.field}
                            direction={orderBy === item.field ? order : 'asc'}
                            onClick={handleSortChange(item.field)}
                            >
                            {orderBy === item.field ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                            ) : null}
                        </TableSortLabel>
                        {item.headerName}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                    <TableRow
                        key={row.orderId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        {headers.map((header) => (
                            <TableCell key={header.field} component="th" scope="row" align="inherit" sx={{pl: 4}} >{row[header.field]}</TableCell>
                        ))}
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={pageOptions}
                component="div"
                count={-1}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, page) => handlePageChange(page)}
                onRowsPerPageChange={(e) => handleRowsPerPageChange(e)}
                sx={{backgroundColor: colors.blueAccent[700]}}
            /> 
            </> }
        </Box>
    )
}
module.exports = MainTable;