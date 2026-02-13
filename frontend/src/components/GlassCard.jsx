import React from 'react';
import { Box } from '@mui/material';

const GlassCard = ({ children, sx = {} }) => {
  return (
    <Box
      sx={{
        background: 'rgba(20, 20, 20, 0.7)', // Darker and more opaque background
        backdropFilter: 'blur(20px)', // Stronger blur
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        padding: '24px',
        color: 'white',
        position: 'relative',
        zIndex: 1,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default GlassCard;
