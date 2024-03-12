import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress, Box, useTheme } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  label?: string;
  loading?: boolean;
  loadingStyle?: React.CSSProperties;
  classNameLoadingButton?: string;
  disableLoadingButton?: boolean;
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading, loadingStyle, classNameLoadingButton, disableLoadingButton = false, ...others }, ref) => {
    const theme = useTheme(); 

    const defaultLoadingStyle: React.CSSProperties = loading ? {
      backgroundColor: theme.palette.primary.main + '99', 
      color: theme.palette.primary.contrastText,
      ...loadingStyle,
    } : {};

    const loadingClassName = loading && classNameLoadingButton ? classNameLoadingButton : '';

    return (
      <MuiButton
        ref={ref}
        {...others}
        style={{...others.style, ...defaultLoadingStyle}}
        className={`${others.className || ''} ${loadingClassName}`}
        disabled={loading && disableLoadingButton}
      >
        {loading ? (
          <>
            <CircularProgress
              color="inherit"
              size={24}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                marginLeft: '-12px',
                marginTop: '-12px',
              }}
            />
            <Box sx={{ visibility: 'hidden' }}>
              {children}
            </Box>
          </>
        ) : (
          children
        )}
      </MuiButton>
    );
  }
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, variant = 'contained', loading = false, children, loadingStyle, classNameLoadingButton, disableLoadingButton, ...props }, ref) => {
    return (
      <LoadingButton
        ref={ref}
        variant={variant}
        loading={loading}
        loadingStyle={loadingStyle}
        classNameLoadingButton={classNameLoadingButton}
        disableLoadingButton={disableLoadingButton}
        {...props}
      >
        {label}
        {children}
      </LoadingButton>
    );
  }
);

export default Button;
