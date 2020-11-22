import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Input,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import { socket } from './config/socket';

function App() {
  const [video, setVideo] = useState('');
  const [videoInput, setVideoInput] = useState('');

  useEffect(() => {
    socket.on('change', (data) => {
      setVideo(data);
    });
  }, []);

  const globalPlay = () => {
    console.log(socket.id);
    socket.emit('globalPlay');
  };

  const globalPause = () => {
    socket.emit('globalPause');
  };

  const globalChange = (e) => {
    setVideoInput('');
    socket.emit('globalVideoChange', videoInput);
  };

  const handleInput = (e) => {
    setVideoInput(e.target.value);
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography color="textPrimary" variant="h4">
            Sync Wave
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item md={8} xs={12}>
            <Box
              bgcolor="background.paper"
              style={{ position: 'relative' }}
              pt="56.25%"
            >
              <VideoPlayer video={video} />
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box height={1} padding={1} bgcolor="background.paper">
              Room Chat
            </Box>
          </Grid>
          <Grid item md={8} xs={12}>
            <Box height={1} padding={1} bgcolor="background.paper">
              <Button onClick={globalPlay}> Play </Button>
              <Button onClick={globalPause}> Pause </Button>
              <Button onClick={globalChange}> Change Video </Button>
              <Input fullWidth onChange={handleInput} value={videoInput} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
