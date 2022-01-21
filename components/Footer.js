import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" style={{textAlign:"center"}}>
      {'made by © '}
      <Link color="inherit" href="https://jeffubayi.xyz">
       Ubeezy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor:" #FFFF"
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1" style={{textAlign:"center"}}>
           National Basketball Association
          </Typography>
          <Copyright />
        </Container>
      </Box>
  );
}