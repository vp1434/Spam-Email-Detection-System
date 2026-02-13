import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert, CircularProgress } from '@mui/material';
import api from '../api';
import GlassCard from '../components/GlassCard';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.msg || 'Registration Failed');
    } finally {
      setLoading(false);
    }
  };

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
      '&:hover fieldset': { borderColor: 'var(--neon-blue)' },
      '&.Mui-focused fieldset': { borderColor: 'var(--neon-blue)' },
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(5px)',
    },
    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'var(--neon-blue)' },
    '& input': { color: 'white' },
    '& input:-webkit-autofill': {
      '-webkit-box-shadow': '0 0 0 100px #1a1a1a inset !important',
      '-webkit-text-fill-color': 'white !important',
      'caret-color': 'white',
    },
    mb: 2
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pt: 0
    }}>
      <Container maxWidth="xs">
        <GlassCard>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h4" sx={{
              mb: 3,
              fontWeight: 'bold',
              color: 'var(--neon-purple)',
              textShadow: '0 0 10px rgba(188, 19, 254, 0.5)'
            }}>
              CREATE ACCOUNT
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2, bgcolor: 'rgba(211, 47, 47, 0.2)', color: '#ffbdad' }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
                sx={textFieldSx}
              />
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                sx={textFieldSx}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                sx={textFieldSx}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, var(--neon-purple), var(--neon-blue))',
                  boxShadow: '0 0 15px rgba(188, 19, 254, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, var(--neon-purple), var(--neon-blue))',
                    filter: 'brightness(1.2)',
                    boxShadow: '0 0 25px rgba(188, 19, 254, 0.6)',
                  }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'SIGN UP'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link to="/login" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Already have an account? <span style={{ color: 'var(--neon-purple)' }}>Sign In</span>
                </Link>
              </Box>
            </Box>
          </Box>
        </GlassCard>
      </Container>
    </Box>
  );
};

export default Register;
