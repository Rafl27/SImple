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
} from '@mui/material';
import { Edit, GridView, ViewStream } from '@mui/icons-material';
import { useState } from 'react';

const Profile = () => {
  const [isGridView, setIsGridView] = useState(true);
  
  const userProfile = {
    name: 'John Doe',
    username: '@johndoe',
    bio: 'Software Developer | Photography Enthusiast | Coffee Lover',
    avatar: 'https://source.unsplash.com/random/150x150/?portrait',
    coverPhoto: 'https://source.unsplash.com/random/1600x400/?landscape',
    stats: {
      posts: 42,
      followers: 1234,
      following: 567
    }
  };

  const userPosts = [
    {
      id: 1,
      image: 'https://source.unsplash.com/random/800x800/?nature',
      content: 'Beautiful day in nature! 🌲',
      likes: 156
    },
    {
      id: 2,
      image: 'https://source.unsplash.com/random/800x800/?city',
      content: 'City vibes 🌆',
      likes: 234
    },
    {
      id: 3,
      image: 'https://source.unsplash.com/random/800x800/?coffee',
      content: 'Morning coffee ☕',
      likes: 98
    },
    {
      id: 4,
      content: 'Just a text post about coding! 💻',
      likes: 75
    },
    // Add more posts as needed
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

          {/* View Toggle */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              size="small"
              startIcon={<GridView />}
              onClick={() => setIsGridView(true)}
              color={isGridView ? 'primary' : 'inherit'}
            >
              Grid
            </Button>
            <Button
              size="small"
              startIcon={<ViewStream />}
              onClick={() => setIsGridView(false)}
              color={!isGridView ? 'primary' : 'inherit'}
            >
              List
            </Button>
          </Box>

          {/* Posts Grid */}
          <Fade in={true}>
            <Grid container spacing={2}>
              {userPosts.map((post) => (
                <Grid item xs={isGridView ? 4 : 12} key={post.id}>
                  <Card
                    sx={{
                      height: isGridView ? 250 : 'auto',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    {post.image ? (
                      <CardMedia
                        component="img"
                        height={isGridView ? "250" : "400"}
                        image={post.image}
                        alt={post.content}
                        sx={{
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: 2,
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="body1">{post.content}</Typography>
                      </Box>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Fade>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile; 