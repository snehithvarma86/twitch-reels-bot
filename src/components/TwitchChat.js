import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import tmi from 'tmi.js';

const TwitchChat = ({ channel, isConnected, onReelDetected }) => {
  useEffect(() => {
    let client = null;

    const connectToChat = async () => {
      if (!isConnected || !channel || typeof onReelDetected !== 'function') return;

      try {
        client = new tmi.Client({
          channels: [channel]
        });

        await client.connect();

        client.on('message', (channel, tags, message, self) => {
          if (self) return;

          const reelRegex = /https:\/\/(?:www\.)?instagram\.com\/(?:reels|p)\/[a-zA-Z0-9_-]+/;
          const match = message.match(reelRegex);
          
          if (match && onReelDetected) {
            onReelDetected(match[0], tags['display-name']);
          }
        });
      } catch (error) {
        console.error('Error connecting to Twitch chat:', error);
      }
    };

    connectToChat();

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, [channel, isConnected, onReelDetected]);

  return (
    <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column' }}>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          color: '#8b5cf6',
          fontWeight: 'bold',
          fontSize: '1.4rem',
          borderBottom: '1px solid #2a2a35',
          pb: 1
        }}
      >
        Twitch Chat
      </Typography>
      <Box sx={{ flex: 1, position: 'relative' }}>
        {isConnected ? (
          <iframe
            title={`Twitch Chat for ${channel}`}
            src={`https://www.twitch.tv/embed/${channel}/chat?parent=${window.location.hostname}`}
            frameBorder="0"
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        ) : (
          <Box 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#94a3b8',
              fontSize: '1.1rem'
            }}
          >
            Enter a channel name and click Connect to view chat
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TwitchChat; 
