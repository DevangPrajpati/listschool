export const ENGLISH_LOCALE = {locale: 'en-US', name: "English"};
export const PORTUGUESE_LOCALE = {locale: 'pt-PT', name: "Portuguese"};
export const getLangLabelBasedOnLanguage = (locale) => {
  if (locale === ENGLISH_LOCALE.locale) {
    return ENGLISH_LOCALE.name;
  }
  if (locale === PORTUGUESE_LOCALE.locale) {
    return PORTUGUESE_LOCALE.name;
  };
  return "UNKNOWN";
};
