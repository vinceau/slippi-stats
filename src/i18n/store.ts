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

export class LanguagePresenter {
  public async setLanguage(language: SupportedLanguages): Promise<void> {
    (window as any).i18next.changeLanguage(language).then(() => {
      useLanguageStore.setState({ language });
    });
  }
}

export const languagePresenter = new LanguagePresenter();
