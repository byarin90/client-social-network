import { Box, Typography, Button, Container, Avatar } from '@mui/material';
import { useSignUpForm } from '../../../shared/context';
import { useStepper } from '../../../shared/context/StepperContext';
import UnknownImage from '../../../assets/avatar.jpg';

const ReviewAndCreateAccount = () => {
    const { formData } = useSignUpForm();
    const { increment } = useStepper();
    const profilePic = formData?.profilePicState?.profilePicture;

    const bio = 'This is a preview of your bio. It will be visible to other users on your profile.';
    console.log('formData', formData);

    return (
        <Container component="main" maxWidth="sm" >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Typography fontSize={'1.6rem'} fontWeight={'bold'} mt={3} component="h1" gutterBottom>
                    Review Your Information
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    Make sure everything looks good before you create your account!
                </Typography>
                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Typography variant="subtitle1">Your Profile Picture</Typography>
                    <Avatar

                        alt="Profile Picture"
                        src={profilePic || UnknownImage}
                        sx={{ width: 150, height: 150, border: '12px solid #eeeeee' }}
                    />
                    <Typography variant="subtitle1">Your Bio</Typography>
                    <Typography sx={{ textAlign: 'center' }}>{bio}</Typography>
                </Box>
                <Button
                    onClick={increment}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Create Account
                </Button>
            </Box>
        </Container>
    );
};

export default ReviewAndCreateAccount;
