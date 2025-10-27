import i18next from "i18next";
import HttpApi from "i18next-http-backend";

import { defaultLanguage } from "./store";

export async function initializeTranslations(): Promise<void> {
  (window as any).i18next = i18next;

  await i18next.use(HttpApi).init({
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    fallbackLng: "en",
    lng: defaultLanguage, // if you're using a language detector, do not define the lng option
    debug: true,
  });
}
