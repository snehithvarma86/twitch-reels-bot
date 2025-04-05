import React, { useState, useCallback } from 'react';
import { Container, Grid, Typography, TextField, Button, Box } from '@mui/material';
import TwitchChat from './components/TwitchChat';
import ReelQueue from './components/ReelQueue';

function App() {
  const [channel, setChannel] = useState('starbeeeeee');
  const [queue, setQueue] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const handlePlay = useCallback(() => {
    setQueue(prevQueue => prevQueue.slice(1));
  }, []);

  const handleRemove = useCallback((index) => {
    setQueue(prevQueue => prevQueue.filter((_, i) => i !== index));
  }, []);

  const handleClearAll = useCallback(() => {
    setQueue([]);
  }, []);

  const handleReelDetected = useCallback((url, username) => {
    if (!url || !username) return;
    
    // Validate URL format
    try {
      const urlObj = new URL(url);
      if (!urlObj.hostname.includes('instagram.com')) {
        return;
      }
    } catch (e) {
      return;
    }

    // Sanitize username
    const sanitizedUsername = username.replace(/[^a-zA-Z0-9_]/g, '');
    
    setQueue(prevQueue => [...prevQueue, { url, username: sanitizedUsername }]);
  }, []);

  const handleConnect = useCallback(() => {
    if (channel.trim()) {
      // Sanitize channel name to only allow alphanumeric characters and underscores
      const sanitizedChannel = channel.trim().replace(/[^a-zA-Z0-9_]/g, '');
      if (sanitizedChannel) {
        setIsConnected(true);
        setQueue([]);
      }
    }
  }, [channel]);

  const handleDisconnect = useCallback(() => {
    setIsConnected(false);
    setQueue([]);
  }, []);

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        py: 4,
        minHeight: '100vh',
        backgroundColor: '#1a1a1f',
        maxWidth: 'none !important'
      }}
    >
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          color: '#e2e8f0',
          fontWeight: 'bold',
          mb: 3
        }}
      >
        Twitch Reels Bot
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              disabled={isConnected}
              placeholder="Enter Twitch channel name"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#2a2a35',
                  },
                  '&:hover fieldset': {
                    borderColor: '#3a3a45',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8b5cf6',
                  },
                  '&.Mui-disabled fieldset': {
                    borderColor: '#2a2a35',
                  },
                  backgroundColor: '#1e1e24',
                  color: 'white',
                  '& input': {
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: isConnected ? 'bold' : 'normal',
                    WebkitTextFillColor: 'white !important'
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={isConnected ? handleDisconnect : handleConnect}
              disabled={!isConnected && !channel.trim()}
              sx={{
                backgroundColor: isConnected ? '#ef4444' : '#8b5cf6',
                '&:hover': {
                  backgroundColor: isConnected ? '#dc2626' : '#7c3aed'
                },
                height: '56px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                textTransform: 'none',
                maxWidth: '200px',
                margin: '0 auto'
              }}
            >
              {isConnected ? 'Disconnect' : 'Connect'}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TwitchChat 
            channel={channel} 
            isConnected={isConnected}
            onReelDetected={handleReelDetected}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReelQueue 
            queue={queue}
            onPlay={handlePlay}
            onRemove={handleRemove}
            onClearAll={handleClearAll}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
