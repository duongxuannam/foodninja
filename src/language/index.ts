import LocalizedStrings from 'react-native-localization';
import get from 'lodash/get';
import findIndex from 'lodash/findIndex';
import en from './en';
import vi from './vi';
import displayLanguages from './displayLanguages';

/**
 * get localized text
 * l10n stand for localization
 */
export const l10n = new LocalizedStrings({
  vi,
  en,
});

export const setLanguage = async (langCode: string) => {
  const currentLang = l10n.getLanguage();
  if (!langCode) {
    return;
  }
  if (langCode === currentLang) {
    return;
  }

  l10n.setLanguage(langCode);
};

export function checkSupportDeviceLanguage() {
  let deviceLang = l10n.getInterfaceLanguage();
  deviceLang = deviceLang ? deviceLang.slice(0, 2) : '';
  const isSupportedLang =
    findIndex(displayLanguages, {code: deviceLang}) !== -1;
  return isSupportedLang ? deviceLang : '';
}

export function resetLanguage() {
  const _lang = checkSupportDeviceLanguage() || 'vi';
  setLanguage(_lang);
}

export const getLangCode = (countryCode: string) =>
  get(
    displayLanguages.filter(ele => {
      if (
        findIndex(get(ele, 'countryCodes', []), o => o === countryCode) !== -1
      ) {
        return ele;
      }
      return null;
    }),
    '[0].code',
    'en',
  );
