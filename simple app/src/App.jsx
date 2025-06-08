import { Box, Container, CssBaseline, IconButton, ThemeProvider, createTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';

const initialPosts = [
  {
    id: 1,
    content: 'Just had an amazing day at the beach! 🌊',
    image: 'https://source.unsplash.com/random/800x400/?beach',
    author: 'John Doe',
    avatar: 'https://source.unsplash.com/random/40x40/?person'
  },
  {
    id: 2,
    content: 'Working on some exciting new projects! 💻',
    author: 'Jane Smith',
    avatar: 'https://source.unsplash.com/random/40x40/?woman'
  },
];

const MainContent = () => {
  const [posts, setPosts] = useState(initialPosts);
  const location = useLocation();

  const handleCreatePost = (newPost) => {
    setPosts([
      {
        id: posts.length + 1,
        ...newPost
      },
      ...posts
    ]);
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
                    <Post post={post} />
                  </Box>
                ))}
              </>
            }
          />
          <Route path="/profile" element={<Profile />} />
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
