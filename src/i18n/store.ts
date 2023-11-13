import { create } from "zustand";

export type SupportedLanguages = "en" | "de";

export const defaultLanguage: SupportedLanguages = "en";

export type LanguageState = {
  language: SupportedLanguages;
  loading: boolean;
};

export const useLanguageStore = create<LanguageState>()((set) => ({
  language: defaultLanguage,
  loading: false,
}));

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class LanguagePresenter {
  public async setLanguage(language: SupportedLanguages): Promise<void> {
    useLanguageStore.setState({ loading: true });

    // Simulate lazy loading languages
    await delay(200);
    (window as any).i18next
      .changeLanguage(language)
      .then(() => {
        useLanguageStore.setState({ language });
      })
      .finally(() => {
        useLanguageStore.setState({ loading: false });
      });
  }
}

export const languagePresenter = new LanguagePresenter();
