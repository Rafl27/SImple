import { Box, Container, CssBaseline, IconButton, ThemeProvider, createTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Messages from './components/Messages';

const initialPosts = [
  {
    id: 1,
    content: 'Just had an amazing day at the beach! 🌊',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop',
    author: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    date: '2024-03-20T10:30:00Z',
    comments: [
      {
        id: 1,
        author: 'Jane Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        content: 'Looks amazing! Which beach is this?',
        date: '2024-03-20T11:00:00Z'
      },
      {
        id: 2,
        author: 'Mike Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        content: 'Perfect weather for the beach!',
        date: '2024-03-20T11:30:00Z'
      }
    ]
  },
  {
    id: 2,
    content: 'Working on some exciting new projects! 💻',
    author: 'Jane Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    date: '2024-03-20T09:15:00Z',
    comments: []
  },
  {
    id: 3,
    content: 'Just testing the app',
    author: 'Jane Bongs',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    date: '2024-03-20T08:00:00Z',
    comments: []
  },
];

const MainContent = () => {
  const [posts, setPosts] = useState(initialPosts);
  const location = useLocation();

  const handleCreatePost = (newPost) => {
    setPosts([
      {
        id: posts.length + 1,
        ...newPost,
        date: new Date().toISOString(),
        comments: []
      },
      ...posts
    ]);
  };

  const handleAddComment = (postId, newComment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: 'background.default',
        minHeight: '100vh',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {posts.map((post, index) => (
                  <Box
                    key={post.id}
                    sx={{
                      opacity: 1,
                      transform: 'translateY(0)',
                      animation: 'fadeSlideIn 0.5s ease',
                      animationFillMode: 'backwards',
                      animationDelay: `${index * 0.1}s`,
                      '@keyframes fadeSlideIn': {
                        from: {
                          opacity: 0,
                          transform: 'translateY(20px)',
                        },
                        to: {
                          opacity: 1,
                          transform: 'translateY(0)',
                        },
                      },
                    }}
                  >
                    <Post post={post} onAddComment={handleAddComment} />
                  </Box>
                ))}
              </>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </Container>
      {location.pathname === '/' && <CreatePost onCreatePost={handleCreatePost} />}
    </Box>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
          },
        },
      },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          display: 'flex',
          minHeight: '100vh',
          bgcolor: 'background.default',
          transition: 'background-color 0.3s ease',
        }}>
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            sx={{
              position: 'fixed',
              top: 16,
              right: 16,
              zIndex: 2000,
              transform: 'rotate(0deg)',
              '&:hover': {
                transform: 'rotate(90deg)',
              },
              transition: 'transform 0.3s ease',
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <Sidebar />
          <MainContent />
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
