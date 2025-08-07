import { detectLocale, LocalizCode } from "@/i18n/config";
import { loadCatalog } from "@/i18n/loader";
import { storage } from "@/lib/storage";
import {
  KantumruyPro_100Thin,
  KantumruyPro_400Regular,
  KantumruyPro_500Medium,
  KantumruyPro_600SemiBold,
  KantumruyPro_700Bold,
  useFonts,
} from "@expo-google-fonts/kantumruy-pro";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { SplashScreen } from "expo-router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type I18nContextType = {
  locale: LocalizCode;
  changeLocale: (newLocale: LocalizCode) => Promise<void>;
};

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  changeLocale: async () => {},
});

export const I18nProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locale, setLocale] = useState<LocalizCode>("en");
  const [ready, setReady] = useState(false);

  const [fontsLoaded] = useFonts({
    KantumruyPro_700Bold,
    KantumruyPro_100Thin,
    KantumruyPro_500Medium,
    KantumruyPro_600SemiBold,
    KantumruyPro_400Regular,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const init = async () => {
      let initialLocale = detectLocale();
      try {
        const savedLanguage = await storage.getLanguage();
        if (savedLanguage) {
          initialLocale = savedLanguage;
        }
      } catch (e) {
        console.log(e);
      }
      await loadCatalog(initialLocale);
      i18n.activate(initialLocale);
      setLocale(initialLocale);
      setReady(true);
    };
    init();
  }, []);

  const changeLocale = useCallback(
    async (newLocale: LocalizCode) => {
      if (locale === newLocale) return;

      try {
        await loadCatalog(newLocale);
        i18n.activate(newLocale);
        await storage.setLanguage(newLocale);
        setLocale(newLocale);
      } catch (error) {
        console.error("Failed to change locale:", error);
      }
    },
    [locale]
  );

  if (!ready || !fontsLoaded) return null;

  return (
    <I18nContext.Provider value={{ locale, changeLocale }}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
