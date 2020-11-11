import {
  AppBar,
  Container,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';

function App() {
  return (
    <Container>
      <AppBar>
        <Toolbar>
          <Typography color="textPrimary" variant="h4">
            Sync Wave
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Paper>
        <Toolbar>
          <Typography color="textPrimary" variant="h4">
            Sync Wave
          </Typography>
        </Toolbar>
      </Paper>
    </Container>
  );
}

export default App;
