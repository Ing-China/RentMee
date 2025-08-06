import { i18n } from '@lingui/core';
import { LocalizCode } from './config';

// Import all catalogs statically for React Native
import { messages as enMessages } from '../locales/en/messages';
import { messages as kmMessages } from '../locales/km/messages';

const catalogs: Record<LocalizCode, any> = {
  en: enMessages,
  km: kmMessages,
};

export async function loadCatalog(locale: LocalizCode): Promise<void> {
  const catalog = catalogs[locale];
  
  if (!catalog) {
    console.warn(`Catalog for locale "${locale}" not found, falling back to English`);
    i18n.load('en', catalogs.en);
    return;
  }
  
  i18n.load(locale, catalog);
}