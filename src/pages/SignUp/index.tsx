import { SignUpFormProvider, initialSignUpFormData } from '../../shared/context';
import { StepperProvider } from '../../shared/context/StepperContext'
import SignUpLayout from './SignUpLayout'


const SignUp = () => {

    return (
        <SignUpFormProvider initialFormData={initialSignUpFormData}>
            <StepperProvider>
                <SignUpLayout />
            </StepperProvider>
        </SignUpFormProvider>
    )
}

export default SignUp