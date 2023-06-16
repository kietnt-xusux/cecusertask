import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ja from '../locales/ja';
import en from '../locales/en';
import vi from '../locales/vi';

export const resources = {
    ja: { common: ja },
    en: { common: en },
    vi: { common: vi },
} as const;

i18n.use(initReactI18next)
    .init({
        fallbackLng: 'en',
        resources
    })

export default i18n;
