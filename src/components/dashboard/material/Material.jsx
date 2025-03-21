import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from '@components/ResponsiveBar/ResponsiveAppBar';
import useAuthStore from '@utils/store';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Stack, Button, Modal, Box, TextField, MenuItem
} from '@mui/material';
import { getMaterials, createMaterial, updateMaterial, deleteMaterial } from '@services/materialService';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function Material() {
  const { token } = useAuthStore();
  const [materialData, setMaterialData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    material_type: '',
    brand: '',
    model: '',
    status: 'Disponible'
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const response = await getMaterials(token);
      setMaterialData(response);
    } catch (error) {
      console.error("Error al obtener materiales:", error);
    }
  };

  const handleOpenModal = (material = null) => {
    if (material) {
      setForm(material);
      setEditId(material.material_id);
    } else {
      setForm({ material_type: '', brand: '', model: '', status: 'Disponible' });
      setEditId(null);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await updateMaterial(editId, form, token);
      } else {
        await createMaterial(form, token);
      }
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar material:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMaterial(id, token);
      fetchData();
    } catch (error) {
      console.error("Error al eliminar material:", error);
    }
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Typography variant="h4" sx={{ textAlign: 'center', mt: 3 }}>
        Lista de Materiales
      </Typography>
      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>Crear Préstamo</Button>
      </Stack>
      <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto', mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tipo de material</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materialData.length > 0 ? (
              materialData.map(material => (
                <TableRow key={material.material_id}>
                  <TableCell>{material.material_id}</TableCell>
                  <TableCell>{material.material_type}</TableCell>
                  <TableCell>{material.brand}</TableCell>
                  <TableCell>{material.model}</TableCell>
                  <TableCell>{material.status}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button variant="outlined" color="primary" onClick={() => handleOpenModal(material)}>Editar</Button>
                      <Button variant="outlined" color="error" onClick={() => handleDelete(material.material_id)}>Eliminar</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">Cargando...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {editId ? 'Editar Material' : 'Agregar Material'}
          </Typography>
          <TextField fullWidth label="Tipo de material" name="material_type" value={form.material_type} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Marca" name="brand" value={form.brand} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Modelo" name="model" value={form.model} onChange={handleChange} margin="normal" />
          <TextField select fullWidth label="Estado" name="status" value={form.status} onChange={handleChange} margin="normal">
            <MenuItem value="Disponible">Disponible</MenuItem>
            <MenuItem value="Prestado">Prestado</MenuItem>
            <MenuItem value="Dañado">Dañado</MenuItem>
          </TextField>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Guardar</Button>
            <Button variant="outlined" onClick={handleCloseModal}>Cancelar</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
