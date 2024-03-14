import { Box, Button, Container, Paper } from "@mui/material"
import Image from "../../assets/Login.png"
import { useStepper } from "../../shared/context/StepperContext"
import { makeStyles } from "tss-react/mui"
import { useTranslation } from "react-i18next"
const DialogWrapperSignUp = (
    {
        children,
        ToolBar,
        toolBarSx,
        Header,
        preventBackAtSteps,
        hideHeaderAtSteps,
    }
        :
        {
            children: React.ReactNode,
            ToolBar?: React.ReactNode,
            Header?: React.ReactNode,
            toolBarSx?: React.CSSProperties,
            preventBackAtSteps?: number[],
            hideHeaderAtSteps?: number[],
        }
) => {
    const { goBack, step } = useStepper()
    const useStyles = makeStyles({})(() => ({
        root: {
            '& .MuiBox-root .muiltr-binzgt': {
                marginTop: 0
            }
        },

    }))
    const { classes } = useStyles()
    const {t} = useTranslation();
    return (
        <Box  
        className={classes.root}
        sx={{
            display: 'flex', flexDirection: 'row-reverse', minHeight: '100vh', direction: 'ltr',
        }}
        >
            <Box
                sx={{
                    flex: 1,
                    display: { xs: 'none', sm: 'block' },
                    backgroundImage: `url(${Image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Box
                component={Paper}
                elevation={6}
                square
                sx={{
                    flex: { xs: 1, sm: 2, md: 0.8 },
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        backgroundImage: `url(${Image})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'absolute',
                        height: '100vh',
                        width: '100%',
                        opacity: 0.2,
                        filter: 'blur(3px) grayscale(100%)',
                    }}
                >
                </Box>
                <Box p={1} width={'100%'} sx={{ ...toolBarSx, alignSelf: 'flex-start' }}>
                    {ToolBar}
                    {preventBackAtSteps && preventBackAtSteps.includes(step) ? null : (
                        <Button onClick={goBack}>{t('Go Back')}</Button>
                    )
                    }
                </Box>
                <Container 
                 component="main" maxWidth="xs">
                    {
                        hideHeaderAtSteps && hideHeaderAtSteps.includes(step) ? null : Header
                    }
                    <Box height={'100%'}>
                        {children}
                    </Box>
                </Container>
            </Box>
        </Box>

    )
}

export default DialogWrapperSignUp