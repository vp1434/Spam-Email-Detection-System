import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, CircularProgress } from '@mui/material';

const EmailUpload = ({ onUploadSuccess }) => {
  const [formData, setFormData] = useState({ sender: '', subject: '', body: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/emails/upload', formData, {
        headers: { 'x-auth-token': token }
      });
      setFormData({ sender: '', subject: '', body: '' });
      onUploadSuccess();
    } catch (err) {
      console.error(err);
      alert('Upload Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="sender"
        label="Sender Email"
        name="sender"
        value={formData.sender}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="subject"
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="body"
        label="Email Body"
        id="body"
        multiline
        rows={4}
        value={formData.body}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Process Email'}
      </Button>
    </Box>
  );
};

export default EmailUpload;
