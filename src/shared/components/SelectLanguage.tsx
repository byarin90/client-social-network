import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../translations/en/translations.json';
import translationHE from '../translations/he/translations.json';
import { makeStyles } from 'tss-react/mui';
import { useLanguage } from '../context/LanguageContext';
import ButtonGroup from './ButtonGroup';

i18next.use(initReactI18next).init({
    resources: {
        en: {
            translation: translationEN,
        },
        he: {
            translation: translationHE,
        },
    },
    fallbackLng: ['en'],
    debug: false,
    interpolation: {
        escapeValue: false,
    },
    detection: {
        checkWhitelist: true,
    },
    
});

const useStyles = makeStyles()(() => ({
    languageSelectButton: {
      direction: 'ltr',
      gap: '5px',
      
      '& > *': {
        lineHeight: '1',
        borderRadius: '7px !important',
        padding: 3,
        width: '30px',
        fontWeight: 600,
        fontSize: 16,
        '&:hover': {
          boxShadow: 'inset 0px 0px 0px 1px #12BDF8'
        }
      }
    }
  }))
  
  
  function SelectLanguage(): JSX.Element {
    const { classes } = useStyles()
    const { changeLanguage, language } = useLanguage()
  
    return (
   
      <ButtonGroup className={classes.languageSelectButton} size='small' value={language} options={[
        {
          value: 'en',
          label: 'EN',
        },
        {
          value: 'he',
          label: 'עב',
        },
      ]} onChange={(_, value) => {
        if (!value) return
        changeLanguage(value)
      }} />


    )
  }
  
  export default SelectLanguage
  