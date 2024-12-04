import React from 'react';
import { TablePagination, Button } from '@mui/material';

const CustomTablePagination = ({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange, onAddClick, roleid }) => {
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            {roleid != 1 && <Button onClick={onAddClick} style={{marginRight: 'auto'}}>Add</Button>}
            {/*<Button onClick={onAddClick} style={{marginRight: 'auto'}}>Add</Button>*/}
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                labelRowsPerPage=""
            />
        </div>
    );
            };

            export default CustomTablePagination;