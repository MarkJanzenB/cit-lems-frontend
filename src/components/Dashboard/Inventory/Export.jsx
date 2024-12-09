import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  createTheme, ThemeProvider
} from '@mui/material';
import * as XLSX from 'xlsx';
import Appbar from '../../Appbar/Appbar.jsx';
import Sidebar from '../../Sidebar/Sidebar.jsx';
import './Inventory.css';

const Export = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    axios.get('http://localhost:8080/inventory/getAllInventory', {
      headers: {
        "authorization": `Bearer ${jwtToken}`,
      }
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the inventory data!', error);
    });
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
      QTY: item.quantity,
      UNIT: item.unit,
      ITEMS: item.name,
      REMARKS: item.description
    })));

    const headerStyle = {
      font: { bold: true },
      border: {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
    };

    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell = worksheet[XLSX.utils.encode_cell({ r: 0, c: C })];
      if (cell) cell.s = headerStyle;
    }

    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
        if (cell) {
          if (!cell.s) cell.s = {};
          cell.s.border = headerStyle.border;
        }
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");

    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const filename = `JHS Science Lab Inventory - ${formattedDate}.xlsx`;

    XLSX.writeFile(workbook, filename);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const theme = createTheme({
    palette: {
      primary: { main: '#016565' },
      secondary: { main: '#000000' }
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: '#016565',
            color: '#FFFFFF',
          },
          body: {
            fontSize: 14,
          },
        },
      },
    },
  });

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <Appbar page={"inventory"} />
      <div className="inventory-container">
        <Sidebar page={"inventory"} />
        <div className="inventory-content">
          <Button variant="contained" color="primary" onClick={exportToExcel}>
            Export to Excel
          </Button>
          <br/><br/>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>QTY</TableCell>
                  <TableCell>UNIT</TableCell>
                  <TableCell>ITEMS</TableCell>
                  <TableCell>REMARKS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Export;