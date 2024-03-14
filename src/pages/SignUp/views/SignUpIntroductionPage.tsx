import { Button, Container, Typography, Box } from '@mui/material';
import Link from '../../../shared/components/Link';
import { useStepper } from '../../../shared/context/StepperContext';
import { useSignUpForm } from '../../../shared/context';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SignUpIntroductionPage = () => {
  const { clearFormData } = useSignUpForm();
  const { increment } = useStepper();

  const {t} = useTranslation();
  useEffect(() => {
    clearFormData()
  }, [])

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
          {t('Welcome to Our Social Network!')}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 4, textAlign: 'center' }}>
          {t('Your journey begins here. Sign up to discover our social network.')}
        </Typography>
        <Box>
          <Button variant="contained" color="primary" onClick={increment}>
            {t('Click here to begin')}
          </Button>
        </Box>


      </Box>

      <Box mt={5} textAlign={'center'}>
        <Link to="/" variant="body2">
          {t('Already have an account? Sign in')}
        </Link>
      </Box>
    </Container>
  );
};

export default SignUpIntroductionPage;
