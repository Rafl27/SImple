import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
} from '@mui/material';
import { Add, Image as ImageIcon } from '@mui/icons-material';

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
        avatar: 'https://source.unsplash.com/random/40x40/?person',
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
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setOpen(true)}
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
      >
        Create Post
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Image URL (optional)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              sx={{ mr: 1 }}
            />
            <IconButton color="primary">
              <ImageIcon />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={!content.trim()}>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreatePost; 