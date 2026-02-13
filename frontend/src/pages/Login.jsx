import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert, CircularProgress } from '@mui/material';
import api from '../api';
import GlassCard from '../components/GlassCard';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.msg || 'Login Failed');
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
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker background for better contrast
      backdropFilter: 'blur(5px)',
    },
    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'var(--neon-blue)' },
    '& input': { color: 'white' },
    // Fix for Chrome Autofill background
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
              color: 'var(--neon-blue)',
              textShadow: '0 0 10px rgba(0, 243, 255, 0.5)'
            }}>
              WELCOME BACK
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                autoComplete="current-password"
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
                  background: 'linear-gradient(45deg, var(--neon-blue), var(--neon-purple))',
                  boxShadow: '0 0 15px rgba(0, 243, 255, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, var(--neon-blue), var(--neon-purple))',
                    filter: 'brightness(1.2)',
                    boxShadow: '0 0 25px rgba(0, 243, 255, 0.6)',
                  }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'SIGN IN'}
              </Button>

              <Button
                fullWidth
                variant="outlined"
                component={Link}
                to="/guest"
                sx={{
                  mb: 2,
                  py: 1,
                  color: 'rgba(255, 255, 255, 0.7)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: 'var(--neon-blue)',
                    color: 'var(--neon-blue)',
                    bgcolor: 'rgba(0, 243, 255, 0.05)'
                  }
                }}
              >
                Skip Login (Check Email)
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link to="/register" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Don't have an account? <span style={{ color: 'var(--neon-blue)' }}>Sign Up</span>
                </Link>
              </Box>
            </Box>
          </Box>
        </GlassCard>
      </Container>
    </Box>
  );
};

export default Login;
