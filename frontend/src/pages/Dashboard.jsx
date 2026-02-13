import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography, Button, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import EmailUpload from '../components/EmailUpload';

const Dashboard = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/emails', {
        headers: { 'x-auth-token': token }
      });
      setEmails(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>Dashboard</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>Analyze New Email</Typography>
            <EmailUpload onUploadSuccess={fetchEmails} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>Recent Emails</Typography>
            <List>
              {emails.map((email) => (
                <React.Fragment key={email._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography component="span" variant="subtitle1" color="text.primary">
                            {email.subject}
                          </Typography>
                          <Chip
                            label={email.classification.isSpam ? "SPAM" : "HAM"}
                            color={email.classification.isSpam ? "error" : "success"}
                            size="small"
                            sx={{ ml: 2 }}
                          />
                          <Typography variant="caption" display="block" color="text.secondary">
                            Confidence: {(email.classification.confidence * 100).toFixed(2)}%
                          </Typography>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {email.sender}
                          </Typography>
                          {" — " + email.body.substring(0, 100) + "..."}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
              {emails.length === 0 && <Typography variant="body2" sx={{ p: 2 }}>No emails found.</Typography>}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
