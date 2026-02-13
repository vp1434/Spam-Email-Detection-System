import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, CircularProgress, Alert, Chip } from '@mui/material';
import GlassCard from '../components/GlassCard';
import api from '../api';
import { Link } from 'react-router-dom';

const GuestDashboard = () => {
  const [formData, setFormData] = useState({ subject: '', body: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await api.post('/emails/analyze', formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Analysis Failed. Please try again.');
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
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'var(--neon-blue)' },
    mb: 2
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      <GlassCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ color: 'var(--neon-blue)', textShadow: '0 0 10px rgba(0, 243, 255, 0.3)' }}>
            Quick Spam Check
          </Typography>
          <Button component={Link} to="/login" variant="outlined" sx={{ borderColor: 'var(--neon-purple)', color: 'var(--neon-purple)' }}>
            Login / Register
          </Button>
        </Box>

        <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.7)' }}>
          Analyze an email without creating an account.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            sx={textFieldSx}
          />
          <TextField
            fullWidth
            label="Email Body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            multiline
            rows={6}
            sx={textFieldSx}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.5,
              background: 'linear-gradient(45deg, var(--neon-blue), var(--neon-purple))',
              fontWeight: 'bold'
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Analyze Email'}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 3, bgcolor: 'rgba(211, 47, 47, 0.2)', color: '#ffbdad' }}>
            {error}
          </Alert>
        )}

        {result && (
          <Box sx={{ mt: 4, p: 3, border: '1px solid var(--neon-blue)', borderRadius: 2, bgcolor: 'rgba(0, 243, 255, 0.05)' }}>
            <Typography variant="h6" gutterBottom>Analysis Result:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                label={result.is_spam ? "SPAM" : "HAM (Safe)"}
                color={result.is_spam ? "error" : "success"}
                sx={{ fontSize: '1.2rem', py: 2.5, px: 2 }}
              />
              <Typography variant="body1">
                Confidence: <strong>{(result.confidence * 100).toFixed(2)}%</strong>
              </Typography>
            </Box>
          </Box>
        )}
      </GlassCard>
    </Container>
  );
};

export default GuestDashboard;
