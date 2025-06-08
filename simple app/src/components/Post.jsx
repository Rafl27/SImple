import { Box, Card, CardContent, CardMedia, Avatar, Typography } from '@mui/material';

const Post = ({ post }) => {
  return (
    <Card sx={{ mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={post.avatar} sx={{ mr: 2 }} />
          <Typography variant="subtitle1" fontWeight="bold">
            {post.author}
          </Typography>
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
      </CardContent>
    </Card>
  );
};

export default Post; 