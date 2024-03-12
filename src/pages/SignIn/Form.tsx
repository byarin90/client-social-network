import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { loginValidation } from '../../shared/validations/validations';
import { useTranslation } from 'react-i18next';
import { LoginFormInputs } from '../../shared/types';
import useRememberMe from '../../shared/hooks/useRememberMe';
import Link from '../../shared/components/Link';





const Form = () => {
    const { t } = useTranslation();
    const { rememberMe, toggleRememberMe, getCredentialsFromLocalStorage, saveCredentialsInLocalStorage } = useRememberMe()



    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: joiResolver(loginValidation()),
        defaultValues: {
            ...getCredentialsFromLocalStorage()
        }
    });

    const onSubmit = (
        data: LoginFormInputs
    ) => {
        console.log(data);

        if (rememberMe) {
            saveCredentialsInLocalStorage(data)
        }
    };





    return (
        <Box sx={{ display: 'flex', direction: 'ltr' }}>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
                <TextField
                    {...register('email')}
                    margin="normal"
                    fullWidth
                    id="email"
                    label={t("Email Address")}
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={!!errors.email}
                    helperText={errors.email ? t(errors.email.message as string) as string | undefined : ''}
                />
                <TextField
                    {...register('password')}
                    margin="normal"
                    fullWidth
                    name="password"
                    label={t("Password")}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password ? t(errors.password.message as string) as string | undefined : ''}
                />
                <Box width={'100%'}>
                    <FormControlLabel
                        control={<Checkbox
                            checked={rememberMe}
                            onChange={toggleRememberMe}
                            value="remember"
                            color="primary"
                        />}
                        label={t("Remember me")}
                    />
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {t("Sign in")}
                </Button>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <Link to="/sign-up" variant="body2">
                        {t("Forgot password?")}
                    </Link>
                    <Link to={'/sign-up'}>
                        {t("Don't have an account? Sign Up")}
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Form;
