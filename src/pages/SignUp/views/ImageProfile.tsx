import React, { useState, useCallback } from 'react';
import { Typography, Box, styled, IconButton, Button, useMediaQuery } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDropzone } from 'react-dropzone';
import Cropper, { Area } from 'react-easy-crop';
import { useStepper } from '../../../shared/context/StepperContext';
import { getCroppedImg } from '../../../shared/libs/getCroppedImg';
import { useSignUpForm } from '../../../shared/context';
import { useTranslation } from 'react-i18next';

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
    zIndex: 10
}));

const ProfilePictureUpload: React.FC = () => {
    const { formData, onChangeFormData } = useSignUpForm();
    const { increment } = useStepper();
    const isMobile = useMediaQuery('(max-width: 600px)')
    const [imageSrc, setImageSrc] = useState<string | null>(formData.profilePicState.imageSrc);
    const [crop, setCrop] = useState(formData.profilePicState.crop);
    const [zoom, setZoom] = useState(formData.profilePicState.zoom);
    const [croppedArea, setCroppedArea] = useState<Area | null>(formData.profilePicState.croppedArea);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageSrc(reader.result as string);
            onChangeFormData('profilePicState', {
                ...formData.profilePicState,
                imageSrc: reader.result as string,
            });
        };
        reader.readAsDataURL(file);
    }, [onChangeFormData, formData.profilePicState]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*' as any,
        maxFiles: 1,
        noClick: !!imageSrc,
        noKeyboard: !!imageSrc,
    });

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

    const onCropComplete = useCallback((_croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
        setCroppedArea(croppedAreaPixels);
    }, []);

    const handleCropImage = async () => {
        if (!imageSrc || !croppedArea) return;
        try {
            const croppedImageBlob = await getCroppedImg(imageSrc, croppedArea);
            const fileUrl = URL.createObjectURL(croppedImageBlob);
            onChangeFormData('profilePicState', {
                ...formData.profilePicState,
                profilePicture: fileUrl,
                crop,
                croppedArea,
                zoom,
            });
            increment();
        } catch (e) {
            console.error(e);
        }
    };

    const { t } = useTranslation();

    return (
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5">{t('Upload Your Profile Picture')}</Typography>
            {!imageSrc && (
                <StyledDropzone {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Typography>{t('Drag & drop your picture here, or click to select a file')}</Typography>
                    {isDragActive && <Typography sx={{ mt: 2 }}>{t('Drop the files here ...')}</Typography>}
                </StyledDropzone>
            )}
            {imageSrc && (
                <Box sx={{ position: 'relative', width: '100%', maxWidth: isMobile ? 300 : 400, height: isMobile ? 300 : 400, mt: 2 }}>
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
                            zIndex: 5,
                        }}
                    >
                        <CancelIcon />
                    </IconButton>
                </Box>
            )}
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button variant="contained" onClick={handleCropImage} sx={{ mb: 2 }}>
                    {t('Continue')}
                </Button>

                <Button variant="text" onClick={increment}>
                    {t('Skip')}
                </Button>
            </Box>
        </Box>
    );
};

export default ProfilePictureUpload;
