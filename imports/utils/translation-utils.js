import * as React from "react";
import i18n from 'meteor/universe:i18n';

export const getTranslation = (key, T) => {
  return <T>{key}</T>;
};
export const T = i18n.createComponent();
