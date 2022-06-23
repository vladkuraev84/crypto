import { createI18n, LocaleMessages, VueMessageType } from "vue-i18n";

function loadLocaleMessages(): LocaleMessages<VueMessageType> {
  const locales = require.context(
    "@/locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages: LocaleMessages<VueMessageType> = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

const dateTimeFormats = {
  en: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  },
  ua: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  },
};

const numberFormats = {
  en: {
    currency: {
      style: "currency",
      currency: "USD",
    },
  },
  ua: {
    currency: {
      style: "currency",
      currency: "UAH",
    },
  },
};

const i18n = createI18n({
  legacy: false,
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  globalInjection: true,
  messages: loadLocaleMessages(),
  dateTimeFormats,
  numberFormats,
});

export default i18n;
