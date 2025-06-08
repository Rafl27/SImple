import { Box, Card, CardContent, CardMedia, Avatar, Typography } from '@mui/material';
import Comments from './Comments';

const Post = ({ post, onAddComment }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card sx={{ mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={post.avatar} sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {post.author}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(post.date)}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.content}
        </Typography>
        {post.image && (
          <CardMedia
            component="img"
            height="400"
            image={post.image}
            alt="Post image"
            sx={{ borderRadius: 1 }}
          />
        )}
        <Comments
          comments={post.comments}
          postId={post.id}
          onAddComment={onAddComment}
        />
      </CardContent>
    </Card>
  );
};

export default Post; 