import { useEffect, useState } from 'react';
import { Box, Button, Grid, TextField, Typography, MenuItem, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { JournalLayout } from '../layout/JournalLayout';
import { CalendarToday as CalendarIcon, School as SchoolIcon, Person as PersonIcon, Phone as PhoneIcon, Lock as LockIcon, Email as EmailIcon } from '@mui/icons-material';
import { FirebaseAuth } from '../../firebase/config';

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

    useEffect(() => {
        if (FirebaseAuth.currentUser) {
            const user = FirebaseAuth.currentUser;
            setFormData({
                displayName: user.displayName || '',
                email: user.email || '',
                phone: '',
                birthDate: '',
                gender: '',
                school: '',
                password: '',
                confirmPassword: '',
            });
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
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
                                        type="password"
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
        </JournalLayout>
    );
};
