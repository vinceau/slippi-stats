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
    const i18next = (window as any).i18next;
    useLanguageStore.setState({ loading: true });

    try {
      // await this.loadLanguage(language);
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
