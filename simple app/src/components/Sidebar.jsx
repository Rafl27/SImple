import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Person, Home, Login, PersonAdd } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Feed', icon: <Home />, path: '/' },
    { text: 'Profile', icon: <Person />, path: '/profile' }
  ];

  const authItems = [
    { text: 'Login', icon: <Login />, path: '/login' },
    { text: 'Sign Up', icon: <PersonAdd />, path: '/signup' }
  ];

  const ListItemComponent = ({ item }) => (
    <ListItem
      button
      onClick={() => navigate(item.path)}
      sx={{
        backgroundColor: location.pathname === item.path ? 'action.selected' : 'transparent',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'action.hover',
          transform: 'translateX(6px)',
        },
      }}
    >
      <ListItemIcon
        sx={{
          color: location.pathname === item.path ? 'primary.main' : 'inherit',
          transition: 'color 0.3s ease',
        }}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.text}
        sx={{
          color: location.pathname === item.path ? 'primary.main' : 'inherit',
          transition: 'color 0.3s ease',
        }}
      />
    </ListItem>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 8 }}>
        <List>
          {menuItems.map((item) => (
            <ListItemComponent key={item.text} item={item} />
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <List>
          {authItems.map((item) => (
            <ListItemComponent key={item.text} item={item} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 