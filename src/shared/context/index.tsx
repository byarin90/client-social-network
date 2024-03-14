import { FormDataSignUp } from "../types";
import { createFormContext } from "./Form";

const initialSignUpFormData: FormDataSignUp = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAggree: false,
    profilePicState: {
        profilePicture: '',
        imageSrc: null,
        crop: { x: 0, y: 0 },
        zoom: 1.5,
        croppedArea: null,
    },
    bio: '',

};

export const { FormProvider: SignUpFormProvider, useForm: useSignUpForm } = createFormContext<FormDataSignUp>()


export { initialSignUpFormData }