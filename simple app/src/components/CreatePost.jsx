import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
  Zoom,
  Slide,
  Fade,
} from '@mui/material';
import { Add, Image as ImageIcon } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreatePost = ({ onCreatePost }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onCreatePost({
        content,
        image: imageUrl,
        author: 'Current User', // In a real app, this would come from auth
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setContent('');
    setImageUrl('');
  };

  return (
    <>
      <Zoom in={true} style={{ transitionDelay: '500ms' }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            borderRadius: '28px',
            padding: '12px 24px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          Create Post
        </Button>
      </Zoom>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        TransitionProps={{
          timeout: {
            enter: 500,
            exit: 400,
          },
        }}
      >
        <Fade in={open} timeout={400}>
          <div>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{
                  mt: 2,
                  transition: 'all 0.3s ease',
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease',
                  },
                }}
              />
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Image URL (optional)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  sx={{
                    mr: 1,
                    transition: 'all 0.3s ease',
                    '& .MuiOutlinedInput-root': {
                      transition: 'all 0.3s ease',
                    },
                  }}
                />
                <IconButton
                  color="primary"
                  sx={{
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <ImageIcon />
                </IconButton>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                sx={{
                  transition: 'opacity 0.2s ease',
                  '&:hover': { opacity: 0.8 },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={!content.trim()}
                sx={{
                  transition: 'all 0.2s ease',
                  '&:not(:disabled):hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                Post
              </Button>
            </DialogActions>
          </div>
        </Fade>
      </Dialog>
    </>
  );
};

export default CreatePost; 