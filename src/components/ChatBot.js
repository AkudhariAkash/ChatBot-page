import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'How can I help?', sentiment: 'neutral' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sentiment, setSentiment] = useState('neutral'); // Track sentiment of bot responses

  useEffect(() => {
    const inputRef = document.querySelector('input[type="text"]');
    if (inputRef) {
      inputRef.focus();
    }
  }, []);

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (userInput.trim() !== '') {
      setIsLoading(true);
      setMessages([...messages, { role: 'user', content: userInput, sentiment: 'neutral' }]);

      try {
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            const botResponse = "You said: '" + userInput + "'";
            const randomSentiment = Math.random() > 0.5 ? 'positive' : 'negative';
            resolve({ content: botResponse, sentiment: randomSentiment });
          }, 1000);
        });

        setMessages([...messages, { role: 'bot', content: response.content, sentiment: response.sentiment }]);
        setSentiment(response.sentiment);

      } catch (error) {
        console.error("Error fetching bot response:", error);
        setMessages([...messages, { role: 'bot', content: "Sorry, I'm having trouble understanding.", sentiment: 'negative' }]);
      } finally {
        setIsLoading(false);
        setUserInput('');
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #2c3e50, #4ca1af)', // Gradient background
        color: '#fff',
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        ChatBot
      </Typography>
      <Box
        sx={{
          width: '300px',
          maxHeight: '400px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          borderRadius: 4,
          padding: 2,
          backgroundColor: '#fff',
          color: '#000',
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: message.role === 'bot' ? 'flex-start' : 'flex-end',
              mb: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                backgroundColor: message.role === 'bot' ? '#e8f0fe' : '#f0f4c3',
                padding: 1,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {message.content}
              {message.role === 'bot' && (
                message.sentiment === 'positive' ? (
                  <SentimentSatisfiedAltIcon sx={{ ml: 1 }} />
                ) : (
                  <SentimentDissatisfiedIcon sx={{ ml: 1 }} />
                )
              )}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: 2, display: 'flex' }}>
        <TextField
          fullWidth
          value={userInput}
          onChange={handleUserInputChange}
          placeholder="Type your message..."
          sx={{ mr: 1, backgroundColor: '#fff', borderRadius: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </Box>
      <Typography variant="caption" sx={{ mt: 2 }}>
        Current Sentiment: {sentiment === 'positive' ? 'Positive' : sentiment === 'negative' ? 'Negative' : 'Neutral'}
      </Typography>
    </Box>
  );
};

export default Chatbot;
