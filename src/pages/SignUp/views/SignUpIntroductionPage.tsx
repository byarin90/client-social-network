import { Button, Container, Typography, Box } from '@mui/material';
import Link from '../../../shared/components/Link';
import { useStepper } from '../../../shared/context/StepperContext';

const SignUpIntroductionPage = () => {
 const {increment} = useStepper();

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}>
        <Typography textAlign={'center'} variant="h4" component="h1" gutterBottom>
          Welcome to Our Social Network!
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 4, textAlign: 'center' }}>
          Your journey begins here. Sign up to discover our social network.
        </Typography>
        <Box>
          <Button variant="contained" color="primary" onClick={increment}>
            Click here to begin
          </Button>
        </Box>


      </Box>

      <Box mt={5} textAlign={'center'}>
        <Link to="/" variant="body2">
          Already have an account? Sign in
        </Link>
      </Box>
    </Container>
  );
};

export default SignUpIntroductionPage;
