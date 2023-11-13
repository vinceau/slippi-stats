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
      await this.loadLanguage(language);
      await i18next.changeLanguage(language);
      useLanguageStore.setState({ language });
    } catch (err) {
      throw new Error(err as any);
    } finally {
      useLanguageStore.setState({ loading: false });
    }
  }

  private async loadLanguage(language: SupportedLanguages, namespace = "translation") {
    const i18next = (window as any).i18next;
    if (i18next.hasResourceBundle(language, namespace)) {
      return;
    }

    switch (language) {
      case "en":
        // It should already be loaded
        break;
      case "de": {
        const de = await import("./translations/de.xlf");
        i18next.addResourceBundle("de", namespace, de[namespace]);
        break;
      }
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  }
}

export const languagePresenter = new LanguagePresenter();
