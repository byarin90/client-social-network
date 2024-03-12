import { Avatar, Box, Button, Typography } from '@mui/material';
import SelectLanguage from '../../shared/components/SelectLanguage';
import DialogWrapperSignUp from './DialogWrapperSignUp';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useStepper } from '../../shared/context/StepperContext';
import SignUpIntroductionPage from './views/SignUpIntroductionPage';
import Form from './views/Form';
import ProfilePictureUpload from './views/ImageProfile';
import WriteBioPage from './views/WriteBioPage';
import ReviewAndCreateAccount from './views/ReviewAndCreateAccount';
import CreateAccount from './views/CreateAccount';

const SignUpLayout = () => {
  const { step, setStep } = useStepper()

  const getCurrentStep = () => {
    switch (step) {
      case 1:
        return <SignUpIntroductionPage />
      case 2:
        return <Form/>
      case 3:
        return <ProfilePictureUpload/>
      case 4:
        return <WriteBioPage/>
      case 5:
         return <ReviewAndCreateAccount/>
      case 6:
        return <CreateAccount/>
      default:
        return <Box>
          <Typography>Step-1</Typography>
          <Button onClick={() => { setStep(2) }}>Next</Button>
        </Box>
    }
  }
  return (
    <DialogWrapperSignUp
      toolBarSx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
      ToolBar={
        <SelectLanguage />
      }
      Header={
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon sx={{ color: 'white' }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            {("Sign Up")}
          </Typography>
        </Box>
      }
      preventBackAtSteps={[1]}
      hideHeaderAtSteps={[1]}
    >
      {getCurrentStep()}
    </DialogWrapperSignUp>
  );
};

export default SignUpLayout;
