import { create } from "zustand";
import i18next from "i18next";

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
    useLanguageStore.setState({ loading: true });

    try {
      await i18next.changeLanguage(language);
      useLanguageStore.setState({ language });
    } catch (err) {
      throw new Error(err as any);
    } finally {
      useLanguageStore.setState({ loading: false });
    }
  }
}

export const languagePresenter = new LanguagePresenter();
