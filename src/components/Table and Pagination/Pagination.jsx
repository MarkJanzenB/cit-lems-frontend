import React from 'react';
import { TablePagination, Button } from '@mui/material';

const CustomTablePagination = ({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange, onAddClick, roleid, isAtInventory }) => {
    const showAddButton = isAtInventory;

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {showAddButton && roleid !== 1 && (
                <Button onClick={onAddClick} style={{ marginRight: 'auto' }}>
                    Add
                </Button>
            )}
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
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