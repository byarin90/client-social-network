import { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useStepper } from '../../../shared/context/StepperContext';
import { useSignUpForm } from '../../../shared/context';
import { useTranslation } from 'react-i18next';

const WriteBioPage = () => {
    const { increment } = useStepper();
    const { onChangeFormData, formData: { bio: bioContext } } = useSignUpForm();
    const [bio, setBio] = useState(bioContext || '');

    const handleBioChange = (event: any) => {
        setBio(event.target.value);
    };

    const handleSubmit = () => {
        onChangeFormData('bio', bio);
        increment();
    };

    const { t } = useTranslation();
    return (
        <Container component="main" maxWidth="sm"  >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <Typography textAlign={'center'} variant="h4" component="h1" mt={5}>
                    {t('Share a Bit About Yourself')}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
                    {t('Your bio helps others understand who you are and what interests you.')}
                </Typography>
                <Typography mb={4} textAlign={'center'}>
                    {t('Feel free to share any hobbies, experiences, or fun facts!')}
                </Typography>
                <TextField
                    label={t("Your Bio")}
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    value={bio}
                    onChange={handleBioChange}
                    placeholder={t("I love hiking, reading, and meeting new people...")}
                />
                <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {t('Save and Continue')}
                </Button>

                <Button variant="text" onClick={increment}>
                    {t('Skip')}
                </Button>
            </Box>
        </Container>
    );
};

export default WriteBioPage;
