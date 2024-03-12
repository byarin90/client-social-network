import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material"
import { useStepper } from "../../../shared/context/StepperContext"

const Form = () => {
    const { increment } = useStepper()
    const onSubmit = () => {
        increment()
    }
    return (
        <Box sx={{ width: '100%' }} mt={2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        width: '100%',
                    }}
                >
                    <TextField
                        sx={{ width: { xs: '100%', sm: '48%' } }}
                        autoComplete="given-name"
                        name="firstName"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                    />
                    <TextField
                        sx={{ width: { xs: '100%', sm: '48%' } }}
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                    />

                </Box>
                <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                />
                <TextField
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                />
                <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                />
                <TextField
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                />
                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I'm agree with the terms and conditions."
                />
            </Box>
            <Button
                onClick={onSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Continue
            </Button>

        </Box>)
}

export default Form