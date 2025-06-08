import { useState } from 'react';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Divider,
  Grid
} from '@mui/material';
import { Send } from '@mui/icons-material';

// Mock data for initial conversations
const initialConversations = [
  {
    id: 1,
    user: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    lastMessage: 'Hey, how are you?',
    timestamp: '10:30 AM'
  },
  {
    id: 2,
    user: 'Jane Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    lastMessage: 'Did you see my latest post?',
    timestamp: '9:15 AM'
  },
  {
    id: 3,
    user: 'Mike Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    lastMessage: 'Thanks for the help!',
    timestamp: 'Yesterday'
  }
];

// Mock data for messages in a conversation
const initialMessages = [
  {
    id: 1,
    sender: 'John Doe',
    content: 'Hey, how are you?',
    timestamp: '10:30 AM',
    isOwn: false
  },
  {
    id: 2,
    sender: 'You',
    content: 'I\'m good, thanks! How about you?',
    timestamp: '10:31 AM',
    isOwn: true
  },
  {
    id: 3,
    sender: 'John Doe',
    content: 'Doing great! Just working on some new features.',
    timestamp: '10:32 AM',
    isOwn: false
  }
];

const Messages = () => {
  const [conversations,
    //  setConversations
    ] = useState(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <Grid container sx={{ height: 'calc(100vh - 100px)' }}>
      {/* Conversations List */}
      <Grid item xs={4}>
        <Paper sx={{ height: '100%', borderRadius: 0 }}>
          <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            Messages
          </Typography>
          <List sx={{ overflow: 'auto', maxHeight: 'calc(100% - 64px)' }}>
            {conversations.map((conversation) => (
              <ListItem
                key={conversation.id}
                button
                onClick={() => setSelectedConversation(conversation)}
                selected={selectedConversation?.id === conversation.id}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'action.selected',
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar src={conversation.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={conversation.user}
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      {conversation.lastMessage}
                      <span>{conversation.timestamp}</span>
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Chat Area */}
      <Grid item xs={8}>
        <Paper sx={{ height: '100%', borderRadius: 0, display: 'flex', flexDirection: 'column' }}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6">{selectedConversation.user}</Typography>
              </Box>

              {/* Messages */}
              <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.isOwn ? 'flex-end' : 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        backgroundColor: message.isOwn ? 'primary.main' : 'background.paper',
                        color: message.isOwn ? 'primary.contrastText' : 'text.primary',
                        maxWidth: '70%',
                      }}
                    >
                      <Typography variant="body1">{message.content}</Typography>
                      <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.7 }}>
                        {message.timestamp}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>

              {/* Message Input */}
              <Box
                component="form"
                onSubmit={handleSendMessage}
                sx={{
                  p: 2,
                  borderTop: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  gap: 1,
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  variant="outlined"
                  size="small"
                />
                <IconButton type="submit" color="primary">
                  <Send />
                </IconButton>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Select a conversation to start messaging
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Messages; 