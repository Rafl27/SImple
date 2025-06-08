import { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Collapse,
  IconButton,
} from '@mui/material';
import { Comment as CommentIcon } from '@mui/icons-material';

const Comments = ({ comments = [], onAddComment, postId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment(postId, {
      id: Date.now(),
      author: 'Current User', // In a real app, this would come from auth
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
      content: newComment,
      date: new Date().toISOString()
    });

    setNewComment('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <IconButton
          onClick={() => setIsExpanded(!isExpanded)}
          size="small"
          color={isExpanded ? 'primary' : 'default'}
        >
          <CommentIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </Typography>
      </Box>

      <Collapse in={isExpanded}>
        <List sx={{ py: 0 }}>
          {comments.map((comment) => (
            <ListItem
              key={comment.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                py: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar
                  src={comment.avatar}
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
                <Typography variant="subtitle2">{comment.author}</Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  {formatDate(comment.date)}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ pl: 5 }}>
                {comment.content}
              </Typography>
            </ListItem>
          ))}
        </List>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            gap: 1,
            mt: 2,
          }}
        >
          <TextField
            size="small"
            fullWidth
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ flex: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={!newComment.trim()}
          >
            Post
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Comments; 