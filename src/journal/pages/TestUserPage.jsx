import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, TextField, Typography, MenuItem, IconButton, Snackbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { JournalLayout } from '../layout/JournalLayout';
import { CalendarToday as CalendarIcon, School as SchoolIcon, Person as PersonIcon, Phone as PhoneIcon, Lock as LockIcon, Email as EmailIcon } from '@mui/icons-material';
import axios from 'axios';
import Cookies from 'js-cookie';

export const TestUserPage = () => {
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        phone: '',
        birthDate: '',
        gender: '',
        school: '',
        password: '',
        confirmPassword: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('access_token');
                if (!token) {
                    throw new Error('Token no encontrado');
                }
        
                const userResponse = await axios.get(`https://486c-177-230-73-82.ngrok-free.app/get_current_user?token=${token}`, {
                    headers: { "ngrok-skip-browser-warning": "69420" }
                });
        
                const user = userResponse.data.__data__;
                setFormData({
                    displayName: user.name || '',
                    email: user.email || '',
                    phone: user.telf || '',
                    birthDate: user.birth_date || '',
                    gender: user.gender || '',
                    school: user.School || '',
                    password: '',
                    confirmPassword: '',
                });
        
                setUserId(user.id_students); // Aquí se guarda el userId obtenido de la respuesta
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };
        
        const handleSubmit = async (event) => {
            event.preventDefault();
            setIsEditing(false);
            
            try {
                const token = Cookies.get('access_token');
                if (!token) {
                    throw new Error('Token no encontrado');
                }
        
                const response = await axios.patch(`https://486c-177-230-73-82.ngrok-free.app/students_f/upd_students/${userId}`, formData, {
                    headers: { 
                        "ngrok-skip-browser-warning": "69420",
                        "Content-Type": "application/json",
                        "accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
        
                if (response.status === 200) {
                    setSnackbarMessage('Datos actualizados exitosamente');
                    setSnackbarOpen(true);
                } else {
                    throw new Error('Error al actualizar los datos');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud PATCH:', error);
                setSnackbarMessage('Error al actualizar los datos');
                setSnackbarOpen(true);
            }
        };
        
        fetchUserData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsEditing(false);
        
        try {
            const token = Cookies.get('access_token');
            if (!token) {
                throw new Error('Token no encontrado');
            }

            const response = await axios.patch(`https://486c-177-230-73-82.ngrok-free.app/students_f/upd_students/${userId}?id_students`, formData, {
                headers: { 
                    "ngrok-skip-browser-warning": "69420",
                    "Content-Type": "application/json",
                    "accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setSnackbarMessage('Datos actualizados exitosamente');
                setSnackbarOpen(true);
            } else {
                throw new Error('Error al actualizar los datos');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud PATCH:', error);
            setSnackbarMessage('Error al actualizar los datos');
            setSnackbarOpen(true);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <JournalLayout>
            <Box p={3}>
                <Typography variant="h4" gutterBottom>
                    Modificar Perfil
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                name="displayName"
                                value={formData.displayName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                InputProps={{
                                    startAdornment: (
                                        <IconButton>
                                            <PersonIcon />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Correo Electrónico"
                                variant="outlined"
                                fullWidth
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                InputProps={{
                                    startAdornment: (
                                        <IconButton>
                                            <EmailIcon />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Teléfono"
                                variant="outlined"
                                fullWidth
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                InputProps={{
                                    startAdornment: (
                                        <IconButton>
                                            <PhoneIcon />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Fecha de nacimiento"
                                type="date"
                                fullWidth
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                disabled
                                InputProps={{
                                    startAdornment: (
                                        <IconButton>
                                            <CalendarIcon />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Género"
                                fullWidth
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                disabled
                                InputProps={{
                                    startAdornment: (
                                        <IconButton>
                                            <PersonIcon />
                                        </IconButton>
                                    ),
                                }}
                            >
                                <MenuItem value="masculino">Masculino</MenuItem>
                                <MenuItem value="femenino">Femenino</MenuItem>
                                <MenuItem value="otro">Otro</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Escuela"
                                variant="outlined"
                                fullWidth
                                name="school"
                                value={formData.school}
                                onChange={handleChange}
                                disabled={!isEditing}
                                InputProps={{
                                    startAdornment: (
                                        <IconButton>
                                            <SchoolIcon />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Grid>
                        {isEditing && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Contraseña"
                                        type ="password"
                                        variant="outlined"
                                        fullWidth
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <IconButton>
                                                    <LockIcon />
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Confirmar Contraseña"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <IconButton>
                                                    <LockIcon />
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                onClick={isEditing ? handleCancelClick : handleEditClick}
                                style={{ marginRight: '8px' }}
                            >
                                {isEditing ? 'Cancelar' : 'Editar'}
                            </Button>
                            {isEditing && (
                                <Button type="submit" variant="contained" color="primary">
                                    Guardar Cambios
                                </Button>
                            )}
                            <Button component={RouterLink} to="/inicio" variant="outlined">
                                Volver
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </JournalLayout>
    );
};
