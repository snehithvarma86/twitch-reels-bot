import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  Box,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ClearAllIcon from '@mui/icons-material/ClearAll';

const ReelQueue = ({ queue, onPlay, onRemove, onClearAll }) => {
  const handlePlay = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    onPlay();
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        height: '90vh', 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: '#1a1a1f',
        border: '1px solid #2a2a35'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #2a2a35',
        pb: 1,
        mb: 2
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#8b5cf6',
            fontWeight: 'bold',
            fontSize: '1.4rem'
          }}
        >
          Media Queue
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ClearAllIcon />}
          onClick={onClearAll}
          disabled={queue.length === 0}
          sx={{
            color: '#ef4444',
            borderColor: '#ef4444',
            '&:hover': {
              borderColor: '#dc2626',
              backgroundColor: 'rgba(239, 68, 68, 0.1)'
            },
            '&.Mui-disabled': {
              color: '#6b7280',
              borderColor: '#4b5563'
            }
          }}
        >
          Clear All
        </Button>
      </Box>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List>
          {queue.map((reel, index) => (
            <ListItem 
              key={index} 
              sx={{ 
                backgroundColor: '#1e1e24',
                mb: 1,
                borderRadius: 1,
                border: '1px solid #2a2a35',
                '&:hover': {
                  backgroundColor: '#2a2a35',
                  borderColor: '#3a3a45',
                  transition: 'all 0.2s ease'
                }
              }}
            >
              <ListItemText 
                primary={`Link ${index + 1} from ${reel.username}`}
                secondary={
                  <Box>
                    <Typography 
                      component="div" 
                      sx={{ 
                        color: '#94a3b8',
                        fontSize: '1.1rem',
                        wordBreak: 'break-all',
                        mb: reel.description ? 1 : 0
                      }}
                    >
                      {reel.url}
                    </Typography>
                    {reel.description && (
                      <Typography 
                        component="div"
                        sx={{ 
                          color: '#ffffff',
                          fontSize: '1.1rem',
                          fontWeight: 'normal',
                          wordBreak: 'break-word',
                          backgroundColor: 'rgba(100, 116, 139, 0.1)',
                          p: 1,
                          borderRadius: 1,
                          border: '1px solid rgba(100, 116, 139, 0.2)'
                        }}
                      >
                        {reel.description}
                      </Typography>
                    )}
                  </Box>
                }
                sx={{ 
                  '& .MuiListItemText-primary': {
                    fontWeight: 'bold',
                    color: '#8b5cf6',
                    fontSize: '1.15rem'
                  }
                }}
              />
              <ListItemSecondaryAction>
                <IconButton 
                  edge="end" 
                  aria-label="play"
                  onClick={() => handlePlay(reel.url)}
                  sx={{ 
                    mr: 1,
                    color: '#8b5cf6',
                    '&:hover': {
                      backgroundColor: 'rgba(139, 92, 246, 0.1)'
                    }
                  }}
                >
                  <PlayArrowIcon />
                </IconButton>
                <IconButton 
                  edge="end" 
                  aria-label="delete"
                  onClick={() => onRemove(index)}
                  sx={{ 
                    color: '#ef4444',
                    '&:hover': {
                      backgroundColor: 'rgba(239, 68, 68, 0.1)'
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {queue.length === 0 && (
            <ListItem>
              <ListItemText 
                primary="No reels in queue"
                sx={{ 
                  textAlign: 'center',
                  color: '#94a3b8'
                }}
              />
            </ListItem>
          )}
        </List>
      </Box>
    </Paper>
  );
};

export default ReelQueue; 