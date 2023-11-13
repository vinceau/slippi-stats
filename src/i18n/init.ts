import i18next from "i18next";

import en from "./en.json";
import { defaultLanguage } from "./store";
import de from "./translations/de.xlf";

console.log(de);

export async function initializeTranslations(): Promise<void> {
  (window as any).i18next = i18next;

  await i18next.init({
    lng: defaultLanguage, // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      en,
      de,
    },
  });
}
