// import {View, Text} from 'react-native';
// import React from 'react';
import {l10n} from 'language/index';
import {useSelector} from 'store/index';

export default function I18nText(text: string, languageParam?: string) {
  const language = useSelector(state => state?.app.language);
  return l10n.getString(text, languageParam || language);
}
