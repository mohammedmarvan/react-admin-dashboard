import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router'
import LoadingButton from '@mui/lab/LoadingButton';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Marus Dashbaord
      </Link> 
      {' ' + new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
    const router = useRouter()
    const [credentialError, setCredentialsError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async(event) => {
        setLoading(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const result = await signIn("credentials", { username: data.get('username'), password: data.get('password'), callbackUrl: '/', redirect: false });
        setLoading(false);
        setCredentialsError(false);

        if (result.status == 200 && !result.error) router.push('/');

        switch(result.error) {
            case 'CredentialsSignin':
                setCredentialsError(true);
                break;
            default:
                break;

        }
    };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {credentialError && 
            <Typography component="h4" color="red">
                That didn&apos;t worked! please check the credential
            </Typography>
            }
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button> */}
            <Grid>
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    type="submit"
                    fullWidth
                    color="primary"
                    sx={{ mt: 3, mb: 2}}
                >
                <span>Sign In</span>
                </LoadingButton>

            </Grid>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

SignIn.getLayout = (page) => {
    return page
}