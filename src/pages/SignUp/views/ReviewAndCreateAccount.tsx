import { Box, Typography, Button, Container, Avatar } from '@mui/material';
import { useSignUpForm } from '../../../shared/context';
import { useStepper } from '../../../shared/context/StepperContext';
import UnknownImage from '../../../assets/avatar.jpg';
import { useTranslation } from 'react-i18next';

const ReviewAndCreateAccount = () => {
    const { formData } = useSignUpForm();
    const { increment } = useStepper();

    const profilePic = formData?.profilePicState?.profilePicture;
    const { t } = useTranslation();

    const bio = formData?.bio || '';

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
                    {t('Review Your Information')}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    {t('Make sure everything looks good before you create your account!')}
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
                    {profilePic && (<Typography variant="subtitle1">{t('Your Profile Picture')}</Typography>)}
                    <Avatar
                        alt="Profile Picture"
                        src={profilePic || UnknownImage}
                        sx={{ width: 150, height: 150, border: '12px solid #eeeeee' }}
                    />
                    {bio && (<Typography variant="subtitle1">{t('Your Bio')}</Typography>)}
                    <Typography sx={{ textAlign: 'center' }}>{bio}</Typography>
                </Box>
                <Button
                    onClick={increment}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {t('Create Account')}
                </Button>
            </Box>
        </Container>
    );
};

export default ReviewAndCreateAccount;
