import { Area } from "react-easy-crop";

type LoginFormInputs = {
    email: string;
    password: string;
};

interface ProfilePictureState {
    profilePicture: string; 
    imageSrc: string | null; 
    crop: { x: number; y: number };
    zoom: number;
    croppedArea: Area | null; 
  }
  interface SignUpFormInputs {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormDataSignUp {
    firstName: string | null,
    lastName: string | null,
    username: string | null,
    email: string | null,
    password: string | null,
    confirmPassword: string | null,
    isAggree: boolean,
    profilePicState: ProfilePictureState,
    bio: string | null,
}

export type {
    LoginFormInputs,
    FormDataSignUp,
    SignUpFormInputs,
}