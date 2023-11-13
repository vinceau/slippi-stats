import i18next from "i18next";

import { defaultLanguage } from "./store";

export async function initializeTranslations(): Promise<void> {
  (window as any).i18next = i18next;

  await i18next.init({
    lng: defaultLanguage, // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      en: {
        translation: {
          something: "hello world",
        },
      },
      de: {
        translation: {
          something: "hello world but in german",
        },
      },
    },
  });
}
