import { Avatar, Box, Icon, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { GiHealthNormal } from 'react-icons/gi';

export default function Header() {
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 4 }}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            >
              <GiHealthNormal />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              PHARMA
            </Typography>
            <IconButton aria-controls='simple-menu' aria-haspopup='true'>
              <Avatar>
                <Icon>person</Icon>
              </Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
