import { getLocales } from 'expo-localization';

export type LocalizCode = 'en' | 'km';

export const locales: Record<LocalizCode, string> = {
  en: 'English',
  km: 'ខ្មែរ',
};

export const defaultLocale: LocalizCode = 'en';

export const detectLocale = (): LocalizCode => {
  const deviceLocales = getLocales();
  const deviceLanguage = deviceLocales[0]?.languageCode;
  
  // Check if device language is supported
  if (deviceLanguage && deviceLanguage in locales) {
    return deviceLanguage as LocalizCode;
  }
  
  return defaultLocale;
};