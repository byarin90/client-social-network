import  { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useStepper } from '../../../shared/context/StepperContext';

const WriteBioPage = () => {
    const { increment } = useStepper();
    const [bio, setBio] = useState('');

    const handleBioChange = (event:any) => {
        setBio(event.target.value);
    };

    const handleSubmit = () => {
        console.log(bio); 
        increment(); 
    };

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
                <Typography textAlign={'center'} variant="h4" component="h1" mt={5}>
                    Share a Bit About Yourself
                </Typography>
                <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
                    Your bio helps others understand who you are and what interests you. 
                </Typography>
                <Typography mb={4} textAlign={'center'}>
                Feel free to share any hobbies, experiences, or fun facts!
                </Typography>
                <TextField
                    label="Your Bio"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    value={bio}
                    onChange={handleBioChange}
                    placeholder="I love hiking, reading, and meeting new people..."
                />
                <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Save and Continue
                </Button>

                <Button variant="text" onClick={increment}>
                Skip
            </Button>
            </Box>
        </Container>
    );
};

export default WriteBioPage;
