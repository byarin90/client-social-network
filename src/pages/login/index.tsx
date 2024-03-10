import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import SelectLanguage from '../../shared/components/translation/SelectLanguage';
import Form from './Form';
import { useTranslation } from 'react-i18next';
import Image from '../../assets/Login.png'
const Login = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'row-reverse', height: '100vh', direction: 'ltr',

    }}>
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', sm: 'block' }, // Hide on xs, show on sm and above
          backgroundImage: `url(${Image})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box
        component={Paper}
        elevation={6}
        square
        sx={{
          flex: { xs: 1, sm: 2, md: 0.8 }, // Take full width on xs, 2/3 on sm and above
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box
        sx={{
          display:{xs:'block',md:'none'},
          backgroundImage: `url(${Image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          height: '100vh',
          width: '100%',
          opacity: 0.2,
          filter: 'blur(3px) grayscale(100%)',
        
        }}
        >
        </Box>
        <Box p={1} width={'100%'} sx={{ alignSelf: 'flex-start' }}>
          <SelectLanguage />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            px: 4,
            width: '100%',
            height: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon sx={{ color: 'white' }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("Sign in")}
          </Typography>
          <Form />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
