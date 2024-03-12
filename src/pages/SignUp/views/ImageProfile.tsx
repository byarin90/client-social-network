import React, { useState, useCallback } from 'react';
import { Typography, Box, styled, IconButton, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDropzone } from 'react-dropzone';
import Cropper, { Area } from 'react-easy-crop';
import { useStepper } from '../../../shared/context/StepperContext';
import { getCroppedImg } from '../../../shared/libs/getCroppedImg';
import { useSignUpForm } from '../../../shared/context';

// Styled component for the dropzone
const StyledDropzone = styled('div')(({ theme }) => ({
    border: '2px dashed #eeeeee',
    padding: '20px',
    width: '100%',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ProfilePictureUpload: React.FC = () => {
    const { formData, onChangeFormData } = useSignUpForm();
    const { increment } = useStepper();

    // Initial state from context
    const [imageSrc, setImageSrc] = useState<string | null>(formData.profilePicState.imageSrc);
    const [crop, setCrop] = useState(formData.profilePicState.crop);
    const [zoom, setZoom] = useState(formData.profilePicState.zoom);
    const [croppedArea, setCroppedArea] = useState<Area | null>(formData.profilePicState.croppedArea);

    // Drop handler
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageSrc(reader.result as string);
            // Update context on new image drop
            onChangeFormData('profilePicState', {
                ...formData.profilePicState,
                imageSrc: reader.result as string,
            });
        };
        reader.readAsDataURL(file);
    }, [onChangeFormData, formData.profilePicState]);

    // Cropper setup
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*' as any,
        maxFiles: 1,
        noClick: !!imageSrc, 
        noKeyboard: !!imageSrc,
    });

    // Clear image and reset state
    const clearImage = () => {
        setImageSrc(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1.5);
        setCroppedArea(null);
        onChangeFormData('profilePicState', {
            ...formData.profilePicState,
            imageSrc: null,
            crop: { x: 0, y: 0 },
            zoom: 1.5,
            croppedArea: null,
            profilePicture: '',
        });
    };

    // Handle crop completion
    const onCropComplete = useCallback((croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
        setCroppedArea(croppedAreaPixels);
    }, []);

    // Handle image cropping and update context
    const handleCropImage = async () => {
        if (!imageSrc || !croppedArea) return;
        try {
            const croppedImageBlob = await getCroppedImg(imageSrc, croppedArea);
            const fileUrl = URL.createObjectURL(croppedImageBlob);
            onChangeFormData('profilePicState', {
                ...formData.profilePicState,
                profilePicture: fileUrl, // Save cropped image URL
            });
            increment(); // Proceed to next step
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5">Upload Your Profile Picture</Typography>
            {!imageSrc && (
                <StyledDropzone {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Typography>Drag 'n' drop your picture here, or click to select a file</Typography>
                    {isDragActive && <Typography sx={{ mt: 2 }}>Drop the files here ...</Typography>}
                </StyledDropzone>
            )}
            {imageSrc && (
                <Box sx={{ position: 'relative', width: '100%', maxWidth: 400, height: 400, mt: 2 }}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        cropShape="round"
                        showGrid={false}
                        style={{
                            containerStyle: {
                                background: 'gray',
                                zIndex: 3,
                                borderRadius: '50%',
                                border: '20px solid #eeeeee'
                            },
                            cropAreaStyle: {
                                borderColor: 'transparent',
                                boxShadow: 'none',
                                border: '2px solid #eeeeee',
                                zIndex: 4
                            },
                        }}
                    />
                    <IconButton
                        onClick={clearImage}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'primary.main',
                        }}
                    >
                        <CancelIcon />
                    </IconButton>
                </Box>
            )}
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button variant="contained" onClick={handleCropImage} sx={{ mb: 2 }}>
                    Continue
                </Button>
 
                <Button variant="text" onClick={increment}>
                    Skip
                </Button>
            </Box>
        </Box>
    );
};

export default ProfilePictureUpload;
