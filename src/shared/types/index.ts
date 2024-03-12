import { Area } from "react-easy-crop";

type LoginFormInputs = {
    email: string;
    password: string;
};

interface ProfilePictureState {
    profilePicture: string; // URL or base64 string of the cropped image
    imageSrc: string | null; // Source of the image to be cropped
    crop: { x: number; y: number }; // Crop position
    zoom: number; // Zoom level
    croppedArea: Area | null; // Cropped area details
  }

interface FormDataSignUp {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    profilePicState: ProfilePictureState,
    bio: string
}

export type {
    LoginFormInputs,
    FormDataSignUp,
}