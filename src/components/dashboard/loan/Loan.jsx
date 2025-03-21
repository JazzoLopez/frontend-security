import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from '@components/ResponsiveBar/ResponsiveAppBar';
import useAuthStore from '@utils/store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from '@mui/material';
import { getLoans, createLoan } from '@services/loanService';

export default function Loan() {
  const { token } = useAuthStore();
  const [loansData, setLoansData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newLoan, setNewLoan] = useState({
    user_id: '',
    material_id: '',
    loan_date: '',
    return_date: '',
    loan_status: 'Active'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLoans(token);
        setLoansData(response);
      } catch (error) {
        console.error("Error al obtener préstamos:", error);
      }
    };
    fetchData();
  }, [token]);

  console.log("DAtaa", newLoan);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    setNewLoan({ user_id: '', material_id: '', loan_date: '', return_date: '', loan_status: 'pendiente' });
  };

  const handleInputChange = (e) => {
    setNewLoan({ ...newLoan, [e.target.name]: e.target.value });
  };

  const handleSaveLoan = async () => {
    try {
      const formattedLoan = {
        ...newLoan,
        loan_date: new Date(newLoan.loan_date).toISOString(),  // Convierte a DateTime
        return_date: newLoan.return_date ? new Date(newLoan.return_date).toISOString() : null,
      };

      console.log("Enviando:", formattedLoan); // Para verificar el formato antes de enviar

      const createdLoan = await createLoan(token, formattedLoan);
      setLoansData([...loansData, createdLoan]);
      handleCloseModal();
    } catch (error) {
      console.error("Error al crear préstamo:", error);
    }
  };


  return (
    <div>
      <ResponsiveAppBar />
      <Typography variant="h4" sx={{ textAlign: 'center', mt: 3 }}>
        Lista de Préstamos
      </Typography>
      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>Crear Préstamo</Button>
      </Stack>
      <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto', mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Material</TableCell>
              <TableCell>Fecha Préstamo</TableCell>
              <TableCell>Fecha Devolución</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loansData.length > 0 ? (
              loansData.map(loan => (
                <TableRow key={loan.loan_id}>
                  <TableCell>{loan.loan_id}</TableCell>
                  <TableCell>{loan.user_id}</TableCell>
                  <TableCell>{loan.material_id}</TableCell>
                  <TableCell>{loan.loan_date}</TableCell>
                  <TableCell>{loan.return_date}</TableCell>
                  <TableCell>{loan.loan_status}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button variant="outlined" color="error">Eliminar</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Cargando...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleCloseModal} fullWidth>
        <DialogTitle>Crear Préstamo</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Usuario ID" name="user_id" value={newLoan.user_id} onChange={handleInputChange} />
          <TextField fullWidth margin="dense" label="Material ID" name="material_id" value={newLoan.material_id} onChange={handleInputChange} />
          <TextField fullWidth margin="dense" label="Fecha Préstamo" type="date" name="loan_date" value={newLoan.loan_date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
          <TextField fullWidth margin="dense" label="Fecha Devolución" type="date" name="return_date" value={newLoan.return_date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
          <Select fullWidth margin="dense" name="loan_status" value={newLoan.loan_status} onChange={handleInputChange}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Returned">Returned</MenuItem>
            <MenuItem value="Overdue">Overdue</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">Cancelar</Button>
          <Button onClick={handleSaveLoan} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
