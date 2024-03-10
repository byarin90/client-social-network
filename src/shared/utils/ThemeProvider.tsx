import '../../App.css'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'
import { useLanguage } from '../context/LanguageContext';

const ThemeProvider = (
    {
        children,
    }: {
        children: React.ReactNode
    }
) => {
    const { direction, language } = useLanguage()

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    })

    const cacheLtr = createCache({
        key: 'muiltr',
        stylisPlugins: [prefixer],
    })
    const theme = createTheme({
        direction,
        palette: {
            primary: {
                main: '#12BDF8',
                contrastText: '#fff',
            },
            background: {
                default: 'transparent',
            },
        },
        typography: {
            fontFamily: [
                'Assistant',
                'Helvetica',
                'Arial',
                'sans-serif'
            ].join(','),
        },
    })

    return (
        <CacheProvider value={language === 'he' ? cacheRtl : cacheLtr}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </CacheProvider>
    )
}

export default ThemeProvider