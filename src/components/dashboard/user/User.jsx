import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from '@components/ResponsiveBar/ResponsiveAppBar';
import { getUsers, deleteUser, updateUser, createUser } from '@services/userService';
import './styles.css';
import useAuthStore from '@utils/store';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';

export default function User() {
  const { token } = useAuthStore();
  const [userData, setUserData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const userTypes = ['Student', 'Teacher', 'Secretary', 'LabTechnician', 'Executive', 'Administrative'];
  const statuses = ['Active', 'Inactive', 'Blocked', 'Suspended'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers(token);
        setUserData(response);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchData();
  }, [token]);

  const handleOpenModal = (user = null) => {
    setSelectedUser(user || {
      first_name: "",
      last_name: "",
      middle_name: "",
      user_type: "",
      username: "",
      email: "",
      password: "",
      phone_number: "",
      status: "Active",
      registration_date: new Date(),
      update_date: new Date(),
    });
    setIsEditing(!!user);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      if (isEditing) {
        const updatedUser = await updateUser(token, selectedUser.id, selectedUser);
        setUserData(userData.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      } else {
        console.log("Creando usuario:", selectedUser);
        const newUser = await createUser(token, selectedUser);
        setUserData([...userData, newUser]);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(token, id);
      setUserData(userData.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Typography variant="h4" sx={{ textAlign: 'center', mt: 3 }}>
        Lista de Usuarios
      </Typography>
      <Button variant="contained" color="primary" sx={{ display: 'block', margin: '20px auto' }} onClick={() => handleOpenModal()}>Crear Usuario</Button>
      <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: 'auto', mt: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.length > 0 ? (
              userData.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{`${user.first_name} ${user.middle_name} ${user.last_name}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone_number}</TableCell>
                  <TableCell>{user.user_type}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button variant="outlined" color="error" onClick={() => handleDeleteUser(user.id)}>Eliminar</Button>
                      <Button variant="outlined" color="primary" onClick={() => handleOpenModal(user)}>Editar</Button>
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
        <DialogTitle>{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField fullWidth margin="dense" label="Nombre" name="first_name" value={selectedUser.first_name} onChange={handleInputChange} />
              <TextField fullWidth margin="dense" label="Segundo Nombre" name="middle_name" value={selectedUser.middle_name} onChange={handleInputChange} />
              <TextField fullWidth margin="dense" label="Apellido" name="last_name" value={selectedUser.last_name} onChange={handleInputChange} />
              <TextField fullWidth margin="dense" label="Correo" name="email" value={selectedUser.email} onChange={handleInputChange} />
              <TextField fullWidth margin="dense" label="Teléfono" name="phone_number" value={selectedUser.phone_number} onChange={handleInputChange} />
              <TextField fullWidth margin="dense" label="Nombre de Usuario" name="username" value={selectedUser.username} onChange={handleInputChange} />
              <TextField fullWidth margin="dense" label="Contraseña" name="password" value={selectedUser.password} onChange={handleInputChange} />
              <FormControl fullWidth margin="dense">
                <InputLabel>Tipo de Usuario</InputLabel>
                <Select name="user_type" value={selectedUser.user_type} onChange={handleInputChange}>
                  {userTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel>Estado</InputLabel>
                <Select name="status" value={selectedUser.status} onChange={handleInputChange}>
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">Cancelar</Button>
          <Button onClick={handleSaveChanges} color="primary">{isEditing ? 'Guardar' : 'Crear'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
