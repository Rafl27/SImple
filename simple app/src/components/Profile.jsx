import React from 'react';
import {
  Box,
  Container,
  Avatar,
  Typography,
  Grid,
  Card,
  CardMedia,
  Paper,
  Button,
  Fade,
  CardContent,
  IconButton,
  CardActions,
  Modal,
  Backdrop,
} from '@mui/material';
import { Edit, GridView, ViewStream, Favorite, Share, ChatBubble, Close } from '@mui/icons-material';
import { useState } from 'react';

const Profile = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const userProfile = {
    name: 'John Doe',
    username: '@johndoe',
    bio: 'Software Developer | Photography Enthusiast | Coffee Lover',
    avatar: 'https://avatars.cloudflare.steamstatic.com/4f7bcfd19d6cfaec1b48a8d5b6512100e46b3059_full.jpg',
    coverPhoto: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stats: {
      posts: 42,
      followers: 1234,
      following: 567
    }
  };

  const userPosts = [
    {
      id: 1,
      image: 'https://plus.unsplash.com/premium_photo-1676218968741-8179dd7e533f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW91bnRhaW5zfGVufDB8fDB8fHww',
      content: 'Beautiful day in nature! 🌲 Just took a long hike through the mountains and the views were absolutely breathtaking. Nature has a way of making you feel so small yet so connected to everything.',
      likes: 156,
      comments: 23,
      shares: 12,
      timestamp: '2h ago'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1747138593244-0922d4f9d649?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: 'City vibes 🌆 Nothing beats a night walk through downtown, watching the city come alive with lights and energy.',
      likes: 234,
      comments: 45,
      shares: 18,
      timestamp: '5h ago'
    },
    {
      id: 3,
      content: 'Just deployed my latest project! 🚀 After weeks of coding and debugging, it feels amazing to finally push it live. #coding #webdev #javascript',
      likes: 98,
      comments: 15,
      shares: 5,
      timestamp: '1d ago'
    },
    {
      id: 4,
      content: 'Sometimes the simplest code solutions are the most elegant. Remember: premature optimization is the root of all evil! 💻 #programming #codinglife',
      likes: 75,
      comments: 12,
      shares: 8,
      timestamp: '2d ago'
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Cover Photo */}
      <Box
        sx={{
          height: 300,
          position: 'relative',
          backgroundImage: `url(${userProfile.coverPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }
        }}
      />

      <Container maxWidth="md" sx={{ transform: 'translateY(-100px)' }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: 'background.paper',
            transition: 'background-color 0.3s ease',
          }}
        >
          {/* Profile Header */}
          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 4 }}>
            <Avatar
              src={userProfile.avatar}
              sx={{
                width: 150,
                height: 150,
                border: 3,
                borderColor: 'background.paper',
                transform: 'translateY(-50%)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-50%) scale(1.05)',
                },
              }}
            />
            <Box sx={{ ml: 3, flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                {userProfile.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {userProfile.username}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {userProfile.bio}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<Edit />}
              sx={{
                height: 'fit-content',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              Edit Profile
            </Button>
          </Box>

          {/* Stats */}
          <Box
            sx={{
              display: 'flex',
              gap: 4,
              mb: 4,
              '& > div': {
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              },
            }}
          >
            <Box>
              <Typography variant="h6">{userProfile.stats.posts}</Typography>
              <Typography color="text.secondary">Posts</Typography>
            </Box>
            <Box>
              <Typography variant="h6">{userProfile.stats.followers}</Typography>
              <Typography color="text.secondary">Followers</Typography>
            </Box>
            <Box>
              <Typography variant="h6">{userProfile.stats.following}</Typography>
              <Typography color="text.secondary">Following</Typography>
            </Box>
          </Box>

          {/* Posts Grid/List */}
          <Fade in={true}>
            <Grid container spacing={2}>
              {userPosts.map((post) => (
                <Grid item xs={12} key={post.id}>
                  <Card
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          src={userProfile.avatar}
                          sx={{ width: 48, height: 48, mr: 2 }}
                        />
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {userProfile.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {userProfile.username}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              · {post.timestamp}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      
                      <Typography variant="body1" sx={{ mb: post.image ? 2 : 0 }}>
                        {post.content}
                      </Typography>
                      
                      {post.image && (
                        <CardMedia
                          component="img"
                          image={post.image}
                          alt="Post image"
                          onClick={() => setSelectedImage(post.image)}
                          sx={{
                            borderRadius: 2,
                            maxHeight: 400,
                            objectFit: 'cover',
                            cursor: 'pointer',
                            transition: 'opacity 0.2s',
                            '&:hover': {
                              opacity: 0.9,
                            },
                          }}
                        />
                      )}
                    </CardContent>
                    
                    <CardActions sx={{ px: 2, pb: 2 }}>
                      <IconButton size="small" sx={{ mr: 2 }}>
                        <ChatBubble fontSize="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {post.comments}
                        </Typography>
                      </IconButton>
                      <IconButton size="small" sx={{ mr: 2 }}>
                        <Share fontSize="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {post.shares}
                        </Typography>
                      </IconButton>
                      <IconButton size="small">
                        <Favorite fontSize="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {post.likes}
                        </Typography>
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Fade>

          {/* Image Modal */}
          <Modal
            open={!!selectedImage}
            onClose={() => setSelectedImage(null)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
          >
            <Fade in={!!selectedImage}>
              <Box
                sx={{
                  position: 'relative',
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                }}
              >
                <IconButton
                  onClick={() => setSelectedImage(null)}
                  sx={{
                    position: 'absolute',
                    top: -40,
                    right: -40,
                    color: 'white',
                    bgcolor: 'rgba(0, 0, 0, 0.4)',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.6)',
                    },
                  }}
                >
                  <Close />
                </IconButton>
                <img
                  src={selectedImage}
                  alt="Enlarged post"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '90vh',
                    objectFit: 'contain',
                    borderRadius: '8px',
                  }}
                />
              </Box>
            </Fade>
          </Modal>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile; 