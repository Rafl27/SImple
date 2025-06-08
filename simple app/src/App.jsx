import { Box, Container, CssBaseline, IconButton, ThemeProvider, createTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Post from './components/Post';
import CreatePost from './components/CreatePost';

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

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState(initialPosts);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          sx={{ position: 'fixed', top: 16, right: 16, zIndex: 2000 }}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        <Sidebar />

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: 'background.default',
            minHeight: '100vh'
          }}
        >
          <Container maxWidth="md" sx={{ mt: 8 }}>
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </Container>
        </Box>

        <CreatePost onCreatePost={handleCreatePost} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
