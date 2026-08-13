import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

const translations = {
    en: {
        welcome: 'Welcome, %{name}!',
    },
    tr: {
        welcome: 'Hoş geldin, %{name}!',
    },
};

export const i18n = new I18n(translations);

const language = getLocales()[0]?.languageCode ?? 'en';

i18n.locale = translations[language as keyof typeof translations]
    ? language
    : 'en';

i18n.enableFallback = true;