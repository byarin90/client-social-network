import { Box } from "@mui/material";
import Loader from "../../../shared/components/Loader";
import { useSignUpForm } from "../../../shared/context";
import { useEffect } from "react";
import axios from "axios";

const CreateAccount = () => {
  const { formData: {
    profilePicState: {
      profilePicture = null,
    },
    // email,
    // username,
    // password,
    // firstName,
    // lastName,
  } } = useSignUpForm();

  useEffect(() => {
    uploadCroppedImage();
  }, []);

  const uploadCroppedImage = async () => {
    if (!profilePicture){
      console.log("No profile picture to upload");
      //wil sent to complete step
      return
    } 

    try {
      const response = await fetch(profilePicture);
      const blob = await response.blob();
      const fileName = 'yarin.' + blob.type.split('/')[1]
      // const fileName = `${username}.${blob.type.split('/')[1]}`
      const uploadFormData = new FormData();
      uploadFormData.append("file", blob, fileName);
      console.log("Upload Form Data:", uploadFormData);
      const { data } = await axios.post('http://localhost:3005/users/upload-profile-image'
        , uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('data:', data);
    } catch (error) {
      console.error("Error uploading cropped image:", error);
      //!will send to error step
    }
  };

  return (
    <Box height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Loader label={'Creating Account...'} />
    </Box>
  );
};

export default CreateAccount;
