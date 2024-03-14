import { Box, Button, Checkbox, FormControlLabel, TextField, useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useStepper } from '../../../shared/context/StepperContext';
import { signUpValidation } from '../../../shared/validations/validations';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSignUpForm } from '../../../shared/context';
import { SignUpFormInputs } from '../../../shared/types';
import { useTranslation } from 'react-i18next';


const SignUpForm = () => {
    const { formData: {
        email: emailContext,
        password: passwordContext,
        username: usernameContext,
        firstName: firstNameContext,
        lastName: lastNameContext,
        confirmPassword: confirmPasswordContext,
        isAggree: isAggreeContext
    }, onChangeFormData } = useSignUpForm()

    const { increment } = useStepper();
    const {t} = useTranslation();

    const [checked, setChecked] = useState<boolean>(isAggreeContext);
    const isMobile = useMediaQuery('(max-width: 600px)')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormInputs>({
        resolver: joiResolver(signUpValidation()),
        defaultValues: {
            firstName: firstNameContext || '',
            lastName: lastNameContext || '',
            username: usernameContext || '',
            email: emailContext || '',
            password: passwordContext || '',
            confirmPassword: confirmPasswordContext || '',
        }
    });

    const onSubmit = (data: SignUpFormInputs) => {
        if (!checked) {
            toast.error('Please agree to the terms and conditions');
            return;
        }

        onChangeFormData({
            email: data.email,
            password: data.password,
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            confirmPassword: data.confirmPassword,
            isAggree: checked
        });

        increment();
    };


    return (
        <Box sx={{ width: '100%' }} mt={2}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                    <TextField
                        {...register('firstName')}
                        fullWidth
                        size={isMobile ? 'small' : 'medium'}
                        id="firstName"
                        label={t("First Name")}
                        error={!!errors.firstName}
                        helperText={t(errors.firstName?.message as string)}
                    />
                    <TextField
                        {...register('lastName')}
                        size={isMobile ? 'small' : 'medium'}
                        fullWidth
                        id="lastName"
                        label={t("Last Name")}
                        error={!!errors.lastName}
                        helperText={t(errors.lastName?.message as string) }
                    />
                </Box>
                <TextField
                    {...register('email')}
                    size={isMobile ? 'small' : 'medium'}
                    fullWidth
                    id="email"
                    label={t("Email Address")}
                    error={!!errors.email}
                    helperText={t(errors.email?.message as string)}
                />
                <TextField
                    {...register('username')}
                    size={isMobile ? 'small' : 'medium'}
                    fullWidth
                    id="username"
                    label={t("Username")}
                    error={!!errors.username}
                    helperText={t(errors.username?.message as string)}
                />
                <TextField
                    {...register('password')}
                    size={isMobile ? 'small' : 'medium'}
                    fullWidth
                    id="password"
                    label={t("Password")}
                    type="password"
                    error={!!errors.password}
                    helperText={t(errors.password?.message as string)}
                />
                <TextField
                    {...register('confirmPassword')}
                    size={isMobile ? 'small' : 'medium'}
                    fullWidth
                    id="confirmPassword"
                    label={t("Confirm Password")}
                    type="password"
                    error={!!errors.confirmPassword}
                    helperText={t(errors.confirmPassword?.message as string)}
                />
                <FormControlLabel
                    control={<Checkbox
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        color="primary" />}
                    label={t("I agree to the terms and conditions")}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                    {t('Continue')}
                </Button>
            </Box>
        </Box>
    );
};

export default SignUpForm;
