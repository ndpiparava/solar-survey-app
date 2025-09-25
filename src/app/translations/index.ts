import de from './de';
import en from './en';

export const translations: Record<string, Record<string, string>> = {
  en,
  de,
};

export type TranslationKeys = keyof typeof en;
